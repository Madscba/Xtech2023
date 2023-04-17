function NumberLabel({children}) {
    return (
        <span className="flex items-center justify-center p-2 text-sm font-semibold text-primary bg-accent/20 rounded">
            {children}
        </span>
    );
  }
  
export default NumberLabel;
  