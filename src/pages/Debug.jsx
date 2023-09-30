import React from "react";
import { useModal } from "../shared/context/ModalContext";

function Debug() {
  const { openModal } = useModal();

  return <div>Debug</div>;
}

export default Debug;
