import TopNav from "../components/base/Navigation/TopNav";

function Wrapper( {children} ) {
    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <div className="block md:hidden">
                    <TopNav/>
                </div>
                <div className="w-1/6 h-screen bg-primary hidden md:flex items-start p-5">   
                    <p className="text-white font-bold flex flex-row items-center gap-2"><span className="text-2xl">👁️</span>Eye Opener</p>
                </div>
                <div className="w-full md:w-5/6 bg-[#F6F6F8] h-screen overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
  }
  
export default Wrapper;
  