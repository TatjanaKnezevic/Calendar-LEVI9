import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useCalendar from "../../hooks/useCalendar";
import Form from "../Form";
import styles from "../../../styles/Calendar.module.css";
import Link from "next/link";

const Calendar = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();

  const dateClickHandler = (date) => {
    setDate(date);
    setId(
      events[events.length - 1].id == undefined
        ? 1
        : events[events.length - 1].id + 1
    );
  };

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("1");
  const [id, setId] = useState();

  useEffect(() => {
    async function getEvents() {
      const res = await fetch("/events");
      const data = await res.json();
      //console.log(data);
      setEvents([...data]);
    }
    getEvents();
  }, [show]);
  const checkForEvents = (date) => {
    const event_list = [];
    for (let ev of events) {
      if (ev.date == date) {
        event_list.push(ev);
      }
    }
    return event_list;
  };
  return (
    <>
      <div>
        <p className={styles.month}>
          {" "}
          Planer:{" "}
          {`${
            monthNames[selectedDate.getMonth()]
          } - ${selectedDate.getFullYear()}`}
        </p>
        <div className={styles.center}>
          <button className={styles.button} onClick={getPrevMonth}>
            Prev
          </button>
          <button className={styles.button} onClick={getNextMonth}>
            Next
          </button>
        </div>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              {daysShort.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(calendarRows).map((cols) => {
              return (
                <tr key={cols[0].date} className={styles.tr}>
                  {cols.map((col) =>
                    col.date === todayFormatted ? (
                      <td key={col.date} className={styles.tdToday}>
                        <div
                          onDoubleClick={() => setShow(true)}
                          onClick={() => dateClickHandler(col.date)}
                        >
                          {col.value}.
                        </div>
                        <div>
                          {checkForEvents(col.date).map((ev) => {
                            return (
                              <Link href={`/events/${ev.id}`} key={ev.id}>
                                <p
                                  className={styles.link}
                                  onClick={() => router.push("/events")}
                                  key={"p" + ev.id}
                                >
                                  {ev.title}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      </td>
                    ) : (
                      <td key={col.date} className={styles.td}>
                        <div
                          onDoubleClick={() => setShow(true)}
                          onClick={() => dateClickHandler(col.date)}
                        >
                          {col.value}.
                        </div>
                        <div>
                          {checkForEvents(col.date).map((ev) => {
                            return (
                              <Link href={`/events/${ev.id}`} key={ev.id}>
                                <p
                                  className={styles.link}
                                  onClick={() => router.push("/events")}
                                  key={"p" + ev.id}
                                >
                                  {ev.title}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      </td>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.form}>
        <Form
          show={show}
          date={date}
          id={id}
          onClose={() => {
            setShow(false);
          }}
        />
      </div>
      <div></div>
    </>
  );
};

export default Calendar;
