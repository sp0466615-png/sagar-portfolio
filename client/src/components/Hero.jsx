import React from "react";

export default function Hero(){
  return (
    <article id="home" className="card hero">
      <h1>Hi — I’m <span style={{color:"var(--accent)"}}>sagar</span>. I build beautiful websites with React.js, node.js, express.js, mongoDB</h1>
      <p className="lead">Specialized in responsive design, performance-first UIs and accessible experiences. Below are my projects and experience.</p>
      <div className="cta">
        <a className="btn" href="#projects">See projects</a>
        <a className="btn ghost" href="#contact">Contact me</a>
      </div>
    </article>
  );
}
