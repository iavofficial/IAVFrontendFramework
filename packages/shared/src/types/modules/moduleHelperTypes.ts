import type {TypedUseSelectorHook} from "react-redux";
import type {Action, ThunkDispatch} from "@reduxjs/toolkit";
import type {RootState} from "./moduleOrchestrationTypes";

type GeneralFunction = (...args: any) => any;

/**
 * Use this hook for correct typing with redux selectors.
 *  */
export type TypedSelectorHook<S extends GeneralFunction> = TypedUseSelectorHook<
  RootState<S>
>;

/** Use this hook for correct typing with redux dispatches. */
export type TypedDispatchHook<S extends GeneralFunction> = ThunkDispatch<
  ReturnType<S>,
  unknown,
  Action<string>
>;
