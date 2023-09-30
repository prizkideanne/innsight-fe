import React from "react";
import NavBar from "../navbar/NavBar";
import Footer from "../footer";

function MainContainer({ children }) {
  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col md:px-5">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

export default MainContainer;
