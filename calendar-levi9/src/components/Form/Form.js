import { React, useState, useEffect } from "react";
import styles from "../../../styles/Form.module.css";
import { MultiSelect } from "react-multi-select-component";

const Form = (props) => {
  if (!props.show) {
    return null;
  }

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [eventNum, setEventsNum] = useState(0);
  const [reload, setReload] = useState(false);

  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function getParticipants() {
      const res = await fetch("/participants");
      const data = await res.json();
      setParticipants(data.map((u) => ({ label: u.name, value: u.name })));
    }
    async function getEventsNum() {
      const res = await fetch("/events");
      const data = await res.json();
      setEventsNum(data.length);
    }
    getEventsNum();
    getParticipants();
  }, [reload]);

  useEffect(() => {
    if (close) {
      console.log("bye");
      props.onClose;
    }
  }, [close]);

  const addEvent = async (event) => {
    event.preventDefault();
    const id = eventNum + 1;
    setReload(true);
    const title = event.target.title.value;
    const description = event.target.description.value;
    const time = event.target.time.value;
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
      <div onClick={props.onClose}>
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
                  type="text"
                  placeholder="Type title here..."
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Description: </label>
                <textarea
                  type="text"
                  placeholder="Type description here..."
                  name="description"
                  id="description"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <br />
              <div>
                <label>Time: </label>
                <input
                  type="text"
                  placeholder={props.date}
                  name="time"
                  id="time"
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
              <div>Close the form to update calendar</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
