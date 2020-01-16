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
  tests: "",
  errorLog: [] as string[]
};
export type TState = typeof INITIAL_STATE;


export const preset_tests = new Map([
  ["1", {
    data: "はな\nいぬ\nねこ",
    title: "tinyセット"
  }],
  ["2", {
    data: "はな\nつよい\nいぬ\nねこ\nばたー\nこうちゃ\nれもんてぃー\nかすたーどけーき\nわえい\nのずる\nさざめき\nへいせい\nぴぺっと\nぱぶりっく\nこみゅにけーしょん\nそふとうぇあ\nふぉーまっと\nぷろぐらみんぐ\nおやゆびしふと\nほーむぽじしょん",
    title: "全文字セット"
  }],
  ["3", {
    data: "んなんにんにゃん",
    title: "「ん」のテスト"
  }],
  ["4", {
    data: "はな\nつよい\nいぬ\nねこ\nばたー\nこうちゃ\nれもんてぃー\nかすたーどけーき\nわえい\nのずる\nさざめき\nへいせい\nぴぺっと\nぱぶりっく\nこみゅにけーしょん\nそふとうぇあ\nふぉーまっと\nぷろぐらみんぐ\nおやゆびしふと\nほーむぽじしょん\nしゔぁしん\nひんどぅー",
    title: "全文字セット(ゔ)"
  }],
])


declare module 'reactn/default' {
  export interface State extends TState { }
}
