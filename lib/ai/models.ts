export const DEFAULT_CHAT_MODEL: string = '4o';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  { id: 'xai', name: 'xai', description: 'xai' },
  { id: '4o', name: '4o', description: 'gpt-4o' },
  { id: '4.1', name: '4.1', description: 'gpt-4.1' },
  { id: '4.1-mini', name: '4.1-mini', description: 'gpt-4.1-mini' },
  { id: '4.1-nano', name: '4.1-nano', description: 'gpt-4.1-nano' },
];
