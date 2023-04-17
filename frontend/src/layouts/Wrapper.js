import TopNav from "../components/base/Navigation/TopNav";

function Wrapper( {children} ) {
    return (
        <div>
            <TopNav/>
            <div className="w-full bg-[#F6F6F8] h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
  }
  
export default Wrapper;
  