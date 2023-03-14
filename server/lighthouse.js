import lighthouse from "lighthouse";
import log from "lighthouse-logger";
import chromeLauncher from "chrome-launcher";

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

const options = {
  logLevel: "info",
  output: "json",
  onlyCategories: ["performance"],
  port: chrome.port,
};

const generateReport = async () => {
  return lighthouse(payload, options);
};

const totalBytes = async () => {
  const report = await generateReport();
  const requests = report.lhr.audits["network-requests"].details.items;
  return requests.reduce((sum, request) => {
    sum += request.transferSize;
  }, 0);
};

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
