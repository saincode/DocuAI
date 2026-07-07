import React, { useState, useEffect } from 'react';

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = ({ onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-blue-100/50 border-b border-blue-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
              <line x1="9" y1="17" x2="12" y2="17"/>
            </svg>
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">DocuAI</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Features', id: 'features' },
            { label: 'How it Works', id: 'how-it-works' },
            { label: 'Example', id: 'example' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGetStarted}
            id="nav-get-started"
            className="btn-primary text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md shadow-blue-200 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─── Chat Mockup ─────────────────────────────────────────────────────────────
const ChatMockup = () => {
  const messages = [
    { role: 'user', text: 'What are the key findings in the research paper?' },
    { role: 'ai', text: 'Based on your uploaded PDF, the key findings include: improved accuracy by 23%, reduced processing time, and novel approach to data augmentation.' },
    { role: 'user', text: 'Summarize the conclusion section.' },
    { role: 'ai', text: 'The conclusion highlights that the proposed method outperforms existing baselines across all benchmarks.' },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ animation: 'float 4s ease-in-out infinite' }}>
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-3xl blur-2xl" />

      {/* Chat window */}
      <div className="relative glass rounded-2xl shadow-2xl shadow-blue-200/50 overflow-hidden border border-blue-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="flex items-center gap-2 flex-1 ml-1">
            <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white">research_paper.pdf</span>
          </div>
          <div className="flex items-center gap-1 bg-green-400/20 rounded-full px-2 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulseSoft 2s ease-in-out infinite' }} />
            <span className="text-xs text-green-100 font-medium">Active</span>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 bg-white/60">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} chat-appear`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {msg.role === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 shadow-md shadow-blue-200">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-md shadow-blue-200'
                    : 'bg-white text-slate-700 rounded-bl-md border border-blue-50 shadow-blue-50'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-md px-3 py-2.5 flex gap-1 border border-blue-50 shadow-sm">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  style={{ animation: `pulseSoft 1.2s ease-in-out ${dot * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="px-4 py-3 bg-white/80 border-t border-blue-50">
          <div className="flex items-center gap-2 bg-blue-50/60 rounded-xl px-3 py-2 border border-blue-100">
            <input
              readOnly
              placeholder="Ask about your document..."
              className="flex-1 text-xs text-slate-400 bg-transparent outline-none placeholder:text-slate-400"
            />
            <button className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm hover:scale-105 transition-transform">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 glass rounded-xl px-3 py-1.5 border border-blue-100 shadow-lg shadow-blue-100">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" style={{ animation: 'pulseSoft 2s infinite' }} />
          <span className="text-xs font-semibold text-slate-700">RAG Powered</span>
        </div>
      </div>
    </div>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = ({ onGetStarted }) => (
  <section className="relative min-h-screen hero-gradient dot-grid flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16">
      {/* Left: Text */}
      <div className="text-center lg:text-left space-y-6" style={{ animation: 'slideUp 0.7s ease-out both' }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 border border-blue-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-blue-500" style={{ animation: 'pulseSoft 2s infinite' }} />
          <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">AI-Powered · RAG Technology</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
          Chat with Your{' '}
          <span className="gradient-text">PDFs</span>{' '}
          <br className="hidden sm:block" />
          Using AI
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
          Upload your PDF documents and ask questions in natural language. The AI understands your documents using a RAG system and provides accurate answers based on the uploaded content.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <button
            onClick={onGetStarted}
            id="hero-get-started"
            className="btn-primary flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-300/50 hover:shadow-xl hover:shadow-blue-400/40 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="13 17 18 12 13 7"/>
              <polyline points="6 17 11 12 6 7"/>
            </svg>
            Get Started
          </button>
          <button
            onClick={onGetStarted}
            id="hero-upload-pdf"
            className="flex items-center gap-2 glass text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-blue-200 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/50 transition-all duration-200 text-sm shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload PDF
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-4 justify-center lg:justify-start pt-2">
          <div className="flex -space-x-2">
            {['bg-blue-400', 'bg-indigo-400', 'bg-sky-500', 'bg-blue-600'].map((bg, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                {['A', 'B', 'C', 'D'][i]}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Loved by 500+ researchers</p>
          </div>
        </div>
      </div>

      {/* Right: Chat Mockup */}
      <div className="flex justify-center lg:justify-end" style={{ animation: 'slideUp 0.8s ease-out 0.15s both' }}>
        <ChatMockup />
      </div>
    </div>
  </section>
);

// ─── Feature Card ─────────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, description, gradient, delay }) => (
  <div
    id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    className="card-hover glass rounded-2xl p-7 border border-blue-100/80 shadow-sm"
    style={{ animation: `slideUp 0.6s ease-out ${delay}s both` }}
  >
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </div>
);

// ─── Features Section ─────────────────────────────────────────────────────────
const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      ),
      title: 'Upload PDF',
      description: 'Upload your study materials, research papers, or any documents in seconds with our simple drag-and-drop interface.',
      gradient: 'from-blue-500 to-blue-600',
      delay: 0.1,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'AI Chat',
      description: 'Ask questions in plain English and receive instant, contextually accurate answers powered by advanced language models.',
      gradient: 'from-sky-400 to-blue-500',
      delay: 0.2,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      ),
      title: 'RAG Powered',
      description: 'Answers are generated from your uploaded documents using vector search and AI — ensuring precision grounded in your content.',
      gradient: 'from-indigo-500 to-blue-500',
      delay: 0.3,
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white/40">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14" style={{ animation: 'slideUp 0.6s ease-out both' }}>
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 border border-blue-200 shadow-sm mb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to{' '}
            <span className="gradient-text">understand</span> your docs
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-xl mx-auto">
            A seamless experience from upload to insight, all in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload your PDF',
      description: 'Drag and drop or browse to upload your PDF document. Supports all PDF formats.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      ),
    },
    {
      number: '02',
      title: 'AI Processes & Embeds',
      description: 'AI processes the document and stores embeddings in Pinecone for lightning-fast semantic search.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Ask & Receive Answers',
      description: 'Ask questions in natural language and receive accurate, context-aware answers instantly.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 border border-blue-200 shadow-sm mb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">How it Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From upload to insight in{' '}
            <span className="gradient-text">3 simple steps</span>
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-xl mx-auto">
            Get started in seconds. No setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector lines (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 pointer-events-none" />

          {steps.map((step, i) => (
            <div
              key={i}
              id={`step-${i + 1}`}
              className="relative flex flex-col items-center text-center group"
              style={{ animation: `slideUp 0.6s ease-out ${0.1 + i * 0.12}s both` }}
            >
              {/* Step circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl glass border border-blue-200 flex items-center justify-center shadow-lg shadow-blue-100 group-hover:shadow-blue-200 transition-shadow duration-300">
                  <div className="text-blue-600">{step.icon}</div>
                </div>
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md shadow-blue-200">
                  <span className="text-[10px] font-bold text-white">{step.number}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Example Chat Section ─────────────────────────────────────────────────────
const ExampleChatSection = () => (
  <section id="example" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 border border-blue-200 shadow-sm mb-4">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Live Example</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          See it in{' '}
          <span className="gradient-text">action</span>
        </h2>
        <p className="mt-3 text-slate-500 text-lg">
          Ask anything about your document — the AI answers with precision.
        </p>
      </div>

      {/* Chat card */}
      <div
        id="example-chat"
        className="glass rounded-3xl border border-blue-100 shadow-2xl shadow-blue-100/50 overflow-hidden"
        style={{ animation: 'slideUp 0.7s ease-out both' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-50 bg-white/50">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">DocuAI Assistant</p>
            <p className="text-xs text-slate-400">Powered by RAG · document.pdf loaded</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ animation: 'pulseSoft 2s infinite' }} />
            <span className="text-xs text-green-700 font-semibold">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="p-6 space-y-5">
          {/* User message */}
          <div className="flex justify-end">
            <div className="flex items-end gap-3 max-w-[80%]">
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg shadow-blue-200/50">
                <p className="text-xs font-semibold text-blue-100 mb-1">You</p>
                <p className="text-sm leading-relaxed">What is Retrieval-Augmented Generation?</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#64748b">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
          </div>

          {/* AI response */}
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-blue-200">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="glass-blue rounded-2xl rounded-bl-md px-5 py-4 border border-blue-100 shadow-sm">
                <p className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1.5">
                  <span>DocuAI</span>
                  <span className="text-blue-300">·</span>
                  <span className="font-normal text-slate-400">Based on your document</span>
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-800">Retrieval-Augmented Generation (RAG)</span> retrieves relevant information from your uploaded document before generating an answer, improving accuracy and relevance.
                </p>
                <div className="mt-3 pt-3 border-t border-blue-100 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-blue-500 font-medium">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    Verified from document
                  </div>
                  <span className="text-slate-200">·</span>
                  <span className="text-xs text-slate-400">Page 3, Section 1.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="px-6 py-4 bg-white/60 border-t border-blue-50">
          <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 border border-blue-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span className="flex-1 text-sm text-slate-400">Ask a question about your PDF...</span>
            <button
              id="example-send-btn"
              className="btn-primary flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-blue-200 hover:shadow-blue-300 hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── CTA Section ─────────────────────────────────────────────────────────────
const CTASection = ({ onGetStarted }) => (
  <section id="cta" className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ animation: 'slideUp 0.6s ease-out both' }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500" />
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-white/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative px-8 py-16 sm:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 border border-white/30 mb-6">
            <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">Get Started Today</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to Chat with Your Documents?
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
            Upload your PDF and start asking questions instantly. No credit card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={onGetStarted}
              id="cta-get-started"
              className="btn-primary flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl shadow-xl hover:bg-blue-50 hover:shadow-2xl transition-all duration-200 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7"/>
                <polyline points="6 17 11 12 6 7"/>
              </svg>
              Get Started — It's Free
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              id="cta-learn-more"
              className="flex items-center gap-2 border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 text-sm backdrop-blur bg-transparent cursor-pointer"
            >
              Learn More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-blue-100 bg-white/50 backdrop-blur-sm px-6 py-10">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <span className="font-bold text-slate-700">DocuAI</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {[
            { label: 'Features', action: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Contact', action: () => {} },
            { label: 'GitHub', action: () => {} },
          ].map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              id={`footer-${link.label.toLowerCase()}`}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200 font-medium bg-transparent border-none cursor-pointer p-0"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} DocuAI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// ─── Main Landing Page ────────────────────────────────────────────────────────
const LandingPage = ({ onGetStarted }) => (
  <div className="min-h-screen">
    <Navbar onGetStarted={onGetStarted} />
    <HeroSection onGetStarted={onGetStarted} />
    <FeaturesSection />
    <HowItWorksSection />
    <ExampleChatSection />
    <CTASection onGetStarted={onGetStarted} />
    <Footer />
  </div>
);

export default LandingPage;
