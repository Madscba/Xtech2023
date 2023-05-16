import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import { useNavigate } from 'react-router-dom';

function CreateSubmission() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [patient, setPatient] = useState();
    const [imageRightSide, setImageRightSide] = useState();
    const [imageLeftSide, setImageLeftSide] = useState();

    useEffect(() => {
        getPatient();
    }, []);

    const getPatient = async () => {
        if(id){
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/${id}`);
            const jsonData = await response.json();
            setPatient(jsonData.data);
        }
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
        e.preventDefault();

        //TODO: add error handling

        if(!patient.id) {
            return;
        }

        if(!imageRightSide && !imageLeftSide) {
            return;
        }

        let submissionData = await createForm();

        try {
            const response = await fetch("http://localhost:8000/api/submission", {
                method: "POST",
                body: submissionData,
            });

            if(response.status === 200){
                navigate("/pending");
            }

            //TODO: add error handling
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-4">
                    <h2 className="pb-4">Create a submission {patient?.first_name ? `for ${patient?.first_name }` : ""}</h2>
                    <div className="flex flex-col gap-4">
                        <ImagePicker eyeSide="left" handleImageSubmission={handleSubmittedImages}/>
                        <ImagePicker eyeSide="right" handleImageSubmission={handleSubmittedImages}/>
                    </div>
                </div>
                <button className="button" onClick={handleSubmission}>Send submission</button>
            </div>
        </Wrapper>
    );
  }
  
export default CreateSubmission;
  