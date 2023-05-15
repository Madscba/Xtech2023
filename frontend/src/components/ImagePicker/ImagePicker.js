import { useState, useRef, useEffect }  from 'react'; 
import VideoRecorder from '../VideoRecorder/VideoRecorder';

function ImagePicker ({ eyeSide, handleImageSubmission }) {
  
    const [videoPath, setVideoPath] = useState();
    const [imagePath, setImagePath] = useState();

    const canvasElement = useRef();
    const videoElement = useRef();

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
                handleImageSubmission({"eyeSide": eyeSide, "image": blob});
            },
            'image/jpeg',
            0.9,
        );
    }

    const updateVideoPath = (recordedVideoPath) => {
        setVideoPath(recordedVideoPath);
    }

    return (
       <div>
            <h3 className="capitalize">{eyeSide ?? ""}</h3>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 pt-4">
                {!videoPath ? 
                    <>
                        <VideoRecorder handleRecordedVideo={updateVideoPath}/>
                        <div className="space-y-2">
                            <p><strong>Upload a video</strong></p>
                            <input 
                                type="file" 
                                onChange={handleVideoUpload} 
                                accept="video/*"
                                className="p-0!"
                            />
                        </div>
                    </>
                : 
                    <div className="flex flex-row gap-4 items-start">
                        <div className="space-y-2">
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
                                className='button orange'> 
                                Get image
                            </button>
                        </div>

                        <div>
                            <canvas ref={canvasElement} className="w-[400px] pb-4"/>
                            { imagePath ? 
                                <a 
                                    class="bg-yellow-200 px-6 py-3 rounded-3xl text-sm h-fit font-semibold" 
                                    href={imagePath} 
                                    download
                                >
                                    Ready to download 
                                </a>
                                : <></>
                            }
                        </div>
                    </div>
                }
            </div>
       </div>
    )
}

export default ImagePicker;