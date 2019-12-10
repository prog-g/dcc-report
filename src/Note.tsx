import React from "react";
import { newNote } from "./lib";

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
  return (
    <div className="note">
      <div>
        Num: {props.number}, ID: {props.id}, color: {props.color}
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
