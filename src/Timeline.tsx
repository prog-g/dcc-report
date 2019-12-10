import React from "react";
import { newNote, noteColor, noteNumber } from "./lib";
import Note from "./Note";

type Props = {
  graph: Graph;
  notes: Note[];
  setNotes: SetNotesFunc;
  setBindingTarget: SetBindingTargetFunc;
};

const Timeline: React.FunctionComponent<Props> = props => {
  // メモを追加するイベントハンドラ
  const add = React.useCallback(
    () => props.setNotes(prev => [...prev, newNote(prev)]),
    [props]
  );
  // x が若い順にメモをソートするイベントハンドラ
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
  const notes = props.notes.map(n => {
    // x が定義域内なら f(x), f'(x) を求める
    let y: number | null = null;
    let dy: number | null = null;
    if (n.x !== null && props.graph !== null) {
      if (props.graph.from <= n.x && n.x <= props.graph.to) {
        y = props.graph.f(n.x);
        dy = props.graph.df(n.x);
      }
    }
    return (
      <Note
        key={n.id}
        id={n.id}
        color={noteColor(n.id)}
        number={noteNumber(props.notes, n.id)}
        x={n.x}
        y={y}
        dy={dy}
        setNotes={props.setNotes}
        setBindingTarget={props.setBindingTarget}
      />
    );
  });
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
