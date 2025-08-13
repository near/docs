import { useCallback, useEffect, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { formatEvents, sortEventsByDate } from '../tools';

import { useGoogleEvents } from './useGoogleEvents';
import { useLumaEvents } from './useLumaEvents';

const LIMIT = 6;

export function useEvents() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();   
  
  const devhubCommunityCalendarId = customFields.REACT_APP_DEVHUB_COMMUNITY_CALENDAR_ID || '';
  const lumaDevHubHacksCalendarId = customFields.REACT_APP_LUMA_DEVHUB_HACKS_CALENDAR_ID || '';
  const lumaNearAICalendarId = customFields.REACT_APP_LUMA_NEAR_AI_CALENDAR_ID || '';
  const lumaNearCalendarId = customFields.REACT_APP_LUMA_NEAR_CALENDAR_ID || '';
  const lumaNearHZNCalendarId = customFields.REACT_APP_LUMA_NEAR_HZN_CALENDAR_ID || '';
  const nearTownHallCalendarId = customFields.REACT_APP_NEAR_TOWN_HALL_CALENDAR_ID || '';
  console.log(lumaNearCalendarId);
  
  const { lumaEvents: mainEvents } = useLumaEvents([lumaNearCalendarId, lumaDevHubHacksCalendarId], 1);
  const { lumaEvents: hackatons } = useLumaEvents([lumaDevHubHacksCalendarId], 12);
  const { lumaEvents: otherLumaEvents } = useLumaEvents(
    [lumaNearAICalendarId, lumaNearHZNCalendarId, nearTownHallCalendarId],
    12,
  );
  const { googleEvents } = useGoogleEvents(devhubCommunityCalendarId, 100);
  console.log(googleEvents);
  
  const [lastElements, setLastElements] = useState([]);
  const [communityEvents, setCommunityEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const hasMoreEvents = useMemo(
    () => communityEvents.length + lastElements.length < allEvents.length,
    [communityEvents, lastElements, allEvents],
  );

  const fetchMore = useCallback(() => {
    const skipFrom = communityEvents.length + lastElements.length;
    const skipTo = skipFrom + LIMIT;
    const nextEvents = allEvents.slice(skipFrom, skipTo);

    setCommunityEvents([...communityEvents, ...lastElements]);
    setLastElements(nextEvents);
  }, [allEvents, communityEvents, lastElements]);

  useEffect(() => {
    const sortedEvents = sortEventsByDate([...googleEvents, ...otherLumaEvents]);
    const formattedEvents = formatEvents(sortedEvents);
    setAllEvents(formattedEvents);
    setCommunityEvents(formattedEvents.slice(0, LIMIT));
    setLastElements([]);
  }, [googleEvents, otherLumaEvents]);

  const highlightedEvent = mainEvents[0];

  return {
    highlightedEvent,
    communityEvents,
    hasMoreEvents,
    fetchMore,
    lastElements,
    hackatons,
  };
}