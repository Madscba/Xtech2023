import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function SendFeedback() {

    const doctors = [
        {
            name: "Dr. Freja Larsen",
            email: "flarsen@email.io"
        },
        {
            name: "Dr. Mikkel Anders",
            email: "manders@email.io"
        },
        {
            name: "Dr. Sven Berg",
            email: "sberg@email.io"
        }
    ]


    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-14">
                <BackButton/>
                <div className="space-y-10">
                    <h2>Make a referral for submission #42423432</h2>
                    <div className="space-y-2">
                        <p><strong>Choose a doctor</strong></p>
                        <select className="px-4 py-2 rounded-md">
                            {doctors.map((doctor, index) => (
                                <option key={index} value={doctor.email}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <p><strong>What we are sending</strong></p>
                        <p className="w-2/3">
                            Dear ..., <br/> 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/>
                            Kind regards, <br/>
                            Mia
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
                <button className="button">Make the referral</button>
            </div>
        </Wrapper>
    );
  }
  
  export default SendFeedback;
  