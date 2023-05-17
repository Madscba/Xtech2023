import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import Loading from "../components/base/Loading/Loading";

function SendFeedback() {
    const navigate = useNavigate();
    const { id } = useParams();

    const doctors = [
        {
            first_name: "Sofie",
            last_name: "Larsen",
            email: "slarsen@email.io"
        },
        {
            first_name: "Mikkel",
            last_name: "Nielsen",
            email: "mnielsen@email.io"
        },
        {
            first_name: "Emilie",
            last_name: "Hansen",
            email: "ehansen@email.io"
        },
        {
            first_name: "Frederik",
            last_name: "Pedersen",
            email: "fpedersen@email.io"
        },
        {
            first_name: "Amalie",
            last_name: "Andersen",
            email: "aandersen@email.io"
        },
        {
            first_name: "Christian",
            last_name: "Christensen",
            email: "cchristensen@email.io"
        },
        {
            first_name: "Laura",
            last_name: "Petersen",
            email: "lpetersen@email.io"
        },
        {
            first_name: "Mathias",
            last_name: "Rasmussen",
            email: "mrasmussen@email.io"
        }
    ]

    const [feedback, setFeedback] = useState();
    const [selectedDoctor, setSelectedDoctor] = useState("Sofie");
    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const [submissionDate, setSubmissionDate] = useState();
    const [error, setError] = useState("");
    

    useEffect(() => {
        setLoadingFeedback(true);
        getFeedback();
    }, []);


    const getFeedback= async () => {
        try {
            if(!id){
                throw new Error();
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submission/${id}`);

            if (!response.ok) {
                throw new Error();
            }

            const jsonData = await response.json();
            setFeedback(jsonData.data ?? []);
            const date = new Date(jsonData.data.submission.created_at);
            setSubmissionDate(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
            setLoadingFeedback(false);
            console.log("done")
        } catch (error) {
            console.log(error)
            handleError();
        }
    }

    const handleChange = (e) => {
        setSelectedDoctor(e.target.value);
    };

    const sendReferral = () => {
        navigate("/send/feedback/successfull");
    }

    const handleError = (message = "Something went wrong. Please try again later") => { 
        setError(message);   
        setLoadingFeedback(false);
    }

    return (
        <>
         <Wrapper>
            <div className="container">
                <BackButton/>
                {loadingFeedback && <Loading/>}
                {(!loadingFeedback && error ) && <p className="error-msg">{error}</p>}
                {(!loadingFeedback && feedback && !error ) &&
                    <>
                        <div className="space-y-8">
                            <div className="flex flex-col gap-2 items-start">
                                <h2>Make a referral for {feedback.submission.patient.first_name}'s submission</h2>
                                <p>Case #{feedback?.submission?.id}</p>
                                {submissionDate && <p>Date: {submissionDate}</p>}
                            </div>
                            <div className="space-y-2">
                                <h3>Choose a doctor</h3>
                                <select className="px-4 py-2 rounded-md" onChange={(e) => handleChange(e)}>
                                    {doctors.map((doctor, index) => (
                                        <option key={index} value={doctor.first_name}>Dr. {doctor.first_name} {doctor.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <h3>What text will be sent</h3>
                                <p className="max-w-text-limit"> Dear {selectedDoctor},<br/> 
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.<br/>
                                    Kind regards, <br/>
                                    Mie
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3>What images will be attached</h3>
                                <div className="w-full flex flex-col sm:flex-row gap-4">
                                    {feedback?.submitted_eyes?.length > 0 && feedback.submitted_eyes.map((eye, index) => (
                                        <div className="flex flex-col gap-4 w-full sm:w-1/3">
                                            <span className="font-bold capitalize">{eye.eye_side} eye</span>
                                            <img className="w-full h-auto object-contain object-center" src={`${process.env.REACT_APP_API_URL}${eye.image}`}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="button" onClick={sendReferral}>Make the referral</button>
                    </>
                }
            </div>
        </Wrapper>
        </>
    );
  }
  
  export default SendFeedback;
  