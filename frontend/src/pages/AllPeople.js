import React, { useState, useEffect, } from 'react';
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import Loading from "../components/base/Loading/Loading";

function AllPeople() {
    const [patients, setPatients] = useState([]);
    const [loadingPatients, setLoadingPatients] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoadingPatients(true);
        getPatients();
    }, []);

    const getPatients = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patients`);
            
            if (!response.ok) {
                throw new Error();
            }

            const jsonData = await response.json();
            setPatients(jsonData.data ?? []); 
            setLoadingPatients(false); 
        } catch (error) {
            handleError();
        }
    }

    const handleError = (message = "Something went wrong. Please try again later") => { 
        setError(message);   
        setLoadingPatients(false); 
    }

    return (
        <Wrapper>
            <div className="container">
                <BackButton/>
               <div className="space-y-4">
                {loadingPatients && <Loading/>}
                {(!loadingPatients && error ) && <p className="error-msg">{error}</p>}
                {(!loadingPatients && !error) && 
                    <>
                        <h2>Patients List</h2>
                        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                            {patients.map((patient, index) => (
                                <a key={index} href={`/person/${index}`} className="w-fill md:w-[320px]">
                                    <div className="card small flex flex-row justify-between items-center gap-2">
                                        <p className="truncate"><strong>{patient?.first_name}</strong></p>
                                        <a href={`/person/${patient.id}`} className="button">Create submission</a>
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
  
export default AllPeople;