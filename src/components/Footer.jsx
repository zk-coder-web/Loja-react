import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container p-6 text-center mt-auto border-t border-green-500/50 shadow-lg shadow-green-500/20">
      <div className="container mx-auto flex flex-col gap-2">
        <p className="text-base sm:text-lg text-gray-200">
          &copy; {new Date().getFullYear()} Zark Company. Todos os direitos
          reservados.
        </p>
        <p className="text-sm sm:text-base text-gray-400">
          Coisa barata é coisa ruim, mas a gente tenta fazer o melhor possível!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
