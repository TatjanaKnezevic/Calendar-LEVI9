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
  const deleteEvent = async () => {
    const res = await fetch("/event", {
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const result = await res.json();

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
              <p className={styles.name}>Name of event: {ev.title}</p>
              <p className={styles.p}>
                Date and time of event: {ev.date} at {ev.time}
              </p>
              <div className={styles.p}>
                Description of event:{" "}
                <p className={styles.desc}>{ev.description}</p>
              </div>
              <div>Participants: {ev.participants.join(", ")}</div>
              <button className={styles.button} onClick={() => deleteEvent()}>
                Delete event
              </button>
              <button className={styles.button} onClick={() => router.back()}>
                Back
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
