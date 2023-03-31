import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";

function Video() {
    return (
        <Wrapper>
            <div className="p-20 space-y-6">
                <h2>Create a submission</h2>
                <ImagePicker eyeSide="left"/>
                <ImagePicker eyeSide="right"/>
            </div>
        </Wrapper>
    );
  }
  
export default Video;
  