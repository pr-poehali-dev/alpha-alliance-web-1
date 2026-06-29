import { useState } from "react";
import Icon from "@/components/ui/icon";
import EquipmentSidebar from "@/components/EquipmentSidebar";
import { getGroupDirection } from "@/data/equipment";

const IMPORT_URL = "https://functions.poehali.dev/74d51823-3430-4e7b-993d-298643f66a5f";

interface Props {
  groupId: string;
  onNavigate: (page: string) => void;
}

interface Subgroup {
  id: string;
  title: string;
  img?: string;
}

interface GroupData {
  title: string;
  longDesc: string;
  img: string;
  subgroups: Subgroup[];
  features: { icon: string; label: string }[];
}

const GROUP_DATA: Record<string, GroupData> = {
  jacks: {
    title: "Домкраты и цилиндры",
    longDesc:
      "Широкая линейка гидравлических домкратов и силовых цилиндров для промышленного применения. Усилие от 5 до 1000 тонн. Рабочее давление до 70 МПа. Все изделия проходят выходной контроль и испытания давлением. Поставляем как стандартные модели из наличия, так и цилиндры, изготовленные по индивидуальному техзаданию.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/8800c4b2-b6ca-421c-86be-3796f70ea8a5.png",
    subgroups: [
      { id: "jacks-universal-single", title: "Домкраты универсальные односторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/3555c917-a8f2-4021-bd98-e24826d5fc49.png" },
      { id: "jacks-universal-double", title: "Домкраты универсальные двусторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/7dba7048-3999-43ee-8787-8671ae4f1485.png" },
      { id: "jacks-cargo-single", title: "Домкраты грузовые односторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/430a7b08-5e64-479a-a866-73c737756668.png" },
      { id: "jacks-cargo-double", title: "Домкраты грузовые двусторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/60553648-6bca-4c8e-8513-cd0482abf394.png" },
      { id: "jacks-universal-lock", title: "Домкраты универсальные с фиксирующей гайкой и гидрозамком" },
      { id: "jacks-crusher", title: "Домкраты для конусных дробилок среднего и мелкого дробления" },
      { id: "jacks-transformer", title: "Система для подпрессовки обмоток силовых трансформаторов" },
      { id: "jacks-steprise", title: "Домкраты ступенчатого подъема" },
      { id: "jacks-cargo-lock", title: "Домкраты грузовые с фиксирующей гайкой" },
      { id: "jacks-alu-spring", title: "Домкраты гидравлические алюминиевые с пружинным возвратом" },
      { id: "jacks-alu-cargo-lock", title: "Домкраты грузовые алюминиевые с фиксирующей гайкой" },
      { id: "jacks-alu-hydro", title: "Домкраты гидравлические алюминиевые с гидравлическим возвратом" },
      { id: "jacks-medium-single", title: "Домкраты гидравлические средние, одностороннего действия" },
      { id: "jacks-pulling", title: "Домкраты тянущие" },
      { id: "jacks-low", title: "Домкраты низкие" },
      { id: "jacks-low-telescopic", title: "Домкраты низкие телескопические" },
      { id: "jacks-telescopic", title: "Домкраты телескопические" },
      { id: "jacks-autonomous", title: "Домкраты автономные с малой высотой подхвата" },
      { id: "jacks-rack", title: "Домкраты реечные" },
      { id: "jacks-hollow", title: "Домкраты с полым штоком" },
      { id: "cylinders-power", title: "Цилиндры силовые" },
      { id: "cylinders-ear-70", title: "Цилиндры гидравлические с проушинами до 70 МПа" },
      { id: "jacks-cargo-trolley", title: "Домкраты грузовые подкатные" },
      { id: "jacks-cargo-double-float", title: "Домкраты грузовые двусторонние с увеличенными плавающими опорами" },
      { id: "jacks-accessories", title: "Принадлежности к домкратам" },
    ],
    features: [{ icon: "Gauge", label: "До 70 МПа" }, { icon: "Weight", label: "5–1000 тонн" }, { icon: "Settings", label: "Индивидуальные заказы" }, { icon: "ShieldCheck", label: "Выходной контроль" }],
  },
  pumps: {
    title: "Насосы и станции",
    longDesc:
      "Насосные агрегаты и гидравлические станции для питания гидравлического инструмента и оборудования. Давление до 140 МПа. Объём бака от 0,35 до 60 литров. Ручные и ножные насосы для мобильного применения, электрические станции для стационарных постов, автономные — для работы на объектах без электроснабжения.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/6492f583-7a93-40ca-b8fe-191ee58f7a06.jpg",
    subgroups: [
      { id: "pumps-hand", title: "Ручные насосы" },
      { id: "pumps-foot", title: "Ножные насосы" },
      { id: "pumps-pneumo", title: "Пневматические насосы" },
      { id: "pumps-electric", title: "Электрические насосные станции" },
      { id: "pumps-petrol", title: "Бензиновые насосы" },
      { id: "pumps-diesel", title: "Дизельные насосы" },
      { id: "pumps-twospeed", title: "Двухскоростные насосы" },
      { id: "pumps-remote", title: "Насосы с дистанционным управлением" },
    ],
    features: [{ icon: "Gauge", label: "До 140 МПа" }, { icon: "Zap", label: "Электро / авто / пневмо" }, { icon: "Package", label: "Объём 0,35–60 л" }, { icon: "Wifi", label: "Дистанционное управление" }],
  },
  pullers: {
    title: "Съёмники",
    longDesc:
      "Съёмники применяются при демонтаже подшипников, муфт, шестерён и других деталей, установленных с натягом. Гидравлические модели обеспечивают высокое усилие без ударных нагрузок. Механические — для лёгких и средних задач. Специальные подкатные варианты для работы на крупных валах и в стеснённых условиях.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/1b01ebed-c631-403d-9b53-8da1eabea048.png",
    subgroups: [
      { id: "pullers-standard", title: "Стандартные съёмники" },
      { id: "pullers-rolling", title: "Подкатные съёмники" },
      { id: "pullers-clamp", title: "Съёмники с захватом-хомутом" },
      { id: "pullers-autonomous", title: "Автономные гидравлические съёмники" },
      { id: "pullers-bearings", title: "Съёмники подшипников" },
      { id: "pullers-axle", title: "Съёмники полуосей" },
    ],
    features: [{ icon: "Wrench", label: "Гидро и механика" }, { icon: "Layers", label: "Демонтаж без ударов" }, { icon: "Move", label: "Подкатные варианты" }, { icon: "CircleDot", label: "Захваты для любых деталей" }],
  },
  presses: {
    title: "Прессы",
    longDesc:
      "Прессовое оборудование для правки, запрессовки, штамповки и монтажа деталей. Усилие от 10 до 200 тонн. Рамные прессы позволяют работать с крупногабаритными изделиями. Портативные гидравлические прессы для полевых условий. Кабельные прессы для опрессовки наконечников сечением до 400 мм².",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e086c588-cb03-4683-b155-f44e77dd3965.png",
    subgroups: [
      { id: "presses-vertical", title: "Вертикальные прессы" },
      { id: "presses-horizontal", title: "Горизонтальные прессы" },
      { id: "presses-frame", title: "Рамные прессы" },
      { id: "presses-portable", title: "Портативные прессы" },
      { id: "presses-punch", title: "Перфораторы" },
      { id: "presses-cable-lugs", title: "Прессы для кабельных наконечников" },
      { id: "presses-sleeves", title: "Прессы для опрессовки гильз" },
    ],
    features: [{ icon: "ArrowDownUp", label: "10–200 тонн" }, { icon: "LayoutGrid", label: "Вертикальные и горизонтальные" }, { icon: "Cable", label: "До 400 мм² кабель" }, { icon: "Ruler", label: "Рамные конструкции" }],
  },
  cutting: {
    title: "Режущий инструмент",
    longDesc:
      "Гидравлический режущий инструмент для безопасного и быстрого разрезания металлических изделий: кабелей, тросов, уголков, труб и листового металла. Компактные конструкции позволяют работать в ограниченном пространстве. Ресурс ножей — от 50 000 резов. Гайкорезы для демонтажа прикипевших болтов без повреждения резьбы в отверстии.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/533e96b4-ec15-417e-8f06-4b00d56f6927.jpg",
    subgroups: [
      { id: "cutting-nutcutters", title: "Гайкорезы" },
      { id: "cutting-cable", title: "Ножницы для кабеля" },
      { id: "cutting-angle", title: "Ножницы для уголка" },
      { id: "cutting-rope", title: "Резаки тросов" },
      { id: "cutting-pipe", title: "Ножницы для труб" },
      { id: "cutting-sheet", title: "Ножницы для листового металла" },
      { id: "cutting-combo", title: "Комбинированные резаки" },
    ],
    features: [{ icon: "Scissors", label: "Кабель, трос, уголок, лист" }, { icon: "Shield", label: "Безопасный демонтаж гаек" }, { icon: "Maximize2", label: "Работа в стеснённых местах" }, { icon: "RefreshCw", label: "50 000+ резов ресурс" }],
  },
  threading: {
    title: "Оборудование для резьбы",
    longDesc:
      "Профессиональный инструмент для монтажа и демонтажа резьбовых соединений с точным контролем усилия. Гайковерты реакционного типа обеспечивают крутящий момент до 70 000 Нм. Тензорные домкраты создают точное осевое усилие затяжки по болту. Мультипликаторы крутящего момента — для работы с ограниченным пространством вокруг соединения.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e371336d-a708-4342-8200-f79be566f3d4.png",
    subgroups: [
      { id: "threading-reaction", title: "Гайковерты реакционного типа" },
      { id: "threading-square", title: "Квадратные гайковерты" },
      { id: "threading-tensors", title: "Тензорные домкраты" },
      { id: "threading-multipliers", title: "Мультипликаторы момента" },
      { id: "threading-torque", title: "Динамометрические ключи" },
      { id: "threading-impact", title: "Ударные ключи" },
      { id: "threading-magnetic", title: "Магнитные гайкодержатели" },
    ],
    features: [{ icon: "RotateCw", label: "До 70 000 Нм" }, { icon: "Target", label: "Точность ±3%" }, { icon: "Magnet", label: "Магнитные держатели" }, { icon: "Activity", label: "Тензорная затяжка" }],
  },
  benders: {
    title: "Трубогибы",
    longDesc:
      "Гидравлические трубогибы для холодного гнутья труб диаметром до 2 дюймов (DN50). Закрытая рама обеспечивает точный угол изгиба без деформации сечения. Ручные модели — для монтажных бригад без источника питания. Электрические — для высокой производительности на объекте. Автономные — для удалённых площадок.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e750022d-9903-4995-b1ab-93ebc5631f42.png",
    subgroups: [
      { id: "benders-manual", title: "Ручные трубогибы" },
      { id: "benders-electric", title: "Трубогибы с электроприводом" },
      { id: "benders-autonomous", title: "Автономные трубогибы" },
      { id: "benders-horizontal", title: "Горизонтальные трубогибы" },
      { id: "benders-accessories", title: "Приспособления и насадки" },
    ],
    features: [{ icon: "GitBranch", label: "До 2 дюймов (DN50)" }, { icon: "RotateCcw", label: "Закрытая рама" }, { icon: "Zap", label: "Ручной / эл. / авто" }, { icon: "Check", label: "Без деформации сечения" }],
  },
  rescue: {
    title: "Спасение и ЖД",
    longDesc:
      "Специализированное оборудование для аварийно-спасательных работ и обслуживания железнодорожного пути. Комплект КРУГ — для АСР при ДТП и техногенных авариях. Комплект АВСО — для аварийно-восстановительных служб РЖД. Рихтовщики и разгонщики — для сдвига рельсов в боковом направлении. Рельсогибы — для точной правки геометрии пути.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/15332f38-0f6d-4cc7-9734-d6d61beda309.jpg",
    subgroups: [
      { id: "rescue-krug", title: "Комплект КРУГ (АСР)" },
      { id: "rescue-avso", title: "Комплект АВСО (ЖД)" },
      { id: "rescue-rail-align", title: "Рихтовщики рельсов" },
      { id: "rescue-joint-spreader", title: "Разгонщики стыков" },
      { id: "rescue-railbender", title: "Рельсогибы" },
      { id: "rescue-track-jacks", title: "Путевые домкраты" },
      { id: "rescue-rzd-jacks", title: "Домкраты для РЖД" },
    ],
    features: [{ icon: "AlertTriangle", label: "АСР при ЧС" }, { icon: "Train", label: "Эксплуатация РЖД" }, { icon: "Move", label: "Рихтовка рельсов" }, { icon: "Wrench", label: "Сертифицированы" }],
  },
  special: {
    title: "Специальное оборудование",
    longDesc:
      "Нестандартное гидравлическое оборудование для специфических промышленных задач. Натяжители арматуры — для предварительно напряжённого железобетона. Установки горизонтально-направленного бурения. Системы перемещения тяжеловесов на катковых и воздушных опорах. Пружинные балансиры для компенсации веса инструмента при монтаже.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/dcf990fb-7f19-46d9-9934-05bbda0b689e.png",
    subgroups: [
      { id: "special-tensioners", title: "Натяжители арматуры" },
      { id: "special-drilling", title: "Горизонтальное бурение (ГНБ)" },
      { id: "special-heavy", title: "Перемещение тяжеловесов" },
      { id: "special-slings", title: "Стропы и такелаж" },
      { id: "special-extractors", title: "Выпрессовщики" },
      { id: "special-flange", title: "Разгонщики фланцев" },
      { id: "special-balancers", title: "Пружинные балансиры" },
    ],
    features: [{ icon: "Sliders", label: "Индивидуальные решения" }, { icon: "HardHat", label: "Строительство и монтаж" }, { icon: "ArrowRight", label: "ГНБ и бурение" }, { icon: "Scale", label: "Перемещение тяжеловесов" }],
  },
  riklin: {
    title: "РиКлайн (эконом)",
    longDesc:
      "Серия РиКлайн — доступное оборудование для малого и среднего производства, авторемонта, строительства. Соотношение цена/качество оптимизировано для сервисных мастерских и производственных участков с небольшой интенсивностью использования. Широкий ассортимент: от ручных домкратов до аккумуляторного инструмента.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
    subgroups: [
      { id: "riklin-jacks", title: "Домкраты РиКлайн" },
      { id: "riklin-pumps", title: "Насосные станции РиКлайн" },
      { id: "riklin-magnets", title: "Магнитные захваты" },
      { id: "riklin-trolleys", title: "Грузовые тележки" },
      { id: "riklin-tables", title: "Подъёмные столы" },
      { id: "riklin-cranes", title: "Краны-манипуляторы" },
      { id: "riklin-stackers", title: "Штабелёры" },
      { id: "riklin-battery", title: "Аккумуляторный инструмент" },
    ],
    features: [{ icon: "DollarSign", label: "Экономичная серия" }, { icon: "Package", label: "Широкий ассортимент" }, { icon: "Battery", label: "Аккумуляторный инструмент" }, { icon: "Truck", label: "Грузоподъёмная техника" }],
  },
};

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
                <img src={data.img} alt={data.title} className="w-full h-full object-contain p-4" />
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
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
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