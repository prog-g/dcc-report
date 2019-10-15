import React from "react";

type Props = { key: number, content: string, setNotes: Function };
const Note: React.FunctionComponent<Props> = props => {
  const del = React.useCallback(() => props.setNotes((prev) => prev.filter(n => n.key != props.key)), [props.setNotes])
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
