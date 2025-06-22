import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LeftBlock from "./components/LeftBlock.tsx";
import RightBlock from "./components/RightBlock.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));

function App() {
  return (
    <>
      <LeftBlock />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <RightBlock />
    </>
  );
}

export default App;
