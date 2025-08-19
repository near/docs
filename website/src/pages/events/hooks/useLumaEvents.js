import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const aiEventsUrl = 'https://lu.ma';

import { fetchLumaEvents } from '../tools';

export function useLumaEvents(calendarApiIds, limit = 3) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  
  const [lumaEvents, setLumaEvents] = useState([]);
  const [hasMoreEvents, setHasMoreEvents] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lumaApiUrl = 'http://localhost:5000';
        const allEvents = await Promise.all(calendarApiIds.map((id) => fetchLumaEvents(id, limit, 0, lumaApiUrl)));

        const combinedEvents = allEvents.flatMap((result) => result.entries);

        const sortedEvents = [...combinedEvents]
          .sort((a, b) => new Date(a.event.start_at).getTime() - new Date(b.event.start_at).getTime())
          .slice(0, limit);

        const formattedEvents = sortedEvents.map((item) => {
          return {
            id: item.event.api_id,
            start: item.event.start_at,
            location: formatLocation(item.event.geo_address_json ?? item.event.geo_address_info ?? ''),
            thumbnail: item.event.cover_url,
            title: item.event.name,
            url: `${aiEventsUrl}/${item.event.url}`,
          };
        });

        setLumaEvents(formattedEvents);
        setHasMoreEvents(combinedEvents.length > limit);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(calendarApiIds), limit]);

  const formatLocation = (location) => {
    if (location.city || location.city_state) {
      return `${location.city ?? location.city_state}, ${location.country}`;
      // Luma API returns "mode" as "obfuscated" when the address is hidden
    } else if (location && location?.mode === 'obfuscated') {
      return 'Register to See Address';
    }
    return location.address;
  };

  return {
    lumaEvents,
    hasMoreEvents,
  };
}