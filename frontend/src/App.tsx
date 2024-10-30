import { Routes, Route } from "react-router-dom";
import Routers from "./routers/Routers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center"/>
      <Routes>
        <Route path="*" element={<Routers />} />
      </Routes>
    </>
  );
}

export default App;
