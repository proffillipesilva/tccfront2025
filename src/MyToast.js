import { useEffect } from "react";

// Toast component
const MyToast = ({ id, notification, type, duration, onRemove }) => {
    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          onRemove(id);
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [id, duration, onRemove]);

    const baseClasses = "p-4 mb-2 rounded-lg shadow-md text-white flex items-center justify-between transition-all duration-300 ease-in-out transform";
    let typeClasses = "";

    switch (type) {
      case 'success':
        typeClasses = "bg-green-500";
        break;
      case 'error':
        typeClasses = "bg-red-500";
        break;
      case 'warning':
        typeClasses = "bg-yellow-500 text-gray-800";
        break;
      case 'info':
      default:
        typeClasses = "bg-blue-500";
        break;
    }

    return (
      <div className={`${baseClasses} ${typeClasses}`}>
        <span>{notification.title}</span>
        <span>{notification.body}</span>
        <button
          onClick={() => onRemove(id)}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close toast"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    );
  };

  export default MyToast