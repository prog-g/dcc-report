import React from "react";
import Note from "./Note";

function Timeline(props) {
  const notes = props.notes.map((n) => (
    <Note
      key={n.id}
      content={n.content}
    />
  ));
  return <div className="timeline">{notes}</div>;
}

export default Timeline;
