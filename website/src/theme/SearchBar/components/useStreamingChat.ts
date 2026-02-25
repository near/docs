import { useCallback, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { z } from 'zod';
import type { UIMessage } from 'ai';

export interface Source {
  title: string;
  path: string;
}

export type ChatUIMessage = UIMessage<{ sources?: Source[] }>;

export interface SavedConversation {
  messages: ChatUIMessage[];
}

interface UseStreamingChatOptions {
  savedConversation?: SavedConversation | null;
  onSaveConversation?: (data: SavedConversation) => void;
}

const API_URL = 'https://docs-mcp-f18b.onrender.com/api/chat';

const metadataSchema = z.object({
  sources: z.array(z.object({ title: z.string(), path: z.string() })).optional(),
});

export function extractMessageText(message: ChatUIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

export function useStreamingChat({ savedConversation, onSaveConversation }: UseStreamingChatOptions) {
  const { messages, sendMessage: chatSendMessage, status, setMessages } = useChat<ChatUIMessage>({
    messages: savedConversation?.messages ?? [],
    messageMetadataSchema: metadataSchema,
    transport: new DefaultChatTransport({
      api: API_URL,
      prepareSendMessagesRequest: ({ messages }) => {
        const lastMsg = messages.at(-1);
        const history = messages.slice(0, -1).map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: extractMessageText(m),
        }));
        return {
          body: { message: lastMsg ? extractMessageText(lastMsg) : '', history },
        };
      },
    }),
  });
  
  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    if (status === 'ready' && messages.length > 0) {
      onSaveConversation?.({ messages });
    }
  }, [status, messages, onSaveConversation]);

  const sendMessage = useCallback((text: string) => chatSendMessage({ text }), [chatSendMessage]);
  const clearMessages = useCallback(() => setMessages([]), [setMessages]);

  return { messages, isLoading, sendMessage, clearMessages };
}
