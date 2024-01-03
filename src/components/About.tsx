import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="pt-20 px-20 md:px-48 space-y-4">
      <div className="space-y-4">
        <p>Created by: Lewis Ward</p>
        <p>Copyright 2023</p>
        <p className="font-bold">About</p>
        <p className="whitespace-normal">
          I built Clippings to Cards because I was tired of using Excel to
          manually create cards from the clippings. If you like
          clippingstocards.io or have a suggestion feel free to say hello.
          Feedback is much appreciated!{" "}
        </p>
      </div>
      <div className="space-y-4">
        <p className="font-bold">Contact</p>
        <a className="block">Contact Us</a>
        <a className="block">Privacy Policy</a>
        <a className="block">Terms of Use</a>
      </div>
    </div>
  );
};
