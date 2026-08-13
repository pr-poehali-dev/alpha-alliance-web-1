import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import EquipmentSidebar from "@/components/EquipmentSidebar";
import ProductExtraSection from "@/components/ProductExtraSection";
import { GROUP_DATA } from "@/pages/EquipmentGroupDetailPage";
import {
  PRODUCT_DATA,
  NO_DESCRIPTION_PRODUCT_IDS,
  PUMP_SPECS_PRODUCT_IDS,
  MATRIX_SETS_PRODUCT_IDS,
  NO_MODEL_TABLE_PRODUCT_IDS,
  PRODUCT_IMG_WIDTH,
  EXTRA_SECTIONS,
  DESCRIPTION_IMAGES,
  getParentGroupId,
} from "@/data/products";
import type { ModelRow, ModelTableCol } from "@/data/products";

interface Props {
  productId: string;
  onNavigate: (page: string) => void;
}


const API_URL = "https://functions.poehali.dev/74d51823-3430-4e7b-993d-298643f66a5f";

export default function ProductPage({ productId, onNavigate }: Props) {
  const data = PRODUCT_DATA[productId];
  const groupId = data?.groupId ?? getParentGroupId(productId);

  const [importedModels, setImportedModels] = useState<ModelRow[]>([]);
  const [importedCols, setImportedCols] = useState<ModelTableCol[]>([]);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pumpProductId = `${productId}-pump`;
  const [importedPumpModels, setImportedPumpModels] = useState<ModelRow[]>([]);
  const [importedPumpCols, setImportedPumpCols] = useState<ModelTableCol[]>([]);
  const [importingPump, setImportingPump] = useState(false);
  const [importPumpError, setImportPumpError] = useState("");
  const pumpFileInputRef = useRef<HTMLInputElement>(null);

  const matrixProductId = `${productId}-matrix`;
  const [importedMatrixModels, setImportedMatrixModels] = useState<ModelRow[]>([]);
  const [importedMatrixCols, setImportedMatrixCols] = useState<ModelTableCol[]>([]);
  const [importingMatrix, setImportingMatrix] = useState(false);
  const [importMatrixError, setImportMatrixError] = useState("");
  const matrixFileInputRef = useRef<HTMLInputElement>(null);

  // Загружаем данные с сервера при открытии страницы
  useEffect(() => {
    fetch(`${API_URL}?product_id=${productId}`)
      .then(r => r.json())
      .then(d => {
        if (d.cols?.length) { setImportedCols(d.cols); setImportedModels(d.models); }
      })
      .catch(() => {})


    if (PUMP_SPECS_PRODUCT_IDS.includes(productId)) {
      fetch(`${API_URL}?product_id=${pumpProductId}`)
        .then(r => r.json())
        .then(d => {
          if (d.cols?.length) { setImportedPumpCols(d.cols); setImportedPumpModels(d.models); }
        })
        .catch(() => {});
    }

    if (MATRIX_SETS_PRODUCT_IDS.includes(productId)) {
      fetch(`${API_URL}?product_id=${matrixProductId}`)
        .then(r => r.json())
        .then(d => {
          if (d.cols?.length) { setImportedMatrixCols(d.cols); setImportedMatrixModels(d.models); }
        })
        .catch(() => {});
    }
  }, [productId]);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportError("");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const XLSX = await import("xlsx");
        const wb = XLSX.read(ev.target?.result, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        if (rows.length < 2) { setImportError("Файл пустой или не содержит данных"); setImporting(false); return; }
        // Правило: названия моделей и характеристики всегда в одну строку —
        // убираем переносы строк, которые могли попасть из ячеек Excel
        const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();
        const headers = rows[0].map((h) => oneLine(h)).filter(Boolean);
        const cols: ModelTableCol[] = headers.map((h, i) => ({ key: `col${i}`, label: h }));
        const models: ModelRow[] = rows.slice(1).filter(r => r.some(c => c !== "")).map((row) => {
          const obj: ModelRow = { model: oneLine(row[0]) };
          headers.forEach((_, i) => { obj[`col${i}`] = oneLine(row[i]); });
          return obj;
        });
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productId, cols, models }),
        });
        if (!res.ok) throw new Error("server error");
        setImportedCols(cols);
        setImportedModels(models);
      } catch {
        setImportError("Не удалось загрузить данные. Попробуйте ещё раз.");
      }
      setImporting(false);
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const clearImported = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, cols: [], models: [] }),
    }).catch(() => {});
    setImportedModels([]);
    setImportedCols([]);
  };

  const handlePumpExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportingPump(true);
    setImportPumpError("");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const XLSX = await import("xlsx");
        const wb = XLSX.read(ev.target?.result, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        if (rows.length < 2) { setImportPumpError("Файл пустой или не содержит данных"); setImportingPump(false); return; }
        const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();
        const headers = rows[0].map((h) => oneLine(h)).filter(Boolean);
        const cols: ModelTableCol[] = headers.map((h, i) => ({ key: `col${i}`, label: h }));
        const models: ModelRow[] = rows.slice(1).filter(r => r.some(c => c !== "")).map((row) => {
          const obj: ModelRow = { model: oneLine(row[0]) };
          headers.forEach((_, i) => { obj[`col${i}`] = oneLine(row[i]); });
          return obj;
        });
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: pumpProductId, cols, models }),
        });
        if (!res.ok) throw new Error("server error");
        setImportedPumpCols(cols);
        setImportedPumpModels(models);
      } catch {
        setImportPumpError("Не удалось загрузить данные. Попробуйте ещё раз.");
      }
      setImportingPump(false);
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const clearImportedPump = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: pumpProductId, cols: [], models: [] }),
    }).catch(() => {});
    setImportedPumpModels([]);
    setImportedPumpCols([]);
  };

  const handleMatrixExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportingMatrix(true);
    setImportMatrixError("");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const XLSX = await import("xlsx");
        const wb = XLSX.read(ev.target?.result, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        if (rows.length < 2) { setImportMatrixError("Файл пустой или не содержит данных"); setImportingMatrix(false); return; }
        const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();
        const headers = rows[0].map((h) => oneLine(h)).filter(Boolean);
        const cols: ModelTableCol[] = headers.map((h, i) => ({ key: `col${i}`, label: h }));
        const models: ModelRow[] = rows.slice(1).filter(r => r.some(c => c !== "")).map((row) => {
          const obj: ModelRow = { model: oneLine(row[0]) };
          headers.forEach((_, i) => { obj[`col${i}`] = oneLine(row[i]); });
          return obj;
        });
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: matrixProductId, cols, models }),
        });
        if (!res.ok) throw new Error("server error");
        setImportedMatrixCols(cols);
        setImportedMatrixModels(models);
      } catch {
        setImportMatrixError("Не удалось загрузить данные. Попробуйте ещё раз.");
      }
      setImportingMatrix(false);
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const clearImportedMatrix = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: matrixProductId, cols: [], models: [] }),
    }).catch(() => {});
    setImportedMatrixModels([]);
    setImportedMatrixCols([]);
  };

  const activeModels = importedModels.length > 0 ? importedModels : (data?.models ?? []);
  const activeCols = importedCols.length > 0 ? importedCols : (data?.modelTableCols ?? []);

  if (!data) {
    const group = GROUP_DATA[groupId];
    const subgroup = group?.subgroups.find((s) => s.id === productId);

    return (
      <div className="pt-24 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="flex gap-8 items-start">

            <div className="hidden lg:block">
              <EquipmentSidebar
                activeDirectionId="hydraulics"
                activeGroupId={groupId}
                onNavigate={onNavigate}
              />
            </div>

            <div className="flex-1 min-w-0">

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-body text-white/30 mb-8 flex-wrap">
                <button onClick={() => onNavigate("equipment-groups")} className="hover:text-white/60 transition-colors">
                  Оборудование
                </button>
                <span>/</span>
                <button onClick={() => onNavigate(`equipment-group-${groupId}`)} className="hover:text-white/60 transition-colors">
                  {group?.title ?? "Группа оборудования"}
                </button>
                <span>/</span>
                <span className="text-white/55">{subgroup?.title ?? "Товар"}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-white text-2xl md:text-3xl tracking-wide mb-8">
                {subgroup?.title ?? "Страница товара в разработке"}
              </h1>

              {/* Image */}
              <div className="mb-10">
                <div className={`w-full mx-auto bg-white rounded-sm flex items-center justify-center overflow-hidden mb-6 ${NO_DESCRIPTION_PRODUCT_IDS.includes(productId) ? "max-w-[90%]" : "max-w-[50%]"}`}>
                  {(subgroup?.img2 ?? subgroup?.img) ? (
                    <img
                      src={subgroup?.img2 ?? subgroup?.img}
                      alt={subgroup?.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain p-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-black/20 py-16">
                      <Icon name="ImageOff" size={32} />
                      <span className="text-[11px] font-body">Фото появится позже</span>
                    </div>
                  )}
                </div>

                {!NO_DESCRIPTION_PRODUCT_IDS.includes(productId) && (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-px bg-brand-red" />
                      <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Описание</span>
                    </div>
                    <p className="font-body text-white/65 text-sm leading-relaxed">
                      Подробное описание и технические характеристики для этой позиции скоро появятся на сайте.
                      Актуальную информацию и наличие уточняйте у наших менеджеров.
                    </p>
                  </>
                )}
              </div>

              {/* Model table */}
              <div className="mb-10">
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-px bg-brand-red" />
                    <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Модельный ряд</span>
                    {importedModels.length > 0 && (
                      <span className="font-body text-brand-red text-[10px] border border-brand-red/30 px-2 py-0.5 rounded-sm">
                        Данные из Excel
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {importedModels.length > 0 && (
                      <button
                        onClick={clearImported}
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
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={handleExcelUpload}
                      />
                    </label>
                  </div>
                </div>
                {importError && (
                  <div className="mb-3 px-3 py-2 bg-brand-red/10 border border-brand-red/20 rounded-sm">
                    <p className="font-body text-brand-red text-xs">{importError}</p>
                  </div>
                )}
                {activeModels.length > 0 ? (
                  <div className="rounded-sm border border-white/8 overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="bg-brand-red/10 border-b border-white/8">
                          {activeCols.map((col) => (
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
                        {activeModels.map((row, i) => (
                          <tr
                            key={i}
                            className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}
                          >
                            {activeCols.map((col) => (
                              <td
                                key={col.key}
                                className={`px-3 py-2 text-[12px] leading-snug ${col.key === "purpose" ? "text-left whitespace-normal" : "text-center whitespace-nowrap"} ${col.key === "model" || col.key === "col0" ? "text-white font-medium" : "text-white/65"}`}
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

              <button
                onClick={() => onNavigate(`equipment-group-${groupId}`)}
                className="text-brand-red text-sm hover:underline"
              >
                ← Назад к группе
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex gap-8 items-start">

          <div className="hidden lg:block">
            <EquipmentSidebar
              activeDirectionId="hydraulics"
              activeGroupId={data.groupId}
              onNavigate={onNavigate}
            />
          </div>

          <div className="flex-1 min-w-0">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-body text-white/30 mb-8 flex-wrap">
              <button onClick={() => onNavigate("equipment-groups")} className="hover:text-white/60 transition-colors">
                Оборудование
              </button>
              <span>/</span>
              <button onClick={() => onNavigate(`equipment-group-${data.groupId}`)} className="hover:text-white/60 transition-colors">
                {data.groupTitle}
              </button>
              <span>/</span>
              <span className="text-white/55">{data.title}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-white text-2xl md:text-3xl tracking-wide mb-8">
              {data.title}
            </h1>

            {/* Image + Description */}
            <div className="mb-10">
              <div className={`w-full mx-auto bg-white rounded-sm flex items-center justify-center overflow-hidden mb-6 ${PRODUCT_IMG_WIDTH[productId] ?? "max-w-[50%]"}`}>
                {data.img ? (
                  <img
                    src={data.img}
                    alt={data.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain p-4"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-black/20 py-16">
                    <Icon name="ImageOff" size={32} />
                    <span className="text-[11px] font-body">Фото появится позже</span>
                  </div>
                )}
              </div>
              {data.description && !NO_DESCRIPTION_PRODUCT_IDS.includes(productId) && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-brand-red" />
                    <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Описание</span>
                  </div>
                  <div className="font-body text-white/65 text-sm leading-relaxed">
                    {data.description.split("\n").map((line, i) => (
                      <p key={i} className={line === "" ? "mt-3" : "mb-1"}>{line}</p>
                    ))}
                  </div>
                </>
              )}

              {(DESCRIPTION_IMAGES[productId] ?? []).map((di) => (
                <div key={di.caption} className="mt-8">
                  <p className="font-display text-white text-lg tracking-wide mb-3">{di.caption}</p>
                  <div className={`w-full mr-auto bg-white rounded-sm flex items-center justify-center overflow-hidden mb-4 ${di.imgWidth ?? "max-w-[55%]"}`}>
                    <img src={di.img} alt={di.caption} loading="lazy" decoding="async" className="w-full h-auto object-contain p-4" />
                  </div>
                  {di.text && (
                    <p className="font-body text-white/65 text-sm leading-relaxed">{di.text}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Tech specs */}
            {data.specs.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-brand-red" />
                  <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Технические характеристики</span>
                </div>
                <div className="border border-white/8 rounded-sm overflow-hidden">
                  {data.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-center gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}
                    >
                      <span className="font-body text-white/40 text-sm w-56 shrink-0">{spec.label}</span>
                      <span className="font-body text-white/80 text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model table */}
            {!NO_MODEL_TABLE_PRODUCT_IDS.includes(productId) && (
            <div className="mb-10">
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-brand-red" />
                  <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">{productId === "rescue-krug-1s-am" || productId === "rescue-krug-2" ? "Технические характеристики" : "Модельный ряд"}</span>
                  {importedModels.length > 0 && (
                    <span className="font-body text-brand-red text-[10px] border border-brand-red/30 px-2 py-0.5 rounded-sm">
                      Данные из Excel
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {importedModels.length > 0 && (
                    <button
                      onClick={clearImported}
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
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      onChange={handleExcelUpload}
                    />
                  </label>
                </div>
              </div>
              {importError && (
                <div className="mb-3 px-3 py-2 bg-brand-red/10 border border-brand-red/20 rounded-sm">
                  <p className="font-body text-brand-red text-xs">{importError}</p>
                </div>
              )}
              <div className="rounded-sm border border-white/8 overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="bg-brand-red/10 border-b border-white/8">
                      {activeCols.map((col) => (
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
                    {activeModels.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}
                      >
                        {activeCols.map((col) => (
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
            </div>
            )}

            {/* Extra sections */}
            {(EXTRA_SECTIONS[productId] ?? []).map((sec) => (
              <ProductExtraSection
                key={sec.id}
                sectionId={`${productId}-${sec.id}`}
                title={sec.title}
                img={sec.img}
                imgWidth={sec.imgWidth}
                description={sec.description}
                caption={sec.caption}
              />
            ))}

            {/* Pump specs table */}
            {PUMP_SPECS_PRODUCT_IDS.includes(productId) && (
              <div className="mb-10">
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-px bg-brand-red" />
                    <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Характеристики насосной станции для съемника</span>
                    {importedPumpModels.length > 0 && (
                      <span className="font-body text-brand-red text-[10px] border border-brand-red/30 px-2 py-0.5 rounded-sm">
                        Данные из Excel
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {importedPumpModels.length > 0 && (
                      <button
                        onClick={clearImportedPump}
                        className="font-body text-white/30 text-xs hover:text-white/60 transition-colors flex items-center gap-1"
                      >
                        <Icon name="RotateCcw" size={11} />
                        Сбросить
                      </button>
                    )}
                    <label className="inline-flex items-center gap-2 cursor-pointer border border-white/15 hover:border-white/35 px-3 py-1.5 rounded-sm transition-colors group">
                      {importingPump ? (
                        <Icon name="Loader" size={12} className="text-white/40 animate-spin" />
                      ) : (
                        <Icon name="Upload" size={12} className="text-white/40 group-hover:text-white transition-colors" />
                      )}
                      <span className="font-body text-white/40 group-hover:text-white text-xs transition-colors">
                        {importingPump ? "Загружаю..." : "Загрузить Excel"}
                      </span>
                      <input
                        ref={pumpFileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={handlePumpExcelUpload}
                      />
                    </label>
                  </div>
                </div>
                {importPumpError && (
                  <div className="mb-3 px-3 py-2 bg-brand-red/10 border border-brand-red/20 rounded-sm">
                    <p className="font-body text-brand-red text-xs">{importPumpError}</p>
                  </div>
                )}
                {importedPumpModels.length > 0 ? (
                  <div className="rounded-sm border border-white/8 overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="bg-brand-red/10 border-b border-white/8">
                          {importedPumpCols.map((col) => (
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
                        {importedPumpModels.map((row, i) => (
                          <tr
                            key={i}
                            className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}
                          >
                            {importedPumpCols.map((col) => (
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
                      Таблица характеристик ещё не загружена. Добавьте Excel-файл, чтобы она появилась здесь.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Matrix sets table */}
            {MATRIX_SETS_PRODUCT_IDS.includes(productId) && (
              <div className="mb-10">
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-px bg-brand-red" />
                    <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Комплекты матриц</span>
                    {importedMatrixModels.length > 0 && (
                      <span className="font-body text-brand-red text-[10px] border border-brand-red/30 px-2 py-0.5 rounded-sm">
                        Данные из Excel
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {importedMatrixModels.length > 0 && (
                      <button
                        onClick={clearImportedMatrix}
                        className="font-body text-white/30 text-xs hover:text-white/60 transition-colors flex items-center gap-1"
                      >
                        <Icon name="RotateCcw" size={11} />
                        Сбросить
                      </button>
                    )}
                    <label className="inline-flex items-center gap-2 cursor-pointer border border-white/15 hover:border-white/35 px-3 py-1.5 rounded-sm transition-colors group">
                      {importingMatrix ? (
                        <Icon name="Loader" size={12} className="text-white/40 animate-spin" />
                      ) : (
                        <Icon name="Upload" size={12} className="text-white/40 group-hover:text-white transition-colors" />
                      )}
                      <span className="font-body text-white/40 group-hover:text-white text-xs transition-colors">
                        {importingMatrix ? "Загружаю..." : "Загрузить Excel"}
                      </span>
                      <input
                        ref={matrixFileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={handleMatrixExcelUpload}
                      />
                    </label>
                  </div>
                </div>
                {importMatrixError && (
                  <div className="mb-3 px-3 py-2 bg-brand-red/10 border border-brand-red/20 rounded-sm">
                    <p className="font-body text-brand-red text-xs">{importMatrixError}</p>
                  </div>
                )}
                {importedMatrixModels.length > 0 ? (
                  <div className="rounded-sm border border-white/8 overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="bg-brand-red/10 border-b border-white/8">
                          {importedMatrixCols.map((col) => (
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
                        {importedMatrixModels.map((row, i) => (
                          <tr
                            key={i}
                            className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}
                          >
                            {importedMatrixCols.map((col) => (
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
                      Таблица комплектов матриц ещё не загружена. Добавьте Excel-файл, чтобы она появилась здесь.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="bg-brand-dark-2 border border-white/8 rounded-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-white text-lg tracking-wide mb-1">Нужна консультация или КП?</p>
                <p className="font-body text-white/40 text-xs">Подберём модель, уточним наличие и сроки поставки</p>
              </div>
              <button
                onClick={() => onNavigate("contacts")}
                className="btn-primary px-6 py-3 text-xs rounded-sm inline-flex items-center gap-2 shrink-0"
              >
                <Icon name="FileText" size={13} />
                Запросить КП
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}