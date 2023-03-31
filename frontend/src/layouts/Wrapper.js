import TopNav from "../components/base/Navigation/TopNav";

function Wrapper({children}) {
    return (
        <div>
            <TopNav/>
            <div className="bg-gray-200/50 w-screen h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
  }
  
export default Wrapper;
  