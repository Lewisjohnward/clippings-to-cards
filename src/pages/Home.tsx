import { Link } from "react-router-dom";
import { FcKindle } from "../misc/icons";
export const Home = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <p>Convert your Kindle clippings to Anki flashcards</p>
      <Link to="/kindle" className="text-4xl underline">
        Upload clippings
      </Link>
      <FcKindle className="text-[300px] md:text-[500px] textselect-none caret-transparent" />
    </div>
  );
};
