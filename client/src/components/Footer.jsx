import React from "react";

export default function Footer(){
  return (
    <footer className="card" style={{marginTop:20}}>
      © {new Date().getFullYear()} Sagar — Built with React & Node
    </footer>
  );
}
