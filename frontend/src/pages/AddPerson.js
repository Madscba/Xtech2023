import UserDataCollection from "../components/UserDataCollection/UserDataCollection";
import Wrapper from "../layouts/Wrapper";

function AddPerson() {
    return (
        <Wrapper>
            <div className="p-20">
                <h2>Add a person</h2>
                <UserDataCollection/>
            </div>
        </Wrapper>
    );
  }
  
export default AddPerson;
  