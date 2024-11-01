import { useState, useEffect } from "react";
import Papa from "papaparse";
import "./Events.css";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    Papa.parse("/MAANG_events.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setEventsData(result.data);
        setFilteredEvents(result.data); // Initialize with all events
      },
    });
  }, []);

  // Handle category selection
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

  return (
    <div className="events-container">
      <h2>MAANG EVENTS</h2> {/* Heading added here */}
      <label htmlFor="category-select">Filter by Company:</label>
      <select
        id="category-select"
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Google">Google</option>
        <option value="Meta">Meta</option>
        <option value="Amazon">Amazon</option>
        <option value="Apple">Apple</option>
        <option value="Netflix">Netflix</option>
        {/* Add more categories as needed */}
      </select>

      <EventList events={filteredEvents} />
    </div>
  );
};

// Modal component
const EventModal = ({ event, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>{event['Event Name']}</h2>
      <p><strong>Time:</strong> {event['Time']}</p>
      <p><strong>Venue:</strong> {event['Venue']}</p>
      <p><strong>Stacks Needed:</strong> {event['Stacks Needed']}</p>
      <p><strong>Rewards:</strong> {event['Rewards']}</p>
      <a href={event['Website Link']} target="_blank" rel="noopener noreferrer">
        Event Website
      </a>
      <p><strong>YT Related:</strong> {event['YT Related']}</p>
      <p>{event['About']}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

// The EventList component remains the same, taking the filteredEvents as props
const EventList = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="ul-div">
      <ul className="event-name-list">
        {events.map((event, index) => (
          <li key={index} onClick={() => openModal(event)}>
            {event["Event Name"]}
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeModal} />
      )}
    </div>
  );
};

export default Events;
