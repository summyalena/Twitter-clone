/// <reference types="react" />
import { Theme } from "../..";
import { InternalProvider } from "../../lib/types";
export interface SignInServerPageParams {
    csrfToken: string;
    providers: InternalProvider[];
    callbackUrl: string;
    email: string;
    error: string;
    theme: Theme;
}
export default function SigninPage(props: SignInServerPageParams): JSX.Element;
