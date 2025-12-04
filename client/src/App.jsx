import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App(){
  return (
    <div className="site">
      <Header />
      <main style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:22, marginTop:18}}>
        <section>
          <Hero />
          <Projects />
          <About />
          <Experience />
        </section>
        <aside>
          <div className="card" style={{marginBottom:14}}>
            <div style={{display:"flex", gap:12, alignItems:"center"}}>
              <div style={{width:72,height:72,borderRadius:14,background:"linear-gradient(135deg,var(--accent),#4f46e5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>YN</div>
              <div>
                <div style={{fontWeight:700}}>Sagar</div>
                <div className="small">Fullstack Developer</div>
                <div className="small" style={{marginTop:6}}>Based in India</div>
              </div>
            </div>
          </div>

          <Contact />
          
          <div className="card" style={{marginTop:14}}>
            <h4 style={{marginTop:0}}>Download</h4>
            <p className="small">Resume (PDF)</p>
            <a className="btn" href="\Sagar-daksh-resume .pdf" download>Download CV</a>

          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
