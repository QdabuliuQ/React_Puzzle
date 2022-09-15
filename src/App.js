import { Suspense } from 'react'
import { useRoutes } from "react-router-dom";
import './App.css';
import route from "router/index";

function App() {
  const element = useRoutes(route)

  return (
    <div className="App">
      <Suspense fallback=''>
        { element }
      </Suspense>
    </div>
  );
}

export default App;
