function TopNav() {
    return (
        <div className="flex flex-row justify-between items-center w-full transparent py-5 px-10 bg-primary">
            <a href="/dashboard">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-2xl">👁️</span>
                    <span className="text-white font-bold">Eye Opener</span>
                </div>
            </a>
            <div className="text-white">Dr. Mia Berg</div>
        </div>
    );
  }
  
export default TopNav;
  