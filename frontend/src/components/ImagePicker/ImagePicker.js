import { useState, useRef, useEffect }  from 'react'; 
import VideoRecorder from '../VideoRecorder/VideoRecorder';

function ImagePicker ( props ) {
  
    const [videoPath, setVideoPath] = useState();
    const [imagePath, setImagePath] = useState();
    const [eyeSide, setEyeSide] = useState();

    const canvasElement = useRef();
    const videoElement = useRef();

    useEffect(() => {
        setEyeSide(props.eyeSide + " eye")
    }, [props]);

    const handleVideoUpload = (event) => {
        setVideoPath(URL.createObjectURL(event.target.files[0]));
    };

    const handleFrameSelection = () => {
        const canvas = canvasElement.current;
        const video = videoElement.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight

        canvas
            .getContext("2d")
            .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

   
        canvas.toBlob(blob => {
                setImagePath(URL.createObjectURL(blob));
            },
            'image/jpeg',
            0.9,
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold capitalize">{eyeSide ?? ""}</h2>
            <VideoRecorder/>
            <div>
                <p><strong>Upload a video</strong></p>
                <input 
                    type="file" 
                    onChange={handleVideoUpload} 
                    accept="video/*"
                    className='py-2 px-4 bg-yellow-100 rounded-md'
                />
            </div>
            {videoPath ? 
                <div className="flex flex-row gap-4 items-start">
                    <div className="space-y-4">
                        <video 
                            ref={videoElement} 
                            controls 
                            muted 
                            width="400"
                        >
                            <source 
                                src={videoPath} 
                                type="video/mp4"
                            ></source>
                        </video>

                        <button 
                            onClick={handleFrameSelection} 
                            className='py-2 px-4 bg-blue-100 rounded-md'
                        > Get image
                        </button>
                    </div>

                    <div>
                        <canvas ref={canvasElement} className="w-[400px] pb-2"/>
                        <a 
                            class="bg-yellow-200 rounded-md py-2 px-4" 
                            href={imagePath} 
                            download
                        >
                            Ready to download
                        </a>
                    </div>
                </div> : <></>
            }
        </div>
    )
}

export default ImagePicker;