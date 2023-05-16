function RiskLabel({riskLevel, eyeSide}) {
    return (
        <span className={`w-fit flex justify-center items-center h-6 px-3 text-xs capitalize font-semibold rounded-full ${riskLevel > 0.6 ? "text-pink-500 bg-pink-100" : "text-green-500 bg-green-100 "}`}>
              Risk on the {eyeSide} side is {riskLevel > 0.6 ? "high" : "low"}
        </span>
    );
  }
  
export default RiskLabel;
  