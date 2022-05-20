import { useContext, useEffect, useReducer, useRef } from 'react';

import { CalendarEvent, Config, EventStyle } from '../../common/interface';
import { Context, Store } from '../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TABLE_DELIMITER_SPACE } from '../../common/constants';
import { EVENT_TYPE } from '../../common/enums';
import { EventButtonProps } from './EventButton.props';
import { MONTH_EVENT_HEIGHT } from 'kalend-layout/constants';
import { calculateHeaderAfterDrag, onMoveHeader } from './utils/draggingHeader';
import {
  calculateMonthEventAfterDrag,
  onMoveMonthEvent,
} from './utils/draggingMonth';
import {
  calculateNewTimeWeekDay,
  onMoveNormalEvent,
} from './utils/draggingWeek';
import {
  disableTouchDragging,
  eventButtonInitialState,
} from './EventButton.utils';
import { onFinishDraggingInternal } from './utils/draggingGeneral';
import { parseEventColor } from '../../utils/calendarDays';
import { useHeight } from '../../utils/layout';
import ButtonBase from '../buttonBase/ButtonBase';
import EventAgenda from './eventAgenda/EventAgenda';
import EventMonth from './eventMonth/EventMonth';
import EventNormal from './eventNormal/EventNormal';
import EventShowMoreMonth from './eventShowMoreMonth/EventShowMoreMonth';
import stateReducer from '../../utils/stateReducer';

// ref to cancel timout
let timeoutRef: any;

const EventButton = (props: EventButtonProps) => {
  const { item, type, day = DateTime.now(), index } = props;
  const { event } = item;
  const { startAt } = event;

  const [state, dispatchState]: any = useReducer(
    stateReducer,
    eventButtonInitialState
  );
  const setState = (stateName: string, data: any): void => {
    const payload: any = { stateName, data };
    dispatchState({ state, payload });
  };

  // store values as refs to access them in event listener
  const offsetTopRef = useRef(state.offsetTop);
  const offsetLeftRef = useRef(state.offsetLeft);
  const xShiftIndexRef = useRef(0);
  const yShiftIndexRef = useRef(0);
  const draggingRef = useRef(false);
  const eventWasChangedRef = useRef(false);

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { width, calendarDays, config, callbacks } = store as Store;

  const heightHook: number = useHeight();

  const { hourHeight, isDark } = config as Config;
  const { onEventClick, onEventDragFinish } = callbacks;

  const columnWidth: number =
    width / (type === EVENT_TYPE.MONTH ? 7 : calendarDays.length);
  const eventColor: string = event.color
    ? parseEventColor(event.color as string, isDark)
    : 'indigo';

  const style: EventStyle = {
    position:
      type === EVENT_TYPE.AGENDA || type === EVENT_TYPE.SHOW_MORE_MONTH
        ? 'relative'
        : 'absolute',
    height:
      state.height !== null ? state.height : item.height || MONTH_EVENT_HEIGHT,
    width: state.width !== null ? state.width : item.width || '100%',
    top: state.offsetTop !== null ? state.offsetTop : item.offsetTop,
    left: state.offsetLeft !== null ? state.offsetLeft : item.offsetLeft,
    zIndex: state.zIndex || item.zIndex,
    border: state.zIndex > 2 ? `solid 1px white` : `solid 1px ${eventColor}`,
    backgroundColor: eventColor,
    visibility: 'visible',
    // alignItems: meta?.centerText ? 'center' : 'inherit',
  };

  const handleEventClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (draggingRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      draggingRef.current = false;
      return;
    }

    if (onEventClick) {
      onEventClick(event);
    }
  };

  const setLayout = (layout: any) => {
    setState('initialTop', layout.offsetTop);
    setState('initialLeft', layout.offsetLeft);
    setState('offsetTop', layout.offsetTop);
    setState('offsetLeft', layout.offsetLeft);
    setState('drawingY', layout.offsetTop);
    setState('startAt', startAt);
    setState('width', layout.width);
    setState('height', layout.height);
    setState('zIndex', layout.zIndex);
    setState('border', layout.border);
    setState('meta', layout.meta);
  };

  useEffect(() => {
    setLayout(item);
    // initEventButtonPosition(type, props.day, event, store, setLayout, index);
  }, []);

  // useEffect(() => {
  //   initEventButtonPosition(type, props.day, event, store, setLayout, index);
  // }, [
  //   // @ts-ignore
  //   daysViewLayout?.[formatDateTimeToString(props.day || DateTime.now())]?.[
  //     event.id
  //   ],
  // ]);

  // useEffect(() => {
  //   initEventButtonPosition(type, props.day, event, store, setLayout, index);
  // }, [store.layoutUpdateSequence]);

  const initMove = () => {
    return
  };

  const onMove = (e: any) => {
    return
  };

  /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param e
   */
  const onMouseUp = (e: any) => {
    return
  };

  /**
   * Start event dragging on long press/touch
   * Set listeners
   * @param e
   */
  const onMouseDownLong = (e: any) => {
    return
  };

  /**
   * Initial long press click/touch on event
   * @param e
   */
  const onMouseDown = (e: any) => {
    return
  };

  return (
    <ButtonBase
      id={event.id}
      isDark={isDark}
      style={style}
      className={`Kalend__Event-${type} ${state.isDragging ? 'Kalend__EventButton__elevation' : ''
        }`}
      onClick={handleEventClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMove}
      onTouchEnd={onMouseUp}
    >
      {type === EVENT_TYPE.MONTH || type === EVENT_TYPE.HEADER ? (
        <EventMonth event={event} isDark={isDark} type={type} />
      ) : null}
      {type === EVENT_TYPE.NORMAL ? (
        <EventNormal
          event={event}
          isDark={isDark}
          type={type}
          meta={item.meta}
        />
      ) : null}
      {type === EVENT_TYPE.AGENDA ? (
        <EventAgenda event={event} isDark={isDark} type={type} />
      ) : null}
      {type === EVENT_TYPE.SHOW_MORE_MONTH ? (
        <EventShowMoreMonth event={event} isDark={isDark} type={type} />
      ) : null}
    </ButtonBase>
  );
};

export default EventButton;
