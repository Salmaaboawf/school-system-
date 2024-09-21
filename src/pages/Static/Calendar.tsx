import React from 'react'
import { Calendar } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';  // English locale
import '../../assets/calendar.css'
// @import '~react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';


function MyCalendar() {
    const events = [
        {
          title: 'Meeting',
          start: new Date(2024, 9, 20, 10, 0, 0), // 9 is the index of the month = october
          end: new Date(2024, 9, 20, 12, 0, 0),
        },
      ];
      
    const locales = { 'en-US': enUS };
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek: () => 6,  // Start the week on Saturday 6
        getDay,
        locales,
      });
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events} // Add your events here
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 , border: '1px solid #dee2e6', borderRadius: '8px'}}
        onNavigate={(date, view) => console.log('Navigated to', date, 'view', view)}  // Handle navigation
  onView={(view) => console.log('View changed to', view)}
      />
    </div>
  )
}

export default MyCalendar