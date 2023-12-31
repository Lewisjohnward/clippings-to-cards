import { Routes, Route, Link } from "react-router-dom";
import { BooksView, ClippingsView, Upload, NotFound } from "@/pages/index";
import { LandingPage } from "@/pages/LandingPage";
import { Layout } from "@/components/Layout";
import { Modal } from "@/components/Modal";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/books" element={<BooksView />} />
          <Route path="/books/:bookName/*" element={<ClippingsView />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
      <div className="px-48 py-10 flex items-around bg-yellow-300">
        <div className="w-1/2 px-48 space-y-4">
          <p>Created by: Lewis Ward</p>
          <p>Copyright 2023</p>
          <p className="font-bold">About</p>
          <p className="whitespace-normal">
            I built Favicon.io because creating a favicon should be a simple
            process. No other favicon generator or favicon creator can make a
            well designed favicon from text. If you like favicon.io or have a
            suggestion feel free to say hello. Feedback is much appreciated!{" "}
          </p>
        </div>
        <div className="w-1/2 px-48 space-y-4">
          <p className="font-bold">Contact</p>
          <Link className="block">Contact Us</Link>
          <Link className="block">Privacy Policy</Link>
          <Link className="block">Terms of Use</Link>
        </div>
      </div>
      <Modal />
    </>
  );
}

export default App;
