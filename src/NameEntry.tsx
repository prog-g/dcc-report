import React from "react";

const NameEntry: React.FunctionComponent = () => {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const edit: (
    setter: SetStateFunc<string>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void = (setter) => (
    e
  ): void => {
    setter(e.target.value);
  };
  return (
    <div className="name-entry">
      <details open>
        <summary>学籍番号・氏名</summary>
        <div className="name-form">
          <label>
            学籍番号
            <input type="text" value={id} onChange={edit(setId)}></input>
          </label>
          <label>
            氏名
            <input type="text" value={name} onChange={edit(setName)}></input>
          </label>
        </div>
      </details>
    </div>
  );
};

export default NameEntry;
