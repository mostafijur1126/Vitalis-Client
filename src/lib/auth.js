import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt, admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

const adminPlugin = admin();
if (adminPlugin.schema?.user?.fields?.role) {
  adminPlugin.schema.user.fields.role = {
    ...adminPlugin.schema.user.fields.role,
    input: true,
    defaultValue: "member",
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30,
    },
  },
  plugins: [jwt(), adminPlugin],
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "member",
        input: true,
      },
      plan: {
        defaultValue: "free",
        input: true,
      },
      status: {
        defaultValue: "active",
        input: true,
      },
    },
  },
});
