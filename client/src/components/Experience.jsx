import React from "react";

export default function Experience(){
  return (
    <article id="experience" className="card" style={{marginTop:16}}>
      <h2>Experience</h2>
      <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:8}}>
        <div style={{padding:10,borderRadius:10,background:"linear-gradient(180deg,#fff,#fbfdff)",border:"1px solid rgba(0,0,0,0.03)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><strong>Fullstack Developer</strong> — </div>
            <div className="small">2025 — Present</div>
          </div>
          <div className="muted" style={{marginTop:6}}>
            Web Development Intern (2 Month Completed — 2 Month Internship)
            Currently working as a Web Development Intern where I’m learning and building real-world projects using HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. I work on frontend UI, backend API development, and full-stack workflow.
          </div>
        </div>
      </div>
    </article>
  );
}
