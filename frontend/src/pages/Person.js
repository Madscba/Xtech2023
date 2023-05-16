import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import StatusLabel from "../components/base/Labels/StatusLabel";
import BackButton from "../components/base/Navigation/BackButton";
import Loading from "../components/base/Loading/Loading";

function Person() {
    const { id } = useParams();

    const [patientData, setPatientData] = useState();
    const [feedbacks, setFeedbacks] = useState();
    const [loadingPatient, setLoadingPatient] = useState(false);
    const [loadingSubmissionHistory, setLoadingSubmissionHistory] = useState(false);
    const [patientError, setPatientError] = useState("");
    const [submissionHistoryError, setSubmissionHistoryError] = useState("");

    useEffect(() => {
        setLoadingPatient(true);
        getPatientData();
        setLoadingSubmissionHistory(true);
        getSubmissionHistory();
    }, []);

    const getPatientData = async () => {
        try {
            if(!id){
                handleError("patient");
                return;
            }
    
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/${id}`);
            const jsonData = await response.json();

            if(response.status !== 200) { 
                handleError("patient", jsonData.message);
                return; 
            }

            setPatientData(jsonData.data);
            setLoadingPatient(false);
        } catch (error) {
            handleError("patient");
        }
    
    }

    const getSubmissionHistory = async () => {
        try {
            if(!id){
                handleError("submission-history");
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submission/history/${id}`);
            const jsonData = await response.json();

            if(response.status !== 200) { 
                handleError("submission-history", jsonData.message);
                return; 
            }

            setFeedbacks(jsonData.data);
            setLoadingSubmissionHistory(false);
        } catch (error) {
            handleError("submission-history");
        }
    }

    const handleError = (type, message = "Something went wrong. Please try again later") => {
        if(type === "patient"){
            setPatientError(false);
            setLoadingPatient(message);
            return;
        }

        setLoadingSubmissionHistory(false);
        setSubmissionHistoryError(message);
    }

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                {loadingPatient && <Loading/>}
                {(!loadingPatient && patientError ) && <p className="error-msg">{patientError}</p>}
                {(!loadingPatient && !patientError) && 
                    <>
                        <div className="flex flex-row justify-between w-full">
                            <div className="space-y-4">
                                <h2>Data - {patientData?.first_name ?? ""} </h2>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row gap-2">
                                        <p><strong>Name:</strong></p>
                                        <p>{patientData?.first_name} {patientData?.last_name}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p><strong>Birth year:</strong></p>
                                        <p>{patientData?.birth_year}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p><strong>Email:</strong></p>
                                        <p>{patientData?.email}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p><strong>Gender:</strong></p>
                                        <p>{patientData?.gender ?? "not defined"}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p><strong>Ethnicity:</strong></p>
                                        <p>{patientData?.ethnicity ?? "not defined"}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p><strong>Previous Diseases:</strong></p>
                                        <p>{patientData?.diseases ?? "not defined"}</p>
                                    </div>
                                </div>
                            </div>

                            <a href={`/create/submission/${patientData?.id}`} className="button">Create new submission</a>
                        </div>

                        <div className="space-y-4">
                            <h2>Submissions for {patientData?.first_name}</h2>
                            <div className="flex flex-row flex-nowrap gap-4 overflow-auto pb-4">
                                {loadingSubmissionHistory && <p>Loading submission history...</p>}
                                {(!loadingSubmissionHistory && submissionHistoryError ) && <p className="error-msg">{submissionHistoryError}</p>}
                                {(!loadingSubmissionHistory && !submissionHistoryError) && 
                                    <>
                                        {feedbacks?.length === 0 && <p>No submissions have been created yet</p>}
                                        {feedbacks?.length > 0 && feedbacks.map((feedback, index) => (
                                            <a key={index} href={`/feedback/${feedback.submission.id}`}>
                                                <div className="card min-w-[200px] h-[180px] flex flex-col items-center gap-3 hover:scale-110">
                                                    <p><strong>Case #{feedback.submission.id}</strong></p>
                                                    <StatusLabel status={feedback.submission.status}>{feedback.submission.status}</StatusLabel>
                                                    {feedback?.submitted_eyes?.length > 0 && feedback.submitted_eyes.map((eye, index) => (
                                                        <div key={index}>
                                                            <RiskLabel riskLevel={eye.risk_level} eyeSide={eye.eye_side}/>
                                                        </div>
                                                    ))}
                                                </div>
                                            </a>
                                        ))}
                                    </>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </Wrapper>
    );
  }
  
export default Person;
  