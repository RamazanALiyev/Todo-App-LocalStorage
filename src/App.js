import Bgimage from "./components/Bgimage/Bgimage";
import Todos from "./components/Todos/Todos";
import "./main.scss";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Bgimage />
      <Todos />
    </div>
  );
}

export default App;
