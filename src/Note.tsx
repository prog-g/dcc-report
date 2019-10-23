import React from "react";

type Props = { id: number, content: string, setNotes: SetNoteFunc };

const Note: React.FunctionComponent<Props> = props => {
  const edit = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.persist();
    props.setNotes(prev => prev.map(n => {
      if (n.id === props.id) {
        n.content = e.target.value;
      }
      return n;
    }));
  }, [props.setNotes]);
  const del = React.useCallback(() => props.setNotes(prev => prev.filter(n => n.id !== props.id)), [props.setNotes]);
  return (
    <div className="note">
      <textarea className="content" value={props.content} onChange={edit}></textarea>
      <div className="delete-action">
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
};

export default Note;
