import 'reactn';

type TPhase = ("START" | "INPUT" | "FAIL" | "SUCCESS" | "FINISHED");
export const INITIAL_STATE = {
  romaBuffer: "",
  kanaBuffer: "",
  romaCount: 0,
  kanaCount: 0,
  errorCount: 0,
  copyText: "",
  phase: "START" as TPhase,
  test_id: 0,
  //  tests: "んなんにん\nうしてけせはときいん\nとうきょう\nうちゅう\nけしてする\nせんとう\nはと\nとっきゅう",
  tests: "とうきょう\nうちゅう\nけして\nする",
};
export type TState = typeof INITIAL_STATE;

declare module 'reactn/default' {
  export interface State extends TState { }
}
