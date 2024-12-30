// src/components/ui/Card.js
const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
  
  const CardContent = ({ children }) => (
    <div className="p-6">
      {children}
    </div>
  );
  
  const CardHeader = ({ children }) => (
    <div className="bg-gray-100 p-4 border-b">
      {children}
    </div>
  );
  
  const CardTitle = ({ children }) => (
    <h2 className="text-xl font-semibold text-gray-800">
      {children}
    </h2>
  );
  
  export { Card, CardContent, CardHeader, CardTitle };
  