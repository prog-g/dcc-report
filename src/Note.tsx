import React from "react";
import { newNote, noteColor } from "./lib/note";

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
  const bind = React.useCallback(() => props.setBindingTargetId(props.id), [
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
  return (
    <div className="note">
      <div>
        Num: {props.pointNumber}, ID: {props.id}, color: {noteColor(props.id)}
        x: {props.x}, y: {props.y} dy: {props.dy}
      </div>
      <div className="action">
        <span onClick={insert}>+ Insert Above</span>
        <span onClick={up}>Move Up</span>
      </div>
      <textarea className="content" value={content} onChange={edit}></textarea>
      <div className="action">
        <span onClick={down}>Move Down</span>
        <span onClick={bind}>Bind</span>
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
};

export default Note;
