import { useState, useEffect }  from 'react'; 

function ImagePicker () {
  
    const [videoPath, setVideoPath] = useState();

    const handleVideoUpload = (event) => {
        setVideoPath(URL.createObjectURL(event.target.files[0]));
    };

   //URL.createObjectURL(event.target.files[0])

    return (
        <div className='space-y-4'>
            <input type="file" onChange={ handleVideoUpload }/>
            {videoPath ? 
                <video controls muted width="400">
                    <source src={videoPath} type="video/mp4"></source>
                </video>
                : <></>
            }
        </div>
    )
}

export default ImagePicker;