import { useState } from "react";
import Icon from "@/components/ui/icon";
import EquipmentSidebar from "@/components/EquipmentSidebar";
import { getGroupDirection } from "@/data/equipment";

const IMPORT_URL = "https://functions.poehali.dev/74d51823-3430-4e7b-993d-298643f66a5f";

interface Props {
  groupId: string;
  onNavigate: (page: string) => void;
}

import { GROUP_DATA } from "@/data/groups";
export type { Subgroup, GroupData } from "@/data/groups";
export { GROUP_DATA };

export default function EquipmentGroupDetailPage({ groupId, onNavigate }: Props) {
  const data = GROUP_DATA[groupId];
  const direction = getGroupDirection(groupId);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string>("");

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadResult("");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const base64 = btoa(
          new Uint8Array(ev.target?.result as ArrayBuffer)
            .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
        );
        const res = await fetch(IMPORT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64 }),
        });
        const json = await res.json();
        if (json.ok) {
          const total = json.saved?.reduce((s: number, x: { rows: number }) => s + x.rows, 0) ?? 0;
          setUploadResult(`Загружено ${json.saved?.length ?? 0} листов, ${total} строк`);
        } else {
          setUploadResult("Ошибка при загрузке");
        }
      } catch {
        setUploadResult("Ошибка соединения");
      }
      setUploading(false);
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  if (!data) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-white/50">Группа не найдена</p>
        <button onClick={() => onNavigate("equipment-groups")} className="mt-4 text-brand-red text-sm">
          ← Назад к оборудованию
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <div className="hidden lg:block">
            <EquipmentSidebar
              activeDirectionId={direction?.id ?? "hydraulics"}
              activeGroupId={groupId}
              onNavigate={onNavigate}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-body text-white/30 mb-6 flex-wrap">
              <button onClick={() => onNavigate("equipment-groups")} className="hover:text-white/60 transition-colors">
                Оборудование
              </button>
              {direction && (
                <>
                  <Icon name="ChevronRight" size={12} />
                  <button
                    onClick={() => onNavigate(`equipment-direction-${direction.id}`)}
                    className="hover:text-white/60 transition-colors"
                  >
                    {direction.title}
                  </button>
                </>
              )}
              <Icon name="ChevronRight" size={12} />
              <span className="text-white/55">{data.title}</span>
            </div>

            {/* Hero block */}
            <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
              <div>
                <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide leading-none mb-5">
                  {data.title}
                </h1>
                <p className="font-body text-white/60 text-sm leading-relaxed">
                  {data.longDesc}
                </p>
              </div>
              <div className="bg-white rounded-sm overflow-hidden flex items-center justify-center h-72">
                <img
                  src={data.img}
                  alt={data.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-1"
                  style={{ transform: `scale(${data.imgScale ?? 1.19})` }}
                />
              </div>
            </div>

            {/* Subgroups */}
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-brand-red" />
                <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Подгруппы</span>
              </div>
              {groupId === "jacks" && (
                <div className="flex items-center gap-3 flex-wrap">
                  {uploadResult && (
                    <span className="font-body text-xs text-brand-red border border-brand-red/30 px-2 py-1 rounded-sm">
                      {uploadResult}
                    </span>
                  )}
                  <label className="inline-flex items-center gap-2 cursor-pointer border border-white/15 hover:border-white/35 px-4 py-2 rounded-sm transition-colors group">
                    {uploading
                      ? <Icon name="Loader" size={13} className="text-white/40 animate-spin" />
                      : <Icon name="Upload" size={13} className="text-white/40 group-hover:text-white transition-colors" />
                    }
                    <span className="font-body text-white/40 group-hover:text-white text-xs transition-colors">
                      {uploading ? "Загружаю..." : "Загрузить данные Excel"}
                    </span>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      disabled={uploading}
                      onChange={handleExcelUpload}
                    />
                  </label>
                </div>
              )}
            </div>
            {data.subgroups.length === 0 && (
              <div className="border border-white/8 rounded-sm p-12 text-center bg-card mb-8">
                <Icon name="Clock" size={34} className="text-white/10 mx-auto mb-3" />
                <p className="font-display text-white/40 text-lg tracking-wide mb-1">Каталог моделей готовится</p>
                <p className="font-body text-white/25 text-sm">Напишите нам — подберём модель под ваши параметры</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {data.subgroups.map((sub, i) => (
                <button
                  key={sub.id}
                  onClick={() => onNavigate(`product-${sub.id}`)}
                  className="flex flex-col bg-card border border-white/8 rounded-sm hover:border-white/25 transition-colors group text-left overflow-hidden"
                >
                  {/* Image area */}
                  <div className="relative h-52 bg-white w-full flex items-center justify-center overflow-hidden">
                    {sub.img ? (
                      <img
                        src={sub.img}
                        alt={sub.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        style={sub.imgScale ? { transform: `scale(${sub.imgScale})` } : undefined}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-black/15">
                        <Icon name="ImageOff" size={28} />
                        <span className="text-[10px] font-body">Фото появится позже</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-brand-red flex items-center justify-center">
                      <span className="font-display text-white text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  {/* Title row */}
                  <div className="flex items-center gap-3 px-3 py-3">
                    <span className="font-body text-white/65 text-xs group-hover:text-white transition-colors flex-1 leading-snug">
                      {sub.title}
                    </span>
                    <Icon name="ChevronRight" size={13} className="text-white/20 shrink-0 group-hover:text-brand-red transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-brand-dark-2 border border-white/8 rounded-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-white text-lg tracking-wide mb-1">Нужна консультация?</p>
                <p className="font-body text-white/40 text-xs">Подберём оптимальную модель под вашу задачу и бюджет</p>
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