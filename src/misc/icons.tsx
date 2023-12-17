import { TbCardsFilled } from "react-icons/tb";
import { FcKindle } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import { BiSortAlt2 } from "react-icons/bi";
import { MdOutlineRemoveCircle } from "react-icons/md";

const SiteIcon = () => {
  return (
    <svg viewBox="0 0 72 28" width="50" height="28">
      <g fill="#333">
        <rect x="0" y="0" width="20" height="28" rx="4" ry="4"></rect>
        <rect x="24" y="0" width="20" height="28" rx="4" ry="4"></rect>
        <rect x="48" y="0" width="20" height="28" rx="4" ry="4"></rect>
      </g>
    </svg>
  );
};

export {
  TbCardsFilled,
  BiSortAlt2,
  FcKindle,
  MdDelete,
  FaDownload,
  SlCalender,
  FaSortDown,
  FaSortUp,
  MdOutlineRemoveCircle,
  SiteIcon,
};
