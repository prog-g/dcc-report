import React from "react";
import { insertNewNoteBefore } from "./lib";

type Props = { id: number; setNotes: SetNotesFunc };

const Note: React.FunctionComponent<Props> = props => {
  const [content, setContent] = React.useState("new note");
  const insert = React.useCallback(
    () => insertNewNoteBefore(props.setNotes, props.id),
    [props]
  );
  const edit = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );
  const del = React.useCallback(
    () => props.setNotes(prev => prev.filter(n => n.id !== props.id)),
    [props]
  );
  return (
    <div className="note">
      <div className="insert-action">
        <span onClick={insert}>+ Insert Above</span>
      </div>
      <textarea className="content" value={content} onChange={edit}></textarea>
      <div className="delete-action">
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
};

export default Note;
