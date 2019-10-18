import React from "react";

type Props = { id: number, content: string, setNotes: SetNoteFunc };
const Note: React.FunctionComponent<Props> = props => {
  const del = React.useCallback(() => props.setNotes((prev) => prev.filter(n => n.id != props.id)), [props.setNotes])
  return (
    <div className="note">
      <div className="content">{props.content}</div>
      <div className="delete-action">
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
};

export default Note;
