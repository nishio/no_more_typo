import { KeyboardEvent } from 'react';
import { ACCEPTABLE_STATES } from './ACCEPTABLE_STATES';
import { ROMA_TO_KANA } from './ROMA_TO_KANA';
import { getGlobal, setGlobal } from 'reactn';
import { TState } from './INITIAL_STATE';

export const keydownListener = (e: KeyboardEvent) => {
  const global = getGlobal<TState>()
  let romaBuffer = global.romaBuffer;

  if (e.key === "Enter") {
    setGlobal({
      romaBuffer: "",
      kanaBuffer: ""
    })
    return;
  }

  romaBuffer += e.key;
  const kana = ROMA_TO_KANA[romaBuffer];
  if (kana !== undefined) {
    (e.target as HTMLInputElement).value = "";
    e.preventDefault();
    romaBuffer = "";
    setGlobal({ romaBuffer: "" });
    kanaListener(kana);
    return;
  }

  // 「ん」の扱い
  if (romaBuffer.length === 2 &&
    romaBuffer[0] === "n" &&
    !("aeiouy".includes(romaBuffer[1]))) {
    kanaListener("ん");
    setGlobal({ romaBuffer: romaBuffer[1] });
    return;
  }

  if (!ACCEPTABLE_STATES.includes(romaBuffer)) {
    console.log("error!", romaBuffer, "not acceptable")
    setGlobal({ romaBuffer: romaBuffer + "☹" })

  }
  setGlobal({ romaBuffer: romaBuffer })
};

const kanaListener = (kana: string) => {
  const global = getGlobal<TState>()
  let kanaBuffer = global.kanaBuffer;
  const copyText = global.copyText;
  console.log(kana);
  kanaBuffer += kana;
  if (copyText.startsWith(kanaBuffer)) {
    // OK
    setGlobal({ kanaBuffer: kanaBuffer })
  } else {
    console.log("error!", kanaBuffer, "not acceptable")
    setGlobal({ kanaBuffer: kanaBuffer + "☹" })

  }
}