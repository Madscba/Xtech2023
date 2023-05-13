import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import ImagePicker from "../components/ImagePicker/ImagePicker";
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import { useNavigate } from 'react-router-dom';

function CreateSubmission() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [patientData, setPatientData] = useState();

    useEffect(() => {
        getPatientData();
    }, []);

    const getPatientData = async () => {
        if(id){
            const response = await fetch(`http://localhost:8000/prediction/patient/${id}`);
            const jsonData = await response.json();
            setPatientData(jsonData.data);
        }
    }

    const redirectToFeedback = () => {
        navigate("/pending");
    }

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-4">
                    <h2 className="pb-4">Create a submission {patientData?.first_name ? `for ${patientData?.first_name }` : ""}</h2>
                    <div className="flex flex-col gap-4">
                        <ImagePicker eyeSide="left"/>
                        <ImagePicker eyeSide="right"/>
                    </div>
                </div>
                <button className="button" onClick={redirectToFeedback}>Send submission</button>
            </div>
        </Wrapper>
    );
  }
  
export default CreateSubmission;
  