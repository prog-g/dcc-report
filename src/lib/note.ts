// 新しい空のメモを返す関数
// 引数なしで呼ばれた場合や notes が [] の場合は初期値を返す
function newNote(notes: Notes = []): Note {
  if (!notes.length) return { id: 1, x: null };
  const newId = Math.max(...notes.map(n => n.id)) + 1;
  return { id: newId, x: null };
}

// TODO: algorithm
// id に従属するメモの色を返す
function noteColor(id: number): string {
  const Colors: string[] = [
    "blue",
    "red",
    "yellow",
    "green",
    "greenyellow",
    "orange",
    "pink",
    "purple",
    "aqua"
  ];
  return Colors[id % Colors.length];
}

// 識別子が id なメモと紐づいたグラフ上の点の番号を求める関数
// 番号は 1 から与えられ、メモが点と紐づいていなかった場合 null が返る
function pointNumber(notes: Notes, id: Note["id"]): number | null {
  const i = notes
    .filter(n => n.x !== null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .sort((a, b) => a.x! - b.x!)
    .findIndex(n => n.id === id);
  return 0 <= i ? i + 1 : null;
}

<<<<<<< HEAD
//content__dummyにテキストを入れる関数
function flexTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
  const dummy = e.target.previousElementSibling;
  dummy!.textContent = e.target.value + "\u200b";
}

export { newNote, noteColor, noteNumber, flexTextarea };
=======
export { newNote, noteColor, pointNumber };
>>>>>>> master
