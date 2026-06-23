export interface EquipmentGroup {
  id: string;
  title: string;
  desc: string;
  sub: string;
  img: string;
  imgFit?: "contain" | "cover";
}

export interface EquipmentDirection {
  id: string;
  title: string;
  icon: string;
  desc: string;
  groups: EquipmentGroup[];
  comingSoon?: boolean;
}

export const HYDRAULIC_GROUPS: EquipmentGroup[] = [
  {
    id: "jacks",
    title: "Домкраты и цилиндры",
    desc: "Домкраты и силовые цилиндры для подъёма, перемещения, фиксации.",
    sub: "9 подгрупп: универсальные, грузовые, алюминиевые, тянущие, низкие, телескопические, специальные, цилиндры на заказ.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
  },
  {
    id: "pumps",
    title: "Насосы и станции",
    desc: "Источники давления: ручные, ножные, пневматические, электрические, бензиновые, дизельные.",
    sub: "До 140 МПа. Компактные и стационарные варианты.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/6492f583-7a93-40ca-b8fe-191ee58f7a06.jpg",
  },
  {
    id: "pullers",
    title: "Съёмники",
    desc: "Гидравлические и механические съёмники для демонтажа деталей с натягом.",
    sub: "Стандартные, подкатные, с захватом-хомутом, автономные.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/1b01ebed-c631-403d-9b53-8da1eabea048.png",
  },
  {
    id: "presses",
    title: "Прессы",
    desc: "Вертикальные и горизонтальные прессы, перфораторы, прессы для опрессовки кабельных наконечников и гильз.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e086c588-cb03-4683-b155-f44e77dd3965.png",
  },
  {
    id: "cutting",
    title: "Режущий инструмент",
    desc: "Гайкорезы, ножницы для кабеля и уголка, резаки тросов, ножницы для труб и листа.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/533e96b4-ec15-417e-8f06-4b00d56f6927.jpg",
  },
  {
    id: "threading",
    title: "Оборудование для резьбы",
    desc: "Гайковерты, тензорные домкраты, мультипликаторы, динамометрические ключи, ударные ключи, магнитные гайкодержатели.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e371336d-a708-4342-8200-f79be566f3d4.png",
  },
  {
    id: "benders",
    title: "Трубогибы",
    desc: "Трубогибы с закрытой рамой: ручные, автономные, с электроприводом.",
    sub: "Трубы до 2 дюймов.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e750022d-9903-4995-b1ab-93ebc5631f42.png",
  },
  {
    id: "rescue",
    title: "Спасение и ЖД",
    desc: "Комплекты КРУГ (АСР), АВСО (ЖД), рихтовщики, разгонщики, рельсогибы, путевые домкраты.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/15332f38-0f6d-4cc7-9734-d6d61beda309.jpg",
    imgFit: "cover",
  },
  {
    id: "special",
    title: "Специальное оборудование",
    desc: "Натяжители арматуры, горизонтальное бурение, перемещение тяжеловесов, стропы, выпрессовщики, разгонщики фланцев, пружинные балансиры.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/dcf990fb-7f19-46d9-9934-05bbda0b689e.png",
    imgFit: "cover",
  },
  {
    id: "riklin",
    title: "РиКлайн (эконом)",
    desc: "Экономичная линейка: домкраты, насосные станции, магнитные захваты, тележки, столы, краны, штабелёры, аккумуляторный инструмент.",
    sub: "",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9ca7d7e6-faca-45c4-b432-afbdd911487c.png",
  },
];

export const DIRECTIONS: EquipmentDirection[] = [
  {
    id: "hydraulics",
    title: "Гидравлика",
    icon: "Droplets",
    desc: "Домкраты, цилиндры, съёмники, прессы, насосы, трубогибы и специальный гидравлический инструмент",
    groups: HYDRAULIC_GROUPS,
  },
  {
    id: "pump",
    title: "Насосное оборудование",
    icon: "Gauge",
    desc: "Центробежные, вихревые, шестерённые, плунжерные насосы. Насосные агрегаты и станции для промышленных систем.",
    groups: [],
    comingSoon: true,
  },
  {
    id: "lifting",
    title: "Грузоподъёмное оборудование",
    icon: "ArrowUpFromLine",
    desc: "Мостовые краны, кран-балки, таль, тельфер, подъёмники, лебёдки, стропы и такелажный инструмент.",
    groups: [],
    comingSoon: true,
  },
  {
    id: "metalwork",
    title: "Оборудование для металлообработки",
    icon: "Settings2",
    desc: "Токарные, фрезерные, шлифовальные станки. Листогибы, вальцы, гильотины, координатно-пробивные прессы.",
    groups: [],
    comingSoon: true,
  },
  {
    id: "welding",
    title: "Сварочное оборудование",
    icon: "Flame",
    desc: "Сварочные инверторы и полуавтоматы, плазменная резка, аргонодуговая и автоматическая сварка, сварочные столы.",
    groups: [],
    comingSoon: true,
  },
  {
    id: "robots",
    title: "Роботы и роботизированные решения",
    icon: "Bot",
    desc: "Промышленные роботы-манипуляторы, роботизированные сварочные ячейки, автоматизация производственных процессов.",
    groups: [],
    comingSoon: true,
  },
];

export const ALL_GROUPS: (EquipmentGroup & { directionId: string; directionTitle: string })[] =
  DIRECTIONS.flatMap((d) =>
    d.groups.map((g) => ({ ...g, directionId: d.id, directionTitle: d.title }))
  );

export function getGroupDirection(groupId: string): EquipmentDirection | undefined {
  return DIRECTIONS.find((d) => d.groups.some((g) => g.id === groupId));
}