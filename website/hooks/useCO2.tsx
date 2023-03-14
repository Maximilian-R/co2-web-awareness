import { useEffect, useState } from "react";
import { averageIntensity } from "@tgwf/co2";
import { sustainableWebDesign } from "@/utility/co2";
import { io } from "socket.io-client";

export interface IReport {
  url: string;
  co2: number;
  co2_intensity: number;
  bytes: number;
}

export default function useCO2(url: string) {
  const [state, setState] = useState<IReport>();
  const [status, setStatus] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;

    setIsGenerating(true);
    setError("");
    const socket = io("http://localhost:3001");
    socket.emit("payload", url);

    function onConnect() {
      setError("");
    }

    function onDisconnect() {
      setIsGenerating(false);
    }


    function onResultEvent(value: any) {
      const bytes = value.sumSize;
      const gridIntensity = parseFloat(averageIntensity.data.SWE);
      const options = {gridIntensity: {device :gridIntensity, network :gridIntensity, dataCenter: gridIntensity}}

    function onConnectError() {
      setError("Could not connect to the server");
    }

    function onResultEvent(body: any) {
      const bytes = body.sumSize;

      setState({
        url: url,
        co2: sustainableWebDesign.perByteTrace(bytes, true, options).co2,
        co2_intensity: parseFloat(averageIntensity.data.SWE),
        bytes: bytes,
      });
      setError("");
      setStatus(100);
      socket.disconnect();
    }

    function onStatusEvent(body: any) {
      setStatus(body.status);
    }

    function onErrorEvent(error: any){
      console.log(error);
      setError(error);
    }

    socket.on("error", onErrorEvent);
    socket.on("status", onStatusEvent);
    socket.on("connect_error", onConnectError);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("result", onResultEvent);

    return () => {
      socket.off("error", onErrorEvent);
      socket.off("status", onStatusEvent);
      socket.off("connect_error", onConnectError);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("result", onResultEvent);
    };
  }, [url]);

  return {
    state,
    status,
    isGenerating,
    error,
  };
}
