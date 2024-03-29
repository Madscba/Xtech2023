import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import NumberLabel from "../components/base/Labels/NumberLabel";
import BackButton from "../components/base/Navigation/BackButton";
import Loading from "../components/base/Loading/Loading";

function Feedback() {
    const { id } = useParams();

    const [feedback, setFeedback] = useState();
    const [submissionDate, setSubmissionDate] = useState();
    const [loadingFeedback, setLoadingFeedback] = useState(false);
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
        } catch (error) {
            handleError();
        }
    }

    const handleError = (message = "Something went wrong. Please try again later") => { 
        setError(message);   
        setLoadingFeedback(false);
    }

    return (
        <Wrapper>
            <div className="container">
                <BackButton/>
                {loadingFeedback && <Loading/>}
                {(!loadingFeedback && error ) && <p className="error-msg">{error}</p>}
                {(!loadingFeedback && !error && feedback) &&
                    <>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-between w-full">
                            <div className="w-full md:w-fit">
                                <div className="space-y-2">
                                    <div className="flex flex-col gap-2 items-start">
                                        <h2>{feedback?.submission?.patient?.first_name}'s Feedback</h2>
                                        <p>Case #{feedback?.submission?.id}</p>
                                        {submissionDate && <p>Date: {submissionDate}</p>}
                                    </div>
                                </div>
                            </div>
                            <a className="button" href={`/send/feedback/${feedback.submission.id}`}>Make a referral</a>     
                        </div>

                        <div className="w-full space-y-4">
                            <h2>Feedback</h2>
                            <div className="flex flex-col gap-3">
                                <p>Calculated risk for each eye:</p>
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-3 items-start sm:items-center">
                                    {feedback?.submitted_eyes?.length > 0 && feedback.submitted_eyes.map((eye, index) => (
                                        <div className="space-y-2">
                                            <RiskLabel 
                                                key={index} 
                                                riskLevel={eye.risk_level} 
                                                eyeSide={eye.eye_side}
                                            />
                                            <NumberLabel key={index}>
                                                <span className="capitalize">
                                                    {eye.eye_side} eye: {Math.floor((eye.risk_level) * 100)}%
                                                </span>
                                            </NumberLabel>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <p className="max-w-text-limit">Turpis cursus in hac habitasse platea. Ultrices neque ornare aenean euismod elementum. At elementum eu facilisis sed odio morbi quis commodo odio. Massa placerat duis ultricies lacus sed turpis. Lectus sit amet est placerat in egestas erat imperdiet sed. Tincidunt lobortis feugiat vivamus at augue. Placerat vestibulum lectus mauris ultrices eros in cursus turpis</p>
                        </div>
                        <div className="space-y-4">
                            <h2>Submitted Images</h2>
                            <div className="w-full flex flex-col sm:flex-row gap-4">
                                {feedback?.submitted_eyes?.length > 0 && feedback.submitted_eyes.map((eye, index) => (
                                    <div className="flex flex-col gap-4 w-full sm:w-1/3">
                                        <span className="font-bold capitalize">{eye.eye_side} eye</span>
                                        <img className="w-full h-auto object-contain object-center" src={`${process.env.REACT_APP_API_URL}${eye.image}`}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </Wrapper>
    );
  }
  
export default Feedback;
  