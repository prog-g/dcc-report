/* eslint-disable @typescript-eslint/no-non-null-assertion */

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
  // DOM をディープコピーする
  const doc = document.documentElement.cloneNode(true) as HTMLElement;

  // 不要なタグを取り除く
  const script = doc.getElementsByTagName("script")[0];
  script.parentNode!.removeChild(script);

  // <canvas> を <img> に変換する
  const img = document.createElement("img");
  img.src = document.getElementsByTagName("canvas")[0].toDataURL();
  const canvas = doc.getElementsByTagName("canvas")[0];
  canvas.parentNode!.replaceChild(img, canvas);

  // 内容をファイルに変換して URL を発行し、クリックイベントを起こす
  const html = `<!DOCTYPE html>\n${doc.outerHTML}`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  a.download = `${now()}.html`;
  a.dispatchEvent(new MouseEvent("click"));
};

export { download };
