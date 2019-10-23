import React from "react";
import Note from "./Note";

type Props = { notes: { id: number }[], setNotes: SetNoteFunc };

const Timeline: React.FunctionComponent<Props> = props => {
  const add = React.useCallback(() => props.setNotes(prev => {
    const maxId = prev.reduce((a, n) => a < n.id ? n.id : a, 0);
    return [...prev, { id: maxId + 1 }];
  }), [props.setNotes]);
  const notes = props.notes.map(n => <Note key={n.id} id={n.id} setNotes={props.setNotes}/>);
  return (
    <div className="timeline">
      {notes}
      <div className="newnote" onClick={add}>+ Add</div>
    </div>
  );
};

export default Timeline;
