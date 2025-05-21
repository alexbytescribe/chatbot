import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        xai: chatModel,
        '4o': chatModel,
        '4.1': chatModel,
        '4.1-mini': titleModel,
        '4.1-nano': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        xai: xai('grok-2-1212'),
        '4o': openai.chat('gpt-4o'),
        '4.1': openai.chat('gpt-4.1'),
        '4.1-mini': openai.chat('gpt-4.1-mini'),
        '4.1-nano': openai.chat('gpt-4.1-nano'),
      },
      imageModels: {
        'small-model': openai.image('dall-e-3'),
      },
    });
