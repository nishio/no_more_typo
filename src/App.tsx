import React, { Fragment, useEffect } from 'react';
import { HashRouter, Link, Route, Switch, useParams } from 'react-router-dom';
import { getGlobal, setGlobal, useGlobal } from 'reactn';
import styled from 'styled-components';
import './App.css';
import { INITIAL_STATE, preset_tests, TState } from './INITIAL_STATE';
import { clearContents, keydownListener } from './main';

setGlobal(INITIAL_STATE);

const PresetLinks = () => {
  const preset_links = Array.from(preset_tests.entries()).map(
    ([key, value]: [string, any]) => <li key={key}>
      <Link to={key}>{value.title}</Link>
    </li>
  );
  return <Fragment>{preset_links}</Fragment>;
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
  const global = getGlobal<TState>()

  let message = "";
  if (phase === "FAIL") {
    message = "Press [Enter] to restart"
  }
  if (phase === "SUCCESS") {
    message = "Press [Enter] to next test"
  }
  if (phase === "START") {
    message = "Press [Enter] to start"
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
        phase: "START",
        tests: preset.data,
        useKana: preset.kana,
        testTitle: preset.title,
      });
    }
  }, [preset_id])

  useEffect(() => {
    if (phase === "START") {
      setCopyText(tests.split("\n")[0])
    }
  }, [tests])

  return (<div className="game-pane">
    <p>{message}</p>
    <LargeP>{copyText}</LargeP>
    <LargeP>{kanaBuffer}{romaBuffer}</LargeP>
    <p>
      <input type="text" onKeyDown={keydownListener} onChange={clearContents}></input>

    </p>
    <hr></hr>
    <p>{global.testTitle}</p>
    <p>errorCount: {errorCount}</p>
    {phase === "FINISHED" && errorCount === 0 ? <p>Time: {(Date.now() - global.startTime) / 1000} sec</p> : ""}
    <p>kanaCount: {kanaCount}</p>
    <p>romaCount: {romaCount}</p>
    {phase !== "FINISHED" ? <p>test id: {test_id + 1} / {totalTest}</p> : ""}
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


export default App;
