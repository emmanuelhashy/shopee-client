import { ImSpinner6 } from "react-icons/im";

const Spinner = ({ className }) => {
  return (
    <ImSpinner6
      className={`animate-spin text-[#F95D44] ${className} `}
    />
  );
};

export default Spinner;