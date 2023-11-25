import { ChangeEvent, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Books, Kindle, ClippingsDisplay, NotFound } from "./pages/index";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { dummyData } from "./misc/dummyData";

function App() {
  const [clippings, setClipping_] = useState(dummyData);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kindle" element={<Kindle />} />
        <Route path="/books" element={<Books clippings={clippings} />} />
        <Route
          path="/clippings/:id"
          element={<ClippingsDisplay clippings={clippings} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
// <div className="flex flex-col items-center justify-center">
//   <div>hello</div>
//   <input onChange={handleFileChange} type="file" />
//   {array.map((t: string) => {
//     return <div>{t}</div>;
//   })}
// </div>
