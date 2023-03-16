import { useEffect, useState } from "react";
import { sustainableWebDesign } from "@/utility/co2";
import { io } from "socket.io-client";
import { IIntensityCountry } from "@/utility/intensity";

export interface IReport {
  url: string;
  co2: number;
  co2Intensity: IIntensityCountry;
  bytes: number;
  overallsavings: {
    ["offscreen-images"]: number;
    ["unused-css-rules"]: number;
    ["unused-javascript"]: number;
    ["modern-image-formats"]: number;
    ["uses-optimized-images"]: number;
    ["uses-text-compression"]: number;
    ["uses-responsive-images"]: number;
    ["efficient-animated-content"]: number;
    ["duplicated-javascript"]: number;
    ["legacy-javascript"]: number;
  };
}

export interface IResultEvent {
  ["total-byte-weight"]: number;
  ["offscreen-images"]: number;
  ["unused-css-rules"]: number;
  ["unused-javascript"]: number;
  ["modern-image-formats"]: number;
  ["uses-optimized-images"]: number;
  ["uses-text-compression"]: number;
  ["uses-responsive-images"]: number;
  ["efficient-animated-content"]: number;
  ["duplicated-javascript"]: number;
  ["legacy-javascript"]: number;
}

export interface IStatusEvent {
  status: number;
}

export interface IErrorEvent {
  error: string;
}

export interface IOptions {
  url: string;
  intensity: IIntensityCountry;
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
        options.intensity === initialState?.co2Intensity)
    )
      return;

    setState(undefined);
    setIsGenerating(true);
    setError("");
    setStatus(0);
    const socket = io("http://localhost:3001");
    socket.emit("payload", options.url);

    const onConnect = () => setError("");
    const onDisconnect = () => setIsGenerating(false);
    const onConnectError = () => setError("Could not connect to the server");
    const onStatusEvent = (event: IStatusEvent) => setStatus(event.status);
    const onErrorEvent = (event: IErrorEvent) => {
      setError(event.error);
      setState(undefined);
      setIsGenerating(false);
      socket.disconnect();
    };

    const onResultEvent = (event: IResultEvent) => {
      const bytes = event["total-byte-weight"];

      const co2 = sustainableWebDesign.perByte(
        bytes,
        options.intensity.greenhouse_gas_emission_ghg_intensity.value
      );

      setState({
        url: options.url,
        co2: co2,
        co2Intensity: options.intensity,
        bytes: bytes,
        overallsavings: {
          ["offscreen-images"]: event["offscreen-images"],
          ["unused-css-rules"]: event["unused-css-rules"],
          ["unused-javascript"]: event["unused-javascript"],
          ["modern-image-formats"]: event["modern-image-formats"],
          ["uses-optimized-images"]: event["uses-optimized-images"],
          ["uses-text-compression"]: event["uses-text-compression"],
          ["uses-responsive-images"]: event["uses-responsive-images"],
          ["efficient-animated-content"]: event["efficient-animated-content"],
          ["duplicated-javascript"]: event["duplicated-javascript"],
          ["legacy-javascript"]: event["legacy-javascript"],
        },
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
  }, [options]);

  return {
    state,
    status,
    isGenerating,
    error,
  };
}
