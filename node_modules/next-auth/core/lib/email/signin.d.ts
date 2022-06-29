import { InternalOptions } from "../../../lib/types";
/**
 * Starts an e-mail login flow, by generating a token,
 * and sending it to the user's e-mail (with the help of a DB adapter)
 */
export default function email(identifier: string, options: InternalOptions<"email">): Promise<void>;
