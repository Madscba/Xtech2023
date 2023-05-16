import React, { useState, useEffect } from 'react';
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import RiskLabel from "../components/base/Labels/RiskLabel";
import StatusLabel from "../components/base/Labels/StatusLabel";
import Loading from "../components/base/Loading/Loading";

function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoadingFeedbacks(true);
        getFeedbacks();
    }, []);

    const getFeedbacks= async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submissions`);

            if (!response.ok) {
                throw new Error();
            }

            const jsonData = await response.json();
            setFeedbacks(jsonData.data ?? []);   
            setLoadingFeedbacks(false);  
        } catch (error) {
            handleError();
        }
    }

    const handleError = (message = "Something went wrong. Please try again later") => { 
        setError(message);   
        setLoadingFeedbacks(false);
    }

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-6">
                    {loadingFeedbacks && <Loading/>}
                    {(!loadingFeedbacks && error ) && <p className="error-msg">{error}</p>}
                    {(!loadingFeedbacks  && !error) && 
                        <>
                            <h2>Feedbacks</h2>
                            <div className="flex flex-row flex-wrap gap-4 pb-4">
                                {feedbacks.length === 0 && <p>You haven't added any patients yet.</p>}
                                {feedbacks?.length > 0 && feedbacks.map((feedback, index) => (
                                    <a href={`/feedback/${feedback.submission.id}`} className="flex">
                                        <div key={index} className="card flex flex-col gap-4 w-full md:min-w-[200px] hover:scale-110">
                                            <div className="self-end">
                                                <StatusLabel status={feedback.submission.status} additionalClasses="w-fit">
                                                    {feedback.submission.status}
                                                </StatusLabel>
                                            </div>
                                            <div className="flex flex-col items-center gap-3 p-4">
                                                <p className="p-0"><strong>{feedback.submission.patient.first_name}</strong></p>
                                                <p className="text-sm">Case #{feedback.submission.id}</p>                        
                                                {feedback.submitted_eyes.length > 0 && feedback.submitted_eyes.map((eye, index) => (
                                                    <RiskLabel 
                                                        key={index} 
                                                        riskLevel={eye.risk_level} 
                                                        eyeSide={eye.eye_side}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </>
                    }
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default Feedbacks;
  