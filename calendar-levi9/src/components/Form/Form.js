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

  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function getParticipants() {
      const res = await fetch("/participants");
      const data = await res.json();
      setParticipants(data.map((u) => ({ label: u.name, value: u.id })));
    }
    getParticipants();
  }, []);

  const addEvent = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const time = event.target.time.value;
    const participants = selected.map((x) => x.value);
    console.log(selected);
    const res = await fetch("/event", {
      body: JSON.stringify({
        title,
        description,
        time,
        participants,
        day,
        month,
        year,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
    onSuccess(result);
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
            <form>
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
                <button
                  type="submit"
                  className={styles.button}
                  onClick={props.onClose}
                >
                  Add event
                </button>
                <button className={styles.button} onClick={props.onClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </>
  );
};

export default Form;
