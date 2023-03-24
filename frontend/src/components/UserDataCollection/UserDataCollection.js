import { useState }  from 'react'; 

function UserDataCollection ( ) {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        age: null,
        consent: false
    });

    const { name, email, age, consent } = userData;

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.name === "consent" ? !consent : e.target.value });
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
            ></input>

            <input 
                type="email" 
                required 
                placeholder="e-mail" 
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
            ></input>

            <input 
                type="number" 
                required 
                placeholder="f.e. 50" 
                name="age"
                value={age}
                onChange={(e) => handleChange(e)}
            ></input>

            <label className='flex flex-row gap-3 items-center'>
                Consent
                <input 
                    type="checkbox" 
                    required 
                    name="consent"
                    value={consent ?? false}
                    onChange={(e) => handleChange(e)}
                ></input>
            </label>

            <button className='py-2 px-4 bg-green-100 rounded-md w-40'>Submit</button>
        </form>
    )
}

export default UserDataCollection;