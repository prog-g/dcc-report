function newNote(currentNotes: NoteState[]): NoteState {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1 };
}

function appendNewNote(setNotes: SetNotesFunc): void {
  setNotes(prev => [...prev, newNote(prev)]);
}

function insertNewNoteBefore(setNotes: SetNotesFunc, id: number): void {
  setNotes(prev => {
    const i = prev.findIndex(n => n.id === id);
    return [...prev.slice(0, i), newNote(prev), ...prev.slice(i, prev.length)];
  });
}

// 現在時刻を YYYYMMDD_HH-mm-ss の形式で返す関数
function now(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const date = `${now.getDate()}`.padStart(2, "0");
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");
  const seconds = `${now.getSeconds()}`.padStart(2, "0");
  return `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
}

// ページ全体を .html としてダウンロードさせる関数
// see https://qiita.com/ahuglajbclajep/items/b3ef7604eabc5659cd7c
const download: () => void = () => {
  // DOM をディープコピーして整形する
  const doc = document.documentElement.cloneNode(true) as HTMLElement;
  const script = doc.getElementsByTagName("script")[0];
  doc.getElementsByTagName("body")[0].removeChild(script);
  const html = `<!DOCTYPE html>\n${doc.outerHTML}`;
  // 内容をファイルに変換してURLを発行し、クリックイベントを起こす
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  a.download = `${now()}.html`;
  a.dispatchEvent(new MouseEvent("click"));
};

export { makeGraph } from "./graph";
export { appendNewNote, insertNewNoteBefore, download };
