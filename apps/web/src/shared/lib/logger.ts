export const logError = (
  message: string,
  metadata: Record<string, unknown>,
) => {
  if (process.env.NODE_ENV === "development") {
    console.error(message, metadata);
  } else {
    // TODO: log error in Sentry
  }
};
