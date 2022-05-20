# Kalend - calendar component for React

- multiple views (day, three days, week, month, agenda)
- events
- drag and drop (only mouse events)
- mobile friendly

### Versioning
Until stable version 1 updates might include breaking changes  

**Breaking changes**:
- 0.6.5 -> 0.7.0 - Kalend now accepts only array of events, you don't need to format them to dates like before
    
# Links
### Documentation: https://docs.kalend.org

### LIVE demo: https://demo.kalend.org

### Storybook: https://storybook.kalend.org  
  
  
#

![Alt text](screenshot.png?raw=true 'Title')

#

If given interface and controls is not enough for you, you can use callbacks to access internal state and expand functionality to your ui.

If you have any suggestion, feel free to open discussion or contact me directly at hello@nibdo.com

# Install

    npm i kalend

# Example

    import Kalend, { CalendarView } from 'kalend' // import component
    import 'kalend/dist/styles/index.css'; // import styles

        <Kalend
          onEventClick={onEventClick}
          onNewEventClick={onNewEventClick}
          events={[]}
          initialDate={new Date().toISOString()}
          hourHeight={60}
          initialView={CalendarView.WEEK}
          disabledViews={[CalendarView.DAY]}
          onSelectView={onSelectView}
          selectedView={selectedView}
          onPageChange={onPageChange}
          timeFormat={'24'}
          weekDayStart={'Monday'}
          calendarIDsHidden={['work']}
          language={'en'}
        />

### Events

Before passing events to calendar, adjust data to this format:

    const events = [
            {
                id: 1,
                startAt: '2021-11-21T18:00:00.000Z',
                endAt: '2021-11-21T19:00:00.000Z',
                timezoneStartAt: 'Europe/Berlin', // optional
                summary: 'test',
                color: 'blue',
                calendarID: 'work'
            },
            {
                id: 2,
                startAt: '2021-11-21T18:00:00.000Z',
                endAt: '2021-11-21T19:00:00.000Z',
                timezoneStartAt: 'Europe/Berlin', // optional
                summary: 'test',
                color: 'blue',
            }
        ]

According to your needs, you can set timezone for each event and also set default timezone with "timezone" prop in IANA format.
If you don't provide timezone prop, your system default timezone will be used.

You can keep other event properties, those will be ignored.
