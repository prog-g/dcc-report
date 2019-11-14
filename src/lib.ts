const cubicCurve = (p1: Point, p2: Point, p3: Point, p4: Point) => (
  x: number
) => {
  return 1;
};

const derivativeCubicCurve = (p1: Point, p2: Point, p3: Point, p4: Point) => (
  x: number
) => {
  return 1;
};

function makeGraphCurve(points: Point[]): GraphFunction {
  return (x: number): number | null => x;
}

function makeDerivativeGraphCurve(points: Point[]): GraphFunction {
  return (x: number): number | null => x;
}

function drawGraphCurve(points: Point[], f: GraphFunction): void {
  if (points.length < 2) return;
  const df = makeDerivativeGraphCurve(points);
  //for ()
}

function newNote(currentNotes: Note[]): Note {
  const maxId = currentNotes.reduce((a, n) => (a < n.id ? n.id : a), 0);
  return { id: maxId + 1, x: null };
}

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

const download: () => void = () => {
  const doc = document.documentElement.cloneNode(true) as HTMLElement;
  const script = doc.getElementsByTagName("script")[0];
  doc.getElementsByTagName("body")[0].removeChild(script);
  const html = `<!DOCTYPE html>\n${doc.outerHTML}`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  a.download = `${now()}.html`;
  a.dispatchEvent(new MouseEvent("click"));
};

export { makeGraphCurve, drawGraphCurve, newNote, download };
