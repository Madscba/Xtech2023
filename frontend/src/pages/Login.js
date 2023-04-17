import { useState }  from 'react'; 
import PlainWrapper from '../layouts/PlainWrapper';

function Login() {

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
      window.location.href="/dashboard";
      //TODO: save data
    }

    return (
        <PlainWrapper>
            <div className="space-y-4 flex flex-col items-center justify-start">
                <h1 className="text-accent">Login</h1>
                <p className="text-sm">Just click the login button, no need to enter details</p>
                <form onSubmit={(e) => handleSubmit(e)} className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
                    <input 
                        type="email" 
                        placeholder="e-mail" 
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e)}
                    ></input>
                    <input 
                        type="password" 
                        placeholder="password" 
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                    ></input>
                    <button className="button orange w-full">Login</button>
                </form>

                <div className="pt-10 text-sm">
                    <p>Don't have an account? <a href="/signup" className="text-accent">Sign Up now</a></p>
                </div>
            </div>
        </PlainWrapper>
    );
  }
  
export default Login;
  