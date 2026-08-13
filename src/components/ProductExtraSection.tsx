import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/74d51823-3430-4e7b-993d-298643f66a5f";

interface Col {
  key: string;
  label: string;
}

interface Row {
  model: string;
  [key: string]: string | undefined;
}

interface Props {
  sectionId: string;
  title: string;
  img?: string;
  imgWidth?: string;
  description?: string;
  caption?: string;
}

export default function ProductExtraSection({ sectionId, title, img, imgWidth = "max-w-[50%]", description, caption }: Props) {
  const [cols, setCols] = useState<Col[]>([]);
  const [models, setModels] = useState<Row[]>([]);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_URL}?product_id=${sectionId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.cols?.length) {
          setCols(d.cols);
          setModels(d.models);
        }
      })
      .catch(() => {});
  }, [sectionId]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setError("");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const XLSX = await import("xlsx");
        const wb = XLSX.read(ev.target?.result, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        if (rows.length < 2) {
          setError("Файл пустой или не содержит данных");
          setImporting(false);
          return;
        }
        const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();
        const headers = rows[0].map((h) => oneLine(h)).filter(Boolean);
        const newCols: Col[] = headers.map((h, i) => ({ key: `col${i}`, label: h }));
        const newModels: Row[] = rows
          .slice(1)
          .filter((r) => r.some((c) => c !== ""))
          .map((row) => {
            const obj: Row = { model: oneLine(row[0]) };
            headers.forEach((_, i) => {
              obj[`col${i}`] = oneLine(row[i]);
            });
            return obj;
          });
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: sectionId, cols: newCols, models: newModels }),
        });
        if (!res.ok) throw new Error("server error");
        setCols(newCols);
        setModels(newModels);
      } catch {
        setError("Не удалось загрузить данные. Попробуйте ещё раз.");
      }
      setImporting(false);
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const clear = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: sectionId, cols: [], models: [] }),
    }).catch(() => {});
    setCols([]);
    setModels([]);
  };

  return (
    <div className="mb-10">
      {caption && (
        <p className="font-display text-white text-lg tracking-wide mb-3">{caption}</p>
      )}
      <div className={`w-full mr-auto bg-white rounded-sm flex items-center justify-center overflow-hidden mb-6 ${imgWidth}`}>
        {img ? (
          <img src={img} alt={title} loading="lazy" decoding="async" className="w-full h-auto object-contain p-4" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-black/20 py-16">
            <Icon name="ImageOff" size={32} />
            <span className="text-[11px] font-body">Фото появится позже</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-brand-red" />
        <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Описание</span>
      </div>
      <div className="font-body text-white/65 text-sm leading-relaxed mb-8">
        {description ? (
          description.split("\n").map((line, i) => (
            <p key={i} className={line === "" ? "mt-3" : "mb-1"}>
              {line}
            </p>
          ))
        ) : (
          <p className="text-white/40">Описание появится позже. Уточняйте информацию у наших менеджеров.</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-brand-red" />
          <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {models.length > 0 && (
            <button
              onClick={clear}
              className="font-body text-white/30 text-xs hover:text-white/60 transition-colors flex items-center gap-1"
            >
              <Icon name="RotateCcw" size={11} />
              Сбросить
            </button>
          )}
          <label className="inline-flex items-center gap-2 cursor-pointer border border-white/15 hover:border-white/35 px-3 py-1.5 rounded-sm transition-colors group">
            {importing ? (
              <Icon name="Loader" size={12} className="text-white/40 animate-spin" />
            ) : (
              <Icon name="Upload" size={12} className="text-white/40 group-hover:text-white transition-colors" />
            )}
            <span className="font-body text-white/40 group-hover:text-white text-xs transition-colors">
              {importing ? "Загружаю..." : "Загрузить Excel"}
            </span>
            <input ref={inputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {error && (
        <div className="mb-3 px-3 py-2 bg-brand-red/10 border border-brand-red/20 rounded-sm">
          <p className="font-body text-brand-red text-xs">{error}</p>
        </div>
      )}

      {models.length > 0 ? (
        <div className="rounded-sm border border-white/8 overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-brand-red/10 border-b border-white/8">
                {cols.map((col) => (
                  <th
                    key={col.key}
                    className="text-center px-3 py-2 text-white/50 text-[11px] tracking-wide font-normal leading-tight whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}
                >
                  {cols.map((col) => (
                    <td
                      key={col.key}
                      className={`px-3 py-2 text-[12px] leading-snug whitespace-nowrap text-center ${col.key === "model" || col.key === "col0" ? "text-white font-medium" : "text-white/65"}`}
                    >
                      {row[col.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-white/8 rounded-sm px-4 py-8 text-center">
          <p className="font-body text-white/30 text-xs">
            Таблица моделей ещё не загружена. Добавьте Excel-файл, чтобы она появилась здесь.
          </p>
        </div>
      )}
    </div>
  );
}