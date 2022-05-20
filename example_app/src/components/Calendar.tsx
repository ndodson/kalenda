import React, { useEffect, useState } from 'react';
import { generateDemoEvents } from '../utils/helper';
import { DateTime } from 'luxon';
import Kalend, { CalendarView, OnEventDragFinish } from 'kalend';
import 'kalend/dist/styles/index.css';

const CalendComponent = (props: any) => {
  const [demoEvents, setDemoEvents] = useState({});

  // Create and load demo events
  useEffect(() => {
    setDemoEvents(generateDemoEvents(DateTime.now(), 80));
  }, []);

  const onNewEventClick = (data: any) => {
    const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
      hour: data.hour,
      day: data.day,
      event: 'click event ',
    })}`;
    console.log(msg);
  };

  // Callback for event click
  const onEventClick = (data: any) => {
    const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(
      data
    )}`;
    console.log(msg);
  };

  // Callback after dragging is finished
  const onEventDragFinish: OnEventDragFinish = (
    prev: any,
    current: any,
    data: any
  ) => {
    setDemoEvents(data);
  };

  return (
    <Kalend
      kalendRef={props.kalendRef}
      showTimeLine={true}
      onNewEventClick={onNewEventClick}
      initialView={CalendarView.THREE_DAYS}
      disabledViews={[]}
      onEventClick={onEventClick}
      events={demoEvents}
      initialDate={new Date().toISOString()}
      hourHeight={60}
      timeFormat="12"
    />
  );
};

export default CalendComponent;
