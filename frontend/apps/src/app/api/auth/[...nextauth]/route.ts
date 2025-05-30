import { authConfig } from '../../../auth.config';
import NextAuth from 'next-auth';

export const dynamic = 'force-dynamic';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };