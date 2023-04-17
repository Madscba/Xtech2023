import PlainNavbar from "../components/base/Navigation/PlainNavbar";

function PlainWrapper( {children} ) {
    return (
        <div className="relative bg-primary min-h-screen">
            <PlainNavbar/>
            <div className=" md:h-screen w-screen flex flex-col lg:flex-row items-center justify-start overflow-hidden">
                <div className=" w-full lg:w-1/3 lg:max-w-[450px] h-[220px] sm:h-[350px] md:h-[400px] lg:h-full flex items-center overflow-hidden">
                    <img src="/assets/images/eye.jpg" className="w-full object-center object-cover h-inherit"/>
                </div>
                <div className="h-fit mx-auto w-full lg:w-2/3 space-y-4 p-10">
                    {children}
                </div>
            </div>
        </div>
    );
  }
  
export default PlainWrapper;
  