import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

// node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"