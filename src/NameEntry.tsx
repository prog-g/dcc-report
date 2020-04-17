import React from "react";

const NameEntry: React.FunctionComponent = () => {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const edit: (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setter(e.target.value);
  };
  return (
    <div className="name-entry">
      <details open>
        <summary>ID &amp; Name</summary>
        <div className="name-form">
          <label>
            ID:<input type="text" value={id} onChange={edit(setId)}></input>
          </label>
          <label>
            Name:
            <input type="text" value={name} onChange={edit(setName)}></input>
          </label>
        </div>
      </details>
    </div>
  );
};

export default NameEntry;
