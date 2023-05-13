import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import StatusLabel from "../components/base/Labels/StatusLabel";
import BackButton from "../components/base/Navigation/BackButton";

function Person() {
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

    const feedbacks = [
        {
            case: 23455,
            riskLevel: "",
            status: "open"
        },
        {
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            case: 41155,
            riskLevel: "high",
            status: "completed"
        },
        {
            case: 23455,
            riskLevel: "high",
            status: "completed"
        }
    ]

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
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
                    <h2>Your submissions</h2>
                    <div className="flex flex-row flex-nowrap gap-4 overflow-auto pb-4">
                        {feedbacks.map((feedback, index) => (
                            <a key={index} href={`/feedback/${index}`}>
                                <div className="card min-w-[200px] h-[180px] flex flex-col items-center gap-3 hover:scale-110">
                                    <p><strong>Case #{feedback.case}</strong></p>
                                    <StatusLabel status={feedback.status}>{feedback.status}</StatusLabel>
                                    {feedback.riskLevel && <RiskLabel riskLevel={feedback.riskLevel}>Risk is {feedback.riskLevel}</RiskLabel>}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default Person;
  