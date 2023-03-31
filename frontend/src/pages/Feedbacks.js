import Wrapper from "../layouts/Wrapper";

function Feedbacks() {
    return (
        <Wrapper>
            <div className="p-20 space-y-4">
                <a href="/dashboard">
                    <p className="text-indigo-500"><strong>Go back to dashboard</strong></p>
                </a>
                <h2>Feedbacks</h2>
            </div>
        </Wrapper>
    );
  }
  
export default Feedbacks;
  