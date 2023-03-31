function NumberLabel({children}) {
    return (
        <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-indigo-500 bg-indigo-500/10 rounded">
            {children}
        </span>
    );
  }
  
export default NumberLabel;
  