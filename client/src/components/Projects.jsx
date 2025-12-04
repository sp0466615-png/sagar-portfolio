import React from "react";

const projects = [
    { 
    title: "NCA IT SOLUTION", 
    desc: "Fully responsive company website built using React.js, JavaScript and modern UI design.", 
    img: "/nca.png", 
    tags:["React.js","JavaScript","CSS","Responsive"],
    link: "http://localhost:5174/"
  },
  { 
    title: "Random Password Generator", 
    desc: "A tool to generate strong random passwords using HTML, CSS, and JavaScript.", 
    img: "/pass.png", 
    tags:["HTML","CSS","JavaScript"],
    link: "http://127.0.0.1:5500/random-password.html"
  },
  { 
    title: "QR Code Generator", 
    desc: "QR Code Generator using HTML, CSS and JavaScript API integration.", 
    img: "/qr.png", 
    tags:["HTML","CSS","JavaScript","API"],
    link: "http://127.0.0.1:5500/QR-CODE-GENERATE.html"
  },
  { 
    title: "Quiz Web App", 
    desc: "Interactive Quiz App built with HTML, CSS, and vanilla JavaScript.", 
    img: "/quiz.png", 
    tags:["HTML","CSS","JavaScript"],
    link: "http://127.0.0.1:5500/quiz.html"
  },
  { 
    title: "Age Calculator", 
    desc: "Web tool to calculate age using HTML, CSS and JavaScript.", 
    img: "/age.png", 
    tags:["HTML","CSS","JavaScript"],
    link: "http://127.0.0.1:5500/age-calculator-app.html"
  }
];

export default function Projects(){
  return (
    <div id="projects" className="projects" aria-label="Projects" style={{marginTop:18}}>
      {projects.map((p, idx) => (
        <a 
          key={idx} 
          href={p.link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{textDecoration:"none", color:"inherit"}}
        >
          <article className="project card" style={{paddingBottom:12, cursor:"pointer"}}>
            <div className="thumb">
              <img 
                src={p.img} 
                alt={p.title} 
                style={{width:"100%", height:"120px", objectFit:"cover", borderRadius:10}} 
              />
            </div>
            <h3>{p.title}</h3>
            <p className="muted">{p.desc}</p>
            <div className="tags">
              {p.tags.map((t,i)=>(<span key={i} className="tag">{t}</span>))}
            </div>
          </article>
        </a>
      ))}
    </div>
  );
}

