import React, { useState, useEffect, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import Pending from "../components/base/Loading/Pending";

function CreateSubmission() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [patient, setPatient] = useState();
    const [imageRightSide, setImageRightSide] = useState();
    const [imageLeftSide, setImageLeftSide] = useState();
    const [isProcessing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getPatient();
    }, []);

    const getPatient = async () => {
        if(!id){
            return;
        }
       
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/${id}`);
        const jsonData = await response.json();
        setPatient(jsonData?.data ?? null); 
    }

    const handleSubmittedImages = ({ eyeSide, image }) => {
        if(eyeSide === "right") {
            setImageRightSide(image)
        }

        if(eyeSide === "left") {
            setImageLeftSide(image)
        }
    }

    const createForm = async () => {
        let form_data = new FormData();

        form_data.append("patient", patient.id);

        if(imageRightSide){
            form_data.append("right_eye", new File([imageRightSide], "right-eye.jpg", { type: "image/jpeg" }));
        }

        if(imageLeftSide){
            form_data.append("left_eye", new File([imageLeftSide], "left-eye.jpg", { type: "image/jpeg" }));
        }
        
        return form_data;
    }

    const handleSubmission = async (e) => {
        try {
            e.preventDefault();
            
            setProcessing(true);

            if(!patient.id) {
                throw new Error();
            }

            if(!imageRightSide && !imageLeftSide) {
                handleError("Please upload images.");
                return;
            }
    
            const submissionData = await createForm();

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submission`, {
                method: "POST",
                body: submissionData,
            });

            if (!response.ok) {
                throw new Error();
            }

            const jsonData = await response.json();
            if(!jsonData.submission){
                handleError();
            }
    
            setTimeout(() => {
                setProcessing(false);
                navigate(`/feedback/${jsonData.submission}`);
            }, 2000);
        } catch (error) {
            handleError();
        }
    }

    const handleError = (message = "Something went wrong. Please try again later") => {
        setError(message);
        setProcessing(false);
    }

    return (
        <Wrapper>
            {!isProcessing && 
                <div className="container">
                    <BackButton/>
                    <div className="space-y-4">
                        <h2 className="pb-4">Create a submission {patient?.first_name ? `for ${patient?.first_name }` : ""}</h2>
                        <div className="space-y-8">
                            <ImagePicker 
                                eyeSide="left" 
                                handleImageSubmission={handleSubmittedImages}
                            />
                            <ImagePicker 
                                eyeSide="right" 
                                handleImageSubmission={handleSubmittedImages}
                            />
                        </div>
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button className="button" onClick={handleSubmission}>Send submission</button>
                </div>
            }
            {isProcessing && <Pending/>} 
        </Wrapper>
    );
  }
  
export default CreateSubmission;
  