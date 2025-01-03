chrome.runtime.onInstalled.addListener(() => {
  console.log("Rug Pull Detector installed!");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && (tab.url.includes("pump.fun") || tab.url.includes("dexscreener.com"))) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: analyzePage,
    });
  }
});

async function analyzePage() {
  try {
    const url = window.location.href;

    // Validate URL before fetch
    if (!url.startsWith("http")) {
      console.error("Invalid URL:", url);
      return;
    }

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Network response was not ok:", response.statusText);
      return;
    }

    const data = await response.json();

    // Validate the structure of the response
    if (!data || typeof data !== "object") {
      console.error("Invalid data format:", data);
      return;
    }

    const score = calculateRugPullScore(data);

    // Send only necessary details
    chrome.runtime.sendMessage({ type: "updateScore", score });
  } catch (error) {
    console.error("Error during page analysis:", error);
  }
}

function calculateRugPullScore(data) {
  let score = 100;

  // Enhanced scoring logic with validations
  if (data.liquidity !== undefined && data.liquidity < 10) score -= 40;
  if (data.contract && data.contract.isRenounced === false) score -= 20;
  if (data.holders && data.holders.concentration > 50) score -= 30;

  return Math.max(score, 0);
}
