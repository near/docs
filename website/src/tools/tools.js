export const fetchLumaEvents = async (lumaCalendarId) => {

  console.log('Fetching Luma Events from: Calendar ID:', lumaCalendarId);

  const res = await fetch(`https://tmp-docs-ai-service.onrender.com/api/calendar/${lumaCalendarId}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch Luma Calendar Data');
    return { entries: [], hasMore: false };
  }

  const { data } = await res.json();

  if (!data || !data.entries) {
    return { entries: [], hasMore: false };
  }

  let allEvents = data.entries;

  const sortedEvents = allEvents
    .sort((a, b) => new Date(a.event.start_at).getTime() - new Date(b.event.start_at).getTime())

  const formatLocation = (location) => {
    if (location.city || location.city_state) {
      return `${location.city ?? location.city_state}, ${location.country}`;
      // Luma API returns "mode" as "obfuscated" when the address is hidden
    } else if (location && location?.mode === 'obfuscated') {
      return 'Register to See Address';
    }
    return location.address;
  };

  const formattedEvents = sortedEvents.map((item) => {
    return {
      id: item.event.api_id,
      start: item.event.start_at,
      location: formatLocation(item.event.geo_address_json ?? item.event.geo_address_info ?? ''),
      thumbnail: item.event.cover_url,
      title: item.event.name,
      url: `https://lu.ma/${item.event.url}`,
    };
  });

  console.log('Luma Calendar Formatted Data:', formattedEvents);

  return { entries: formattedEvents, hasMore: data.has_more };
};

export const fetchGoogleCalendarEvents = async (googleCalendarId, googleCalendarApiKey) => {
  const startFrom = new Date().toISOString();

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${googleCalendarId}/events?key=${googleCalendarApiKey}&maxResults=9&timeMin=${startFrom}&singleEvents=true&orderBy=startTime`,
    {},
  );

  if (!res.ok) {
    console.error('Failed to fetch Google Calendar Data');
    return { items: [] };
  }

  let { items } = await res.json();

  // flatten the items
  items = [...items].flat();

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

  console.log('Google Calendar Formatted Data:', formattedEvents);


  return { items: formattedEvents };
};

export const formatEventDateTime = (dateString) => {
  // eg. Thu, 15 August 4:00 PM UTC
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

  return `${formattedDate} ${formattedTime} UTC`;
};

export const sortEventsByDate = (events) => {
  return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};

export const formatEvents = (events) => {
  return events.map((event) => {
    return { ...event, start: formatEventDateTime(event.start) };
  });
};