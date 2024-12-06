import { useState, useEffect } from "react";
import Papa from "papaparse";
import "./Events.css";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    Papa.parse("/MAANG_events.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setEventsData(result.data);
        setFilteredEvents(result.data);
      },
    });
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(
        eventsData.filter((event) => event.Company === selectedCategory)
      );
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="events-container">
      <div className="event-header">
        <h2>Events</h2>
        <div className="filter-controls">
          
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Google">Google</option>
            <option value="Meta">Meta</option>
            <option value="Amazon">Amazon</option>
            <option value="Apple">Apple</option>
            <option value="Netflix">Netflix</option>
          </select>
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-4 rounded  sm:w-auto "
          onClick={() => (window.location.href = "/events")}
        >
          View All
        </button>
        </div>
      </div>

      <div className="event-list">
        {filteredEvents.map((event, index) => (
          <div key={index} className="event-item" onClick={() => openModal(event)}>
            <div className="event-details">
              <h3>{event["Event Name"]}</h3>
              <p>
                <span className="icon-mode" title="Mode">🖥️</span> {event.Venue}
                <span className="icon-time" title="Time" style={{ marginLeft: '20px' }}>⏳ {event.Time}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
    </div>
  );
};

// Modal Component
const EventModal = ({ event, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>{event["Event Name"]}</h2>
      <p>
        <strong>Time:</strong> {event.Time}
      </p>
      <p>
        <strong>Mode:</strong> {event.Venue}
      </p>
      <p>
        <strong>Stacks Needed:</strong> {event["Stacks Needed"]}
      </p>
      <p>
        <strong>Rewards:</strong> {event.Rewards}
      </p>
      <a href={event["Website Link"]} target="_blank" rel="noopener noreferrer">
        Event Website
      </a>
      <p>
        <strong>YT Related:</strong> {event["YT Related"]}
      </p>
      <p>{event["About"]}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Events;


