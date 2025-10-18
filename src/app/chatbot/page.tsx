'use client';

import { useState } from 'react';
import { Bot, User, Send, Loader2, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatWithEduBot } from '@/ai/flows/chat-with-edubot';

type Message = {
  id: string;
  text: string;
  role: 'user' | 'bot';
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: `user-${Date.now()}`, text: input, role: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // For now, we pass the conversation history as a simple string.
      // A more advanced implementation would handle a structured history.
      const history = messages.map(m => `${m.role}: ${m.text}`).join('\n');
      
      const result = await chatWithEduBot({
        history: history,
        question: input,
      });
      
      const botMessage: Message = { id: `bot-${Date.now()}`, text: result.reply, role: 'bot' };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Failed to get response from EduBot:", error);
      const errorMessage: Message = { 
        id: `bot-error-${Date.now()}`, 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        role: 'bot' 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center gap-3">
            <BrainCircuit className="h-8 w-8" />
            EduBot AI Assistant
        </h1>
        <p className="text-muted-foreground mt-2">Ask me anything about the TET & DSC syllabus, or for explanations of concepts.</p>
      </header>
      
      <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4 sm:p-6">
                <div className="space-y-6">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground pt-16">
                        <Bot className="h-12 w-12 mx-auto mb-4" />
                        <p>Ask a question to get started!</p>
                        <p className="text-sm">e.g., "Explain Piaget's stages of development"</p>
                    </div>
                )}
                {messages.map((message) => (
                    <div
                    key={message.id}
                    className={cn(
                        'flex items-start gap-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                    >
                    {message.role === 'bot' && (
                        <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                           <Bot size={20}/>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        'max-w-sm rounded-lg px-4 py-3 text-sm shadow-md md:max-w-md',
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border'
                        )}
                    >
                        {message.text}
                    </div>
                     {message.role === 'user' && (
                        <Avatar className="h-8 w-8">
                           <AvatarImage src="https://picsum.photos/seed/avatar/100/100" />
                           <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                         <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                           <Bot size={20}/>
                        </Avatar>
                        <div className="bg-card border rounded-lg px-4 py-3">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask EduBot a question..."
                    className="flex-1"
                    disabled={isLoading}
                    autoComplete="off"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                    {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                    <Send className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send</span>
                </Button>
                </form>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
