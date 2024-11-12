import React from 'react';

interface ScenarioLayoutProps {
  children: React.ReactNode;
}

const ScenarioLayout = ({ children }: ScenarioLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default ScenarioLayout;