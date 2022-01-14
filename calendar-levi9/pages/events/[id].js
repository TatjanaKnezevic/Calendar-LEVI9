import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/globals.module.css";

const Events = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ev, setEvent] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const res = await fetch(`/eventById/9`);
      const data = await res.json();
      setEvent([...data]);
    }
    getEvents();
  }, []);
  const checkForEvents = () => {
    const event_list = [];
    for (let event of ev) {
      event_list.push(event);
    }
    return event_list;
  };

  return (
    <div className={styles.background}>
      <div className={styles.l}>
        {checkForEvents().map((ev) => {
          return (
            <div
              key={"div" + ev.title + ev.date}
              className={(styles.background, styles.planer)}
            >
              <p>Name of event: {ev.title}</p>
              <p>
                Date and time of event: {ev.date} {ev.time}
              </p>
              <p>Description of event: {ev.description}</p>
              <div>Participants: {ev.participants}</div>
              <button className={styles.button}> Delete event</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
