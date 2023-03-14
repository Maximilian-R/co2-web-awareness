import { useEffect, useState } from "react";
import { averageIntensity } from "@tgwf/co2";
import { sustainableWebDesign } from "@/utility/co2";

export interface IReport {
  url: string;
  co2: number;
  co2_intensity: number;
  bytes: number;
}

export default function useCO2(url: string) {
  const [state, setState] = useState<IReport>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const headers  = {"Content-Type" : "application/json"}
        const response = await fetch("http://localhost:3001/report", {headers, method: "POST", body: JSON.stringify({url})});
        const json = await response.json();
        console.log(json);

        const bytes = json.sumSize;

        setState({
          url: url,
          co2: sustainableWebDesign.perByte(bytes),
          co2_intensity: parseFloat(averageIntensity.data.SWE),
          bytes: bytes,
        });
      } catch (error) {
        setError(`Failed to generate a report for ${url}`);
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return {
    state,
    isLoading,
    error,
  };
}
