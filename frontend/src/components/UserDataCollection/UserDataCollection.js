import { useState }  from 'react'; 
import { useNavigate } from 'react-router-dom';

function UserDataCollection () {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        birthday: null,
        ethnicity: "",
        diseases : ""
    });

    const { firstname, lastname, email, birthday, ethnicity, diseases } = userData;

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
        //TODO: save data
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-full md:w-1/3 flex flex-col gap-2">
            <label for="firstname" className="text-sm font-bold">First name</label>
            <input 
                type="text"  
                placeholder="first name" 
                name="firstname"
                value={firstname}
                onChange={(e) => handleChange(e)}
                className="mb-2"
            ></input>

            <label for="lastname" className="text-sm font-bold">Last name</label>
            <input 
                type="text"  
                placeholder="last name" 
                name="lastname"
                value={lastname}
                onChange={(e) => handleChange(e)}
                className="mb-2"
            ></input>

            <label for="email" className="text-sm font-bold">Email</label>
            <input 
                type="email"  
                placeholder="e-mail" 
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
                className="mb-2"
            ></input>

            <label for="birthday" className="text-sm font-bold">Birthday</label>
            <input 
                type="date"  
                name="birthday"
                value={birthday}
                onChange={(e) => handleChange(e)}
                className="mb-2"
            ></input>

            <label for="birthday" className="text-sm font-bold">Gender</label>
            <select className="mb-2 px-2 py-2 rounded-md">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="diverse">Diverse</option>
            </select>


            <label for="ethnicity" className="text-sm font-bold">Ethnicity</label>
            <input 
                type="text"  
                placeholder="ethnicity" 
                name="ethnicity"
                value={ethnicity}
                onChange={(e) => handleChange(e)}
                className="mb-2"
            ></input>

            <label for="diseases" className="text-sm font-bold">Previous diseases</label>
            <input 
                type="text"  
                placeholder="previous diseases" 
                name="diseases"
                value={diseases}
                onChange={(e) => handleChange(e)}
                className="mb-5"
            ></input>

            <button className="button">Add person</button>
        </form>
    )
}

export default UserDataCollection;