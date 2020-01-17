import { KeyboardEvent, ChangeEvent } from 'react';
import { ACCEPTABLE_STATES } from './ACCEPTABLE_STATES';
import { ROMA_TO_KANA } from './ROMA_TO_KANA';
import { getGlobal, setGlobal } from 'reactn';
import { TState } from './INITIAL_STATE';

export const clearContents = (e: ChangeEvent | KeyboardEvent) => {
  (e.target as HTMLInputElement).value = "";
}


export const keydownListener = (e: KeyboardEvent) => {
  const global = getGlobal<TState>()
  let romaBuffer = global.romaBuffer;
  clearContents(e);
  e.preventDefault();
  console.log(e);

  if (e.key === "Enter" || (e.ctrlKey === true && e.key === "m")) {
    setGlobal({
      romaBuffer: "",
      kanaBuffer: "",
      phase: "INPUT",
    })
    if (global.phase === "START" || global.phase === "SUCCESS") {
      const tests = global.tests.split("\n");
      if (tests.length === global.test_id) {
        setGlobal({
          copyText: "",
          phase: "FINISHED",
        })
      } else {
        setGlobal({
          copyText: tests[global.test_id]
        })
      }
    }
    return;
  }

  if (global.phase !== "INPUT") {
    return;
  }

  if (!global.useKana) {
    if (e.key === "Shift") return;
    kanaListener(e.key);
    return;
  }

  romaBuffer += e.key;
  const kana = ROMA_TO_KANA[romaBuffer];
  if (kana !== undefined) {
    romaBuffer = "";
    setGlobal({
      romaBuffer: "",
      romaCount: global.romaCount + 1
    });
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
    setGlobal({
      romaBuffer: romaBuffer + "☹",
      phase: "FAIL",
      errorCount: global.errorCount + 1,
      errorLog: global.errorLog.concat([`${global.copyText}: ${global.kanaBuffer}${romaBuffer}`])
    })
    return;
  }
  setGlobal({
    romaBuffer: romaBuffer,
    romaCount: global.romaCount + 1
  })
};

const kanaListener = (kana: string) => {
  const global = getGlobal<TState>()
  let kanaBuffer = global.kanaBuffer;
  const copyText = global.copyText;
  console.log(kana);
  kanaBuffer += kana;
  if (copyText.startsWith(kanaBuffer)) {
    // OK
    setGlobal({
      kanaBuffer: kanaBuffer,
      kanaCount: global.kanaCount + 1
    });
    if (copyText === kanaBuffer) {
      setGlobal({
        phase: "SUCCESS",
        test_id: global.test_id + 1,
      });
    }
  } else {
    console.log("error!", kanaBuffer, "not acceptable")
    setGlobal({
      kanaBuffer: kanaBuffer + "☹",
      phase: "FAIL",
      errorCount: global.errorCount + 1,
      errorLog: global.errorLog.concat([`${global.copyText}: ${kanaBuffer}`])
    })

  }
}