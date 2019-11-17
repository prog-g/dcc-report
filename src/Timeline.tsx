import React from "react";
import { newNote, noteColor, noteNumber } from "./lib";
import Note from "./Note";

type Props = {
  f: GraphFunc;
  df: GraphFunc;
  notes: Note[];
  setNotes: SetNotesFunc;
  setBindingTarget: SetBindingTargetFunc;
};

const Timeline: React.FunctionComponent<Props> = props => {
  const add = React.useCallback(
    () => props.setNotes(prev => [...prev, newNote(prev)]),
    [props]
  );
  // TDOD: Impl sort
  const order = React.useCallback(() => {}, []);
  const notes = props.notes.map(n => (
    <Note
      key={n.id}
      id={n.id}
      color={noteColor(n.id)}
      number={noteNumber(props.notes, n.id)}
      x={n.x}
      y={n.x !== null ? props.f(n.x) : null}
      dy={n.x !== null ? props.df(n.x) : null}
      setNotes={props.setNotes}
      setBindingTarget={props.setBindingTarget}
    />
  ));
  return (
    <div className="timeline">
      <div onClick={order}>Order By Time</div>
      {notes}
      <div className="new" onClick={add}>
        + Add
      </div>
    </div>
  );
};

export default Timeline;
