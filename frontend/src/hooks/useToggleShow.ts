import { useState } from "react";

const useToggleShow = () => {
  const [show, setShow] = useState(false);
  const toggleVisibility = () => setShow(prev => !prev);

  return {show, toggleVisibility}
}

export default useToggleShow;