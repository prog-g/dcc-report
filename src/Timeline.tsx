import React from "react";
import Note from "./Note";

type Props = { notes: { id: number; content: string }[], setNotes: SetNoteFunc };

const Timeline: React.FunctionComponent<Props> = props => {
  const add = React.useCallback(() => props.setNotes(prev => [...prev, { id: prev.reduce((i, j) => i.id < j.id ? j : i).id + 1, content: "" }]), [props.setNotes]);
  const notes = props.notes.map(n => <Note key={n.id} id={n.id} content={n.content} setNotes={props.setNotes}/>);
  return (
    <div className="timeline">
      {notes}
      <div className="newnote" onClick={add}>+ Add</div>
    </div>
  );
};

export default Timeline;
