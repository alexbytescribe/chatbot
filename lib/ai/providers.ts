import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

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
          ? openai.chat('gpt-4o')
          : xai('grok-2-vision-1212'),
        'chat-model-reasoning': isOpenAI
          ? openai.chat('gpt-4.1')
          : wrapLanguageModel({
              model: xai('grok-3-mini-beta'),
              middleware: extractReasoningMiddleware({ tagName: 'think' }),
            }),
        'title-model': isOpenAI
          ? openai.chat('gpt-4.1-mini')
          : xai('grok-2-1212'),
        'artifact-model': isOpenAI
          ? openai.chat('gpt-4.1-nano')
          : xai('grok-2-1212'),
      },
      imageModels: {
        'small-model': isOpenAI
          ? openai.image('dall-e-3')
          : xai.image('grok-2-image'),
      },
    });
