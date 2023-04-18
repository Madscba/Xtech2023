import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import StatusLabel from "../components/base/Labels/StatusLabel";
import BackButton from "../components/base/Navigation/BackButton";

function Person() {
    const feedbacks = [
        {
            name: "Ida",
            case: 23455,
            riskLevel: "",
            status: "open"
        },
        {
            name: "Ida",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Ida",
            case: 41155,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Ida",
            case: 23455,
            riskLevel: "high",
            status: "completed"
        }
    ]

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="flex flex-row justify-between w-full">
                    <div className="space-y-4">
                        <h2>Your data</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <p><strong>Name:</strong></p>
                                <p>Ida</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p><strong>Age:</strong></p>
                                <p>55</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p><strong>Gender:</strong></p>
                                <p>Female</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p><strong>Previous Diseases:</strong></p>
                                <p>None</p>
                            </div>
                        </div>
                    </div>

                    <a href="/create/submission" className="button">Create new submission</a>
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
  