import { React, useState } from "react";
import { useRouter } from "next/router";
import useCalendar from "../../hooks/useCalendar";
import Form from "../Form";
import styles from "../../../styles/Calendar.module.css";

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
  const router = useRouter();
  const dateClickHandler = (date) => {
    console.log(date);
  };
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("1");

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
                      <td
                        key={col.date}
                        className={styles.td}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        <div
                          onDoubleClick={() => setShow(true)}
                          onClick={() => setDate(col.date)}
                        >
                          {col.value}.
                        </div>
                        <div></div>
                      </td>
                    ) : (
                      <td
                        key={col.date}
                        className={styles.td}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        <div
                          onDoubleClick={() => setShow(true)}
                          onClick={() => setDate(col.date)}
                        >
                          {col.value}.
                        </div>{" "}
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
        <Form show={show} date={date} onClose={() => setShow(false)} />
      </div>
    </>
  );
};

export default Calendar;
