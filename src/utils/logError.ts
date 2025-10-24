export function logError(context: string, error: unknown) {
  if (process.env.NODE_ENV === "development") {
    // 👨‍💻 In development: show full error for debugging
    console.error(`❌ ${context}:`, error);
  } else {
    // 🚀 In production: hide sensitive details
    if (error instanceof Error) {
      console.error(`❌ ${context}: ${error.message}`);
    } else {
      console.error(`❌ ${context}: Unknown error`);
    }
  }
}
