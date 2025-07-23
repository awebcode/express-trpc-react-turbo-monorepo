// packages/config/utils.ts
export const isBrowser = typeof window !== "undefined";

// @ts-ignore
export const env = isBrowser ? import.meta.env : process.env;

const getEnvRaw = (): Record<string, string | undefined> => {
  // @ts-ignore
  return isBrowser ? import.meta.env : process.env;
};

export const getEnvVar = (key: string): string | undefined => {
  const env = getEnvRaw();
  return env[`APP_${key}`] || env[key];
};
