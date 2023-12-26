import { FaTwitter } from "react-icons/fa6";

export const Tweet = () => {
  return (
    <a
      target="_blank"
      href="https://twitter.com/intent/tweet?text=Generate a simple text based favicon with https://favicon.io (via @johnsorrentino)"
      className="flex items-center gap-4 border border-gray-700 rounded px-2"
    >
      <FaTwitter />
      <strong>Tweet</strong>
    </a>
  );
};

