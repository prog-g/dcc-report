import React from "react";

type Props = { id: number; setNotes: SetNoteFunc };

const Note: React.FunctionComponent<Props> = props => {
  const [content, setContent] = React.useState("new note");
  const insert = React.useCallback(() => {
    props.setNotes(prev => {
      const i = prev.findIndex(n => n.id == props.id);
      const maxId = prev.reduce((a, n) => (a < n.id ? n.id : a), 0);
      return prev
        .slice(0, i)
        .concat([{ id: maxId + 1 }])
        .concat(prev.slice(i, prev.length));
    });
  }, [props]);
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
