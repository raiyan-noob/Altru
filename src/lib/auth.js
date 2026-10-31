import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const uri =
  process.env.MONGODB_URI ||
  "mongodb://Paharika:dFQLY6dIqtc7yh2f@ac-zgr00ce-shard-00-00.hffrouf.mongodb.net:27017,ac-zgr00ce-shard-00-01.hffrouf.mongodb.net:27017,ac-zgr00ce-shard-00-02.hffrouf.mongodb.net:27017/altru_db?ssl=true&replicaSet=atlas-97vqqn-shard-0&authSource=admin";

let client;
try {
  client = new MongoClient(uri);
} catch (e) {
  console.warn("MongoDB client initialization:", e);
}

const db = client ? client.db("altru_db") : null;

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "altru_social_development_platform_secret_jwt_token_2026_key",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "altru-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "altru-google-secret",
      enabled: true,
    },
  },
  plugins: [
    jwt({
      definePayload: ({ user }) => ({
        id: user.id || user._id,
        email: user.email,
        name: user.name,
        photoURL: user.image || user.photoURL,
      }),
    }),
  ],
});
