import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (credentials?.username === "winnie" && credentials?.password === "winnie") {
              // integration temporaire faute de temps :/
            return {
              id: "1",
              name: "Winnie l'ourson",
              email: "winnie@sws-corp.tech",
            };
          }
          return null;
        }
      })
    ],
    pages: {
      signIn: "/auth/signin",
    },
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,  
    },
    callbacks: {
      async session({ session, token }) {
        if (session.user) {
          //session.user.id = token.sub as string;
        }
        return session;
      },
    },
  };