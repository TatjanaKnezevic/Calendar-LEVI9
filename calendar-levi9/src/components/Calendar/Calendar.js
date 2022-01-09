import React from "react";
import useCalendar from "../../hooks/useCalendar";
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

  const dateClickHandler = (date) => {
    console.log(date);
  };

  return (
    <>
      <div>
        <p className={styles.month}>
          {" "}
          {`${
            monthNames[selectedDate.getMonth()]
          } - ${selectedDate.getFullYear()}`}
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              {daysShort.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(calendarRows).map((cols) => {
              return (
                <tr key={cols[0].date}>
                  {cols.map((col) =>
                    col.date === todayFormatted ? (
                      <td
                        key={col.date}
                        className={`${col.classes} today`}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                      </td>
                    ) : (
                      <td
                        key={col.date}
                        className={col.classes}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                      </td>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.center}>
          <button className={styles.button} onClick={getPrevMonth}>
            Prev
          </button>
          <button className={styles.button} onClick={getNextMonth}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Calendar;
