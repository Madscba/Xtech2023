import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function CreateSubmission() {
    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-4">
                    <h2>Create a submission</h2>
                    <ImagePicker eyeSide="left"/>
                    <ImagePicker eyeSide="right"/>
                </div>
                <button className="button">Send submission</button>
            </div>
        </Wrapper>
    );
  }
  
export default CreateSubmission;
  