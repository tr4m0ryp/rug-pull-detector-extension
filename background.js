chrome.runtime.onInstalled.addListener(() => {
    console.log("Rug Pull Detector installed!");
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && (tab.url.includes("pump.fun") || tab.url.includes("dexscreener.com"))) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: analyzePage
      });
    }
  });
  
  async function analyzePage() {
    try {
      const url = window.location.href;
      const response = await fetch(url);
      const data = await response.json();
  
      const score = calculateRugPullScore(data);
      chrome.runtime.sendMessage({ type: 'updateScore', score });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  function calculateRugPullScore(data) {
    let score = 100;
  
    // Dummy scoring logic: Customize based on real API response.
    if (data.liquidity && data.liquidity < 10) score -= 40;
    if (data.contract && !data.contract.isRenounced) score -= 20;
    if (data.holders && data.holders.concentration > 50) score -= 30;
  
    return Math.max(score, 0);
  }
  