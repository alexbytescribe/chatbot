import { cookies } from 'next/headers';
import { auth } from '../(auth)/auth';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  const id = generateUUID();

  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const modelIdFromCookie = cookieStore.get('chat-model');
  const isAuthenticated = !!session?.user;

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          selectedChatModel={DEFAULT_CHAT_MODEL}
          isReadonly={false}
          isAuthenticated={isAuthenticated}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedChatModel={modelIdFromCookie.value}
        isReadonly={false}
        isAuthenticated={isAuthenticated}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
