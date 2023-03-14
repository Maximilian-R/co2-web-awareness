// import fs from 'fs';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import express from 'express';

const app = express();

const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
const options = {logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port};

let sumSize = 0; 

app.post('/', async function(req, res) {
  try{
    const runnerResult = await lighthouse('https://seb.se', options);
    let newArray = runnerResult.lhr.audits["network-requests"].details.items;
    newArray.forEach(element =>{
      sumSize += element.transferSize
    })
    console.log(sumSize);
    res.send(sumSize);}
  catch(e){
    console.log(e);
  }})

// `.report` is the HTML report as a string
// const reportHtml = runnerResult.report;
// fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
// console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
// console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

await chrome.kill();