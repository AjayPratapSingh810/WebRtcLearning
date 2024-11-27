import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Sender } from "./components/Sender.tsx";
import { Receiver } from "./components/Reciever.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sender" element={<Sender />} />
          <Route path="/receiver" element={<Receiver />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
