import { useState }  from 'react'; 
import { useNavigate } from 'react-router-dom';
import PlainWrapper from '../layouts/PlainWrapper';

function Login() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    
    const { email, password } = userData;
    
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/dashboard");
      //TODO: save data
    }

    return (
        <PlainWrapper>
            <div className="space-y-4 flex flex-col items-center justify-start">
                <h1 className="text-primary">Login</h1>
                <p className="text-sm text-dark">Lorem ipsum dolor sit amet, consectetur adipiscing eli.</p>
                <form onSubmit={(e) => handleSubmit(e)} className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
                    <input 
                        type="email" 
                        required
                        placeholder="e-mail" 
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e)}
                    ></input>
                    <input 
                        type="password" 
                        required
                        placeholder="password" 
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                    ></input>
                    <button className="button w-full">Login</button>
                </form>

                <div className="pt-10 text-sm">
                    <p className="text-dark">Don't have an account? <a href="/signup" className="text-primary">Sign Up now</a></p>
                </div>
            </div>
        </PlainWrapper>
    );
  }
  
export default Login;
  