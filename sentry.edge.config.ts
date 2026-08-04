// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isSentryEnabled = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://7b81801e405f8f510a68b65f68ea3c9a@o4510443840208896.ingest.us.sentry.io/4510443841257472",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: isSentryEnabled ? 1 : 0,

  // Enable logs to be sent to Sentry
  enabled: isSentryEnabled,
  enableLogs: isSentryEnabled,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: isSentryEnabled,
});
