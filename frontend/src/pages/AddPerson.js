import UserDataCollection from "../components/UserDataCollection/UserDataCollection";
import Wrapper from "../layouts/Wrapper";

function AddPerson() {
    return (
        <Wrapper>
            <div className="p-20 space-y-4">
                <a href="/dashboard">
                    <p className="text-indigo-500"><strong>Go back to dashboard</strong></p>
                </a>
                <h2>Add a person</h2>
                <UserDataCollection/>
            </div>
        </Wrapper>
    );
  }
  
export default AddPerson;
  