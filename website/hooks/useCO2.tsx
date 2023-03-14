import { useEffect, useState } from "react";
import { averageIntensity } from "@tgwf/co2";
import { sustainableWebDesign } from "@/utility/co2";
import {io} from "socket.io-client";

export interface IReport {
  url: string;
  co2: number;
  co2_intensity: number;
  bytes: number;
}

// const socket = io("http://localhost:3001/report");

export default function useCO2(url: string) {
  const [state, setState] = useState<IReport>();
  const [status, setStatus] = useState(0);
  const [error, setError] = useState("");

    useEffect(() => {
      if(!url){
        return
      }

      const socket = io("http://localhost:3001");
      socket.emit("payload", url);

      function onConnect() {
        // setIsConnected(true);
      }
  
      function onDisconnect() {
        // setIsConnected(false);
      }
  
      function onResultEvent(value : any) {
        const bytes = value.sumSize;
        console.log(bytes);
        setState({
          url: url,
          co2: sustainableWebDesign.perByte(bytes),
          co2_intensity: parseFloat(averageIntensity.data.SWE),
          bytes: bytes,
        });
      }

      function onStatusEvent(value : any) {
       setStatus(value.status);
      }
      
      socket.on('status', onStatusEvent);
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('result', onResultEvent);
  
      return () => {
        socket.off('status', onStatusEvent);
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('result', onResultEvent);
      };
    }, [url]);

  return {
    state,
    status,
    error,
  };
}
