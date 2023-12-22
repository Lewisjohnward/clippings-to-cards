import { Link } from "react-router-dom";
import { FcKindle } from "../misc/icons";
export const LandingPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-4">
      <Link to="/upload" className="text-4xl underline">
        Upload clippings
      </Link>
      <Link to="/upload" className="text-4xl underline">
        <FcKindle className="text-[300px] md:text-[500px] textselect-none caret-transparent" />
      </Link>
      <p>Convert your Kindle clippings to Anki flashcards</p>
    </div>
  );
};
