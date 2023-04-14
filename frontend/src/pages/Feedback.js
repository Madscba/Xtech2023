import Wrapper from "../layouts/Wrapper";
import RiskLabel from "../components/base/Labels/RiskLabel";
import NumberLabel from "../components/base/Labels/NumberLabel";
import BackButton from "../components/base/Navigation/BackButton";

function Feedback() {

    const isReffered = false;

    return (
        <Wrapper>
            <div className="p-10 md:p-20 space-y-10">
                <BackButton/>
                <div className="flex flex-col md:flex-row gap-2 justify-between w-full">
                    <div className="flex flex-row gap-6 justify-between md:justify-none items-start w-full md:w-fit">
                        <div>
                            <h2>Mia's Feedback</h2>
                            <p>Case #42423432</p>
                        </div>
                        <RiskLabel>Risk is low</RiskLabel>
                    </div>
                    <div>
                        { isReffered ?  <p>Reffered to Dr. Freja Larsen</p> : <a className="button" href="/send/feedback/42423432">Make a referral</a> }
                    </div>
                </div>
                <div className="w-2/3 space-y-2">
                    <h2>Feedback</h2>
                    <div className="flex flex-row items-center gap-2">
                        <p>Your calculated risk:</p>
                        <NumberLabel>27%</NumberLabel>
                    </div>
                    <p>Turpis cursus in hac habitasse platea. Ultrices neque ornare aenean euismod elementum. At elementum eu facilisis sed odio morbi quis commodo odio. Massa placerat duis ultricies lacus sed turpis. Lectus sit amet est placerat in egestas erat imperdiet sed. Tincidunt lobortis feugiat vivamus at augue. Placerat vestibulum lectus mauris ultrices eros in cursus turpis</p>
                </div>
                <div className="space-y-4">
                    <h2>What you have submitted</h2>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-4 w-1/3">
                            <span className="font-bold">Left eye</span>
                            <img className="w-full" src="/assets/images/placeholder-left-eye.png"/>
                        </div>
                        <div className="flex flex-col gap-4 w-1/3">
                            <span className="font-bold">Right eye</span>
                            <img className="w-full" src="/assets/images/placeholder-right-eye.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
  }
  
export default Feedback;
  