import { CalendarEvent } from '../../../common/interface';
import { EVENT_TYPE } from '../../../common/enums';
import EventSummary from '../components/eventSummary/EventSummary';

interface EventShowMoreMonthProps {
  event: CalendarEvent;
  isDark: boolean;
  type: EVENT_TYPE;
}

const EventShowMoreMonth = (props: EventShowMoreMonthProps) => {
  const { isDark, event, type } = props;

  return (
    <div className={'Kalend__EventShowMoreMonth__container'}>
      <EventSummary summary={event.summary} isDark={isDark} type={type} />
      {/*<EventTime isDark={isDark} event={event} type={type} />*/}
    </div>
  );
};

export default EventShowMoreMonth;
