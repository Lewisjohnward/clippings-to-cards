import { useParams } from "react-router-dom";

export const Clippings = (props: {}) => {
  const { id } = useParams();
  return (
    <div>
      <div>clippings</div>
      <div>{id}</div>
    </div>
  );
};
