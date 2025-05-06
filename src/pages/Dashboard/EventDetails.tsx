import { useParams } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { useState, useEffect } from "react";
import { PastEventSymbolPerformance } from "../../models/economic_events";
import { BACKEND_URL } from "../../gobal/constants";
import SinpleLineChart from "../../newComponents/SinpleLineChart";
import EconomicEventStat from "../../newComponents/economicEventStat";

const EventDetails = () => {

    const { event } = useParams();
    console.log(event);
    const [eventSymbolPerformance, setEventSymbolPerformance] = useState<PastEventSymbolPerformance>(null);

    useEffect(() => {
        const fetchEventSymbolPerformance = async () => {
            const response = await fetch(`${BACKEND_URL}/economic-events-symbol-performance/${event}/SPY`);
            const data = await response.json();
            const pastEventSymbolPerformance = data as PastEventSymbolPerformance;
            setEventSymbolPerformance(pastEventSymbolPerformance);
        };
        fetchEventSymbolPerformance();
    }, [event]);

    function formatDateToMMDD(date: String): string {
        console.log(date);
        return date.substring(0,10);
      }

    const createHistoricalPerformance = (performance: PastEventSymbolPerformance | undefined): SinpleLineChartProps => {
        if (performance === undefined || !performance) {
          return {
            actual: [],
            expected: [],
            x_axis: [],
          };
        }
        const actual: number[] = [];
        const expected: number[] = [];
        const x_axis: string[] = [];
        for (const retrieved_event of performance.event_history) {
          if (retrieved_event.actual !== undefined && retrieved_event.estimate !== undefined && retrieved_event.event_date !== undefined) {
            actual.push(retrieved_event.actual);
            expected.push(retrieved_event.estimate);
            x_axis.push(`${formatDateToMMDD(retrieved_event.event_date)}`);
          }
        }
        return {
          actual,
          expected,
          x_axis,
        };
      }

    const renderEconomicEventStat = (performance: PastEventSymbolPerformance | undefined) => {
        if (performance === undefined || !performance) {
          return <div>Loading...</div>;
        }
        if (performance.error) {
          return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
              <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
                The specified event was not found!
              </h3>
            </div>
          </div>);
        }
        const lastEconomicEvent = performance?.event_history[performance?.event_history.length - 1];
        return (
          <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
                <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
                  {performance?.event}
                </h3>
              </div>
              <EconomicEventStat events={lastEconomicEvent} />
            </div>
              <SinpleLineChart {...createHistoricalPerformance(performance)} />
          </>
        );
      };

    
    return (
        <DefaultLayout>
            {renderEconomicEventStat(eventSymbolPerformance)}
        </DefaultLayout>
    );
};

export default EventDetails;