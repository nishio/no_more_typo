import React, { KeyboardEvent } from 'react';
import { ACCEPTABLE_STATES } from './ACCEPTABLE_STATES';
import { ROMA_TO_KANA } from './ROMA_TO_KANA';
import { useGlobal, getGlobal, setGlobal } from 'reactn';
import { TState } from './INITIAL_STATE';

let romaBuffer: string = "";
export const keydownListener = (e: KeyboardEvent) => {
  romaBuffer += e.key;
  console.log(romaBuffer)
  const kana = ROMA_TO_KANA[romaBuffer];
  if (kana !== undefined) {
    (e.target as HTMLInputElement).value = "";
    e.preventDefault();
    romaBuffer = "";
    kanaListener(kana);
    return false;
  }
  if (!ACCEPTABLE_STATES.includes(romaBuffer)) {
    console.log("error!")
  }
  //"☺"
};

const kanaListener = (kana: string) => {
  const kanaBuffer = getGlobal<TState>().kanaBuffer;
  setGlobal({ kanaBuffer: kanaBuffer + kana },
    (global) => {
      if ("うしてけせはときいん".startsWith(global.kanaBuffer)) {
        // OK
      } else {
        console.log("error!")
        setGlobal({ kanaBuffer: kanaBuffer + "☹" })
      }
    }
  );

}