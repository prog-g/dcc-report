import React from "react";

function Note(props) {
  const del = () => { }
  return (
    <div className="note">
      <div className="content">{props.content}</div>
      <div className="delete-action">
        <span onClick={del}>Delete</span>
      </div>
    </div>
  );
}

export default Note;
