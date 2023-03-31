import TopNav from "../components/base/Navigation/TopNav";

function Wrapper({children}) {
    return (
        <div>
            <TopNav/>
            <div className="bg-blue-100/50 w-screen h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
  }
  
export default Wrapper;
  