import styles from "@/styles/Calculator.module.css";
import Parameters, { IOnChange } from "@/components/parameters";
import { useEffect, useState } from "react";
import {
  bytesUnit,
  BytesUnit,
  formatCO2,
  formatDecimal,
  formatDistance,
  formatEnergy,
  formatNumber,
} from "@/utility/formats";
import { co2, IEmission, IParameters } from "@/utility/co2";
import { useRouter } from "next/router";
import { findByCountry, INTENSITY_DATA_2021 } from "@/utility/intensity";
import { formatDrivingText } from "@/utility/distance";
import Page from "./page";
import Highlight from "@/components/highlight";
import Card from "@/components/card";

const defaultState: IParameters = {
  views: 10000,
  bytes: 1,
  intensity: INTENSITY_DATA_2021[0],
  returningViewsPercentage: 25,
  returningBytesPercentage: 2,
  unit: "MB",
};

export default function Calculator() {
  const router = useRouter();
  const [state, setState] = useState<IParameters>(defaultState);

  const onChange: IOnChange = (property: string, value: any) => {
    let dependencies: Partial<IParameters> = {};
    if (property === "unit") {
      const currentBytes = state.bytes * bytesUnit(state.unit);
      dependencies.bytes = currentBytes / bytesUnit(value);
    }

    setState((current) => ({
      ...current,
      [property]: value,
      ...dependencies,
    }));
  };

  useEffect(() => {
    const parameters: Partial<IParameters> = {};
    const { bytes, unit, country } = router.query;

    if (bytes) parameters.bytes = parseFloat(bytes as string);
    if (unit) parameters.unit = unit as BytesUnit;
    if (country) parameters.intensity = findByCountry(country as string);

    setState((prev) => ({ ...prev, ...parameters }));
  }, [router.query]);

  const emission = co2.perYear(state);
  return (
    <Page>
      <main>
        <h1>Calculator</h1>
        <div className={styles.grid}>
          <Card style={{ gridArea: "a" }}>
            <h2>Data</h2>
            <Parameters onChange={onChange} state={state}></Parameters>
          </Card>
          <Facts state={state} emission={emission}></Facts>
        </div>
      </main>
    </Page>
  );
}

function Facts({
  state,
  emission,
}: {
  state: IParameters;
  emission: IEmission;
}) {
  const drivingDistance = co2.toDrivingRange(emission.co2);
  const treeAbsorption = co2.toTreeAbsorption(emission.co2);
  const tvHours = co2.toTelevisionHours(emission.energy);
  return (
    <div className={`card ${styles.facts}`}>
      <div>
        <h2>Emission per year</h2>
        <Card>
          <Highlight>{formatNumber(state.views * 12)}</Highlight> views produces
          a total of <Highlight>{formatCO2(emission.co2)}</Highlight> CO2
        </Card>
      </div>
      <h2>Is equivalent to</h2>
      <div className={styles.equivalent}>
        <Card>
          The CO2 absorption of{" "}
          <Highlight>
            {formatDecimal(treeAbsorption, treeAbsorption >= 100 ? 0 : 2)}
          </Highlight>{" "}
          trees
        </Card>
        <Card>
          Driving a petrol car{" "}
          <Highlight>{formatDistance(drivingDistance)}</Highlight> between
          Stockholm and {formatDrivingText(drivingDistance)}
        </Card>
        <Card>
          <Highlight>{formatEnergy(emission.energy)}</Highlight> of Energy
        </Card>
        <Card>
          Watching tv for <Highlight>{formatDecimal(tvHours, 0)}</Highlight>{" "}
          hours
        </Card>
      </div>
    </div>
  );
}
