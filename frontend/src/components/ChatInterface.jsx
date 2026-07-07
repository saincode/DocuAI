import React, { useState, useRef, useEffect } from 'react';
import { uploadDocument, chatWithDocument, clearDocuments } from '../services/api';

// ─── Icons ────────────────────────────────────────────────────────────────────
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const PaperclipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#64748b">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const VerifiedIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const LoaderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

// ─── Typing Indicator ─────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="chat-message-ai">
    <div className="ai-avatar">
      <BotIcon />
    </div>
    <div className="ai-bubble typing-bubble">
      <div className="typing-dot" style={{ animationDelay: '0s' }} />
      <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
      <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </div>
);

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  if (msg.role === 'system') {
    return (
      <div className="system-message">
        <FileTextIcon />
        <span>{msg.content}</span>
      </div>
    );
  }

  if (msg.role === 'user') {
    return (
      <div className="chat-message-user">
        <div className="user-bubble">
          <p className="user-label">You</p>
          <p className="message-text">{msg.content}</p>
        </div>
        <div className="user-avatar">
          <UserIcon />
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div className="chat-message-ai">
      <div className="ai-avatar">
        <BotIcon />
      </div>
      <div className={`ai-bubble ${msg.isError ? 'ai-bubble-error' : ''}`}>
        <div className="ai-bubble-header">
          <span className="ai-name">DocuAI</span>
          <span className="ai-separator">·</span>
          <span className="ai-subtitle">
            {msg.isError ? 'Error occurred' : 'Based on your document'}
          </span>
        </div>
        <p className="message-text">{msg.content}</p>
        {!msg.isError && msg.source && (
          <div className="verified-footer">
            <div className="verified-badge">
              <VerifiedIcon />
              <span>Verified from document</span>
            </div>
            <span className="verified-separator">·</span>
            <span className="verified-source">{msg.source}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Chat Interface ──────────────────────────────────────────────────────
const ChatInterface = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Hello! Upload a PDF document and ask me anything about it. I\'ll answer based on the document content using RAG technology.',
      id: 'welcome',
    },
  ]);
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 128) + 'px';
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }

    setIsUploading(true);

    try {
      await uploadDocument(file);
      setUploadedFileName(file.name);
      setMessages((prev) => [
        ...prev,
        {
          role: 'system',
          content: `"${file.name}" uploaded and processed successfully. You can now ask questions!`,
          id: Date.now().toString(),
        },
      ]);
    } catch (error) {
      console.error('Upload error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'system',
          content: `Failed to process "${file.name}". Please try again.`,
          isError: true,
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClearDocuments = async () => {
    if (!window.confirm('This will permanently delete all uploaded documents from the knowledge base. Are you sure?')) return;
    setIsClearing(true);
    try {
      await clearDocuments();
      setUploadedFileName(null);
      setMessages((prev) => [
        ...prev,
        {
          role: 'system',
          content: 'All documents have been cleared. Upload a new PDF to start fresh.',
          id: Date.now().toString(),
        },
      ]);
    } catch (error) {
      console.error('Clear error:', error);
      alert('Failed to clear documents. Please try again.');
    } finally {
      setIsClearing(false);
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMsg, id: Date.now().toString() },
    ]);
    setIsTyping(true);

    try {
      const data = await chatWithDocument(userMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: data.answer,
          source: data.source || null,
          id: Date.now().toString(),
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content:
            'Sorry, I encountered an error. Please ensure the backend is running and API keys are configured.',
          isError: true,
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-root">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="chat-header">
        <div className="chat-header-left">
          {onBack && (
            <button
              onClick={onBack}
              title="Back to Home"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'none', border: '1px solid #dbeafe',
                borderRadius: '10px', padding: '7px 14px',
                fontSize: '0.8rem', fontWeight: 600, color: '#2563eb',
                cursor: 'pointer', transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseOver={e => { e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd'; }}
              onMouseOut={e => { e.currentTarget.style.background='none'; e.currentTarget.style.borderColor='#dbeafe'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Home
            </button>
          )}
          <div className="chat-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="chat-title">DocuAI Assistant</h1>
            <p className="chat-subtitle">
              Powered by RAG
              {uploadedFileName ? ` · ${uploadedFileName} loaded` : ' · No document loaded'}
            </p>
          </div>
        </div>

        <div className="chat-header-right">
          <div className="online-badge">
            <div className="online-dot" />
            <span>Online</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            className="hidden"
          />
          <button
            onClick={handleClearDocuments}
            disabled={isClearing || isUploading}
            title="Clear all documents from knowledge base"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: isClearing ? '#fef2f2' : 'none',
              border: '1px solid #fecaca',
              borderRadius: '10px', padding: '8px 14px',
              fontSize: '0.82rem', fontWeight: 600, color: '#dc2626',
              cursor: isClearing ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', flexShrink: 0,
              opacity: isClearing ? 0.6 : 1,
            }}
            onMouseOver={e => { if (!isClearing) { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#f87171'; }}}
            onMouseOut={e => { if (!isClearing) { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = '#fecaca'; }}}
          >
            {isClearing ? <LoaderIcon /> : <TrashIcon />}
            {isClearing ? 'Clearing…' : 'Clear Docs'}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`upload-btn ${isUploading ? 'upload-btn-loading' : ''}`}
          >
            {isUploading ? <LoaderIcon /> : <PaperclipIcon />}
            {isUploading ? 'Uploading…' : 'Upload PDF'}
          </button>
        </div>
      </header>

      {/* ── Messages Area ───────────────────────────────────────────── */}
      <main className="chat-messages">
        <div className="messages-inner">
          {messages.map((msg) => (
            <div key={msg.id} className="message-wrapper chat-appear">
              <MessageBubble msg={msg} />
            </div>
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* ── Input Bar ───────────────────────────────────────────────── */}
      <footer className="chat-footer">
        <form className="chat-input-form" onSubmit={handleSend}>
          <div className="input-wrapper">
            <div className="input-icon">
              <PaperclipIcon />
            </div>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your PDF..."
              className="chat-textarea"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="send-btn"
            id="chat-send-btn"
          >
            <SendIcon />
            Send
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatInterface;
