import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { groq } from '@ai-sdk/groq';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

const openaiProvider = createOpenAICompatible({
  name: 'openai',
  baseURL: 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY ?? '',
});

const providerName = process.env.AI_PROVIDER || 'xai';
const isOpenAI = providerName === 'openai';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': isOpenAI
          ? openaiProvider.chatModel('gpt-4o')
          : xai('grok-2-1212'),
        'chat-model-reasoning': wrapLanguageModel({
          model: groq('deepseek-r1-distill-llama-70b'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': isOpenAI
          ? openaiProvider.chatModel('gpt-4o')
          : xai('grok-2-1212'),
        'artifact-model': isOpenAI
          ? openaiProvider.chatModel('gpt-4o')
          : xai('grok-2-1212'),
      },
      imageModels: {
        'small-model': isOpenAI
          ? openaiProvider.imageModel('dall-e-3')
          : xai.image('grok-2-image'),
      },
    });
