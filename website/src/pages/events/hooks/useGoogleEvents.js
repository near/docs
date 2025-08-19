import { useEffect, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { fetchGoogleCalendarEvents } from '../tools';

export function useGoogleEvents(calendarId, limit = 9) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  
  const [googleEvents, setGoogleEvents] = useState([]);

  const startFrom = useMemo(() => {
    return new Date().toISOString();
  }, []);

  const loadData = async () => {
    try {
      const googleCalendarApiKey = customFields.REACT_APP_GOOGLE_CALENDAR_API_KEY || '';
      const { items } = await fetchGoogleCalendarEvents(calendarId, startFrom, limit, '', googleCalendarApiKey);

      const formattedEvents = items.map((event) => {
        return {
          id: event.id,
          title: event.summary,
          start: event.start.dateTime,
          thumbnail: `https://lh3.googleusercontent.com/d/${event.attachments?.[0]?.fileId}=w1000`,
          location: '',
          url: event.htmlLink,
        };
      });

      setGoogleEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { googleEvents };
}
