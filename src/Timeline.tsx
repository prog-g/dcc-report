import React from "react";
import Note from "./Note";

type Props = { notes: { id: number; content: string }[] };
const Timeline: React.FunctionComponent<Props> = props => {
  const notes = props.notes.map(n => <Note key={n.id} content={n.content} />);
  return <div className="timeline">{notes}</div>;
};

export default Timeline;
