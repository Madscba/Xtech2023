import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";
import RiskLabel from "../components/base/Labels/RiskLabel";
import StatusLabel from "../components/base/Labels/StatusLabel";

function Feedbacks() {
    const feedbacks = [
        {
            name: "Freja",
            case: 23455,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Signe",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Anders",
            case: 41155,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Marie",
            case: 23455,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Matilde",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Emil",
            case: 41155,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Oscar",
            case: 23455,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Noah",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Laura",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
    ]

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="space-y-6">
                    <h2>Feedbacks</h2>
                    <div className="flex flex-row flex-wrap gap-4 pb-4">
                        {feedbacks.map((feedback, index) => (
                            <a href={`/feedback/${index}`}>
                                <div key={index} className="card w-full md:min-w-[200px] flex flex-col items-center gap-3 hover:scale-110">
                                    <p><strong>{feedback.name}</strong></p>
                                    <p className="text-sm">Case #{feedback.case}</p>
                                    <StatusLabel status={feedback.status}>{feedback.status}</StatusLabel>
                                    { feedback.riskLevel && <RiskLabel riskLevel={feedback.riskLevel}>Risk is {feedback.riskLevel}</RiskLabel> }
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default Feedbacks;
  