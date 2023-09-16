import "./App.css";
import Leaderboard from "./components/Leaderboard";
import streamers from "./data/streamer";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">Leaderboard</h1>
      <Leaderboard Streamers={streamers} />
    </div>
  );
}

export default App;
