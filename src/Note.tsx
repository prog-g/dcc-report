import React from "react";

type Props = { id: number, content: string, setNotes: SetNoteFunc };

const Note: React.FunctionComponent<Props> = props => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const edit = React.useCallback(() => props.setNotes(prev => prev.map(n => {
    if (n.id == props.id) {
      if (textareaRef.current != null) {
        n.content = textareaRef.current.value;
      }
    }
    return n;
  })), [props.setNotes, textareaRef.current]);
  const del = React.useCallback(() => props.setNotes(prev => prev.filter(n => n.id != props.id)), [props.setNotes]);
  return (
    <div className="note">
      <textarea className="content" value={props.content} onChange={edit} ref={textareaRef}></textarea>
      <div className="delete-action">
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
};

export default Note;
