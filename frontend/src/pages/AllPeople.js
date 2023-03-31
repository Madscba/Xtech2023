import Wrapper from "../layouts/Wrapper";
import BackButton from "../components/base/Navigation/BackButton";

function AllPeople() {
    const people = [
        "Freja", "Thomas", "Heidi", "Lotte", "Lola", "Mark", "Will", "Lala", "Sasa", "Lilo", "Max"
    ]

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-6">
                <BackButton/>
                <h2>People List</h2>
                <div className="flex gap-4 w-full flex-wrap">
                    {people.map((person, index) => (
                        <a href={`/person/${index}`}>
                            <div key={index} className="card small w-[350px] flex flex-row justify-between items-center">
                                <p><strong>{person}</strong></p>
                                <a href="/video" className="button">Create new image</a>
                            </div>
                        </a>
                    ))}
                 </div>
            </div>
        </Wrapper>
    );
  }
  
export default AllPeople;