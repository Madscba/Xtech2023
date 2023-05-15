import React, { useState, useEffect, } from 'react';
import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function AllPeople() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {
        const response = await fetch("http://localhost:8000/api/patients");
        const jsonData = await response.json();
        setPatients(jsonData.data ?? []);
    }

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
               <div className="space-y-4">
                    <h2>People List</h2>
                    <div className="flex gap-4 w-full flex-wrap">
                        {patients.map((patient, index) => (
                            <a  key={index}  href={`/person/${index}`}>
                                <div className="card small w-[350px] flex flex-row justify-between items-center">
                                    <p><strong>{patient?.first_name}</strong></p>
                                    <a href={`/person/${patient.id}`} className="button">Create new submission</a>
                                </div>
                            </a>
                        ))}
                    </div>
               </div>
            </div>
        </Wrapper>
    );
  }
  
export default AllPeople;