import React from "react";

type Props = { id: number; setNotes: SetNoteFunc };

const Note: React.FunctionComponent<Props> = props => {
  const [content, setContent] = React.useState("new note");
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
      <textarea className="content" value={content} onChange={edit}></textarea>
      <div className="delete-action">
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
};

export default Note;
