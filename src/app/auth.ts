import NextAuth, { User } from "next-auth";
//import { PrismaAdapter } from "@auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "../../prisma/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });

        if (!user || !(await bcrypt.compare(String(credentials.password), user.password!))) {
          return null;
        }
        if (user.isBlock) {
          return null;
        }

        const authorizedUser: User = {
          id: user.id,
          email: user.email,
          name: user?.name,
          isAdmin: user.isAdmin,
        };

        return authorizedUser;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;

        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { isAdmin: true },
        });
        if (dbUser) {
          token.isAdmin = dbUser.isAdmin ? true : false;
        }
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (token?.isAdmin) {
        return {
          ...session,
          user: {
            ...session.user,
            isAdmin: Boolean(token.isAdmin),
            userId: token.id,
          },
        };
      } else {
        return {
          ...session,
          user: {
            ...session.user,
            userId: token.id,
          },
        };
      }
    },
  },
});
