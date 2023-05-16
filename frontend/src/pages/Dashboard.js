import React, { useState, useEffect } from 'react';
import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import NumberLabel from "../components/base/Labels/NumberLabel";

function Dashboard() {

    const [patients, setPatients] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        getPatients();
        getFeedbacks();
    }, []);

    const getPatients = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patients`);
        const jsonData = await response.json();
        setPatients(jsonData.data ?? []);
    }

    const getFeedbacks= async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submissions`);
        const jsonData = await response.json();
        setFeedbacks(jsonData.data ?? []);
    }

    return (
        <Wrapper>
            <div className="py-10 pl-10 md:py-20 md:pl-20 space-y-10">
                <section className="flex flex-col md:flex-row justify-between gap-10 pr-10 md:pr-20">
                    <div className="card w-full md:w-2/3 space-y-4 flex flex-col lg:flex-row items-center gap-4">
                        <div className="space-y-2">
                            <h2>Welcome back Mie</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="hidden md:flex lg:w-1/3 text-7xl justify-center items-center">👋</div>
                    </div>
                    <div className="card w-full md:w-2/3 space-y-2">
                        <h2>How to take a good picture</h2>
                        <p className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="pb-4">
                            <a href="/material" className="button">
                                Learn more
                            </a>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex flex-row justify-between pr-10 md:pr-20">
                        <div className="flex flex-row gap-2 items-center">
                            <h2>Feedbacks</h2>
                            <NumberLabel>6</NumberLabel>
                        </div>
                        <a href="/feedbacks">
                            <div className="secondary-button">
                            →
                            </div>
                        </a>
                    </div>

                    <div className="flex flex-row flex-nowrap gap-4 overflow-auto pb-4 last:mr-10 lg:last:mr-20">
                        {feedbacks.length === 0 && <p>You haven't added any patients yet.</p>}
                        {feedbacks?.length > 0 && feedbacks.map((feedback, index) => (
                            <a href={`/feedback/${feedback.submission.id}`}>
                                <div key={index} className="card min-w-[200px] flex flex-col items-center gap-3 hover:scale-110">
                                    <p><strong>{feedback.submission.patient.first_name}</strong></p>
                                    <p className="text-sm pb-1">Case #{feedback.submission.id}</p>
                                    {feedback.submitted_eyes.length > 0 && feedback.submitted_eyes.map((eye, index) => (
                                        <RiskLabel key={index} riskLevel={eye.risk_level} eyeSide={eye.eye_side}/>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="space-y-4 pr-10 md:pr-20">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <h2>People</h2>
                            <NumberLabel>22</NumberLabel>
                        </div>
                        <div className="flex flex-row items-center flex-wrap gap-4">
                            <a href="/add/person">
                                <div className="secondary-button orange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" class="fill-white bi bi-person-plus-fill" viewBox="0 0 16 16">
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </div>
                            </a>
                            <a href="/people">
                                <div className="secondary-button">
                                →
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full flex-wrap">
                        {patients.length === 0 && <p>You haven't added any patients yet.</p>}
                        {patients?.length > 0 && patients.map((patient, index) => (
                            <a href={`/person/${patient.id}`} className="w-inherit md:w-[320px]">
                                <div key={index} className="card small flex flex-row flex-wrap justify-between items-center">
                                    <p><strong>{patient.first_name}</strong></p>
                                    <a href={`/create/submission/${patient.id}`} className="button">Create submission</a>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </Wrapper>
    );
  }
  
export default Dashboard;
  