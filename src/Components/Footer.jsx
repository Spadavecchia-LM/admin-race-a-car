import React from 'react';
import Logo from '../assets/logo.png';

const Footer = () => {
    return (
      <footer className="footer bg-primaryBlue w-full text-primaryWhite mt-auto h-[10vh]">
        <div className="container mx-auto flex items-center py-4 ml-0">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12 mr-4" />
            <div>&copy;{new Date().getFullYear()} Race-A-Car. Todos los derechos reservados.</div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;