import { useNavigate } from 'react-router-dom';

function TopNav() {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        try {
            e.preventDefault();

            const refreshToken = localStorage.getItem('refresh_token');

            if(!refreshToken){
                throw new Error();
            }
        
            await fetch(`${process.env.REACT_APP_API_URL}/auth/user/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({refresh_token: refreshToken}),
            });

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            navigate("/");
        } catch (error) {
                console.log(error);
        }
    }

    return (
        <div className="flex flex-row justify-between items-center w-full transparent py-5 px-10 bg-white drop-shadow-md">
            <a href="/dashboard">
                <div className="flex flex-row gap-2 items-center">
                    <img className="w-20" src="/assets/images/logo.svg"/>
                </div>
            </a>
            <div className="flex flex-row gap-4 items-center">
                <img src="/assets/images/doctor-profile-image.png" className="rounded-full w-10 h-10 object-cover object-center"/>
                <button className="text-dark font-semibold cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
  }
  
export default TopNav;
  