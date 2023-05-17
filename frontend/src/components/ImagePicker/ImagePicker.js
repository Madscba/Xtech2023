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
            <div className="w-fill flex flex-col sm:flex-row gap-4 md:gap-10 pt-4">
                {!videoPath ? 
                    <div className="space-y-8">
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
                    </div>
                : 
                    <div className="w-fill flex flex-col sm:flex-row gap-6 items-end">
                        <div className="w-fill sm:w-3/6 sm:max-w-[400px] flex flex-col gap-4">
                            <video 
                                ref={videoElement} 
                                controls 
                                muted 
                                className="w-fill"
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

                        <div className="w-fill sm:w-3/6 sm:max-w-[400px] flex flex-col gap-4">
                            <canvas ref={canvasElement} className="w-fill h-fill object-cover object-center"/>
                            { imagePath && 
                                <a class="bg-yellow-200 px-4 py-2 md:px-6 md:py-3 rounded-3xl text-xs md:text-sm text-center h-fit font-semibold" 
                                    href={imagePath} 
                                    download >
                                    Ready to download 
                                </a>
                            }
                        </div>
                    </div>
                }
            </div>
       </div>
    )
}

export default ImagePicker;