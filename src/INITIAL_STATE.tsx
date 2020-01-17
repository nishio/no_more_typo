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
  errorLog: [] as string[],
  useKana: false,
  startTime: Date.now(),
};
export type TState = typeof INITIAL_STATE;


export const preset_tests = new Map([
  ["1", {
    data: "はな\nいぬ\nねこ",
    title: "tinyセット",
    kana: true,
  }],
  ["2", {
    data: "はな\nつよい\nいぬ\nねこ\nばたー\nこうちゃ\nれもんてぃー\nかすたーどけーき\nわえい\nのずる\nさざめき\nへいせい\nぴぺっと\nぱぶりっく\nこみゅにけーしょん\nそふとうぇあ\nふぉーまっと\nぷろぐらみんぐ\nおやゆびしふと\nほーむぽじしょん",
    title: "全文字セット",
    kana: true,
  }],
  ["3", {
    data: "んなんにんにゃん",
    title: "「ん」のテスト",
    kana: true,
  }],
  ["4", {
    data: "はな\nつよい\nいぬ\nねこ\nばたー\nこうちゃ\nれもんてぃー\nかすたーどけーき\nわえい\nのずる\nさざめき\nへいせい\nぴぺっと\nぱぶりっく\nこみゅにけーしょん\nそふとうぇあ\nふぉーまっと\nぷろぐらみんぐ\nおやゆびしふと\nほーむぽじしょん\nしゔぁしん\nひんどぅー",
    title: "全文字セット(ゔ含む)",
    kana: true,
  }],
  ["5", {
    data: "()\n[]\n{}\n\"\"\n'a'\n()=>{}\n1+2\n3*4\n5-6\n7/8\n``\nconst Key:React.FC=()=>{}\n<div id=\"root\"></div>\nlet dict:{[key:string]:number};\nnpx create-react-app quux --typescript\n	styled(JaBox)<{left:number}>`\nwidth :${ KEYBOX_WIDTH }px\nleft: ${ props => props.left}px\n4&5\n6|7\n8^9\nm%n\nx!=0\nx!==null?a:b\nbaz[1, 2, 3][0]\n@\"'\"  # single quote",
    title: "プログラミング",
    kana: false,
  }],
])


declare module 'reactn/default' {
  export interface State extends TState { }
}
