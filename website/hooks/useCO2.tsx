import { useEffect, useState } from "react";
import { averageIntensity } from "@tgwf/co2";
import { sustainableWebDesign } from "@/utility/co2";
import { io } from "socket.io-client";

export interface IReport {
  url: string;
  co2: number;
  co2Intensity: number;
  bytes: number;
}

export interface IResultEvent {
  bytes: number;
}

export interface IStatusEvent {
  status: number;
}

export interface IErrorEvent {
  error: string;
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

    const onConnect = () => setError("");
    const onDisconnect = () => setIsGenerating(false);
    const onConnectError = () => setError("Could not connect to the server");
    const onStatusEvent = (event: IStatusEvent) => setStatus(event.status);
    const onErrorEvent = (event: IErrorEvent) => setError(event.error);

    const onResultEvent = (event: IResultEvent) => {
      const bytes = event.bytes;

      const intensity = parseFloat(averageIntensity.data.SWE);
      const options = {
        gridIntensity: {
          device: intensity,
          network: intensity,
          dataCenter: intensity,
        },
      };
      const trace = sustainableWebDesign.perByteTrace(bytes, false, options);

      setState({
        url: url,
        co2: trace.co2,
        co2Intensity: parseFloat(averageIntensity.data.SWE),
        bytes: bytes,
      });
      setError("");
      setStatus(100);
      socket.disconnect();
    };

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onErrorEvent);
    socket.on("status", onStatusEvent);
    socket.on("result", onResultEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);
      socket.off("error", onErrorEvent);
      socket.off("status", onStatusEvent);
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
