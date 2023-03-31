import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";

function Video() {
    return (
        <Wrapper>
            <div className="p-20 space-y-6">
                <a href="/dashboard">
                    <p className="text-indigo-500"><strong>Go back to dashboard</strong></p>
                </a>
                <h2>Create a submission</h2>
                <ImagePicker eyeSide="left"/>
                <ImagePicker eyeSide="right"/>
                <button className="button">Send submission</button>
            </div>
        </Wrapper>
    );
  }
  
export default Video;
  