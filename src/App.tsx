import React from 'react';
import './App.css';
import { keydownListener } from './main';
import { useGlobal, setGlobal } from 'reactn';
import { INITIAL_STATE, TState } from './INITIAL_STATE';

setGlobal(INITIAL_STATE);

const App: React.FC = () => {
  const [kanaBuffer] = useGlobal<TState>("kanaBuffer");
  return (
    <div className="App">
      <p>>うしてけせはときいん</p>
      <p>>{kanaBuffer}</p>
      <p>
        <input type="text" onKeyDown={keydownListener}></input>

      </p>
    </div>
  );
}

export default App;
