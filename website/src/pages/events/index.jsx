import Layout from '@theme/Layout'
import './events.scss'
import { useState, useEffect } from 'react'
import { fetchGoogleCalendarEvents, fetchLumaEvents } from '../../tools/tools'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'

const Events = () => {
  const [lumaEvents, setLumaEvents] = useState([]);
  const [devEvents, setDevEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { siteConfig: { customFields } } = useDocusaurusContext();

  const lumaCalendarId = customFields.REACT_APP_LUMA_NEAR_CALENDAR_ID;

  const googleCalendarId = customFields.REACT_APP_DEVHUB_GOOGLE_CALENDAR_ID;
  const googleCalendarApiKey = customFields.REACT_APP_GOOGLE_CALENDAR_API_KEY;

  useEffect(() => {
    const fetchEvents = async () => {
      let { entries: lumaEvents } = await fetchLumaEvents(lumaCalendarId);
      let { items: googleEvents } = await fetchGoogleCalendarEvents(googleCalendarId, googleCalendarApiKey);

      lumaEvents = lumaEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
      googleEvents = googleEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

      setLumaEvents(lumaEvents);
      setDevEvents(googleEvents);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Layout title="Loading Events" description="Loading upcoming NEAR events...">
        <div className="loading-container">
          <h1>Loading Events...</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Events" description="Upcoming NEAR events and community gatherings">
      <div className="events-page">
        {/* Header Section */}
        <section className="py-5">
          <div className="container" style={{ maxWidth: '960px' }}>

            {/* Highlighted Event */}
            {lumaEvents.length > 0 && (
              <Card className="highlighted-event">
                <EventCard event={lumaEvents[0]} isHighlighted={true} />
              </Card>
            )}
            <div className="row events-grid py-4">
              {lumaEvents.slice(1).map((event) => (
                <div key={event.id} className="col-12 col-md-6 col-lg-4">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Events Section */}
        <section className="pb-5">
          <div className="container" style={{ maxWidth: '960px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-title">Community Events</h2>
            </div>

            {/* Community Events Grid */}
            <div className="row events-grid py-4">
              {devEvents.map((event) => (
                <div key={event.id} className="col-12 col-md-6 col-lg-4">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submit Event Section */}
        <section className="submit-event-section">
          <div className="container">
            <div className="submit-content">
              <h2>Hosting an event?</h2>
              <p>
                Do you want your NEAR community event posted here? Submit your event details via Luma to be considered.
              </p>
              <Button
                href="https://lu.ma/NEAR-community"
                target="_blank"
                variant="primary"
                size="large"
              >
                Submit Event
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

const EventCard = ({ event, isHighlighted = false }) => {
  if (isHighlighted) {
    return (
      <a href={event.url} target="_blank" rel="noopener noreferrer" className="cover-card">
        {event.thumbnail && (
          <div className="event-image">
            <img src={event.thumbnail} alt={event.title} />
          </div>
        )}

        <div className="d-flex flex-column">
          <h2 className="title h1 fw-medium mb-3" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {event.title}
          </h2>

          <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
            <div className="event-meta">
              <i className="ph-calendar-blank"></i>
              <span>{event.start}</span>
            </div>

            {event.location && (
              <div className="event-meta">
                <i className="ph-map-pin-line"></i>
                <span style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0
                }}>
                  {event.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }

  return (
    <Card 
      href={event.url}
      target="_blank"
      className="community-event"
      image={event.thumbnail && (
        <div className="event-image">
          <img src={event.thumbnail} alt={event.title} />
        </div>
      )}
      variant="image"
      title={event.title}
    >
      <div className="d-flex align-items-center gap-4">
        <div className="event-meta">
          <i className="ph-calendar-blank"></i>
          <span>{event.start}</span>
        </div>
      </div>
    </Card>
  );
};

export default Events