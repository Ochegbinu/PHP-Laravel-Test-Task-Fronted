// src/components/ui/Button.js
const Button = ({ children, className, onClick, type = "button", disabled = false }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-300 ${className}`}
    >
      {children}
    </button>
  );
  
  export default Button;
  