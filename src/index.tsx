import { CALENDAR_VIEW } from './common/enums';
import {
  CalendarEvent,
  NewEventClickData,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
  OnPageChangeFunc,
  OnSelectViewFunc,
  PageChangeData,
  ShowMoreMonthFunc,
  Style,
} from './common/interface';
import { getNewCalendarDays } from './utils/getCalendarDays';
import { useEffect } from 'react';
import { validateProps, validateStyle } from './utils/validator';
import Calendar from './Calendar';
import ConfigLayer from './layers/ConfigLayer';
import DimensionsLayoutLayer from './layers/DimensionsLayoutLayer';
import LanguageLayer from './layers/LanguageLayer';
import RootLayoutLayer from './layers/RootLayoutLayer';
import StoreProvider from './context/store';

export const CalendarView = CALENDAR_VIEW;
export type { CalendarEvent };
export type OnEventClickData = CalendarEvent;
export type OnNewEventClickData = NewEventClickData;
export type OnPageChangeData = PageChangeData;
export type OnSelectViewData = CALENDAR_VIEW;
export type ShowMoreMonthData = CalendarEvent[];
export type OnEventDragFinish = OnEventDragFinishFunc;
export const getNewCalendarDaysHelper = getNewCalendarDays;

export interface KalendProps {
  initialDate?: string;
  initialView?: CALENDAR_VIEW;
  selectedView?: CALENDAR_VIEW;
  disabledViews?: CALENDAR_VIEW[];
  events?: any;
  isDark?: boolean;
  showTimeLine?: boolean;
  hourHeight?: number;
  onNewEventClick?: OnNewEventClickFunc;
  onEventClick?: OnEventClickFunc;
  onSelectView?: OnSelectViewFunc;
  showMoreMonth?: ShowMoreMonthFunc;
  onPageChange?: OnPageChangeFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  onStateChange?: any;
  disableMobileDropdown?: boolean;
  timezone?: string;
  weekDayStart?: string;
  timeFormat?: string;
  calendarIDsHidden?: string[];
  children?: any;
  language?: string;
  customLanguage?: any;
  eventLayouts?: any;
  kalendRef?: any;
  style?: Style;
}

const Kalend = (props: KalendProps) => {
  // basic validation
  useEffect(() => {
    validateProps(props);
    validateStyle();
  }, []);

  return (
    <div className={'Kalend__Calendar__root Kalend__main'}>
      <StoreProvider>
        <LanguageLayer
          language={props.language || 'en'}
          customLanguage={props.customLanguage}
        >
          <RootLayoutLayer>
            <ConfigLayer {...props}>
              <DimensionsLayoutLayer>
                <Calendar
                  kalendRef={props.kalendRef}
                  events={props.events}
                  eventLayouts={props.eventLayouts}
                  selectedView={props.selectedView}
                />
              </DimensionsLayoutLayer>
            </ConfigLayer>
          </RootLayoutLayer>
        </LanguageLayer>
      </StoreProvider>
    </div>
  );
};

export default Kalend;
