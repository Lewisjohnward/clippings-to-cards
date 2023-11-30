import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BooksView, Kindle, ClippingsView, NotFound } from "./pages/index";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import Books from "./types/Books";

function App() {
  const [books, setBooks] = useState<Books[]>([]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kindle" element={<Kindle setBooks={setBooks} />} />
        <Route path="/books" element={<BooksView books={books} />} />
        <Route path="/books/:id" element={<ClippingsView books={books} />} />
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
