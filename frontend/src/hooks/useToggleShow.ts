import { useState } from "react";

const useToggleShow = () => {
  const [show, setShow] = useState(false);
  const toggleVisibility = () => setShow(prev => !prev);

  return {show, toggleVisibility}
}

const useShowConfirmPassword = () => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);
  return { showConfirmPassword, toggleShowConfirmPassword }
}

export {
  useToggleShow,
  useShowConfirmPassword,
};