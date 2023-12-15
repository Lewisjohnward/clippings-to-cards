import { Routes, Route } from "react-router-dom";
import { BooksView, ClippingsView, Upload, NotFound } from "./pages/index";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/books" element={<BooksView />} />
        <Route path="/books/:id" element={<ClippingsView />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
