/// <reference types="react" />
import { Theme } from "../..";
import { InternalUrl } from "../../lib/parse-url";
export interface ErrorProps {
    url?: InternalUrl;
    theme?: Theme;
    error?: string;
}
export declare type ErrorType = "default" | "configuration" | "accessdenied" | "verification";
/** Renders an error page. */
export default function ErrorPage(props: ErrorProps): {
    status: any;
    html: JSX.Element;
};
