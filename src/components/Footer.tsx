
import React from 'react';
import { Clock, Github, Heart, Mail, Globe, Book, MapPin, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 border-t border-border bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Projet BWEB USTHB
            </h3>
          </div>
          
          <p className="text-muted-foreground mb-6 max-w-md">
            A productivity application designed to help students manage their time, tasks, and schedules effectively
          </p>
          
          <p className="font-medium text-primary mb-3 flex items-center">
            <Heart className="h-4 w-4 mr-1.5" /> 
            Developed by:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-2 mt-2 mb-6">
            {['Wassim', 'Issam', 'Idir', 'Younes', 'Anis', 'Aymen'].map((name) => (
              <span key={name} className="px-3 py-1.5 bg-primary/10 rounded-full text-sm hover:bg-primary/20 transition-colors flex items-center justify-center">
                <Code className="h-3 w-3 mr-1.5" />
                {name}
              </span>
            ))}
          </div>
          
          <div className="border-t border-border w-24 my-6"></div>
          
          <div className="flex items-center justify-center space-x-4 mb-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
              <Github className="h-4 w-4 mr-1" />
              <span className="text-xs">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span className="text-xs">Contact</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <span className="text-xs">Website</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
              <Book className="h-4 w-4 mr-1" />
              <span className="text-xs">Documentation</span>
            </a>
          </div>
          
          <p className="text-xs text-muted-foreground flex items-center">
            <MapPin className="h-3 w-3 mr-1.5" />
            USTHB, Algiers, Algeria - © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
