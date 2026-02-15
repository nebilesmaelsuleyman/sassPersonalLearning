'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CompanionChatProps {
  name: string;
  subject: string;
  topic: string;
  style: string;
  userName: string;
}

export function CompanionChat({ name, subject, topic, style, userName }: CompanionChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    setError(null);
    try {
      const apiMessages = [...messages, { role: 'user' as const, content: text }].map(
        (m) => ({ role: m.role, content: m.content })
      );
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          subject,
          topic,
          name,
          style,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setMessages((prev) => prev.slice(0, -1));
        return;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content || '' }]);
    } catch {
      setError('Failed to send message');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-full min-h-[380px] overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-muted/30 shrink-0">
        <h3 className="font-semibold text-foreground">Chat with {name.split(' ')[0]}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{topic}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0 no-scrollbar">
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-muted-foreground text-center max-w-[240px]">
              Ask anything about <span className="font-medium text-foreground">{topic}</span>. Type below to start.
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              'rounded-2xl px-4 py-2.5 max-w-[85%]',
              m.role === 'user'
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'mr-auto bg-muted text-foreground border border-border'
            )}
          >
            <span className="text-xs font-medium opacity-80">{m.role === 'user' ? userName : name.split(' ')[0]}</span>
            <p className="text-sm mt-0.5 whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex gap-2 p-4 border-t border-border bg-card shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-primary text-primary-foreground p-3 hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </section>
  );
}
