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
    const [error, setError] = useState("");
    

    useEffect(() => {
        setLoadingFeedback(true);
        getFeedback();
    }, []);


    const getFeedback= async () => {
        try {
            if(!id){
                handleError();
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submission/${id}`);
            const jsonData = await response.json();

            if(response.status !== 200) { 
                handleError(jsonData.message);
                return; 
            }

            setFeedback(jsonData.data ?? []);
            setLoadingFeedback(false);
        } catch (error) {
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
            {!feedback ? <p>Loading...</p>
            : <Wrapper>
                <div className="p-10 md:p-20 space-y-10">
                    <BackButton/>
                        {loadingFeedback && <Loading/>}
                        {(!loadingFeedback && error ) && <p className="error-msg">{error}</p>}
                        {(!loadingFeedback && !error ) &&
                            <>
                                <div className="space-y-6">
                                    <h2>Make a referral for {feedback.submission.patient.first_name}'s submission</h2>
                                    <div className="space-y-2">
                                        <p><strong>Case:</strong> #{feedback.submission.id}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p><strong>Choose a doctor</strong></p>
                                        <select className="px-4 py-2 rounded-md" onChange={(e) => handleChange(e)}>
                                            {doctors.map((doctor, index) => (
                                                <option key={index} value={doctor.first_name}>Dr. {doctor.first_name} {doctor.last_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <p><strong>What we are sending</strong></p>
                                        <p className="w-2/3">
                                            Dear {selectedDoctor},<br/> 
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.<br/>
                                            Kind regards, <br/>
                                            Mie
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <p><strong>Images attached</strong></p>
                                        <div className="flex flex-row gap-4">
                                        <div className="flex flex-col gap-4 w-3/12">
                                            <span className="font-bold">Left eye</span>
                                            <img className="w-full" src="/assets/images/placeholder-left-eye.png"/>
                                        </div>
                                        <div className="flex flex-col gap-4 w-3/12">
                                            <span className="font-bold">Right eye</span>
                                            <img className="w-full" src="/assets/images/placeholder-right-eye.png"/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            <button className="button" onClick={sendReferral}>Make the referral</button>
                        </>
                        }
                </div>
            </Wrapper>
            }
        </>
    );
  }
  
  export default SendFeedback;
  