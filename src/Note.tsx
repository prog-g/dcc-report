import React from "react";
import { newNote } from "./lib/note";

type Props = {
  id: number;
  color: string;
  number: number | null;
  x: number | null;
  y: number | null;
  dy: number | null;
  setNotes: SetNotesFunc;
  setBindingTarget: SetBindingTargetFunc;
};

const Note: React.FunctionComponent<Props> = props => {
  const [content, setContent] = React.useState("New Note");
  // メモを中間に挿入するイベントハンドラ
  const insert = React.useCallback(
    () =>
      props.setNotes(prev => {
        const i = prev.findIndex(n => n.id === props.id);
        return [
          ...prev.slice(0, i),
          newNote(prev),
          ...prev.slice(i, prev.length)
        ];
      }),
    [props]
  );
  // メモが編集されたときのイベントハンドラ
  const edit = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );
  // 紐つけボタンのイベントハンドラ
  const bind = React.useCallback(() => props.setBindingTarget(props.id), [
    props
  ]);
  // メモを上へ移動するイベントハンドラ
  const up = React.useCallback(
    () =>
      props.setNotes(prev => {
        const i = prev.findIndex(n => n.id === props.id);
        if (i === 0) return prev;
        return [
          ...prev.slice(0, i - 1),
          prev[i],
          prev[i - 1],
          ...prev.slice(i + 1, prev.length)
        ];
      }),
    [props]
  );
  // メモを下へ移動するイベントハンドラ
  const down = React.useCallback(
    () =>
      props.setNotes(prev => {
        const i = prev.findIndex(n => n.id === props.id);
        if (i === prev.length - 1) return prev;
        return [
          ...prev.slice(0, i),
          prev[i + 1],
          prev[i],
          ...prev.slice(i + 2, prev.length)
        ];
      }),
    [props]
  );
  // メモを削除するイベントハンドラ
  const del = React.useCallback(
    () => props.setNotes(prev => prev.filter(n => n.id !== props.id)),
    [props]
  );
  const labelColor = { borderColor: props.color };
  return (
    <div className="note">
      <div className="note-header" style={labelColor}>
        {props.number !== null ? "#" + props.number : "Note"}
      </div>
      <div className="note-menu top-menu">
        <button onClick={insert}>上に挿入</button>
        <button onClick={bind}>バインド</button>
        <button onClick={up}>上へ移動</button>
      </div>
      <div className="note-content">
        <textarea
          className="note-text"
          value={content}
          onChange={edit}
        ></textarea>
      </div>
      {props.x !== null ? (
        <div className="note-footer">
          x: {props.x?.toFixed(2)}, y:{" "}
          {props.y !== null ? props.y.toFixed(2) : "n/a"}
        </div>
      ) : (
        ""
      )}
      <div className="note-menu bottom-menu">
        <button onClick={del}>削除</button>
        <button onClick={down}>下へ移動</button>
      </div>
    </div>
  );
};

export default Note;
