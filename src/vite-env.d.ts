/// <reference types="vite/client" />

declare module '*.md' {
  const attributes: Record<string, unknown>;
  const markdown: string;
  const html: string;
  export { attributes, markdown, html };
}
