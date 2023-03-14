// import fs from 'fs';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import express from 'express';
import cors from 'cors';
import log from 'lighthouse-logger';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
const options = {logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port};

io.on('connection', (socket) => {
  console.log('Connection established');
 
  socket.on('payload', async(payload) =>{
    try{
      let nr =0;
      log.events.on('status', ()=>{
        socket.emit('status', {status : nr++});
      })
      const runnerResult = await lighthouse(payload, options);
      let newArray = runnerResult.lhr.audits["network-requests"].details.items;
      newArray.forEach(element =>{
        sumSize += element.transferSize
      })
      console.log(sumSize);
      socket.emit('result', {sumSize});
    }
    catch(e){
      console.log(e);
    }
  })
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});


// const getApiAndEmit = async(socket) => {
//   socket.on('payload', async(payload) =>{
//     try{
//       const runnerResult = await lighthouse("https://seb.se", options);
//       let newArray = runnerResult.lhr.audits["network-requests"].details.items;
//       newArray.forEach(element =>{
//         sumSize += element.transferSize
//       })
//       console.log(sumSize);
//       socket.emit('result', {sumSize});
//     }
//     catch(e){
//       console.log(e);
//     }
//   })
// };

app.set('port', process.env.PORT || 3001);

httpServer.listen(app.get('port'), function () {
  var port = httpServer.address().port;
  console.log('Running on : ', port);
});

let sumSize = 0; 

// app.post('/report', async function(req, res) {
//   })

// `.report` is the HTML report as a string
// const reportHtml = runnerResult.report;
// fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
// console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
// console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
// app.listen(3001, () =>{
//   console.log("Listening on port 3001")
// })
//await chrome.kill();