import { auth } from '@/app/(auth)/auth';
import { getChatsByUserId } from '@/lib/db/queries';

export async function GET() {
  const session = await auth();
  const requireAuth = process.env.AUTH_REQUIRED !== 'false';

  if (requireAuth && (!session || !session.user)) {
    return Response.json('Unauthorized!', { status: 401 });
  }

  if (!session?.user?.id) {
    return Response.json([]);
  }

  // biome-ignore lint: Forbidden non-null assertion.
  const chats = await getChatsByUserId({ id: session.user.id! });
  return Response.json(chats);
}
