import Highlight from "@/components/highlight";
import { formatDecimal, unitValue } from "./formats";

export interface IDistance {
  location: string;
  distance: number;
}

export const distanceFromStockholm: IDistance[] = [];
distanceFromStockholm.push({ location: "Södermalm", distance: 3.5 });
distanceFromStockholm.push({ location: "Bromma", distance: 8 });
distanceFromStockholm.push({ location: "Huddinge", distance: 15 });
distanceFromStockholm.push({ location: "Södertälje", distance: 35 });
distanceFromStockholm.push({ location: "Nynäshamn", distance: 58 });
distanceFromStockholm.push({ location: "Uppsala", distance: 70 });
distanceFromStockholm.push({ location: "Nyköping", distance: 100 });
distanceFromStockholm.push({ location: "Norrköping", distance: 162 });
distanceFromStockholm.push({ location: "Gävle", distance: 173 });
distanceFromStockholm.push({ location: "Linköping", distance: 200 });
distanceFromStockholm.push({ location: "Jönköping", distance: 324 });
distanceFromStockholm.push({ location: "Göteborg", distance: 468 });
distanceFromStockholm.push({ location: "Malmö", distance: 613 });
distanceFromStockholm.push({ location: "Umeå", distance: 637 });
distanceFromStockholm.push({ location: "Luleå", distance: 902 });
distanceFromStockholm.push({ location: "Kiruna", distance: 1236 });
distanceFromStockholm.push({ location: "Paris", distance: 1867 });
distanceFromStockholm.push({ location: "Paris", distance: 1867 });
distanceFromStockholm.push({ location: "Rom", distance: 2545 });
distanceFromStockholm.push({ location: "Madrid", distance: 3132 });
distanceFromStockholm.push({ location: "Lissabon", distance: 3600 });
distanceFromStockholm.push({ location: "the Moon", distance: 384400 });

export const formatDrivingText = (distance: number) => {
  const km = distance / unitValue("k");
  const closest = distanceFromStockholm.reduce((prev, curr) => {
    return Math.abs(curr.distance - km) < Math.abs(prev.distance - km)
      ? curr
      : prev;
  });

  const times = km / closest.distance;

  return (
    <>
      {closest.location}{" "}
      {times > 1.1 && (
        <>
          <Highlight>{formatDecimal(times, times >= 100 ? 0 : 1)}</Highlight>{" "}
          times
        </>
      )}
    </>
  );
};
