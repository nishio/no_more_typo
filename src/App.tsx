import React, { ChangeEvent, MouseEvent, useEffect, Fragment } from 'react';
import './App.css';
import { keydownListener, clearContents } from './main';
import { useGlobal, setGlobal } from 'reactn';
import { INITIAL_STATE, TState, preset_tests } from './INITIAL_STATE';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components'
import { HashRouter, useParams } from 'react-router-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

setGlobal(INITIAL_STATE);

const PresetLinks = () => {
  const preset_links = Array.from(preset_tests.entries()).map(
    ([key, value]: [string, any]) => <li key={key}>
      <Link to={key}>{value.title}</Link>
    </li>
  );
  return <Fragment>{preset_links}</Fragment>;
  // <TextareaAutosize>{tests}</TextareaAutosize> <br />
  // <button onClick={load}>load</button>
}

let totalTest = 0;
const GamePane = () => {
  const [kanaBuffer] = useGlobal("kanaBuffer");
  const [copyText, setCopyText] = useGlobal("copyText");
  const [romaBuffer] = useGlobal("romaBuffer");
  const [romaCount] = useGlobal("romaCount");
  const [kanaCount] = useGlobal("kanaCount");
  const [errorCount] = useGlobal("errorCount");
  const [phase] = useGlobal("phase");
  const [test_id] = useGlobal("test_id");
  const [tests] = useGlobal("tests");
  const [errorLog] = useGlobal("errorLog");
  let { preset_id } = useParams();
  let message = "";
  if (phase === "FAIL") {
    message = "Press [Enter] to restart"
  }
  if (phase === "SUCCESS") {
    message = "Press [Enter] to next test"
  }
  if (phase === "START") {
    message = "Press [Enter] to start"
    if (tests !== "" && copyText === "") {
      setCopyText(tests.split("\n")[0])
    }
  }
  if (phase === "FINISHED") {
    if (errorCount > 0) {
      message = "Finished!!"
    } else {
      message = "Perfect!!"
    }
  }

  useEffect(() => {
    const preset = preset_tests.get(preset_id!);
    if (preset !== undefined) {
      console.log(tests, preset.data)
      totalTest = preset.data.split("\n").length;
      setGlobal({
        tests: preset.data,
        useKana: preset.kana,
      });
    }
  }, [preset_id])

  return (<div className="game-pane">
    <p>{message}</p>
    <LargeP>{copyText}</LargeP>
    <LargeP>{kanaBuffer}{romaBuffer}</LargeP>
    <p>
      <input type="text" onKeyDown={keydownListener} onChange={clearContents}></input>

    </p>
    <hr></hr>
    <p>errorCount: {errorCount}</p>
    <p>kanaCount: {kanaCount}</p>
    <p>romaCount: {romaCount}</p>
    <p>test id: {test_id + 1} / {totalTest}</p>
    <p>preset id: {preset_id}</p>
    <hr></hr>
    <p>Error Log:</p>
    {errorLog.map((x) => <p>
      {x}
    </p>)}
  </div>);
}


const App: React.FC = () => {
  return (
    <HashRouter hashType="noslash">
      <div className="App">
        <h3>No More Typo</h3>
        <Switch>
          <Route path="/:preset_id" children={<GamePane />} />
        </Switch>

        <hr></hr>
        <PresetLinks></PresetLinks>
      </div>

    </HashRouter>

  );
}
const LargeP = styled.p`
  font-size: 200%;
`

const load = (e: any) => {
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

export default App;
