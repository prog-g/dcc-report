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
  const order = React.useCallback(() => {
    props.setNotes(prev => {
      const list = prev.map(n => {
        return { x: n.x, note: n };
      });
      let k: number | null = null;
      for (let i = 0; i < list.length; i++) {
        if (list[i].x === null) list[i].x = k;
        else k = list[i].x;
      }
      return list
        .sort((a, b) => {
          if (a.x === null && b.x === null) return 0;
          else if (a.x === null) return -1;
          else if (b.x === null) return 1;
          else return a.x - b.x;
        })
        .map(e => e.note);
    });
  }, [props]);
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
