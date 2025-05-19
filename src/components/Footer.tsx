
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 border-t border-border bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium mb-2">Projet BWEB USTHB</h3>
          <p className="text-muted-foreground mb-4">
            A productivity application for students
          </p>
          <p className="font-medium text-primary">Powered by:</p>
          <div className="flex flex-wrap justify-center gap-x-4 mt-2">
            <span>Wassim</span>
            <span>Issam</span>
            <span>Idir</span>
            <span>Younes</span>
            <span>Anis</span>
            <span>Aymen</span>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} USTHB Productivity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
