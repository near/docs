import Layout from '@theme/Layout'
import { useEvents } from './hooks/useEvents'
import './events.scss'

const EventCard = ({ event, isHighlighted = false }) => {
  const cardClass = isHighlighted ? 'cover-card' : 'community-event'
  
  return (
    <a href={event.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
      <div className="event-image">
        <img src={event.thumbnail} alt={event.title} />
      </div>
      
      {!isHighlighted && (
        <>
          <h3 className="h5 fw-medium mb-2">{event.title}</h3>
          <div className="d-flex align-items-center gap-4">
            <div className="event-meta">
              <i className="ph-calendar-blank"></i>
              <span>{event.start}</span>
            </div>
          </div>
        </>
      )}
      
      {isHighlighted && (
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
      )}
    </a>
  )
}

const Events = () => {
  const { 
    highlightedEvent, 
    communityEvents, 
    fetchMore, 
    lastElements, 
    hasMoreEvents, 
    hackatons 
  } = useEvents()
  
  return (
    <Layout title="Events" description="Upcoming NEAR events and community gatherings">
      <div className="events-page">
        {/* Header Section */}
        <section className="py-5">
          <div className="container" style={{ maxWidth: '960px' }}>
            <div className="py-3">
              <h1 className="section-title">Upcoming Events</h1>
            </div>

            {/* Highlighted Event */}
            {highlightedEvent && (
              <div className="highlighted-event">
                <EventCard event={highlightedEvent} isHighlighted={true} />
              </div>
            )}

            {/* Featured Events - 3 cards with same width as highlighted event */}
            {hackatons && hackatons.length > 0 && (
              <div className="featured-events-section">
                <h2 className="section-title featured-section-title">Featured Events</h2>
                <div className="featured-events-grid">
                  {hackatons.slice(0, 3).map((event) => (
                    <div key={event.id} className="featured-event-card">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hackathons Grid - remaining events */}
            {hackatons && hackatons.length > 3 && (
              <div className="row hackatons-grid py-4">
                {hackatons.slice(3).map((event) => (
                  <div key={event.id} className="col-12 col-md-6">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
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
              {communityEvents.map((event) => (
                <div key={event.id} className="col-12 col-md-6 col-lg-4">
                  <EventCard event={event} />
                </div>
              ))}

              {lastElements.map((event) => (
                <div key={event.id} className="col-12 col-md-6 col-lg-4">
                  <div className="fade-in">
                    <EventCard event={event} />
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreEvents && (
              <button 
                className="btn btn-primary load-more-btn"
                onClick={fetchMore}
              >
                Load More
              </button>
            )}
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
              <a 
                href="https://lu.ma/NEAR-community" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Submit Event
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Events