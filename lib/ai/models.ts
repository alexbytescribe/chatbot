export const DEFAULT_CHAT_MODEL: string = 'xai';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'xai',
    name: 'xAi',
    description: 'Use the default xAi Grok model',
  },
  {
    id: '4o',
    name: '4o',
    description: 'Use OpenAI gpt-4o',
  },
  {
    id: '4.1',
    name: '4.1',
    description: 'Use OpenAI gpt-4.1 reasoning model',
  },
  {
    id: '4.1-mini',
    name: '4.1-mini',
    description: 'Use OpenAI gpt-4.1-mini',
  },
  {
    id: '4.1-nano',
    name: '4.1-nano',
    description: 'Use OpenAI gpt-4.1-nano',
  },
];
