import { Basket } from "./baskst";

export interface User {
    username?: string;
    email: string;
    token: string;
    basket?: Basket
}