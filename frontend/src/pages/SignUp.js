import { useState }  from 'react'; 
import PlainWrapper from '../layouts/PlainWrapper';

function SignUp() {

    return (
        <PlainWrapper>
            <div className="space-y-4 flex flex-col items-center justify-start">
                <h1 className="text-accent">Sign Up</h1>
                <form className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4">
                    <div className="w-full flex flex-row gap-2">
                        <input 
                            type="text" 
                            placeholder="first name" 
                            name="first_name"
                            className="w-1/2"
                        ></input>
                        <input 
                            type="text" 
                            placeholder="last name" 
                            name="last_name"
                            className="w-1/2"
                        ></input>
                    </div>
                    <input 
                        type="email" 
                        placeholder="e-mail" 
                        name="email"
                    ></input>
                    <input 
                        type="password" 
                        placeholder="password" 
                        name="password"
                    ></input>
                    <button className="button orange w-full">Create Account</button>
                </form>
            </div>
        </PlainWrapper>
    );
  }
  
export default SignUp;
  