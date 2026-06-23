import Icon from "@/components/ui/icon";
import EquipmentSidebar from "@/components/EquipmentSidebar";
import { getGroupDirection } from "@/data/equipment";

interface Props {
  groupId: string;
  onNavigate: (page: string) => void;
}

interface GroupData {
  title: string;
  longDesc: string;
  img: string;
  subgroups: string[];
  features: { icon: string; label: string }[];
}

const GROUP_DATA: Record<string, GroupData> = {
  jacks: {
    title: "Домкраты и цилиндры",
    longDesc:
      "Широкая линейка гидравлических домкратов и силовых цилиндров для промышленного применения. Усилие от 5 до 1000 тонн. Рабочее давление до 70 МПа. Все изделия проходят выходной контроль и испытания давлением. Поставляем как стандартные модели из наличия, так и цилиндры, изготовленные по индивидуальному техзаданию.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
    subgroups: ["Универсальные домкраты", "Грузовые домкраты", "Алюминиевые домкраты", "Тянущие цилиндры", "Низкопрофильные домкраты", "Телескопические цилиндры", "Специальные домкраты", "Цилиндры на заказ", "Синхронные системы"],
    features: [{ icon: "Gauge", label: "До 70 МПа" }, { icon: "Weight", label: "5–1000 тонн" }, { icon: "Settings", label: "Индивидуальные заказы" }, { icon: "ShieldCheck", label: "Выходной контроль" }],
  },
  pumps: {
    title: "Насосы и станции",
    longDesc:
      "Насосные агрегаты и гидравлические станции для питания гидравлического инструмента и оборудования. Давление до 140 МПа. Объём бака от 0,35 до 60 литров. Ручные и ножные насосы для мобильного применения, электрические станции для стационарных постов, автономные — для работы на объектах без электроснабжения.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/6492f583-7a93-40ca-b8fe-191ee58f7a06.jpg",
    subgroups: ["Ручные насосы", "Ножные насосы", "Пневматические насосы", "Электрические насосные станции", "Бензиновые насосы", "Дизельные насосы", "Двухскоростные насосы", "Насосы с дистанционным управлением"],
    features: [{ icon: "Gauge", label: "До 140 МПа" }, { icon: "Zap", label: "Электро / авто / пневмо" }, { icon: "Package", label: "Объём 0,35–60 л" }, { icon: "Wifi", label: "Дистанционное управление" }],
  },
  pullers: {
    title: "Съёмники",
    longDesc:
      "Съёмники применяются при демонтаже подшипников, муфт, шестерён и других деталей, установленных с натягом. Гидравлические модели обеспечивают высокое усилие без ударных нагрузок. Механические — для лёгких и средних задач. Специальные подкатные варианты для работы на крупных валах и в стеснённых условиях.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/1b01ebed-c631-403d-9b53-8da1eabea048.png",
    subgroups: ["Стандартные съёмники", "Подкатные съёмники", "Съёмники с захватом-хомутом", "Автономные гидравлические съёмники", "Съёмники подшипников", "Съёмники полуосей"],
    features: [{ icon: "Wrench", label: "Гидро и механика" }, { icon: "Layers", label: "Демонтаж без ударов" }, { icon: "Move", label: "Подкатные варианты" }, { icon: "CircleDot", label: "Захваты для любых деталей" }],
  },
  presses: {
    title: "Прессы",
    longDesc:
      "Прессовое оборудование для правки, запрессовки, штамповки и монтажа деталей. Усилие от 10 до 200 тонн. Рамные прессы позволяют работать с крупногабаритными изделиями. Портативные гидравлические прессы для полевых условий. Кабельные прессы для опрессовки наконечников сечением до 400 мм².",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e086c588-cb03-4683-b155-f44e77dd3965.png",
    subgroups: ["Вертикальные прессы", "Горизонтальные прессы", "Рамные прессы", "Портативные прессы", "Перфораторы", "Прессы для кабельных наконечников", "Прессы для опрессовки гильз"],
    features: [{ icon: "ArrowDownUp", label: "10–200 тонн" }, { icon: "LayoutGrid", label: "Вертикальные и горизонтальные" }, { icon: "Cable", label: "До 400 мм² кабель" }, { icon: "Ruler", label: "Рамные конструкции" }],
  },
  cutting: {
    title: "Режущий инструмент",
    longDesc:
      "Гидравлический режущий инструмент для безопасного и быстрого разрезания металлических изделий: кабелей, тросов, уголков, труб и листового металла. Компактные конструкции позволяют работать в ограниченном пространстве. Ресурс ножей — от 50 000 резов. Гайкорезы для демонтажа прикипевших болтов без повреждения резьбы в отверстии.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/533e96b4-ec15-417e-8f06-4b00d56f6927.jpg",
    subgroups: ["Гайкорезы", "Ножницы для кабеля", "Ножницы для уголка", "Резаки тросов", "Ножницы для труб", "Ножницы для листового металла", "Комбинированные резаки"],
    features: [{ icon: "Scissors", label: "Кабель, трос, уголок, лист" }, { icon: "Shield", label: "Безопасный демонтаж гаек" }, { icon: "Maximize2", label: "Работа в стеснённых местах" }, { icon: "RefreshCw", label: "50 000+ резов ресурс" }],
  },
  threading: {
    title: "Оборудование для резьбы",
    longDesc:
      "Профессиональный инструмент для монтажа и демонтажа резьбовых соединений с точным контролем усилия. Гайковерты реакционного типа обеспечивают крутящий момент до 70 000 Нм. Тензорные домкраты создают точное осевое усилие затяжки по болту. Мультипликаторы крутящего момента — для работы с ограниченным пространством вокруг соединения.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e371336d-a708-4342-8200-f79be566f3d4.png",
    subgroups: ["Гайковерты реакционного типа", "Квадратные гайковерты", "Тензорные домкраты", "Мультипликаторы момента", "Динамометрические ключи", "Ударные ключи", "Магнитные гайкодержатели"],
    features: [{ icon: "RotateCw", label: "До 70 000 Нм" }, { icon: "Target", label: "Точность ±3%" }, { icon: "Magnet", label: "Магнитные держатели" }, { icon: "Activity", label: "Тензорная затяжка" }],
  },
  benders: {
    title: "Трубогибы",
    longDesc:
      "Гидравлические трубогибы для холодного гнутья труб диаметром до 2 дюймов (DN50). Закрытая рама обеспечивает точный угол изгиба без деформации сечения. Ручные модели — для монтажных бригад без источника питания. Электрические — для высокой производительности на объекте. Автономные — для удалённых площадок.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e750022d-9903-4995-b1ab-93ebc5631f42.png",
    subgroups: ["Ручные трубогибы", "Трубогибы с электроприводом", "Автономные трубогибы", "Горизонтальные трубогибы", "Приспособления и насадки"],
    features: [{ icon: "GitBranch", label: "До 2 дюймов (DN50)" }, { icon: "RotateCcw", label: "Закрытая рама" }, { icon: "Zap", label: "Ручной / эл. / авто" }, { icon: "Check", label: "Без деформации сечения" }],
  },
  rescue: {
    title: "Спасение и ЖД",
    longDesc:
      "Специализированное оборудование для аварийно-спасательных работ и обслуживания железнодорожного пути. Комплект КРУГ — для АСР при ДТП и техногенных авариях. Комплект АВСО — для аварийно-восстановительных служб РЖД. Рихтовщики и разгонщики — для сдвига рельсов в боковом направлении. Рельсогибы — для точной правки геометрии пути.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/15332f38-0f6d-4cc7-9734-d6d61beda309.jpg",
    subgroups: ["Комплект КРУГ (АСР)", "Комплект АВСО (ЖД)", "Рихтовщики рельсов", "Разгонщики стыков", "Рельсогибы", "Путевые домкраты", "Домкраты для РЖД"],
    features: [{ icon: "AlertTriangle", label: "АСР при ЧС" }, { icon: "Train", label: "Эксплуатация РЖД" }, { icon: "Move", label: "Рихтовка рельсов" }, { icon: "Wrench", label: "Сертифицированы" }],
  },
  special: {
    title: "Специальное оборудование",
    longDesc:
      "Нестандартное гидравлическое оборудование для специфических промышленных задач. Натяжители арматуры — для предварительно напряжённого железобетона. Установки горизонтально-направленного бурения. Системы перемещения тяжеловесов на катковых и воздушных опорах. Пружинные балансиры для компенсации веса инструмента при монтаже.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/dcf990fb-7f19-46d9-9934-05bbda0b689e.png",
    subgroups: ["Натяжители арматуры", "Горизонтальное бурение (ГНБ)", "Перемещение тяжеловесов", "Стропы и такелаж", "Выпрессовщики", "Разгонщики фланцев", "Пружинные балансиры"],
    features: [{ icon: "Sliders", label: "Индивидуальные решения" }, { icon: "HardHat", label: "Строительство и монтаж" }, { icon: "ArrowRight", label: "ГНБ и бурение" }, { icon: "Scale", label: "Перемещение тяжеловесов" }],
  },
  riklin: {
    title: "РиКлайн (эконом)",
    longDesc:
      "Серия РиКлайн — доступное оборудование для малого и среднего производства, авторемонта, строительства. Соотношение цена/качество оптимизировано для сервисных мастерских и производственных участков с небольшой интенсивностью использования. Широкий ассортимент: от ручных домкратов до аккумуляторного инструмента.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
    subgroups: ["Домкраты РиКлайн", "Насосные станции РиКлайн", "Магнитные захваты", "Грузовые тележки", "Подъёмные столы", "Краны-манипуляторы", "Штабелёры", "Аккумуляторный инструмент"],
    features: [{ icon: "DollarSign", label: "Экономичная серия" }, { icon: "Package", label: "Широкий ассортимент" }, { icon: "Battery", label: "Аккумуляторный инструмент" }, { icon: "Truck", label: "Грузоподъёмная техника" }],
  },
};

export default function EquipmentGroupDetailPage({ groupId, onNavigate }: Props) {
  const data = GROUP_DATA[groupId];
  const direction = getGroupDirection(groupId);

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
                <p className="font-body text-white/60 text-sm leading-relaxed mb-7">
                  {data.longDesc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 border border-white/15 px-3 py-2 rounded-sm">
                      <Icon name={f.icon} size={13} className="text-brand-red" />
                      <span className="font-body text-white/55 text-xs">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-sm overflow-hidden flex items-center justify-center h-64">
                <img src={data.img} alt={data.title} className="w-full h-full object-contain p-6" />
              </div>
            </div>

            {/* Subgroups */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-brand-red" />
              <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Подгруппы</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {data.subgroups.map((sub, i) => (
                <button
                  key={sub}
                  onClick={() => onNavigate("contacts")}
                  className="flex items-center gap-4 bg-card border border-white/8 p-4 rounded-sm hover:border-white/25 transition-colors group text-left"
                >
                  <div className="w-7 h-7 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0 rounded-sm">
                    <span className="font-display text-brand-red text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="font-body text-white/65 text-sm group-hover:text-white transition-colors flex-1">
                    {sub}
                  </span>
                  <Icon name="ChevronRight" size={13} className="text-white/20 shrink-0 group-hover:text-brand-red transition-colors" />
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
