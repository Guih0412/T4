import React from "react";
import { Link } from "react-router-dom";

type Props = {
  tema: string;
  botoes: string[]; 
};

export default function Footer(props: Props) {
  const tema = props.tema;

  return (
    <footer className="text-center mt-5" style={{ backgroundColor: tema }}>
      <div className="container py-4">
        <div className="text-center title" style={{ fontSize: "0.9rem" }}>
          © 2025 Copyright: Pet Lovers
        </div>
      </div>
    </footer>
  );
}
