import UserDataCollection from "../components/UserDataCollection/UserDataCollection";
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function AddPerson() {
    return (
        <Wrapper>
            <div className="p-20 space-y-4">
                <BackButton/>
                <h2>Add a person</h2>
                <UserDataCollection/>
            </div>
        </Wrapper>
    );
  }
  
export default AddPerson;
  