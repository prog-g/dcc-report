import React from "react";
import { newNote, noteColor as notecolor } from "./lib/note";

type Props = Note & {
  // これらは x が null の場合 null
  // 現状では表示にしか使われない
  y: number | null;
  dy: number | null;
  pointNumber: number | null;

  setNotes: SetNotes;
  setBindingTargetId: SetBindingTargetId;
};

const Note: React.FunctionComponent<Props> = props => {
  const [content, setContent] = React.useState("New Note");

  // 新しいメモをこのメモの前に挿入するイベントハンドラ
  const insertBefore = React.useCallback(
    () =>
      props.setNotes(prev => {
        const i = prev.findIndex(n => n.id === props.id);
        return [...prev.slice(0, i), newNote(prev), ...prev.slice(i)];
      }),
    [props]
  );

  // メモが編集されたときのイベントハンドラ
  // 入力による変更を DOM に反映しておかないと、HTML に書き出す際に空になる
  const edit = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );

  // メモとグラフ上の点を紐づけるためのイベントハンドラ
  const bind = React.useCallback(() => props.setBindingTargetId(props.id), [
    props
  ]);

  // メモを上へ移動するイベントハンドラ
  const up = React.useCallback(
    () =>
      props.setNotes(prev => {
        const i = prev.findIndex(n => n.id === props.id);
        return i === 0
          ? prev // このメモが先頭であった場合は何もしない
          : [
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
        return i === prev.length - 1
          ? prev // このメモが末尾であった場合は何もしない
          : [...prev.slice(0, i), prev[i + 1], prev[i], ...prev.slice(i + 2)];
      }),
    [props]
  );

  // メモを削除するイベントハンドラ
  const del = React.useCallback(
    () => props.setNotes(prev => prev.filter(n => n.id !== props.id)),
    [props]
  );

  const labelColor = { borderColor: notecolor(props.id) };
  return (
    <div className="note">
      <div className="note-header" style={labelColor}>
        {props.pointNumber !== null ? `#${props.pointNumber}` : "Note"}
      </div>
      <div className="note-menu">
        <button onClick={insertBefore}>上に挿入</button>
        <button onClick={bind}>バインド</button>
        <button onClick={up}>上へ移動</button>
      </div>
      <textarea
        className="note-content"
        value={content}
        onChange={edit}
      ></textarea>
      {props.x !== null ? (
        <div className="note-footer">
          x: {props.x?.toFixed(2)}, y:{" "}
          {props.y !== null ? props.y.toFixed(2) : "n/a"}
        </div>
      ) : null}
      <div className="note-menu">
        <button onClick={del}>削除</button>
        <button onClick={down}>下へ移動</button>
      </div>
    </div>
  );
};

export default Note;
