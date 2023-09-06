import { useEffect, useState } from "react";
import { IEmission, co2 } from "@/utility/co2";
import { io } from "socket.io-client";
import { IIntensity } from "@/utility/intensity";

export interface ISaving {
  title: string;
  description: string;
  details: {
    overallSavingsBytes: number;
  };
}

export interface IReport {
  url: string;
  emission: IEmission;
  co2Intensity: IIntensity;
  bytes: number;
  savings: ISaving[];
  image: string;
  config: string;
}

export interface IResultEvent {
  bytes: number;
  savings: ISaving[];
  image: string;
}

export type IStatusEvent = number;

export type IErrorEvent = string;

export interface IOptions {
  url: string;
  intensity: IIntensity;
  config: string;
}

export default function useCO2(
  options: IOptions,
  initialState: IReport | undefined
) {
  const [state, setState] = useState<IReport | undefined>(initialState);
  const [status, setStatus] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      !options.url ||
      (options.url === initialState?.url &&
        options.intensity === initialState?.co2Intensity &&
        options.config === initialState?.config)
    )
      return;

    setState(undefined);
    setIsGenerating(true);
    setError("");
    setStatus(0);
    const socket = io("http://localhost:3001");
    socket.emit("generate", {
      url: "https://" + options.url,
      config: options.config,
    });

    const onConnect = () => setError("");
    const onDisconnect = () => setIsGenerating(false);
    const onConnectError = () => setError("Could not connect to the server");
    const onStatusEvent = (event: IStatusEvent) => setStatus(event);
    const onErrorEvent = (event: IErrorEvent) => {
      setError(event);
      setState(undefined);
      setIsGenerating(false);
      socket.disconnect();
    };

    const onResultEvent = (event: IResultEvent) => {
      const bytes = event.bytes;
      const emission = co2.perByte(bytes, options.intensity.value);

      setError("");
      setStatus(100);

      // delay removal of the statusbar
      setTimeout(() => {
        setState({
          url: options.url,
          emission: emission,
          co2Intensity: options.intensity,
          bytes: bytes,
          savings: event.savings,
          image: event.image,
          config: options.config,
        });

        socket.disconnect();
      }, 1000);
    };

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onErrorEvent);
    socket.on("status", onStatusEvent);
    socket.on("report", onResultEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);
      socket.off("error", onErrorEvent);
      socket.off("status", onStatusEvent);
      socket.off("report", onResultEvent);
    };
  }, [options]);

  return {
    state,
    status,
    isGenerating,
    error,
  };
}
