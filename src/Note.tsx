import React from "react";
import { newNote } from "./lib";

type Props = {
  id: number;
  x: number | null;
  graphCurve: GraphFunction;
  setNotes: SetNotesFunc;
  setBindingTarget: SetBindingTargetFunc;
};

const Note: React.FunctionComponent<Props> = props => {
  const [content, setContent] = React.useState("New Note");
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
  const edit = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );
  const bind = React.useCallback(() => props.setBindingTarget(props.id), [
    props
  ]);
  const del = React.useCallback(
    () => props.setNotes(prev => prev.filter(n => n.id !== props.id)),
    [props]
  );
  return (
    <div className="note">
      <div>
        Num: {"None"}, ID: {props.id}
      </div>
      <div className="insert-action">
        <span onClick={insert}>+ Insert Above</span>
      </div>
      <textarea className="content" value={content} onChange={edit}></textarea>
      <div>
        f(x):{" "}
        {props.x
          ? props.graphCurve(props.x)
            ? props.graphCurve(props.x)
            : "Out"
          : "None"}
      </div>
      <div className="delete-action">
        <span onClick={bind}>Bind</span>
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
};

export default Note;
