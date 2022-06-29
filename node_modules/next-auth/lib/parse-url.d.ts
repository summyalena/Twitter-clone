export interface InternalUrl {
    /** @default "http://localhost:3000" */
    origin: string;
    /** @default "localhost:3000" */
    host: string;
    /** @default "/api/auth" */
    path: string;
    /** @default "http://localhost:3000/api/auth" */
    base: string;
    /** @default "http://localhost:3000/api/auth" */
    toString: () => string;
}
export default function parseUrl(url?: string): InternalUrl;
