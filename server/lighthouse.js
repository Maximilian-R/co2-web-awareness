import lighthouse from "lighthouse";
import log from "lighthouse-logger";
import chromeLauncher from "chrome-launcher";

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

const options = {
  logLevel: "silent",
  output: "json",
  onlyCategories: ["performance"],
  port: chrome.port,
};

const generateReport = async (url) => {
  return lighthouse(url, options);
};

const totalBytes = async (url) => {
  const report = await generateReport(url);
  // const requests = report.lhr.audits["network-requests"].details.items;
  // const requests = report.lhr.audits["total-byte-weight"].numericValue;
  const overallSavings = await overallSavingsBytes(report);
  // return requests.reduce((sum, request) => {
  //   return sum + request.transferSize;
  // }, 0);
  return overallSavings;
};



const overallSavingsBytes = async(report) =>{
  const overallSavingsTitle = {
    "total-byte-weight":report.lhr.audits["total-byte-weight"],
    "offscreen-images": report.lhr.audits["offscreen-images"],
    "unused-css-rules": report.lhr.audits["unused-css-rules"],
    "unused-javascript": report.lhr.audits["unused-javascript"],
    "modern-image-formats": report.lhr.audits["modern-image-formats"],
    "uses-optimized-images": report.lhr.audits["uses-optimized-images"],
    "uses-text-compression": report.lhr.audits["uses-text-compression"],
    "uses-responsive-images": report.lhr.audits["uses-responsive-images"],
    "efficient-animated-content": report.lhr.audits["efficient-animated-content"],
    "duplicated-javascript": report.lhr.audits["duplicated-javascript"],
    "legacy-javascript": report.lhr.audits["legacy-javascript"],
    "efficient-animated-content": report.lhr.audits["efficient-animated-content"],
    
    

    // "total-byte-weight":report.lhr.audits["total-byte-weight"].numericValue,
    // "offscreen-images": report.lhr.audits["offscreen-images"].details.overallSavingsBytes,
    // "unused-css-rules": report.lhr.audits["unused-css-rules"].details.overallSavingsBytes,
    // "unused-javascript": report.lhr.audits["unused-javascript"].details.overallSavingsBytes,
    // "modern-image-formats": report.lhr.audits["modern-image-formats"].details.overallSavingsBytes,
    // "uses-optimized-images": report.lhr.audits["uses-optimized-images"].details.overallSavingsBytes,
    // "uses-text-compression": report.lhr.audits["uses-text-compression"].details.overallSavingsBytes,
    // "uses-responsive-images": report.lhr.audits["uses-responsive-images"].details.overallSavingsBytes,
    // "efficient-animated-content": report.lhr.audits["efficient-animated-content"].details.overallSavingsBytes,
    // "duplicated-javascript": report.lhr.audits["duplicated-javascript"].details.overallSavingsBytes,
    // "legacy-javascript": report.lhr.audits["legacy-javascript"].details.overallSavingsBytes,
    // "efficient-animated-content": report.lhr.audits["efficient-animated-content"].details.overallSavingsBytes,
};

return overallSavingsTitle;
  
  // const total = overallSavingsTitle.reduce((map, fruit) => ({
  //   ...map,
  //   [fruit]: report.lhr.audits[overallSavingsTitle].details.overallSavingsBytes,
  // }), {})

  // overallSavingsTitle.forEach(overallSavings =>{
  //   let allSavings= createOverallSavings(report, overallSavings);
  //   console.log(allSavings);
  // })
};

// function createOverallSavings(report, overallSavings) {
//   return { 
//       [overallSavings]: report.lhr.audits[overallSavings].details.overallSavingsBytes,
//   };
// }

const trackProgress = (socket, onUpdate) => {
  let events = 0;

  const updateStatus = () => {
    if (++events % 10 === 0) {
      onUpdate(events);
    }
  };

  log.events.on("status", updateStatus);
  socket.on("disconnect", () => {
    log.events.off("status", updateStatus);
  });
};

export default {
  totalBytes,
  trackProgress,
};
