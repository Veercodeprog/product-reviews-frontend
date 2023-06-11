'use client'
import React, { useState, useEffect } from "react";
import { animateScroll as scroll, Link as ScrollLink } from 'react-scroll';

const Menu = () => {
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id");
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPos >= sectionTop - 2 &&
          scrollPos < sectionTop + sectionHeight
        ) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (id) => {
    scroll.scrollTo(`#${id}`, {
      duration: 500,
      smooth: "easeInOutCubic",
    });
  };

  return (
    <div className="m-1 menu fixed top-0 w-full bg-green-500 bg-opacity-60 transition-all duration-300">
      <div id="menu-center" className="w-4/5 mx-auto">
        <ul>
          <li>
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
              className={activeLink === "home" ? "active" : ""}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="portfolio"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
              className={activeLink === "portfolio" ? "active" : ""}
              onClick={() => handleLinkClick("portfolio")}
            >
              Portfolio
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
              className={activeLink === "about" ? "active" : ""}
              onClick={() => handleLinkClick("about")}
            >
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
              className={activeLink === "contact" ? "active" : ""}
              onClick={() => handleLinkClick("contact")}
            >
              Contact
            </ScrollLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Rest of the components and App remain the same


const Home = () => {
  return (
    <section id="home" className="bg-gray-500 h-screen">
      Home Content
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-blue-500 h-screen">
      Portfolio Content
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-blue-500 h-screen">
      About Content
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="bg-red-500 h-screen">
      Contact Content
    </section>
  );
};

const App = () => {
  return (
    <div>
      <Menu />
      <Home />
      <Portfolio />
      <About />
      <Contact />
    </div>
  );
};

export default App;
