import { useState }  from 'react'; 

function UserDataCollection ( ) {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        age: null,
    });

    const { name, email, age } = userData;

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        //TODO: save data
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
            <input 
                type="text" 
                required 
                placeholder="name" 
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
                className="w-1/3 border-grey-200 border-2 p-3 rounded-lg"
            ></input>

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
                type="number" 
                required 
                placeholder="f.e. 50" 
                name="age"
                value={age}
                onChange={(e) => handleChange(e)}
                className="w-1/3 border-grey-200 border-2 p-3 rounded-lg"
            ></input>

            <button className='py-2 px-4 bg-green-100 rounded-md w-40'>Submit</button>
        </form>
    )
}

export default UserDataCollection;