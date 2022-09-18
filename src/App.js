import { Suspense, useEffect } from 'react'
import { useRoutes } from "react-router-dom";
import PubSub from 'pubsub-js'
import './App.css';
import route from "router/index";

function App() {
  const element = useRoutes(route)
  useEffect(() => {
    PubSub.subscribe('clickItem', () => {
      document.getElementById('globalAudio').play()
    })
  }, [])

  return (
    <div className="App">
      <audio id='globalAudio' preload="auto" src={require('assets/audios/click.mp3')}></audio>
      <Suspense fallback=''>
        { element }
      </Suspense>
    </div>
  );
}

export default App;
