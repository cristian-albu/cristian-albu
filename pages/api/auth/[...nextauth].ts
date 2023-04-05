import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET!,
  callbacks: {
    async signIn({ user }: any) {
      const isAllowedToSignIn = user.email === process.env.ALLOWED_USERS;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};
export default NextAuth(authOptions);
