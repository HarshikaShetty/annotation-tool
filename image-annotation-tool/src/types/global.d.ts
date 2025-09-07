// Make this file a module so TS includes it
export {};

// Example: declare global interfaces
declare global {
  interface IImage {
    id: string;
    src: string;
    name: string;
    annotations?: unknown[];
  }
}
