import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className="flex-grow flex flex-col justify-center text-center">
      <div className="space-y-4">
        <p className="text-4xl">404 not found</p>
        <Link to="/" className="block text-center underline hover:opacity-40">
          Return home
        </Link>
      </div>
    </div>
  );
};
