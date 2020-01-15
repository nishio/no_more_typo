import React, { ChangeEvent } from 'react';
import './App.css';
import { keydownListener, clearContents } from './main';
import { useGlobal, setGlobal } from 'reactn';
import { INITIAL_STATE, TState } from './INITIAL_STATE';
import TextareaAutosize from 'react-textarea-autosize';

setGlobal(INITIAL_STATE);

const App: React.FC = () => {
  const [kanaBuffer] = useGlobal("kanaBuffer");
  const [copyText, setCopyText] = useGlobal("copyText");
  const [romaBuffer] = useGlobal("romaBuffer");
  const [romaCount] = useGlobal("romaCount");
  const [kanaCount] = useGlobal("kanaCount");
  const [errorCount] = useGlobal("errorCount");
  const [phase] = useGlobal("phase");
  const [test_id] = useGlobal("test_id");
  const [tests] = useGlobal("tests");

  let message = "";
  if (phase === "FAIL") {
    message = "Press [Enter] to restart"
  }
  if (phase === "SUCCESS") {
    message = "Press [Enter] to next test"
  }
  if (phase === "START") {
    message = "Press [Enter] to start"
    if (copyText === "") {
      setCopyText(tests.split("\n")[0])
    }
  }
  if (phase === "FINISHED") {
    message = "Finished!!"
  }

  return (
    <div className="App">
      <p>>{copyText}</p>
      <p>>{kanaBuffer}{romaBuffer}</p>
      <p>
        <input type="text" onKeyDown={keydownListener} onChange={clearContents}></input>

      </p>
      <hr></hr>
      <p>{message}</p>
      <p>errorCount: {errorCount}</p>
      <p>kanaCount: {kanaCount}</p>
      <p>romaCount: {romaCount}</p>
      <p>test: {test_id}</p>
      <TextareaAutosize>{tests}</TextareaAutosize>
    </div>
  );
}

export default App;
