import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Details } from "./pages/Details";
import { Register } from "./pages/Register";

export function App() {
  return (
    <section className="max-w-full flex justify-center items-center pt-40">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Details />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}
