import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';



export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        xai: chatModel,
        '4o': chatModel,
        '4.1': reasoningModel,
        '4.1-mini': chatModel,
        '4.1-nano': chatModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        xai: xai('grok-2-vision-1212'),
        '4o': openai.chat('gpt-4o'),
        '4.1': openai.chat('gpt-4.1'),
        '4.1-mini': openai.chat('gpt-4.1-mini'),
        '4.1-nano': openai.chat('gpt-4.1-nano'),
        'title-model': xai('grok-2-1212'),
        'artifact-model': xai('grok-2-1212'),
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
