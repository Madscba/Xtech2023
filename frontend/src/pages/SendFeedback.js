import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import RiskLabel from "../components/base/Labels/RiskLabel";

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
                    <h2>Send submission #42423432 to a doctor</h2>
                    <div className="space-y-2">
                        <p><strong>Who do you want to send it to?</strong></p>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br/>
                            Kind regards, prototype
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p><strong>Images attached</strong></p>
                    </div>
                </div>
                <button className="button">Send submission</button>
            </div>
        </Wrapper>
    );
  }
  
  export default SendFeedback;
  