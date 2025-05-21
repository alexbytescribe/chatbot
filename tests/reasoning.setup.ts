import path from 'path';
import { expect, test as setup } from '@playwright/test';
import { ChatPage } from './pages/chat';

const reasoningFile = path.join(
  __dirname,
  '../playwright/.reasoning/session.json',
);

setup('switch to reasoning model', async ({ page }) => {
  const chatPage = new ChatPage(page);
  await chatPage.createNewChat();

  await chatPage.chooseModelFromSelector('4.1');

  await expect(chatPage.getSelectedModel()).resolves.toEqual('4.1');

  await page.waitForTimeout(1000);
  await page.context().storageState({ path: reasoningFile });
});
