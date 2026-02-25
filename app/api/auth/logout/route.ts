import { clearSessionCookie } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST() {
  const cookieHeader = clearSessionCookie();
  return new Response(JSON.stringify({ ok: true, message: 'Logged out successfully' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieHeader,
    },
  });
}
