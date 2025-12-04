import React from "react";

export default function Header(){
  return (
    <header>
      <div className="brand">
        <div className="logo">SN</div>
        <div>
          <div style={{fontWeight:700}}>Hi, i am sagar</div>
          <div className="small muted">Fullstack Developer — HTML, CSS, JavaScript, React, Node, Express, MongoDB</div>
        </div>
      </div>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
