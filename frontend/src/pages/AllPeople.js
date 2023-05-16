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
            const jsonData = await response.json();
            
            if(response.status !== 200) { 
                handleError(jsonData.message);
                return; 
            }

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
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
               <div className="space-y-4">
                {loadingPatients && <Loading/>}
                {(!loadingPatients && error ) && <p className="error-msg">{error}</p>}
                {(!loadingPatients && !error) && 
                    <>
                        <h2>People List</h2>
                        <div className="flex gap-4 w-full flex-wrap">
                            {patients.map((patient, index) => (
                                <a key={index} href={`/person/${index}`}>
                                    <div className="card small w-[350px] flex flex-row justify-between items-center">
                                        <p><strong>{patient?.first_name}</strong></p>
                                        <a href={`/person/${patient.id}`} className="button">Create new submission</a>
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