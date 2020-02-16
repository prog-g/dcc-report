import React from "react";
import { newNote, pointNumber } from "./lib/note";
import Note from "./Note";

type Props = {
  graph: Graph;
  notes: Notes;
  setNotes: SetNotes;
  setBindingTargetId: SetBindingTargetId;
};

const NoteList: React.FunctionComponent<Props> = props => {
  // メモを追加するイベントハンドラ
  const add = React.useCallback(
    () => props.setNotes(prev => [...prev, newNote(prev)]),
    [props]
  );

  // x が小さい順にメモをソートするイベントハンドラ
  // グラフに紐づいていないメモは動かさない
  const ascendingOrder = React.useCallback(() => {
    props.setNotes(prev => {
      const list = prev.map(n => ({ x: n.x, note: n }));

      // グラフに紐づいていないメモの x を最新の x に合わせる
      // 例えば list の x が null, 5, 1, null, null, 3, null であった場合、null, 5, 1, 1, 1, 3, 3 のようにする
      let latestX: number | null = null;
      for (let i = 0; i < list.length; i++) {
        if (list[i].x === null) {
          list[i].x = latestX;
        } else {
          latestX = list[i].x;
        }
      }

      return list
        .sort((a, b) => {
          // ソートの詳細なアルゴリズムは不明なため、宣言的かつ網羅的に定義する
          // 先頭のグラフに紐づいていないメモは動かさない
          if (a.x === null && b.x === null) return 0;
          else if (a.x === null) return -1;
          else if (b.x === null) return 1;
          // 数値同士は昇順に並べ、グラフに紐づいていないメモは動かさない
          else return a.x - b.x;
        })
        .map(e => e.note);
    });
  }, [props]);

  const notes = props.notes.map(n => {
    // x が定義域内なら f(x), f'(x) を求める
    let y: number | null = null;
    let dy: number | null = null;
    if (
      n.x !== null &&
      props.graph !== null &&
      props.graph.from <= n.x &&
      n.x <= props.graph.to
    ) {
      y = props.graph.f(n.x);
      dy = props.graph.df(n.x);
    }

    return (
      <Note
        key={n.id}
        id={n.id}
        x={n.x}
        y={y}
        dy={dy}
        pointNumber={pointNumber(props.notes, n.id)}
        setNotes={props.setNotes}
        setBindingTargetId={props.setBindingTargetId}
      />
    );
  });

  return (
    <div className="note-list">
      <button onClick={ascendingOrder}>Order By Time</button>
      {notes}
      <button className="add" onClick={add}>
        + Add
      </button>
    </div>
  );
};

export default NoteList;
