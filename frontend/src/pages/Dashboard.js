import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import NumberLabel from "../components/base/Labels/NumberLabel";

function Dashboard() {

    const feedbacks = [
        {
            name: "Freja",
            case: 23455,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Mia",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Paul",
            case: 41155,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Freja",
            case: 23455,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Mia",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Paul",
            case: 41155,
            riskLevel: "high",
            status: "completed"
        },
        {
            name: "Freja",
            case: 23455,
            riskLevel: "low",
            status: "completed"
        },
        {
            name: "Mia",
            case: 5311,
            riskLevel: "low",
            status: "completed"
        },
    ]

    const people = [
        "Freja", "Thomas", "Heidi", "Lotte", "Lola", "Mark", "Will", "Lala", "Sasa", "Lilo", "Max"
    ]


    return (
        <Wrapper>
            <div className="py-10 pl-10 md:py-20 md:pl-20 space-y-10">
                <section className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 pr-10 md:pr-20">
                    <div className="card w-full md:w-2/3 space-y-4 flex flex-col md:flex-row items-center gap-4">
                        <div className="space-y-4">
                            <h2>Hello Mia</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="w-1/3 text-5xl flex justify-center items-center">👋</div>
                    </div>
                    <div className="card w-full md:w-2/3 space-y-4">
                        <h2>Material</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div>
                            <a href="/material" className="button">
                                Learn more
                            </a>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex flex-row justify-between pr-20">
                        <div className="flex flex-row gap-2 items-center">
                            <h2>Feedback</h2>
                            <NumberLabel>6</NumberLabel>
                        </div>
                        <a href="/feedbacks">
                            <div className="secondary-button">
                                Go
                            </div>
                        </a>
                    </div>

                    <div className="flex flex-row flex-nowrap gap-4 overflow-auto pb-4 last:mr-10"> 
                        {feedbacks.map((feedback, index) => (
                            <a href={`/feedback/${index}`}>
                                <div key={index} className="card min-w-[200px] flex flex-col items-center gap-3 hover:scale-110">
                                    <p><strong>{feedback.name}</strong></p>
                                    <p className="text-sm">Case #{feedback.case}</p>
                                    {feedback.riskLevel ? 
                                      <RiskLabel riskLevel={feedback.riskLevel}>Risk is {feedback.riskLevel}</RiskLabel> : <></>
                                    }
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="space-y-4 pr-10 md:pr-20">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <h2>People</h2>
                            <NumberLabel>22</NumberLabel>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <a href="/add/person">
                                <div className="secondary-button">
                                    Add
                                </div>
                            </a>
                            <a href="/people">
                                <div className="secondary-button">
                                    Go
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full flex-wrap">
                        {people.map((person, index) => (
                            <a href={`/person/${index}`}>
                                <div key={index} className="card small w-[350px] flex flex-row justify-between items-center">
                                    <p><strong>{person}</strong></p>
                                    <a href="/create/submission" className="button">Create submission</a>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </Wrapper>
    );
  }
  
export default Dashboard;
  