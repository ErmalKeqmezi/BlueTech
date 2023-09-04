import { createStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/contact/counterReducer";

export function configureStore() {
    return createStore(counterReducer);
}