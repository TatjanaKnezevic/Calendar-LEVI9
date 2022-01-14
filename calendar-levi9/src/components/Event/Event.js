import { React, useState, useEffect } from "react";

const Event = (props) => {
  useEffect(() => {
    console.log(props.events);
  }, []);

  return <>hello</>;
};

export default Event;
