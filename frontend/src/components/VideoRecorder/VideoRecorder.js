import { useState, useRef }  from 'react'; 

const mimeType = 'video/webm; codecs="opus,vp8"';

function VideoRecorder( ) {
    
    const [permission, setPermission] = useState(false);
	const mediaRecorder = useRef();
	const liveVideoFeed = useRef();
	const [recordingStatus, setRecordingStatus] = useState("inactive");
	const [stream, setStream] = useState();
	const [recordedVideo, setRecordedVideo] = useState();
	const [videoChunks, setVideoChunks] = useState([]);

	const getCameraPermission = async () => {

		setRecordedVideo(null);
		//get video and audio permissions and then stream the result media stream to the videoSrc variable
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);

				setPermission(true);

				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);

				//set videostream to live feed player
				liveVideoFeed.current.srcObject = videoStream;
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("Sorry we can't record videos on your device.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");

		const media = new MediaRecorder(stream, { mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localVideoChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localVideoChunks.push(event.data);
		};

		setVideoChunks(localVideoChunks);
	};

	const stopRecording = () => {
		setPermission(false);
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);

			setVideoChunks([]);
		};
	};

	return (
		<div>
            <div className='space-y-4'>
                <p><strong>Record a video</strong></p>
                {!permission ? (
                    <button 
                        onClick={getCameraPermission}
                        class="py-2 px-4 bg-blue-100 rounded-md"
                    >
                        Record a video
                    </button>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                    <button 
                        onClick={startRecording}
                        class="py-2 px-4 bg-green-100 rounded-md"
                    >
                        Start Recording
                    </button>
                ) : null}
                {recordingStatus === "recording" ? (
                    <button 
                        onClick={stopRecording}
                        class="py-2 px-4 bg-red-100 rounded-md"
                    >
                        Stop Recording
                    </button>
                ) : null}
            </div>

			<div className='space-y-4'>
				{!recordedVideo ? (
					<>
                        <p className='py-4'>No recorded video</p>
                        <video className='hidden' ref={liveVideoFeed}></video>
                    </>
				) : null}
				{recordedVideo ? (
					<>
						<video 
                            src={recordedVideo} 
                            controls
                        ></video>
					</>
				) : null}
			</div>
		</div>
	);
}

export default VideoRecorder;