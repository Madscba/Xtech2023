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
    <div className="bg-white md:h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-start">
      <img src="/assets/images/eye.jpg" className="w-full h-auto md:h-screen md:w-auto"/>
      <div className="h-fit mx-auto w-1/2 flex flex-col items-center justify-center space-y-4 py-10">
          <h1 className="text-teal-500">Login</h1>
          <p>No need to fill in data. You just need to click the submit button for now.</p>
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
