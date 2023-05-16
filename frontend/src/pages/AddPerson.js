import { useState }  from 'react'; 
import { useNavigate } from 'react-router-dom';
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function AddPerson() {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        birthyear: null,
        ethnicity: "",
        diseases : "",
        consent: false,
    });

    const { 
        firstname, 
        lastname, 
        email,
        birthyear, 
        ethnicity, 
        diseases, 
        consent 
    } = userData;

    const handleChange = (e) => {
        setError("");
        if(e.target.name === "consent"){
            setUserData({ ...userData, "consent": e.target.checked });
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if(!userData.consent){
                throw new Error();
            }
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error();
            }

            navigate("/dashboard");
        } catch (error) {
            handleError();
        }
    }

    const handleError = (message = "Something went wrong. Please try again later") => {
        setError(message);
    }

    return (
        <Wrapper>
            <div className="w-full p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-4">
                    <h2>Add a person</h2>
                    <form onSubmit={(e) => handleSubmit(e)} className="w-full md:w-1/3 flex flex-col gap-2">
                        <label for="firstname" className="text-sm font-bold">First name *</label>
                        <input 
                            required
                            type="text"  
                            placeholder="first name" 
                            name="firstname"
                            value={firstname}
                            onChange={(e) => handleChange(e)}
                            className="mb-2"
                        ></input>

                        <label for="lastname" className="text-sm font-bold">Last name *</label>
                        <input 
                            required
                            type="text"  
                            placeholder="last name" 
                            name="lastname"
                            value={lastname}
                            onChange={(e) => handleChange(e)}
                            className="mb-2"
                        ></input>

                        <label for="email" className="text-sm font-bold">Email *</label>
                        <input 
                            required
                            type="email"  
                            placeholder="e-mail" 
                            name="email"
                            value={email}
                            onChange={(e) => handleChange(e)}
                            className="mb-2"
                        ></input>

                        <label for="birthyear" className="text-sm font-bold">Birthyear *</label>
                        <input 
                            required
                            type="number" 
                            min="1900" 
                            max="2099" 
                            step="1" 
                            placeholder="1980" 
                            name="birthyear"
                            value={birthyear}
                            onChange={(e) => handleChange(e)}
                            className="mb-2"
                        ></input>

                        <label for="gender" className="text-sm font-bold">Gender *</label>
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

                        <label for="diseases" className="text-sm font-bold">(Previous) diseases</label>
                        <input 
                            type="text"  
                            placeholder="previous diseases" 
                            name="diseases"
                            value={diseases}
                            onChange={(e) => handleChange(e)}
                            className="mb-5"
                        ></input>

                        <div className="flex flex-row gap-2 mb-5">
                            <label for="diseases" className="text-sm font-bold">Do you have the patient's consent?</label>
                            <input 
                                type="checkbox"  
                                className="w-[20px]"
                                placeholder="consent" 
                                name="consent"
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                        {error && <p className="error-msg mb-5">{error}</p>}
                        <button className="button">Add person</button>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default AddPerson;
  