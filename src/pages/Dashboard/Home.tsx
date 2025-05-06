import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableFive from '../../components/Tables/TableFive';
import TableSix from '../../components/Tables/TableSix';
import DefaultLayout from '../../layout/DefaultLayout';
import LatestTransaction from '../../components/Stocks/LatestTransaction';
import { useEffect, useState } from 'react';
import { EconomicEvent, EconomicEventForWeek, PastEventSymbolPerformance, SymbolPerformance } from '../../models/economic_events';
import { BACKEND_URL } from '../../gobal/constants';
import SinpleLineChart, { SinpleLineChartProps } from '../../newComponents/SinpleLineChart';
import BasicVsActualChart from '../../newComponents/ExpectedVsActualChart';
import EconomicEventStat, { EconomicEventStatProps } from '../../newComponents/economicEventStat';
import EconomicEventsTable from '../../newComponents/EconomicEventsTable';
import Spinner from '../../newComponents/Spinner';

const Home = () => {
  const [economicEvents, setEconomicEvents] = useState<EconomicEventForWeek[]>([]);
  const [pastEventSymbolPerformance, setPastEventSymbolPerformance] = useState<PastEventSymbolPerformance>();
  const [loadingEconomicEvents, setLoadingEconomicEvents] = useState(true);
  const [loadingPastEventSymbolPerformance, setLoadingPastEventSymbolPerformance] = useState(true);

  useEffect(() => {
    const fetchEconomicEvents = async () => {
      // Enable cors fetch
      const response = await fetch(`${BACKEND_URL}/economic-events-weekly/US`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();
      // covert the data to the EconomicEvent type
      const economicEvent = data as EconomicEventForWeek[];
      setEconomicEvents(economicEvent);
      setLoadingEconomicEvents(false);
    };

    const fetchPastEventSymbolPerformance = async () => {
      const response = await fetch(`${BACKEND_URL}/economic-events-symbol-performance-default`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();
      const pastEventSymbolPerformance = data as PastEventSymbolPerformance;
      setPastEventSymbolPerformance(pastEventSymbolPerformance);
      setLoadingPastEventSymbolPerformance(false);
    };

    fetchEconomicEvents();
    fetchPastEventSymbolPerformance();
  }, []);

  const renderEconomicEventList = (eventsForWeek: EconomicEventForWeek[] | undefined) => {
    // if loadingPastEventSymbolPerformance is true, return a loading spinner
    if (!eventsForWeek || eventsForWeek.length === 0) {
      return <Spinner />;
    }
    console.log(eventsForWeek);
    return (
      <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
          <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
            Economic Calendar This Week
          </h3>
        </div>
      </div>
        <EconomicEventsTable economicEvents={eventsForWeek[1].monday} dayOfWeek={"Monday"} firstTable={true} />
        <EconomicEventsTable economicEvents={eventsForWeek[1].tuesday} dayOfWeek={"Tuesday"} firstTable={false} />
        <EconomicEventsTable economicEvents={eventsForWeek[1].wednesday} dayOfWeek={"Wednesday"} firstTable={false} />
        <EconomicEventsTable economicEvents={eventsForWeek[1].thursday} dayOfWeek={"Thursday"} firstTable={false} />
        <EconomicEventsTable economicEvents={eventsForWeek[1].friday} dayOfWeek={"Friday"} firstTable={false} />
      </>
    );
  };
  function formatDateToMMDD(date: String): string {
    console.log(date);
    return date.substring(0,10);
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
        if (event.actual !== undefined && event.estimate !== undefined && event.event_date !== undefined) {
          actual.push(parseFloat(performance.performance.in_1_hour[index].toFixed(2)));
          expected.push(parseFloat(performance.performance.in_1_day[index].toFixed(2)));
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
        if (event.actual !== undefined && event.estimate !== undefined && event.event_date !== undefined) {
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

  const renderEconomicEventStat = (performance: PastEventSymbolPerformance | undefined) => {
    if (performance === undefined || !performance) {
      return <Spinner />;
    }
    if (performance.error) {
      return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
          <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
            No important events in US today!
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
              Today's Key Economic Event: {performance?.event}
            </h3>
          </div>
          {
            (shouldRenderPastSymbolPerformance(performance)) ? 
              <EconomicEventStat firstNumber={performance.performance.in_1_hour[performance.performance.in_1_hour.length - 1].toFixed(2) + "%"} secondNumber={performance.performance.in_1_day[performance.performance.in_1_day.length - 1].toFixed(2) + "%"} thirdNumber={(performance.performance.in_1_hour.reduce((a, b) => a + b, 0) / performance.performance.in_1_hour.length).toFixed(2) + "%"} fourthNumber={(performance.performance.in_1_day.reduce((a, b) => a + b, 0) / performance.performance.in_1_day.length).toFixed(2) + "%"} firstText={"Last 1 hour SPY change"} secondText={"Last 1 day SPY change"} thirdText={"Average 1 hour SPY change"} fourthText={"Average 1 day SPY change"} />
            :
              <EconomicEventStat firstNumber={lastEconomicEvent?.actual.toFixed(2)} secondNumber={lastEconomicEvent?.estimate.toFixed(2)} thirdNumber={lastEconomicEvent?.previous.toFixed(2)} fourthNumber={lastEconomicEvent?.change_percentage.toFixed(2)} firstText={"Actual"} secondText={"Estimate"} thirdText={"Previous"} fourthText={"Diff from expected"} />
          }
        </div>
        
          <SinpleLineChart {...createHistoricalPerformance(performance)} />
      </>

    );
  };

  return (
    <DefaultLayout>
      {renderEconomicEventStat(pastEventSymbolPerformance)}
      <br />
      {renderEconomicEventList(economicEvents)}
    </DefaultLayout>
  );
};

export default Home;
