import { Routes, Route } from "react-router-dom";
import { BooksView, ClippingsView, Upload, NotFound } from "@/pages/index";
import { LandingPage } from "@/pages/LandingPage";
import { Layout } from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { About } from "./components/About";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/books" element={<BooksView />} />
          <Route path="/books/:bookName/*" element={<ClippingsView />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Modal />
    </>
  );
}

export default App;
