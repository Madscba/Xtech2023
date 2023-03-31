import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";

function Video() {
    return (
        <Wrapper>
            <div className="p-20">
                <h2>Submit an Image</h2>
                <ImagePicker eyeSide="left"/>
                <ImagePicker eyeSide="right"/>
            </div>
        </Wrapper>
    );
  }
  
export default Video;
  