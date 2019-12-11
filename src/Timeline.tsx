import React from "react";
import { appendNewNote } from "./lib/note";
import Note from "./Note";

type Props = { notes: { id: number }[]; setNotes: SetNotesFunc };

const Timeline: React.FunctionComponent<Props> = props => {
  const add = React.useCallback(() => appendNewNote(props.setNotes), [props]);
  const notes = props.notes.map(n => (
    <Note key={n.id} id={n.id} setNotes={props.setNotes} />
  ));
  return (
    <div className="timeline">
      {notes}
      <div className="newnote" onClick={add}>
        + Add
      </div>
    </div>
  );
};

export default Timeline;
