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
      <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-indigo-500">Login</h1>
          <p>You just need to click the submit button for now. No need to fill in data.</p>
          <form onSubmit={(e) => handleSubmit(e)} className="w-full md:w-2/3  flex flex-col items-center justify-center gap-4">
            <input 
                type="email" 
                placeholder="e-mail" 
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
                className="border-grey-200 border-2 p-3 rounded-lg"
            ></input>
            <input 
                type="password" 
                placeholder="password" 
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
                className="border-grey-200 border-2 p-3 rounded-lg"
            ></input>
            <button className="button w-fit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
