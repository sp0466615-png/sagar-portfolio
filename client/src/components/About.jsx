import React from "react";

export default function About(){
  return (
    <article id="about" className="card" style={{marginTop:16}}>
      <h2>About</h2>
      <p className="muted">
        Hi, I’m Sagar — a passionate Full-Stack Web Developer specializing in modern web technologies.
        I love building fast, responsive, and user-friendly web applications using HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB.
        I enjoy turning complex problems into simple, beautiful, and efficient solutions. My focus is on creating clean UI, optimized backend APIs, and real-world full-stack projects.
        I am always learning new technologies and looking for opportunities to grow as a developer.
      </p>

      <h3 style={{marginTop:14}}>What I do</h3>
      <ul style={{marginTop:8,color:"var(--muted)"}}>
        <li>🔹 Frontend Development
          <br/>✔ Responsive UI using HTML, CSS, JavaScript
          <br/>✔ Modern UI/UX with React.js
          <br/>✔ Component-based architecture
          <br/>✔ Reusable and clean design
        </li>
        <br/>
        <li>🔹 Backend Development
          <br/>✔ REST APIs using Node.js & Express.js
          <br/>✔ Authentication & Authorization
          <br/>✔ Server-side logic and route handling
        </li>
        <br/>
        <li>🔹 Database
          <br/>✔ MongoDB database design & management
          <br/>✔ CRUD operations
          <br/>✔ Secure data handling
        </li>
        <br/>
        <li>🔹 Full-Stack Web Applications
          <br/>✔ Functional & scalable applications
          <br/>✔ Integration of frontend + backend
          <br/>✔ Deployment-ready solutions
        </li>
      </ul>
    </article>
  );
}
