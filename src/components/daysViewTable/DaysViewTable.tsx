import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import { CALENDAR_VIEW } from '../../common/enums';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { DaysViewTableProps } from './DaysViewTable.props';
import {
  formatDateTimeToString,
  getSelectedViewType,
  getTableOffset,
} from '../../utils/common';
import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { useHeight, useWidth } from '../../utils/layout';
import CalendarBodyHours from './daysViewOneDay/calendarBodyHours/CalendarBodyHours';
import DaysViewOneDay from './daysViewOneDay/DaysViewOneDay';
import DaysViewVerticalLines from './daysViewVerticalLines/DaysViewVerticalLines';
import KalendLayout from 'kalend-layout';

const renderOneDay = (
  calendarDays: DateTime[],
  events: any,
  sequence?: number
) => {
  return calendarDays.map((calendarDay: DateTime, index: number) => {
    const formattedDayString: string = formatDateTimeToString(calendarDay);

    return (
      <DaysViewOneDay
        key={formattedDayString + sequence}
        day={calendarDay}
        index={index}
        data={events ? events[formattedDayString] : []}
      />
    );
  });
};

const DaysViewTable = (props: DaysViewTableProps) => {
  const { events } = props;

  const [wasInit, setWasInit] = useState(false);
  const [calendarContent, setCalendarContent] = useState(null);

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { isMobile, calendarDays, width, selectedView } = store;

  const height = useHeight();
  const widthHook = useWidth();

  const style: any = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    // width: '100%',
    height: '100%',
  };

   const adjustScrollPosition = () => {
     const currentElement: any = document.getElementById(`Kalend__timetable`);
  
     (currentElement.scrollTop = DateTime.now().hour * 60) - 60;
   };
  
   useEffect(() => {
     adjustScrollPosition();
   }, []);

  // const onPageChange = async (isGoingForward?: boolean) => {
  //   await getNewCalendarDays(calendarDays, selectedView, isGoingForward);
  // };

  const hasExternalLayout = props.eventLayouts !== undefined;

  // recalculate event positions on calendarDays change
  useLayoutEffect(() => {
    if (wasInit) {
      if (!hasExternalLayout) {
        KalendLayout({
          events,
          width,
          height,
          calendarDays,
          config: store.config,
          isMobile,
          selectedView,
        }).then((res: any) => {
          setContext('headerLayout', res.headerPositions);
          setContext('headerEventRowsCount', res.headerOffsetTop);
          setContext('daysViewLayout', res.normalPositions);
          setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

          const days: any = renderOneDay(
            store.calendarDays,
            res.normalPositions,
            undefined
          );
          setCalendarContent(days);
        });
      }
    }
  }, [calendarDays[0]]);

  useLayoutEffect(() => {
    if (wasInit) {
      if (!hasExternalLayout) {
        KalendLayout({
          events,
          width: widthHook - getTableOffset(selectedView),
          height,
          calendarDays,
          config: store.config,
          isMobile,
          selectedView,
        }).then((res: any) => {
          setContext('headerLayout', res.headerPositions);
          setContext('headerEventRowsCount', res.headerOffsetTop);
          setContext('daysViewLayout', res.normalPositions);
          setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

          const days: any = renderOneDay(
            store.calendarDays,
            res.normalPositions,
            store.layoutUpdateSequence + 1
          );
          setCalendarContent(days);
        });
      }
    }
  }, [widthHook]);

  useLayoutEffect(() => {
    if (!hasExternalLayout) {
      KalendLayout({
        events,
        width,
        height,
        calendarDays,
        config: store.config,
        isMobile,
        selectedView,
      }).then((res: any) => {
        setContext('headerLayout', res.headerPositions);
        setContext('headerEventRowsCount', res.headerOffsetTop);
        setContext('daysViewLayout', res.normalPositions);
        setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

        const days: any = renderOneDay(
          store.calendarDays,
          res.normalPositions,
          store.layoutUpdateSequence + 1
        );

        setCalendarContent(days);
      });
    }
  }, [JSON.stringify(events)]);

  useLayoutEffect(() => {
    if (!hasExternalLayout) {
      KalendLayout({
        events,
        width,
        height,
        calendarDays,
        config: store.config,
        isMobile,
        selectedView,
      }).then((res: any) => {
        setContext('headerLayout', res.headerPositions);
        setContext('headerEventRowsCount', res.headerOffsetTop);
        setContext('daysViewLayout', res.normalPositions);
        setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

        const days: any = renderOneDay(
          store.calendarDays,
          res.normalPositions,
          store.layoutUpdateSequence + 1
        );
        setCalendarContent(days);
      });
    }
    setWasInit(true);
  }, []);

  useLayoutEffect(() => {
    if (
      hasExternalLayout &&
      getSelectedViewType(props.eventLayouts.selectedView) ===
        CALENDAR_VIEW.WEEK
    ) {
      setContext('headerLayout', props.eventLayouts.headerPositions);
      setContext('headerEventRowsCount', props.eventLayouts.headerOffsetTop);
      setContext('daysViewLayout', props.eventLayouts.normalPositions);
      setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

      const days: any = renderOneDay(
        store.calendarDays,
        props.eventLayouts.normalPositions,
        store.layoutUpdateSequence + 1
      );
      setCalendarContent(days);
    }
  }, [props.eventLayouts, JSON.stringify(props.eventLayouts)]);

  return (
    // <Carousel onPageChange={onPageChange}>
    <div
      style={style}
      className={'Kalend__CalendarBody'}
      id={`Kalend__timetable`}
      // onScroll={handleScroll}
    >
      <CalendarBodyHours />
      <DaysViewVerticalLines />
      {calendarContent}
    </div>
    // </Carousel>
  );
};

export default DaysViewTable;
