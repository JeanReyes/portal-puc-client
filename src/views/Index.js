import React from "react";

// index sections
import About from "./sections/About";
import Contact from "./sections/Contact";
import Tracing from "./sections/Tracing";
import '../assets/css/style.css';

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>      
      <div className="main">
        <About />
        <Tracing />
        <Contact />
      </div>
    </>
  );
}

export default Index;
