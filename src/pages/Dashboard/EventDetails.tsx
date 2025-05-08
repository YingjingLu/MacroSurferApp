import { useParams } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { useState, useEffect } from "react";
import { EconomicEvent, PastEventSymbolPerformance } from "../../models/economic_events";
import { BACKEND_URL } from "../../gobal/constants";
import SinpleLineChart, { SinpleLineChartProps } from "../../newComponents/SinpleLineChart";
import EconomicEventStat from "../../newComponents/economicEventStat";
import Spinner from "../../newComponents/Spinner";
import { safeNumberDisplay } from "../../utils/safeTextDisplay";
import { isTodayEvent } from "../../utils/dateUtils";
const EventDetails = () => {

  const { event, event_date } = useParams();
  const [eventSymbolPerformance, setEventSymbolPerformance] = useState<PastEventSymbolPerformance>(null);
  const [loadingPastEventSymbolPerformance, setLoadingPastEventSymbolPerformance] = useState(true);
  const [aiDescription, setAiDescription] = useState<string>("");
  const [loadingAiDescription, setLoadingAiDescription] = useState(true);

  useEffect(() => {
    const fetchEventSymbolPerformance = async () => {
      const response = await fetch(`${BACKEND_URL}/economic-events-symbol-performance/${event}/SPY`);
      const data = await response.json();
      const pastEventSymbolPerformance = data as PastEventSymbolPerformance;
      setEventSymbolPerformance(pastEventSymbolPerformance);
      setLoadingPastEventSymbolPerformance(false);
    };
    fetchEventSymbolPerformance();
  }, [event]);

  useEffect(() => {
    const fetchAiDescription = async () => {
      const response = await fetch(`${BACKEND_URL}/economic-events-ai-insights/${event}/US/${event_date}`);
      const data = await response.json();
      setAiDescription(data);
      setLoadingAiDescription(false);
    };
    fetchAiDescription();
  }, [event,event_date]);

  function formatDateToMMDD(date: String): string {
    return date.substring(0, 10);
  }

  const shouldRenderPastSymbolPerformance = (performance: PastEventSymbolPerformance | undefined) => {
    if (performance === undefined || !performance) {
      return false;
    }
    if (performance.event_history.length < 3) {
      return false;
    }
    if (performance.event_history[0].actual == null
      && performance.event_history[1].actual == null
      && performance.event_history[2].actual == null
      && performance.performance.in_1_day.length == performance.performance.in_1_hour.length) {
      return true;
    }
    return false;
  }

  const createHistoricalPerformance = (performance: PastEventSymbolPerformance | undefined): SinpleLineChartProps => {
    if (performance === undefined || !performance) {
      return {
        actual: [],
        expected: [],
        x_axis: [],
        actual_col_name: 'Actual',
        expected_col_name: 'Expected',
      };
    }
    const actual: number[] = [];
    const expected: number[] = [];
    const x_axis: string[] = [];
    if (shouldRenderPastSymbolPerformance(performance)) {
      for (let index = 0; index < performance.event_history.length; index++) {
        const event = performance.event_history[index];
        if (event.actual !== undefined && event.event_date !== undefined) {
          actual.push(parseFloat(performance.performance.in_1_hour[index].toFixed(2)));
          if (event.estimate !== null) {
            expected.push(parseFloat(event.estimate.toFixed(2)));
          }
          x_axis.push(`${formatDateToMMDD(event.event_date)}`);
        }
      }
      return {
        actual,
        expected,
        x_axis,
        actual_col_name: '1 Hour SPY Change',
        expected_col_name: '1 Day SPY Change',
      };
    } else {
      for (const event of performance.event_history) {
        if (event.actual !== undefined && event.event_date !== undefined) {
          actual.push(event.actual);
          expected.push(event.estimate);
          x_axis.push(`${formatDateToMMDD(event.event_date)}`);
        }
      }
      return {
        actual,
        expected,
        x_axis,
        actual_col_name: 'Actual',
        expected_col_name: 'Expected',
      };
    }
  }

  const renderEconomicEventStat = (performance: PastEventSymbolPerformance | undefined, aiDescription: string, loadingAiDescription: boolean) => {
    if (loadingPastEventSymbolPerformance) {
      return <Spinner />;
    }
    if (performance.error) {
      return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
            <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
              Error loading the event!
            </h3>
          </div>
        </div>);
    }
    var economicEventToDisplay: EconomicEvent = performance?.event_history[performance?.event_history.length - 1];
    console.log(economicEventToDisplay);

    if (economicEventToDisplay.event_date !== undefined && (isTodayEvent(economicEventToDisplay.event_date) == false)) {
      economicEventToDisplay = {
        event: performance?.event,
        event_date: performance?.event_history[performance?.event_history.length - 1].event_date,
        additional_identifier: performance?.event_history[performance?.event_history.length - 1].additional_identifier,
        country: performance?.event_history[performance?.event_history.length - 1].country,
        currency: performance?.event_history[performance?.event_history.length - 1].currency,
        previous: performance?.event_history[performance?.event_history.length - 1].actual,
        estimate: null,
        actual: null,
        change: null,
        change_percentage: null,
        impact: null,
        unit: null,
      };
    }
    return (
      <>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
            <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
              {performance?.event}
            </h3>
            {
              loadingAiDescription ? <Spinner /> : ( aiDescription !== "" ? (<p className="font-medium text-black dark:text-white">
                {aiDescription}
              </p>) : <></>
              )
            }
          </div>
          {
            (shouldRenderPastSymbolPerformance(performance)) ?
              <EconomicEventStat firstNumber={safeNumberDisplay(performance.performance.in_1_hour[performance.performance.in_1_hour.length - 1], "%", "N/A")} secondNumber={safeNumberDisplay(performance.performance.in_1_day[performance.performance.in_1_day.length - 1], "%", "N/A")} thirdNumber={safeNumberDisplay((performance.performance.in_1_hour.reduce((a, b) => a + b, 0) / performance.performance.in_1_hour.length), "%", "N/A")} fourthNumber={safeNumberDisplay((performance.performance.in_1_day.reduce((a, b) => a + b, 0) / performance.performance.in_1_day.length), "%", "N/A")} firstText={"Last 1 hour SPY change"} secondText={"Last 1 day SPY change"} thirdText={"Average 1 hour SPY change"} fourthText={"Average 1 day SPY change"} />
              :
              <EconomicEventStat firstNumber={safeNumberDisplay(economicEventToDisplay?.actual, "", "N/A")} secondNumber={safeNumberDisplay(economicEventToDisplay?.estimate, "", "N/A")} thirdNumber={safeNumberDisplay(economicEventToDisplay?.previous, "", "N/A")} fourthNumber={safeNumberDisplay(economicEventToDisplay?.change_percentage, "%", "N/A")} firstText={"Actual"} secondText={"Estimate"} thirdText={"Previous"} fourthText={"Diff from expected"} />
          }
        </div>

        <SinpleLineChart {...createHistoricalPerformance(performance)} />
      </>

    );
  };


  const createBenchmarkPerformance = (performance: PastEventSymbolPerformance | undefined): SinpleLineChartProps => {
    if (performance === undefined || !performance) {
      return {
        actual: [],
        expected: [],
        x_axis: [],
        actual_col_name: 'Actual',
        expected_col_name: 'Expected',
      };
    }
    const actual: number[] = [];
    const expected: number[] = [];
    const x_axis: string[] = [];
    for (let index = 0; index < performance.event_history.length; index++) {
      const event = performance.event_history[index];
      actual.push(parseFloat(performance.performance.in_1_hour[index].toFixed(2)));
      expected.push(parseFloat(performance.performance.in_1_day[index].toFixed(2)));
      x_axis.push(`${formatDateToMMDD(event.event_date)}`);
    }
    return {
      actual,
      expected,
      x_axis,
      actual_col_name: '1 Hour SPY Change',
      expected_col_name: '1 Day SPY Change',
    };

  }

  const renderSymbolPerformance = (performance: PastEventSymbolPerformance | undefined) => {
    if (loadingPastEventSymbolPerformance) {
      return <Spinner />;
    }
    if (performance.error) {
      return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
            <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
              Error loading the event!
            </h3>
          </div>
        </div>);
    }
    if (shouldRenderPastSymbolPerformance(performance)) {
      return (
        <>
        </>
      )
    }
    return (
      <>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
            <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
              {performance?.event}'s impact on S&P 500
            </h3>
          </div>
          <EconomicEventStat firstNumber={safeNumberDisplay(performance.performance.in_1_hour[performance.performance.in_1_hour.length - 1], "%", "N/A")} secondNumber={safeNumberDisplay(performance.performance.in_1_day[performance.performance.in_1_day.length - 1], "%", "N/A")} thirdNumber={safeNumberDisplay((performance.performance.in_1_hour.reduce((a, b) => a + b, 0) / performance.performance.in_1_hour.length), "%", "N/A")} fourthNumber={safeNumberDisplay((performance.performance.in_1_day.reduce((a, b) => a + b, 0) / performance.performance.in_1_day.length), "%", "N/A")} firstText={"Last 1 hour SPY change"} secondText={"Last 1 day SPY change"} thirdText={"Average 1 hour SPY change"} fourthText={"Average 1 day SPY change"} />
        </div>

        <SinpleLineChart {...createBenchmarkPerformance(performance)} />
      </>

    );
  };


  return (
    <DefaultLayout>
      {renderEconomicEventStat(eventSymbolPerformance, aiDescription, loadingAiDescription)}
      <br />
      {renderSymbolPerformance(eventSymbolPerformance)}
    </DefaultLayout>
  );
};

export default EventDetails;