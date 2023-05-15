import React, { useState, useEffect } from 'react';
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import RiskLabel from "../components/base/Labels/RiskLabel";
import StatusLabel from "../components/base/Labels/StatusLabel";

function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        getFeedbacks();
    }, []);


    const getFeedbacks= async () => {
        const response = await fetch("http://localhost:8000/api/submissions");
        const jsonData = await response.json();
        setFeedbacks(jsonData.data ?? []);
    }

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-6">
                    <h2>Feedbacks</h2>
                    <div className="flex flex-row flex-wrap gap-4 pb-4">
                        {feedbacks.length === 0 && <p>You haven't added any patients yet.</p>}
                        {feedbacks?.length > 0 && feedbacks.map((feedback, index) => (
                            <a href={`/feedback/${index}`}>
                                <div key={index} className="card w-full md:min-w-[200px] flex flex-col items-center gap-3 hover:scale-110">
                                    <p><strong>{feedback.submission.patient.first_name}</strong></p>
                                    <p className="text-sm">Case #{feedback.submission.id}</p>
                                    <StatusLabel status={feedback.submission.status}>{feedback.submission.status}</StatusLabel>
                                    {feedback.submitted_eyes.length > 0 && feedback.submitted_eyes.map((eye, index) => (
                                        <RiskLabel riskLevel={eye.risk_level} key={index}>
                                            Risk on the {eye.eye_side} side is {eye.risk_level}
                                        </RiskLabel>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default Feedbacks;
  