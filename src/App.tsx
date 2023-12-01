import { Routes, Route } from "react-router-dom";
import { BooksView, Kindle, ClippingsView, NotFound } from "./pages/index";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kindle" element={<Kindle />} />
        <Route path="/books" element={<BooksView />} />
        <Route path="/books/:id" element={<ClippingsView />} />
      </Routes>
    </Layout>
  );
}
// <Route path="/*" element={<NotFound />} />

export default App;
// <div className="flex flex-col items-center justify-center">
//   <div>hello</div>
//   <input onChange={handleFileChange} type="file" />
//   {array.map((t: string) => {
//     return <div>{t}</div>;
//   })}
// </div>
