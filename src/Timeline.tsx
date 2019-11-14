import React from "react";
import { newNote } from "./lib";
import Note from "./Note";

type Props = {
  graphCurve: GraphFunction;
  notes: Note[];
  setNotes: SetNotesFunc;
  setBindingTarget: SetBindingTargetFunc;
};

const Timeline: React.FunctionComponent<Props> = props => {
  const add = React.useCallback(
    () => props.setNotes(prev => [...prev, newNote(prev)]),
    [props]
  );
  const notes = props.notes.map(n => (
    <Note
      key={n.id}
      id={n.id}
      x={n.x}
      graphCurve={props.graphCurve}
      setNotes={props.setNotes}
      setBindingTarget={props.setBindingTarget}
    />
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
