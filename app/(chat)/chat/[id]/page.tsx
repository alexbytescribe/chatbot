import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { Chat } from '@/components/chat';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { DBMessage } from '@/lib/db/schema';
import { Attachment, UIMessage } from 'ai';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const chat = isAuthenticated ? await getChatById({ id }) : null;

  if (isAuthenticated && !chat) {
    notFound();
  }

  if (isAuthenticated && chat && chat.visibility === 'private') {
    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb =
    isAuthenticated && chat ? await getMessagesByChatId({ id }) : [];

  function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage['parts'],
      role: message.role as UIMessage['role'],
      // Note: content will soon be deprecated in @ai-sdk/react
      content: '',
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');
  const readonly = isAuthenticated ? session.user.id !== chat!.userId : false;

  if (!chatModelFromCookie) {
    return (
      <>
        <Chat
          id={id}
          initialMessages={convertToUIMessages(messagesFromDb)}
          selectedChatModel={DEFAULT_CHAT_MODEL}
          isReadonly={readonly}
          isAuthenticated={isAuthenticated}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        id={id}
        initialMessages={convertToUIMessages(messagesFromDb)}
        selectedChatModel={chatModelFromCookie.value}
        isReadonly={readonly}
        isAuthenticated={isAuthenticated}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
