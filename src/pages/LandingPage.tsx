import { Link } from "react-router-dom";
import { FcKindle } from "../misc/icons";
import { Footer } from "../components/Footer";
export const LandingPage = () => {
  return (
    <div className="flex-grow flex flex-col justify-between">
      <div className="flex-grow flex flex-col justify-center items-center space-y-4">
        <Link to="/upload" className="text-4xl underline">
          Upload clippings
        </Link>
        <Link to="/upload" className="text-4xl underline">
          <FcKindle className="text-[300px] md:text-[500px] textselect-none caret-transparent" />
        </Link>
        <p>Convert your Kindle clippings to Anki flashcards</p>
      </div>
      <Footer />
    </div>
  );
};
