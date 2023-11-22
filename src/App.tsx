import { ChangeEvent, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Books, Clippings, Kindle, NotFound } from "./pages/index";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { dummyData } from "./misc/dummyData";

function App() {
  // const [file, setFile] = useState<File>();
  // const [text, setText] = useState<string>("");
  const [array, setArray] = useState<string[]>([""]);
  const [clippings, setClipping_] = useState(dummyData);
  console.log(clippings);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const convertToText = async () => {
      if (!file) return;
      const text = await file.text();
      const _array = text.split("\r\n");
      console.log(text.split("\r\n"));
      setArray(_array);
    };
    convertToText();
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kindle" element={<Kindle />} />
        <Route path="/books" element={<Books clippings={clippings} />} />
        <Route
          path="/clippings/:id"
          element={<Clippings clippings={clippings} />}
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
