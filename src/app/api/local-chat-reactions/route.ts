import { NextRequest, NextResponse } from 'next/server';

type ReactionStore = Record<string, Record<string, string[]>>;

const globalWithReactions = globalThis as typeof globalThis & {
  __tripSyncChatReactions?: ReactionStore;
};

const getStore = () => {
  globalWithReactions.__tripSyncChatReactions ??= {};

  return globalWithReactions.__tripSyncChatReactions;
};

export async function GET(request: NextRequest) {
  const tripId = request.nextUrl.searchParams.get('tripId');

  if (!tripId) {
    return NextResponse.json({ data: {}, message: 'tripId is required', success: false }, { status: 400 });
  }

  return NextResponse.json({
    data: getStore()[tripId] ?? {},
    success: true,
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    emoji?: string;
    messageId?: string;
    tripId?: string;
  } | null;
  const tripId = body?.tripId;
  const messageId = body?.messageId;
  const emoji = body?.emoji;

  if (!tripId || !messageId || !emoji) {
    return NextResponse.json(
      { data: {}, message: 'tripId, messageId, and emoji are required', success: false },
      { status: 400 }
    );
  }

  const store = getStore();
  store[tripId] ??= {};

  const currentReactions = store[tripId][messageId] ?? [];
  store[tripId][messageId] = currentReactions.includes(emoji)
    ? currentReactions.filter((reaction) => reaction !== emoji)
    : [...currentReactions, emoji];

  return NextResponse.json({
    data: store[tripId],
    success: true,
  });
}
