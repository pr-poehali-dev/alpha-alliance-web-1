import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import Icon from "@/components/ui/icon";
import EquipmentSidebar from "@/components/EquipmentSidebar";

interface Props {
  productId: string;
  onNavigate: (page: string) => void;
}

interface TechSpec {
  label: string;
  value: string;
}

interface ModelRow {
  model: string;
  capacity?: string;
  stroke?: string;
  pressure?: string;
  weight?: string;
  height?: string;
  [key: string]: string | undefined;
}

interface ModelTableCol {
  key: string;
  label: string;
}

interface ProductData {
  title: string;
  groupId: string;
  groupTitle: string;
  img?: string;
  description: string;
  specs: TechSpec[];
  modelTableCols: ModelTableCol[];
  models: ModelRow[];
}

const PRODUCT_DATA: Record<string, ProductData> = {
  "jacks-universal-single": {
    title: "Домкраты универсальные односторонние",
    groupId: "jacks",
    groupTitle: "Домкраты и цилиндры",
    description:
      "Гидравлические домкраты одностороннего действия общепромышленного применения. Подъём осуществляется давлением масла, возврат штока — пружинный. Стальной корпус с хромированным штоком обеспечивает высокую износостойкость и коррозионную стойкость. Применяются в машиностроении, строительстве, энергетике и при монтажных работах. Рабочее давление до 70 МПа.",
    specs: [
      { label: "Тип действия", value: "Одностороннее" },
      { label: "Возврат штока", value: "Пружинный" },
      { label: "Рабочее давление", value: "До 70 МПа" },
      { label: "Усилие", value: "5 – 200 тонн" },
      { label: "Материал корпуса", value: "Сталь" },
      { label: "Шток", value: "Хромированная сталь" },
      { label: "Резьба подключения", value: "BSP 3/8\"" },
      { label: "Рабочая жидкость", value: "Гидравлическое масло" },
    ],
    modelTableCols: [
      { key: "model", label: "Модель" },
      { key: "capacity", label: "Грузоподъёмность, т" },
      { key: "stroke", label: "Ход штока, мм" },
      { key: "height", label: "Высота закрытая, мм" },
      { key: "pressure", label: "Давление, МПа" },
      { key: "weight", label: "Масса, кг" },
    ],
    models: [
      { model: "ДУО-5-50", capacity: "5", stroke: "50", height: "160", pressure: "70", weight: "1,8" },
      { model: "ДУО-10-50", capacity: "10", stroke: "50", height: "185", pressure: "70", weight: "2,9" },
      { model: "ДУО-10-100", capacity: "10", stroke: "100", height: "235", pressure: "70", weight: "3,4" },
      { model: "ДУО-20-50", capacity: "20", stroke: "50", height: "210", pressure: "70", weight: "4,8" },
      { model: "ДУО-20-100", capacity: "20", stroke: "100", height: "260", pressure: "70", weight: "5,6" },
      { model: "ДУО-30-50", capacity: "30", stroke: "50", height: "230", pressure: "70", weight: "7,2" },
      { model: "ДУО-30-150", capacity: "30", stroke: "150", height: "380", pressure: "70", weight: "9,1" },
      { model: "ДУО-50-100", capacity: "50", stroke: "100", height: "285", pressure: "70", weight: "12,4" },
      { model: "ДУО-50-200", capacity: "50", stroke: "200", height: "430", pressure: "70", weight: "16,2" },
      { model: "ДУО-100-100", capacity: "100", stroke: "100", height: "340", pressure: "70", weight: "26,5" },
      { model: "ДУО-100-200", capacity: "100", stroke: "200", height: "490", pressure: "70", weight: "33,8" },
      { model: "ДУО-150-150", capacity: "150", stroke: "150", height: "420", pressure: "70", weight: "48,0" },
      { model: "ДУО-200-150", capacity: "200", stroke: "150", height: "460", pressure: "70", weight: "67,0" },
    ],
  },
  "jacks-universal-double": {
    title: "Домкраты универсальные двусторонние",
    groupId: "jacks",
    groupTitle: "Домкраты и цилиндры",
    description:
      "Гидравлические домкраты двустороннего действия с принудительным возвратом штока. Обеспечивают управляемое усилие как при выдвижении, так и при втягивании штока. Незаменимы при работах, требующих точного контроля хода в обоих направлениях: правка, стяжка, монтаж конструкций. Давление до 70 МПа.",
    specs: [
      { label: "Тип действия", value: "Двустороннее" },
      { label: "Возврат штока", value: "Гидравлический (принудительный)" },
      { label: "Рабочее давление", value: "До 70 МПа" },
      { label: "Усилие выдвижения", value: "5 – 150 тонн" },
      { label: "Усилие втягивания", value: "30–60% от номинала" },
      { label: "Материал корпуса", value: "Сталь" },
      { label: "Шток", value: "Хромированная сталь" },
      { label: "Резьба подключения", value: "BSP 3/8\"" },
    ],
    modelTableCols: [
      { key: "model", label: "Модель" },
      { key: "capacity", label: "Грузоподъёмность, т" },
      { key: "stroke", label: "Ход штока, мм" },
      { key: "height", label: "Высота закрытая, мм" },
      { key: "pressure", label: "Давление, МПа" },
      { key: "weight", label: "Масса, кг" },
    ],
    models: [
      { model: "ДУД-5-50", capacity: "5", stroke: "50", height: "175", pressure: "70", weight: "2,2" },
      { model: "ДУД-10-50", capacity: "10", stroke: "50", height: "200", pressure: "70", weight: "3,5" },
      { model: "ДУД-10-100", capacity: "10", stroke: "100", height: "255", pressure: "70", weight: "4,1" },
      { model: "ДУД-20-100", capacity: "20", stroke: "100", height: "280", pressure: "70", weight: "6,4" },
      { model: "ДУД-30-100", capacity: "30", stroke: "100", height: "310", pressure: "70", weight: "9,8" },
      { model: "ДУД-50-100", capacity: "50", stroke: "100", height: "350", pressure: "70", weight: "15,6" },
      { model: "ДУД-100-100", capacity: "100", stroke: "100", height: "420", pressure: "70", weight: "32,0" },
      { model: "ДУД-150-150", capacity: "150", stroke: "150", height: "520", pressure: "70", weight: "58,0" },
    ],
  },
};

function getParentGroupId(productId: string): string {
  const prefix = productId.split("-")[0];
  const map: Record<string, string> = {
    jacks: "jacks",
    cylinders: "jacks",
    pumps: "pumps",
    pullers: "pullers",
    presses: "presses",
    cutting: "cutting",
    threading: "threading",
    benders: "benders",
    rescue: "rescue",
    special: "special",
    riklin: "riklin",
  };
  return map[prefix] ?? "jacks";
}

const API_URL = "https://functions.poehali.dev/74d51823-3430-4e7b-993d-298643f66a5f";

export default function ProductPage({ productId, onNavigate }: Props) {
  const data = PRODUCT_DATA[productId];
  const groupId = data?.groupId ?? getParentGroupId(productId);

  const [importedModels, setImportedModels] = useState<ModelRow[]>([]);
  const [importedCols, setImportedCols] = useState<ModelTableCol[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загружаем данные с сервера при открытии страницы
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}?product_id=${productId}`)
      .then(r => r.json())
      .then(d => {
        if (d.cols?.length) { setImportedCols(d.cols); setImportedModels(d.models); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportError("");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const wb = XLSX.read(ev.target?.result, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        if (rows.length < 2) { setImportError("Файл пустой или не содержит данных"); setImporting(false); return; }
        const headers = rows[0].map((h) => String(h).trim()).filter(Boolean);
        const cols: ModelTableCol[] = headers.map((h, i) => ({ key: `col${i}`, label: h }));
        const models: ModelRow[] = rows.slice(1).filter(r => r.some(c => c !== "")).map((row) => {
          const obj: ModelRow = { model: String(row[0] ?? "").trim() };
          headers.forEach((_, i) => { obj[`col${i}`] = String(row[i] ?? "").trim(); });
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

  const activeModels = importedModels.length > 0 ? importedModels : (data?.models ?? []);
  const activeCols = importedCols.length > 0 ? importedCols : (data?.modelTableCols ?? []);

  if (!data) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-white/50 mb-4">Страница товара в разработке</p>
        <button
          onClick={() => onNavigate(`equipment-group-${groupId}`)}
          className="text-brand-red text-sm hover:underline"
        >
          ← Назад к группе
        </button>
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

            {/* Description + Image */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-brand-red" />
                <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Описание</span>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <p className="font-body text-white/65 text-sm leading-relaxed flex-1">
                  {data.description}
                </p>
                <div className="shrink-0 w-full md:w-72 h-52 bg-white rounded-sm flex items-center justify-center overflow-hidden">
                  {data.img ? (
                    <img
                      src={data.img}
                      alt={data.title}
                      className="max-w-full max-h-full w-auto h-auto object-contain p-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-black/20">
                      <Icon name="ImageOff" size={32} />
                      <span className="text-[11px] font-body">Фото появится позже</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tech specs */}
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
              <div className="overflow-x-auto rounded-sm border border-white/8">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="bg-brand-red/10 border-b border-white/8">
                      {activeCols.map((col) => (
                        <th
                          key={col.key}
                          className="text-left px-4 py-3 text-white/50 text-xs tracking-wide font-normal whitespace-nowrap"
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
                            className={`px-4 py-3 whitespace-nowrap ${col.key === "model" || col.key === "col0" ? "text-white font-medium" : "text-white/65"}`}
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