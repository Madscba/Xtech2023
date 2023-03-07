import { useState, useEffect, useRef }  from 'react'; 

function ImagePicker () {
  
    const [videoPath, setVideoPath] = useState();

    const canvasElement = useRef();
    const videoElement = useRef();

    const handleVideoUpload = (event) => {
        setVideoPath(URL.createObjectURL(event.target.files[0]));
    };

    const handleFrameSelection = () => {
        const canvas = canvasElement.current;
        const video = videoElement.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas
            .getContext("2d")
            .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        const playImage = new Image();

        playImage.onload = () => {
            const startX = video.videoWidth / 2 - playImage.width / 2;
            const startY = video.videoHeight / 2 - playImage.height / 2;

            canvas
            .getContext("2d")
            .drawImage(playImage, startX, startY, playImage.width, playImage.height);

            canvas.toBlob = (blob) => {
                const img = new Image();
                img.src = window.URL.createObjectUrl(blob);
            };
        };
    }

    return (
        <div className="space-y-4">
            <input type="file" onChange={handleVideoUpload}/>
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

                    <canvas ref={canvasElement} className="w-[400px]"/>
                </div> : <></>
            }
        </div>
    )
}

export default ImagePicker;