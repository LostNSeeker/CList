
import "./Events.css";

const Events = () => {
  const eventList = [
    {
      company: "Google",
      events: [
        "Google Summer of Code (GSoC)",
        "Google Code Jam",
        "Google Hash Code",
        "Google Arcade",
        "Google Cloud Hero",
        "Google Kick Start",
        "Google Women Techmakers Scholars Program",
        "Google Cloud Skills Boost Challenges",
        "Google Developer Student Clubs Solution Challenge",
        "Google Developer Days India",
        "Google TensorFlow Challenge",
        "Google Cloud Jam",
        "Google Firebase Hackathon",
        "Google Assistant Developer Challenge",
        "Google AI for Social Good Challenge",
        "Google Chrome Developer Summit Contests",
        "Google Flutter Festivals",
        "Google AI Residency Program Contest",
        "Google Responsible AI Contest",
        "Google AI Impact Challenge",
      ],
    },
    {
      company: "Meta",
      events: [
        "Meta Hacker Cup",
        "Meta Developer Circles Community Challenge",
        "Facebook PyTorch Global Hackathon",
        "Meta AI Research Scientist Internship Challenges",
        "Facebook Messenger Bot Hackathon",
        "Meta Reality Labs Innovation Challenge",
        "Meta Bug Bounty Program",
        "Facebook AR/VR Hackathon",
        "Meta Blueprint Certification Challenges",
        "Meta Data Challenge",
        "Meta Spark AR Hackathon",
        "Meta Reality Labs Scholarship Hackathon",
      ],
    },
    {
      company: "Amazon",
      events: [
        "Amazon Alexa Skills Challenge",
        "Amazon CodeWhisperer Challenge",
        "Amazon Web Services (AWS) DeepRacer League",
        "Amazon ML Challenge",
        "Amazon Build It Challenge",
        "Amazon Alexa AI Tech Challenge",
        "Amazon Robotics Challenge",
        "Amazon Code Guru AI Challenge",
        "Amazon Quantum Solutions Lab Challenge",
        "Amazon DeepLens Challenge",
        "Amazon Personalize Challenge",
        "Amazon Code Catalyst Competition",
      ],
    },
    {
      company: "Apple",
      events: [
        "Apple Swift Student Challenge",
        "Apple WWDC Scholarship",
        "Apple Security Bounty Challenge",
        "Apple App Design Contest",
      ],
    },
    {
      company: "Netflix",
      events: [],
    },
  ];

  return (
    <div className="events-container">
      <h1 className="events-title">MAANG Competitions</h1>
      <div className="events-list">
        {eventList.map((company, index) => (
          <div key={index} className="company-section">
            <h2 className="company-title">{company.company}</h2>
            <ul className="event-items">
              {company.events.length > 0 ? (
                company.events.map((event, idx) => (
                  <li key={idx} className="event-item">
                    {event}
                  </li>
                ))
              ) : (
                <li className="event-item empty">No events available</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
