function RiskLabel({riskLevel, eyeSide}) {
    return (
        <span className={`w-fit text-center flex justify-center items-center px-3 py-1 text-xs capitalize font-semibold rounded-full ${riskLevel > 0.6 ? "text-pink-500 bg-pink-100" : "text-green-500 bg-green-100 "}`}>
          {eyeSide} side risk is {riskLevel > 0.6 ? "high" : "low"}
        </span>
    );
  }
  
export default RiskLabel;
  