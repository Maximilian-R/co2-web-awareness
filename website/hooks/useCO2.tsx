import { useEffect, useState } from "react";
import { sustainableWebDesign, INTENSITY_SWE } from "@/utility/co2";
import { io } from "socket.io-client";

export interface IReport {
  url: string;
  co2: number;
  co2Intensity: number;
  bytes: number;
}

export interface IResultEvent {
    ["total-byte-weight"]: number,
    ["offscreen-images"]: number,
    ["unused-css-rules"]: number,
    ["unused-javascript"]:number,
    ["modern-image-formats"]: number,
    ["uses-optimized-images"]: number,
    ["uses-text-compression"]: number,
    ["uses-responsive-images"]: number,
    ["efficient-animated-content"]: number,
    ["duplicated-javascript"]: number,
    ["legacy-javascript"]: number;
}

export interface IStatusEvent {
  status: number;
}

export interface IErrorEvent {
  error: string;
}

export default function useCO2(url: string, initialState: IReport | undefined) {
  const [state, setState] = useState<IReport | undefined>(initialState);
  const [status, setStatus] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url || url === initialState?.url) return;

    setState(undefined);
    setIsGenerating(true);
    setError("");
    setStatus(0);
    const socket = io("http://localhost:3001");
    socket.emit("payload", url);

    const onConnect = () => setError("");
    const onDisconnect = () => setIsGenerating(false);
    const onConnectError = () => setError("Could not connect to the server");
    const onStatusEvent = (event: IStatusEvent) => setStatus(event.status);
    const onErrorEvent = (event: IErrorEvent) => {
      setError(event.error);
      setState(undefined);
    };

    const onResultEvent = (event: IResultEvent) => {

      const bytes = event["total-byte-weight"];
      const co2 = sustainableWebDesign.perByte(bytes, INTENSITY_SWE);

      setState({
        url: url,
        co2: co2,
        co2Intensity: INTENSITY_SWE,
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
