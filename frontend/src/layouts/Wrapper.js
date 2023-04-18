import TopNav from "../components/base/Navigation/TopNav";

function Wrapper( {children} ) {
    return (
        <div>
            <TopNav/>
            <div className="w-full bg-[#F6F6F8] h-screen overflow-y-auto">
                <div className="max-w-[1400px] mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
  }
  
export default Wrapper;
  