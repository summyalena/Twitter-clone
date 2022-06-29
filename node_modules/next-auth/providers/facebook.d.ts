import { Profile } from "..";
import { OAuthConfig, OAuthUserConfig } from "./oauth";
export interface FacebookProfile extends Profile {
    id: string;
    picture: {
        data: {
            url: string;
        };
    };
}
export default function Facebook<P extends Record<string, any> = FacebookProfile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
