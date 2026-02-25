import { NextRequest, NextResponse } from 'next/server';
import { Keypair } from '@stellar/stellar-sdk';
import { getAndClearNonce } from '@/lib/auth-cache';
<<<<<<< HEAD
import {
  createSession,
  getSessionCookieHeader,
} from '@/lib/session';

export const dynamic = 'force-dynamic';

/**
 * Wallet-based auth flow:
 * 1. Frontend: user connects wallet (e.g. Freighter), gets address.
 * 2. Frontend: GET /api/auth/nonce?address={address} to get a random nonce.
 * 3. Frontend: sign the hex nonce with wallet, encode as base64.
 * 4. Frontend: POST /api/auth/login with { address, signature }.
 * 5. Backend: verify signature with Keypair; create encrypted session cookie.
 */
export async function POST(request: NextRequest) {
=======

export async function POST(request: Request) {
>>>>>>> ca390a2c4af7fe8c1e6febe454cd3d1f5ef6c9b3
  try {
    const body = await request.json();
    const { address, signature } = body;

    if (!address || !signature) {
      return NextResponse.json(
        { error: 'Address and signature are required' },
        { status: 400 }
      );
    }

<<<<<<< HEAD
    // Retrieve and clear nonce
=======
    // Retrieve and clear nonce — returns null if missing or expired
>>>>>>> ca390a2c4af7fe8c1e6febe454cd3d1f5ef6c9b3
    const nonce = getAndClearNonce(address);
    if (!nonce) {
      return NextResponse.json(
        { error: 'Nonce expired or missing. Please request a new nonce.' },
        { status: 401 }
      );
    }

    // Verify signature
    try {
      const keypair = Keypair.fromPublicKey(address);
<<<<<<< HEAD
      // Nonce is stored as hex string. Message to verify must match.
=======
      // Nonce is stored as hex string; signature is base64 from the client.
>>>>>>> ca390a2c4af7fe8c1e6febe454cd3d1f5ef6c9b3
      const isValid = keypair.verify(
        Buffer.from(nonce, 'hex'),
        Buffer.from(signature, 'base64')
      );

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
<<<<<<< HEAD
    } catch (verifError) {
      console.error('Verification error:', verifError);
=======
    } catch {
>>>>>>> ca390a2c4af7fe8c1e6febe454cd3d1f5ef6c9b3
      return NextResponse.json(
        { error: 'Signature verification failed' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, token: 'mock-session-token' });
    response.cookies.set('session', 'mock-session-cookie', { httpOnly: true, path: '/' });
    return response;

<<<<<<< HEAD
    return new Response(
      JSON.stringify({ success: true, address }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookieHeader,
        },
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
=======
  } catch {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
>>>>>>> ca390a2c4af7fe8c1e6febe454cd3d1f5ef6c9b3
