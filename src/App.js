import './App.css';
import { Connect } from './components/Connect';
import { Game } from './components/Game';

function App() {
  return (
    <div className="App">
            <header className="App-header">

      <Game></Game>
      <Connect></Connect>
      </header>

    </div>
  );
}

export default App;
