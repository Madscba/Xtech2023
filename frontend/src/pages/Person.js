import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import StatusLabel from "../components/base/Labels/StatusLabel";

function Person() {
    const feedbacks = [
        {
            name: "Mia",
            case: 23455,
            riskLevel: "",
            status: "open"
        },
        {
            name: "Mia",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Mia",
            case: 41155,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Mia",
            case: 23455,
            riskLevel: "high",
            status: "completed"
        }
    ]

    return (
        <Wrapper>
            <div className="p-20 space-y-6">
                <a href="/dashboard">
                    <p className="text-indigo-500"><strong>Go back to dashboard</strong></p>
                </a>
                <h2>Mia</h2>
                <div className="space-y-4">
                    <h2>Your data</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <p><strong>Name:</strong></p>
                            <p>Mia</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p><strong>Name:</strong></p>
                            <p>Mia</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2>Your submissions</h2>
                    <div className="flex flex-row flex-nowrap gap-4 overflow-auto pb-4">
                        {feedbacks.map((feedback, index) => (
                            <a href={`/feedback/${index}`}>
                                <div key={index} className="card min-w-[200px] h-[180px] flex flex-col items-center gap-3 hover:scale-110">
                                    <p><strong>Case #{feedback.case}</strong></p>
                                    <StatusLabel status={feedback.status}>{feedback.status}</StatusLabel>
                                    {feedback.riskLevel ? 
                                      <RiskLabel riskLevel={feedback.riskLevel}>Risk is {feedback.riskLevel}</RiskLabel> : <></>
                                    }
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
  