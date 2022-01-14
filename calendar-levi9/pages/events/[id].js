import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/globals.module.css";

const Events = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ev, setEvent] = useState([]);

  useEffect(() => {
    async function getEvents() {
      if (id != undefined) {
        const res = await fetch(`/eventById/${id.toString()}`);
        const data = await res.json();
        setEvent([...data]);
      }
    }
    getEvents();
  }, [id]);
  const checkForEvents = () => {
    const event_list = [];
    for (let event of ev) {
      event_list.push(event);
    }
    return event_list;
  };
  const deleteEvent = () => {
    console.log("obrisati");
    router.back();
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
              <div>Participants: {ev.participants.join(", ")}</div>
              <button className={styles.button} onClick={() => deleteEvent()}>
                Delete event
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
