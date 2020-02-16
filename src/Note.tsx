import React from "react";
import { newNote, noteColor } from "./lib/note";

type Props = {
  id: number;
  x: number | null;
  y: number | null;
  dy: number | null;
  noteNumber: number | null;
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
        return [...prev.slice(0, i), newNote(prev), ...prev.slice(i)];
      }),
    [props]
  );
  // メモが編集されたときのイベントハンドラ
  const edit = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );
  // メモとグラフ上の点を紐づけるボタンのイベントハンドラ
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
          ...prev.slice(i + 1)
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
          ...prev.slice(i + 2)
        ];
      }),
    [props]
  );
  // メモを削除するイベントハンドラ
  const del = React.useCallback(
    () => props.setNotes(prev => prev.filter(n => n.id !== props.id)),
    [props]
  );
  const labelColor = { borderColor: noteColor(props.id) };
  return (
    <div className="note">
      <div className="note-header" style={labelColor}>
        {props.noteNumber !== null ? "#" + props.noteNumber : "Note"}
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
