import type {TypedUseSelectorHook} from "react-redux";
import type {Action, ThunkDispatch} from "@reduxjs/toolkit";
import type {RootState} from "./moduleOrchestrationTypes";

/** Use this hook for correct typing with redux selectors. */
export type TypedSelectorHook<T extends (...args: any) => any> =
  TypedUseSelectorHook<RootState<T>>;

/** Use this hook for correct typing with redux dispatches. */
export type TypedDispatchHook<T extends (...args: any) => any> = ThunkDispatch<
  RootState<T>,
  unknown,
  Action<string>
>;
