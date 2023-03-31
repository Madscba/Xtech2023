import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function AllPeople() {
    return (
        <Wrapper>
            <div className="p-20 space-y-4">
                <BackButton/>
                <h2>People List</h2>
            </div>
        </Wrapper>
    );
  }
  
export default AllPeople;