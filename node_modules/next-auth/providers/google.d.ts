import { OAuthConfig, OAuthUserConfig } from "./oauth";
export interface GoogleProfile {
    sub: string;
    name: string;
    email: string;
    picture: string;
}
export default function Google<P extends Record<string, any> = GoogleProfile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
