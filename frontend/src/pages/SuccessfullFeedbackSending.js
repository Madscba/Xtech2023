import Wrapper from "../layouts/Wrapper";
import { useNavigate } from 'react-router-dom';

function SuccessfullFeedbackSending() {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/dashboard");
    }, 2000);
      
    return (
        <Wrapper>
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="flex flex-col gap-4 justify-center items-center -mt-24">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="fill-primary bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                    <span>Referral was successfull</span>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default SuccessfullFeedbackSending;
  