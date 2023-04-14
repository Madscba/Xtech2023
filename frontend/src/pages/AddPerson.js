import UserDataCollection from "../components/UserDataCollection/UserDataCollection";
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function AddPerson() {
    return (
        <Wrapper>
            <div className="w-full p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-4">
                    <h2>Add a person</h2>
                    <UserDataCollection/>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default AddPerson;
  