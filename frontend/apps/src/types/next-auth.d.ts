import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in User type
   */
  interface User {
    id: string;
    accessToken?: string; // Optional since it's added after login
  }

  /**
   * Extends the built-in Session type
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken?: string; // Optional to match the User type
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT type
   */
  interface JWT {
    accessToken?: string;
    sub: string; // user id
    email?: string; // Optional as not all providers may have email
  }
}