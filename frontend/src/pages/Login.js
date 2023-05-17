import { useState }  from 'react'; 
import { useNavigate } from 'react-router-dom';
import PlainWrapper from '../layouts/PlainWrapper';

function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = userData;
    
    const handleChange = (e) => {
        setError("");
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();

        if(!userData){
            throw new Error();
        }
      
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error();
        }

        const jsonData = await response.json();

        if(!jsonData.access){
            throw new Error();
        }

        localStorage.clear();
        localStorage.setItem('access_token', jsonData.access);
        localStorage.setItem('refresh_token', jsonData.refresh);

        navigate("/dashboard");
      } catch (error) {
        setError("Soemthing went wrong, please try again later.");   
      }
    }

    return (
        <PlainWrapper>
            <div className="space-y-4 flex flex-col items-center justify-start w-full md:w-6/12 md:max-w-container-limit mx-auto">
                <h1 className="text-primary">Login</h1>
                <p className="text-sm text-dark text-center">Sens-Vue will provide you with the credentials, if you would like to access the prototype.</p>
                <form onSubmit={(e) => handleSubmit(e)} className="w-fill flex flex-col items-center justify-center gap-4">
                    <input 
                        required
                        type="email" 
                        placeholder="e-mail" 
                        name="username"
                        value={username}
                        onChange={(e) => handleChange(e)}
                    ></input>
                    <input 
                        required
                        type="password" 
                        placeholder="password" 
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                    ></input>
                    <button className="button large">Login</button>
                </form>

                {error && <p className="error-msg py-2">{error}</p>}

                <div className="pt-5 text-sm">
                    <p className="text-dark">Don't have an account? <a href="/signup" className="text-primary">Sign up now</a></p>
                </div>
            </div>
        </PlainWrapper>
    );
  }
  
export default Login;
  