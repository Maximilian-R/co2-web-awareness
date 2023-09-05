import lighthouse from "lighthouse";
import log from "lighthouse-logger";
import * as chromeLauncher from "chrome-launcher";

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

const options = {
  logLevel: "silent",
  output: "json",
  onlyCategories: ["performance"],
  port: chrome.port,
};

const generateReport = async (url) => {
  const runner = await lighthouse(url, options);
  const audits = runner.lhr.audits;
  const report = {
    bytes: audits["total-byte-weight"].numericValue,
    savings: [
      audits["offscreen-images"],
      audits["unused-css-rules"],
      audits["unused-javascript"],
      audits["modern-image-formats"],
      audits["uses-optimized-images"],
      audits["uses-text-compression"],
      audits["uses-responsive-images"],
      audits["efficient-animated-content"],
      audits["duplicated-javascript"],
      audits["legacy-javascript"],
      audits["efficient-animated-content"],
    ],
  };
  return report;
};

const trackProgress = (socket, onUpdate) => {
  let prev = "";

  const updateStatus = ([_, task]) => {
    // console.timeEnd(prev);
    if (prev === "Initialize config") onUpdate(10);
    else if (prev === "Resolve navigation definitions") onUpdate(20);
    else if (prev === "Preparing network conditions") onUpdate(30);
    else if (prev.includes("Navigating to https://")) onUpdate(70);
    else if (prev === "Computing artifact: NetworkRecords") onUpdate(80);
    else if (prev === "Computing artifact: Responsiveness") onUpdate(90);
    prev = task;
    // console.time(prev);
  };

  log.events.on("status", updateStatus);
  socket.on("disconnect", () => {
    log.events.off("status", updateStatus);
  });
};

export default {
  generateReport,
  trackProgress,
};
