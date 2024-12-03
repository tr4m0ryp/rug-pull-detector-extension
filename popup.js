// Dummy example of fetched analysis scores (replace with actual logic)
const exampleData = {
    totalScore: 98,
    riskLevel: "High Risk",
    contractScore: 1,
    liquidityScore: 2,
    ownershipScore: 3,
    teamScore: 1
  };
  
  function updateUI(data) {
    document.getElementById("score").innerText = `${data.totalScore}/100`;
    document.getElementById("risk-level").innerText = data.riskLevel;
  
    // Update individual sections
    document.getElementById("contract-score").innerText = `${data.contractScore}/5`;
    document.getElementById("liquidity-score").innerText = `${data.liquidityScore}/5`;
    document.getElementById("ownership-score").innerText = `${data.ownershipScore}/5`;
    document.getElementById("team-score").innerText = `${data.teamScore}/5`;
  
    // Adjust color for risk level
    if (data.totalScore < 50) {
      document.getElementById("score").style.color = "#ff4c4c";
    } else {
      document.getElementById("score").style.color = "#4caf50";
    }
  }
  
  // Simulate data load
  document.addEventListener("DOMContentLoaded", function () {
    // Replace with actual communication to get data
    updateUI(exampleData);
  });
  