import { db } from '@/db';
import { contactMessages } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: unknown; email?: unknown; message?: unknown };
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : '';
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) return Response.json({ error: 'Please enter your name, a valid email and a message of at least 10 characters.' }, { status: 400 });
    await db.insert(contactMessages).values({ name, email, message });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'We could not send your message just now. Please try again.' }, { status: 500 });
  }
}
