import React, { Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { setGlobal } from 'reactn';

const CreateTests = () => {
  return <Fragment>
    <TextareaAutosize></TextareaAutosize> <br />
    <button onClick={load}>load</button>
  </Fragment>;
};

export const load = (e: any) => {
  const tests = document.getElementsByTagName("textarea")[0].value;
  console.log(tests);
  setGlobal({
    romaBuffer: "",
    kanaBuffer: "",
    romaCount: 0,
    kanaCount: 0,
    errorCount: 0,
    copyText: "",
    phase: "START",
    test_id: 0,
    tests: tests,
  });

}
