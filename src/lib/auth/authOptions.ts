import { myPrisma } from "@/lib/db/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(myPrisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent", //It forces Google to show the consent popup every time,even if you're already signed into Google
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger , session }) {
      if (trigger === "update" && session.isProfileSetupDone !== undefined) {
        token.isProfileSetupDone = session.isProfileSetupDone;
        return token;
      }

      if (user) token.id = user.id;

      const dbUser = await myPrisma.user.findUnique({
        where: { id: token.id as string },
      });
      if (dbUser) {
        token.isProfileSetupDone = dbUser.isProfileSetupDone ?? false;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;
      if (session.user && token.isProfileSetupDone !== undefined)
        session.user.isProfileSetupDone = token.isProfileSetupDone as boolean;
      return session;
    },
  },
};
