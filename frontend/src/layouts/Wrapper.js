import React, { useState, useEffect} from 'react';
import TopNav from "../components/base/Navigation/TopNav";
import { useNavigate } from 'react-router-dom';

function Wrapper( {children} ) {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true); 
            return;
        }

        navigate("/");
    }, [isAuth]);

    return (
        <>
            {isAuth && 
                <div>
                    <TopNav/>
                    <div className="w-full bg-[#F6F6F8] min-h-screen overflow-y-auto">
                        <div className="max-w-[1400px] mx-auto">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    );
  }
  
export default Wrapper;
  