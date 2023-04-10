import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function CreateSubmission() {
    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-6">
                <BackButton/>
                <h2>Create a submission</h2>
                <ImagePicker eyeSide="left"/>
                <ImagePicker eyeSide="right"/>
                <button className="button">Send submission</button>
            </div>
        </Wrapper>
    );
  }
  
export default CreateSubmission;
  