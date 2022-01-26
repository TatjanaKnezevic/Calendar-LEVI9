import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Form from "../Form";
import styles from "./Calendar.module.css";
import Link from "next/link";

const Calendar = () => {
  const daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const todayFormatted = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedMonthLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );
  const prevMonthLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0
  );
  const daysInMonth = selectedMonthLastDate.getDate();
  const firstDayInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint =
    prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;
  const rows = 6;
  const cols = 7;
  const calendarRows = {};

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      if (!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if (i === 1) {
        if (j < startingPoint) {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: "in-prev-month",
              date: `${prevMonthStartingPoint}-${
                selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()
              }-${
                selectedDate.getMonth() === 0
                  ? selectedDate.getFullYear() - 1
                  : selectedDate.getFullYear()
              }`,
              value: prevMonthStartingPoint,
            },
          ];
          prevMonthStartingPoint++;
        } else {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: "",
              date: `${currentMonthCounter}-${
                selectedDate.getMonth() + 1
              }-${selectedDate.getFullYear()}`,
              value: currentMonthCounter,
            },
          ];
          currentMonthCounter++;
        }
      } else if (i > 1 && currentMonthCounter < daysInMonth + 1) {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: "",
            date: `${currentMonthCounter}-${
              selectedDate.getMonth() + 1
            }-${selectedDate.getFullYear()}`,
            value: currentMonthCounter,
          },
        ];
        currentMonthCounter++;
      } else {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: "in-next-month",
            date: `${nextMonthCounter}-${
              selectedDate.getMonth() + 2 === 13
                ? 1
                : selectedDate.getMonth() + 2
            }-${
              selectedDate.getMonth() + 2 === 13
                ? selectedDate.getFullYear() + 1
                : selectedDate.getFullYear()
            }`,
            value: nextMonthCounter,
          },
        ];
        nextMonthCounter++;
      }
    }
  }

  const getPrevMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1)
    );
  };

  const getNextMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1)
    );
  };

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
