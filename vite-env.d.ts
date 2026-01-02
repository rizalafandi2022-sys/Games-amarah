// Fix: Removed vite/client reference as it was causing errors
// Fix: Removed process declaration to avoid conflict with existing global definition

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
