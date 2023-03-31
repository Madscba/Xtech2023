import { useState }  from 'react'; 

function Home() {

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
    <div className="bg-gray-200/50 h-screen w-screen flex items-center justify-center">
      <div className="w-1/2 flex flex-col items-center justify-center">
          <h1 className="text-indigo-500 pb-4">Login</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col items-center justify-center gap-4">
            <input 
                type="email" 
                required 
                placeholder="e-mail" 
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
                className="w-1/3 border-grey-200 border-2 p-3 rounded-lg"
            ></input>
            <input 
                type="password" 
                required 
                placeholder="password" 
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
                className="w-1/3 border-grey-200 border-2 p-3 rounded-lg"
            ></input>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-3xl w-fit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
