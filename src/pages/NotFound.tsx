import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center text-center [&>*]:pb-4">
      <p className="text-4xl">404 not found</p>
      <Link to="/" className="text-center underline">
        Return home
      </Link>
    </div>
  );
};
