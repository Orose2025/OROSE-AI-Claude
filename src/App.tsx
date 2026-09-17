import { useState, useCallback, useEffect, useRef } from 'react';
import { askAldup, AllProvidersFailedError, CancelledError } from './lib/ai/client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const buildTitle = (content: string) =>
  content.slice(0, 50) + (content.length > 50 ? '...' : '');

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'Nouvelle conversation',
      messages: [],
      createdAt: new Date()
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setSidebarOpen(false);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(null);
    }
  };

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const sessionId = activeSessionId ?? `session-${Date.now()}`;
    const assistantId = `ai-${Date.now()}`;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };

    // L'historique doit être calculé ici, de façon synchrone. La fonction passée
    // à setSessions n'est exécutée qu'au rendu suivant : la remplir depuis
    // l'intérieur laissait un historique vide, et le moteur ne recevait que le
    // system prompt — d'où la même réponse d'accueil à toutes les questions.
    const sessionCourante = sessions.find(s => s.id === sessionId);
    const history: Message[] = sessionCourante
      ? [...sessionCourante.messages, userMsg]
      : [userMsg];

    setSessions(prev => {
      const existing = prev.find(s => s.id === sessionId);
      if (!existing) {
        const newSession: ChatSession = {
          id: sessionId,
          title: buildTitle(content),
          messages: [userMsg],
          createdAt: new Date()
        };
        return [newSession, ...prev];
      }
      return prev.map(s => s.id === sessionId ? {
        ...s,
        messages: [...s.messages, userMsg],
        title: s.messages.length === 0 ? buildTitle(content) : s.title
      } : s);
    });

    setActiveSessionId(sessionId);
    setIsTyping(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // La réponse s'écrit dans une seule bulle : si le moteur change de source
    // en cours de route, la bulle repart de zéro sans autre signal visible.
    const upsertAssistant = (text: string) => {
      setSessions(prev => prev.map(s => {
        if (s.id !== sessionId) return s;
        const already = s.messages.some(m => m.id === assistantId);
        const bubble: Message = {
          id: assistantId,
          role: 'assistant',
          content: text,
          timestamp: new Date()
        };
        return {
          ...s,
          messages: already
            ? s.messages.map(m => m.id === assistantId ? { ...m, content: text } : m)
            : [...s.messages, bubble]
        };
      }));
    };

    let streamed = '';
    try {
      const answer = await askAldup({
        history: history.map(({ role, content: text }) => ({ role, content: text })),
        signal: controller.signal,
        onToken: (chunk, { reset }) => {
          streamed = reset ? chunk : streamed + chunk;
          upsertAssistant(streamed);
        }
      });
      upsertAssistant(answer);
    } catch (error) {
      if (error instanceof CancelledError) {
        setIsTyping(false);
        return;
      }
      upsertAssistant(
        error instanceof AllProvidersFailedError
          ? "Je suis momentanément surchargé. Réessayez dans un instant, je reviens très vite."
          : "Je rencontre des difficultés techniques momentanées. Veuillez réessayer dans quelques instants."
      );
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }

    setIsTyping(false);
  }, [activeSessionId, sessions]);

  const handleStop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      handleSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Format markdown basique
  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800/50 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  // Landing Page - Design Premium
  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col overflow-y-auto">
        {/* Background gradient effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]"></div>
        </div>

        {/* Nav */}
        <nav className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">AI Aldup</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowDonateModal(true)}
              className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block"
            >
              Soutenir
            </button>
            <button
              onClick={() => setShowLanding(false)}
              className="px-5 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-100 transition-all"
            >
              Commencer
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm mb-10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Intelligence artificielle gratuite • Sans inscription
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Votre assistant IA
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                intelligent & gratuit
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              AI Aldup est votre compagnon intelligent, disponible gratuitement et sans limite. 
              Posez vos questions, créez, apprenez, codez — tout est possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <button
                onClick={() => setShowLanding(false)}
                className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/10"
              >
                Commencer à discuter
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => setShowDonateModal(true)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-semibold text-base transition-all border border-white/10 hover:border-white/20"
              >
                ❤️ Soutenir le projet
              </button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: '⚡', title: 'Rapide & précis', desc: 'Réponses instantanées et de haute qualité' },
                { icon: '🆓', title: '100% Gratuit', desc: 'Aucun abonnement, aucune carte bancaire' },
                { icon: '🔒', title: 'Confidentiel', desc: 'Vos conversations restent privées' },
              ].map((feature) => (
                <div key={feature.title} className="p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 AI Aldup — Service gratuit financé par la communauté
          </p>
        </footer>

        {/* Donate Modal */}
        {showDonateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowDonateModal(false)}>
            <div className="bg-[#1a1a2e] rounded-3xl border border-white/10 max-w-md w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                  <span className="text-2xl">❤️</span>
                </div>
                <h2 className="text-white text-2xl font-bold mb-3">Soutenir AI Aldup</h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  AI Aldup est gratuit pour tous. Votre soutien nous aide à couvrir les coûts 
                  de serveurs et à garder le service accessible.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    { icon: '☕', label: 'Offrir un café', price: '3€' },
                    { icon: '🍕', label: 'Offrir une pizza', price: '10€' },
                    { icon: '🚀', label: 'Supporter mensuel', price: '5€/mois', highlight: true },
                  ].map((option) => (
                    <button
                      key={option.label}
                      className={`w-full py-3.5 rounded-xl transition-all flex items-center justify-between px-5 ${
                        option.highlight
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/20'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                      </span>
                      <span className="font-semibold">{option.price}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowDonateModal(false)}
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Chat App - Design Premium
  return (
    <div className="h-screen flex bg-[#0a0a0f] overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed md:relative z-40 h-full transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="w-72 bg-[#0f0f17]/90 backdrop-blur-xl border-r border-white/5 flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">AI Aldup</h2>
                <p className="text-gray-500 text-xs">Assistant gratuit</p>
              </div>
            </div>
            <button
              onClick={createNewSession}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Nouvelle conversation
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {sessions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-xs">Aucune conversation</p>
              </div>
            )}
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => { setActiveSessionId(session.id); setSidebarOpen(false); }}
                className={`group relative p-3 rounded-xl cursor-pointer transition-all ${
                  activeSessionId === session.id
                    ? 'bg-white/10 border border-white/10'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <p className="text-gray-200 text-sm truncate pr-6">{session.title}</p>
                <p className="text-gray-600 text-xs mt-1">
                  {session.messages.length} messages
                </p>
                <button
                  onClick={(e) => deleteSession(session.id, e)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-lg transition-all"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5">
            <button
              onClick={() => setShowDonateModal(true)}
              className="w-full py-2.5 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 rounded-xl hover:bg-white/5"
            >
              <span>❤️</span>
              <span>Soutenir AI Aldup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Bar */}
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-white font-semibold text-sm">AI Aldup</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs text-green-400 font-medium">En ligne</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {!activeSession || messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="text-white text-3xl font-bold mb-3 tracking-tight">Comment puis-je vous aider ?</h2>
              <p className="text-gray-500 max-w-md mb-10 text-base">
                Je suis AI Aldup, votre assistant intelligent gratuit. Posez-moi n'importe quelle question.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg w-full">
                {[
                  { icon: '💡', text: 'Explique-moi un concept complexe' },
                  { icon: '✍️', text: 'Aide-moi à rédiger un texte' },
                  { icon: '💻', text: 'Aide-moi à écrire du code' },
                  { icon: '🎨', text: 'Donne-moi des idées créatives' },
                ].map((suggestion) => (
                  <button
                    key={suggestion.text}
                    onClick={() => handleSendMessage(suggestion.text)}
                    className="p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 rounded-2xl text-left transition-all group"
                  >
                    <span className="text-lg mb-2 block">{suggestion.icon}</span>
                    <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
              {messages.map((msg, idx) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                  <div className={`max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white px-5 py-3.5 rounded-2xl rounded-br-md shadow-lg shadow-blue-600/10'
                      : 'bg-white/[0.04] text-gray-200 px-5 py-4 rounded-2xl rounded-bl-md border border-white/5'
                  }`}>
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                    />
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="bg-white/[0.04] border border-white/5 px-5 py-4 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5 items-center h-5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 sm:px-6 py-5 border-t border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl focus-within:border-white/20 focus-within:bg-white/[0.06] transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message..."
                rows={1}
                className="w-full bg-transparent text-white px-5 py-4 pr-14 resize-none focus:outline-none placeholder-gray-500 text-sm leading-relaxed max-h-[200px]"
              />
              {isTyping ? (
                <button
                  type="button"
                  onClick={handleStop}
                  aria-label="Arrêter la réponse"
                  className="absolute right-3 bottom-3 p-2.5 bg-white text-black rounded-xl hover:bg-gray-100 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2"></rect>
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Envoyer le message"
                  className="absolute right-3 bottom-3 p-2.5 bg-white text-black rounded-xl disabled:bg-white/10 disabled:text-gray-600 hover:bg-gray-100 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              )}
            </div>
            <p className="text-center text-gray-600 text-xs mt-3">
              AI Aldup peut faire des erreurs. Vérifiez les informations importantes.
            </p>
          </form>
        </div>
      </div>

      {/* Donate Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowDonateModal(false)}>
          <div className="bg-[#1a1a2e] rounded-3xl border border-white/10 max-w-md w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                <span className="text-2xl">❤️</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-3">Soutenir AI Aldup</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                AI Aldup est gratuit pour tous. Votre soutien nous aide à couvrir les coûts 
                de serveurs et à garder le service accessible.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  { icon: '☕', label: 'Offrir un café', price: '3€' },
                  { icon: '🍕', label: 'Offrir une pizza', price: '10€' },
                  { icon: '🚀', label: 'Supporter mensuel', price: '5€/mois', highlight: true },
                ].map((option) => (
                  <button
                    key={option.label}
                    className={`w-full py-3.5 rounded-xl transition-all flex items-center justify-between px-5 ${
                      option.highlight
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </span>
                    <span className="font-semibold">{option.price}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowDonateModal(false)}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
