import { CALENDAR_VIEW } from '../../common/enums';
import { Context } from '../../context/store';
import { useContext } from 'react';
import CalendarHeaderDays from './calendarHeaderDays/CalendarHeaderDays';
import CalendarHeaderEvents from './calendarHeaderEvents/CalendarHeaderEvents';

const CalendarHeader = () => {
  const [store] = useContext(Context);

  const { isDark, width, selectedView } = store;

  const isDayView: boolean = selectedView === CALENDAR_VIEW.DAY;
  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  return (
    <div
      className={`Kalend__CalendarHeader${!isMonthView ? '-tall' : ''}${
        isDayView ? '-day' : ''
      }${isMonthView ? '-small' : ''}${isDark ? '-dark' : ''}`}
    >
      <CalendarHeaderDays width={width} isMonthView={isMonthView} />
      {!isMonthView && store.headerLayout ? <CalendarHeaderEvents /> : null}
    </div>
  );
};

export default CalendarHeader;
