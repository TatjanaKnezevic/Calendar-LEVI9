import { React, useState, useEffect } from "react";
import styles from "./Form.module.css";
import { MultiSelect } from "react-multi-select-component";

const Form = (props) => {
  if (!props.show) {
    return null;
  }

  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    async function getParticipants() {
      const res = await fetch("/participants");
      const data = await res.json();
      setParticipants(data.map((u) => ({ label: u.name, value: u.name })));
    }
    getParticipants();
  }, []);

  const validateText = (text) => !!text;
  const validateTime = (time) => {
    const expression = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const regex = new RegExp(expression);

    if (!time.match(regex)) {
      return false;
    }
    return true;
  };

  const addEvent = async (event) => {
    event.preventDefault();

    if (!validateText(title)) {
      return;
    }
    if (!validateText(description)) {
      return;
    }
    if (!validateTime(time)) {
      return;
    }

    const id = props.id;
    const participants = selected.map((x) => x.value);
    const date = props.date;
    const res = await fetch("/event", {
      body: JSON.stringify({
        id,
        title,
        description,
        date,
        time,
        participants,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
  };

  return (
    <>
      <div onClick={props.onClose} className={styles.form}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div>
            <h1>Add new event</h1>
          </div>
          <div>
            <form
              className="ui form"
              onSubmitCapture={addEvent}
              onSubmit={props.onClose}
            >
              <br />
              <div>
                <label>Title: </label>
                <input
                  className={`${!validateText(title) ? styles.error : ""}`}
                  type="text"
                  placeholder="Type title here..."
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Description: </label>
                <textarea
                  className={`${
                    !validateText(description) ? styles.error : ""
                  }`}
                  type="text"
                  placeholder="Type description here..."
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <br />
              <div>
                <label>Time: </label>
                <input
                  className={`${!validateTime(time) ? styles.error : ""}`}
                  type="text"
                  placeholder={props.date}
                  name="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Choose participants: </label>
                <MultiSelect
                  options={participants}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </div>
              <br />
              <div>
                <button type="submit" className={styles.button}>
                  Add event
                </button>
                <button className={styles.button} onClick={props.onClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
