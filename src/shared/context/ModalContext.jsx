import React, { createContext, useContext, useState } from "react";

const defaultContext = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  title: "",
  buttonText: "",
  content: "",
};

const ModalContext = createContext(defaultContext);

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [content, setContent] = useState("");

  const openModal = ({ title, buttonText, content }) => {
    setTitle(title);
    setButtonText(buttonText);
    setContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, title, buttonText, content }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalProvider, useModal };
