
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackLinkProps {
  to: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, label }) => {
  return (
    <Link 
      to={to}
      className="inline-flex items-center mb-8 text-foreground/70 hover:text-accent transition-colors"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      <span>{label}</span>
    </Link>
  );
};

export default BackLink;
