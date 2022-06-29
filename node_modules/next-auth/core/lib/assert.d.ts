import { MissingAdapter, MissingAPIRoute, MissingAuthorize, MissingSecret, UnsupportedStrategy } from "../errors";
import type { NextAuthHandlerParams } from "..";
import type { WarningCode } from "../../lib/logger";
declare type ConfigError = MissingAPIRoute | MissingSecret | UnsupportedStrategy | MissingAuthorize | MissingAdapter;
/**
 * Verify that the user configured `next-auth` correctly.
 * Good place to mention deprecations as well.
 *
 * REVIEW: Make some of these and corresponding docs less Next.js specific?
 */
export declare function assertConfig(params: NextAuthHandlerParams): ConfigError | WarningCode | undefined;
export {};
