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
      let sumSize = 0;
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

app.set('port', process.env.PORT || 3001);

httpServer.listen(app.get('port'), function () {
  var port = httpServer.address().port;
  console.log('Running on : ', port);
});


