import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { email: string; name: string; isAdmin: boolean; userId: string } & DefaultSession["user"];
    sessionToken?: string;
    expires: string;
  }

  interface User {
    id: string;
    name: string | null;
    email: string;
    isAdmin: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}
