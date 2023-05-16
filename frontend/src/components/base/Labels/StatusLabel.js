function StatusLabel({children, status, additionalClasses}) {
    return (
        <span className={`flex justify-center items-center px-3 text-xs font-semibold rounded-full ${additionalClasses ?? ""} ${status == "open" ? "text-yellow-500 bg-yellow-200" : "text-gray-500 bg-gray-100"}`}>
            {children}
        </span>
    );
  }
  
export default StatusLabel;
  