
import React from 'react';
import { Link } from 'react-router-dom';

const NoLifePathMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-2xl font-medium mb-4">No Life Path Number Selected</h1>
      <p className="text-foreground/70 mb-6">Please calculate your Life Path number first.</p>
      <Link 
        to="/life-path"
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
      >
        Go to Calculator
      </Link>
    </div>
  );
};

export default NoLifePathMessage;
