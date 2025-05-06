import { EconomicEventWithDayOfWeek } from '../models/economic_events';

const EconomicEventsTable = (props: { economicEvents: EconomicEventWithDayOfWeek[] | undefined, dayOfWeek: string | undefined, firstTable: boolean }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    {props.dayOfWeek}
                </h4>
            </div>
            {props.firstTable ? (<div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Event</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                    <p className="font-medium">Release time</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Actual</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Estimate</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Previous</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">History</p>
                </div>
            </div>) : (<div></div>)}


            {props.economicEvents?.map((event, key) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={key}
                >
                    <div className="col-span-2 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <p className="text-sm text-black dark:text-white">
                                {event.event}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {event.event_date.substring(11, 16)}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {event.actual}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{event.estimate}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{event.previous}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <button className="text-sm text-meta-3" onClick={() => window.location.href = `/event-history/${event.event}`}>View History</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EconomicEventsTable;
