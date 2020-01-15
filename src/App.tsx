import React from 'react';
import './App.css';
import { keydownListener } from './main';
import { useGlobal, setGlobal } from 'reactn';
import { INITIAL_STATE, TState } from './INITIAL_STATE';

setGlobal(INITIAL_STATE);

const App: React.FC = () => {
  const [kanaBuffer] = useGlobal<TState>("kanaBuffer");
  const [copyText] = useGlobal<TState>("copyText");
  const [romaBuffer] = useGlobal<TState>("romaBuffer");
  const [romaCount] = useGlobal<TState>("romaCount");
  const [kanaCount] = useGlobal<TState>("kanaCount");
  const message = "";
  return (
    <div className="App">
      <p>>{copyText}</p>
      <p>>{kanaBuffer}</p>
      <p>>{romaBuffer}</p>
      <p>
        <input type="text" onKeyDown={keydownListener}></input>

      </p>
      <p>{message}</p>
      <p>kanaCount: {kanaCount}</p>
      <p>romaCount: {romaCount}</p>
    </div>
  );
}

export default App;
