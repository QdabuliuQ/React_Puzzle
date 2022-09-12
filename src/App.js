import './App.css';
import route from "router/index";
import { useRoutes } from "react-router-dom";

function App() {
  console.log(route);
  const element = useRoutes(route)

  return (
    <div className="App">
      { element }
    </div>
  );
}

export default App;
