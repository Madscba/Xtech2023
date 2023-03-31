import Wrapper from "../layouts/Wrapper";

function Feedback() {
    return (
        <Wrapper>
            <div className="p-20 space-y-4">
                <a href="/dashboard">
                    <p className="text-indigo-500"><strong>Go back to dashboard</strong></p>
                </a>
                <h2>Mia's Feedback</h2>
            </div>
        </Wrapper>
    );
  }
  
export default Feedback;
  