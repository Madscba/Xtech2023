function TopNav() {
    return (
        <div className="flex flex-row justify-between items-center w-full transparent py-5 px-10 bg-white drop-shadow-md">
            <a href="/dashboard">
                <div className="flex flex-row gap-2 items-center">
                    <img className="w-20" src="/assets/images/logo.svg"/>
                </div>
            </a>
            <div className="flex flex-row gap-4 items-center">
                <img src="/assets/images/doctor-profile-image.png" className="rounded-full w-10 h-10 object-cover object-center"/>
                <a className="text-dark font-medium cursor-pointer" href="/">Logout</a>
            </div>
        </div>
    );
  }
  
export default TopNav;
  