import { useState } from "react";
import Icon from "@/components/ui/icon";
import EquipmentSidebar from "@/components/EquipmentSidebar";
import { getGroupDirection } from "@/data/equipment";

const IMPORT_URL = "https://functions.poehali.dev/74d51823-3430-4e7b-993d-298643f66a5f";

interface Props {
  groupId: string;
  onNavigate: (page: string) => void;
}

export interface Subgroup {
  id: string;
  title: string;
  /** Фото для карточки подгруппы на странице группы */
  img?: string;
  /** Основное фото для страницы товара */
  img2?: string;
}

export interface GroupData {
  title: string;
  longDesc: string;
  img: string;
  imgScale?: number;
  subgroups: Subgroup[];
  features: { icon: string; label: string }[];
}

export const GROUP_DATA: Record<string, GroupData> = {
  jacks: {
    title: "Домкраты и цилиндры",
    longDesc:
      "Широкая линейка гидравлических домкратов и силовых цилиндров для промышленного применения. Усилие от 5 до 1000 тонн. Рабочее давление до 70 МПа. Все изделия проходят выходной контроль и испытания давлением. Поставляем как стандартные модели из наличия, так и цилиндры, изготовленные по индивидуальному техзаданию.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/b1565169-bee4-4393-8bce-c2327c181641.png",
    subgroups: [
      { id: "jacks-universal-single", title: "Домкраты универсальные односторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/485e29e5-5249-47ac-a417-40816c5f7406.jpg" },
      { id: "jacks-universal-double", title: "Домкраты универсальные двусторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/02f22e0a-c381-4557-8a93-95e7ef3f7d62.jpg" },
      { id: "jacks-cargo-single", title: "Домкраты грузовые односторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/a7c1a1ae-6fa8-4f6d-83cc-6e45ba0b4aca.jpg" },
      { id: "jacks-cargo-double", title: "Домкраты грузовые двусторонние", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/66dac95d-9f00-4f89-91dd-dd75e2b93356.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/50e614f5-b62c-4789-8db1-375f8db366ab.png" },
      { id: "jacks-universal-lock", title: "Домкраты универсальные с фиксирующей гайкой и гидрозамком", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/299d9a22-8e82-4ed9-b890-afdb0357d110.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/bcac71e0-3fac-425b-b1d5-0b47a7786cd6.jpg" },
      { id: "jacks-crusher", title: "Домкраты для конусных дробилок среднего и мелкого дробления", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/fd9e3c88-e950-4649-8d19-1e4ef646a011.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/c7861be9-7fe9-4376-ace4-78de538a0f27.jpg" },
      { id: "jacks-transformer", title: "Система для подпрессовки обмоток силовых трансформаторов", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/7461ad2e-e1bd-471f-8eeb-97d8241f93ad.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/c6c3132c-356d-499f-8b41-b122122ccfeb.jpg" },
      { id: "jacks-steprise", title: "Домкраты ступенчатого подъема", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/79383e2e-a2d8-44be-91d4-734f226d2a85.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/f1301e0f-1499-4472-8c03-ab5b02ffc74a.jpg" },
      { id: "jacks-cargo-lock", title: "Домкраты грузовые с фиксирующей гайкой", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/f4117a2c-82db-409b-8f1c-c562952b4805.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/4671d59d-a4fd-4df9-992f-d719fa2f7d55.jpg" },
      { id: "jacks-alu-spring", title: "Домкраты гидравлические алюминиевые с пружинным возвратом", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/5f22f5c2-5b89-4030-9ce7-e1fea1cbffb7.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/dfdaaa38-3e9c-4785-a5d1-d443f26c51c3.jpg" },
      { id: "jacks-alu-cargo-lock", title: "Домкраты грузовые алюминиевые с фиксирующей гайкой", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/4499ec37-fb3c-4368-8231-b7a8c3936edd.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/c260d9a6-8105-4e70-82c3-f444dcf98c0c.jpg" },
      { id: "jacks-alu-hydro", title: "Домкраты гидравлические алюминиевые с гидравлическим возвратом", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/d898fc90-ef1c-4a14-a7a9-94701b41d6ba.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/dde182a5-0a88-4c25-81ba-a54035e5bcfc.jpg" },
      { id: "jacks-medium-single", title: "Домкраты гидравлические средние, одностороннего действия", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/0b709b71-77b0-4085-aa4d-cc99afa87ee9.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/7ed7a10c-7813-474b-bd25-9307225423cf.jpg" },
      { id: "jacks-pulling", title: "Домкраты тянущие", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/737842c2-621f-4317-b59c-0a38d12401b3.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/71af953f-071a-4b00-b1dc-7dc5d68554d4.jpg" },
      { id: "jacks-low", title: "Домкраты низкие", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/00b17739-4641-46b0-bb35-6a0e4cc93125.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/64f0be77-a1f2-4304-8174-5f4d93f4517c.jpg" },
      { id: "jacks-low-telescopic", title: "Домкраты низкие телескопические", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/306d3461-4b08-4be6-9094-a3cc801302da.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/b9adcae5-bf45-48d6-903a-cb4447992d04.jpg" },
      { id: "jacks-telescopic", title: "Домкраты телескопические", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/20314bd2-5e32-45ec-8f81-311c28aa011e.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/295b8e5d-2e2a-4cc3-a82c-a30ae176089d.jpg" },
      { id: "jacks-autonomous", title: "Домкраты автономные с малой высотой подхвата", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/22cd72be-21ef-47c4-9a33-b039a8c45d2f.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/004afcf3-e2bc-44d3-8941-fe959a946e66.jpg" },
      { id: "jacks-rack", title: "Домкраты реечные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/4f20ca60-5027-41b3-b89e-659de7b64bf9.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/bee659ff-1897-475c-8d25-03b659278c2d.jpg" },
      { id: "jacks-hollow", title: "Домкраты с полым штоком", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/41ce6f89-0397-4ae0-a22e-c99f962c2903.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/6d0f749f-353f-4672-9a2f-e97fd1d949ce.jpg" },
      { id: "cylinders-power", title: "Цилиндры силовые", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/cfc858c8-330b-4400-943e-58bafc4bec6d.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/b1b5d862-b05d-4fbc-a87f-c2004c9f686e.jpg" },
      { id: "cylinders-ear-70", title: "Цилиндры гидравлические с проушинами до 70 МПа", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/2781ae39-383a-4fea-9a1c-30801da4b531.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/5fcd898d-8fd0-44c2-818e-f5d5d1bb4180.jpg" },
      { id: "jacks-cargo-trolley", title: "Домкраты грузовые подкатные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/33311a12-dc80-4a32-9e09-c3e8a1fbf027.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/39bbcda7-e4ac-4e8c-a830-d03dfbacdc21.jpg" },
      { id: "jacks-cargo-double-float", title: "Домкраты грузовые двусторонние с увеличенными плавающими опорами", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9651b5e6-fc29-48f3-8ae1-4af173ec1795.jpg", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/0ba222db-6e0c-483b-ae0b-581b9e0d7004.jpg" },
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
    imgScale: 1.01,
    subgroups: [
      { id: "pullers-screw-centering", title: "Съемники с винтовым приводом и механизмом центрирования и захвата", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/513e6f80-dbdb-4649-9dd4-30c976cf0ab2.png" },
      { id: "pullers-screw", title: "Съемники с винтовым приводом", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/a51dc22b-452b-4314-9373-5d1c1cc556f6.png" },
      { id: "pullers-hydraulic-trolley", title: "Съемники гидравлические подкатные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9154bca0-c064-4078-a48d-642e0dec52a1.png" },
      { id: "pullers-hydraulic", title: "Съемники гидравлические", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/1d955299-bc9f-4b03-9735-b1969e0ce908.png" },
      { id: "pullers-hydraulic-centering", title: "Съемники гидравлические с приводом центрирования и захвата", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/fcc5cdbf-c5bb-4a56-82a7-4e4e5e970c52.png" },
      { id: "pullers-builtin-drive", title: "Съемники со встроенным приводом", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/3e9347a1-5cf8-4887-a25b-84dfb7b825e4.png" },
      { id: "pullers-universal", title: "Съемники универсальные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/3cbf0896-803a-496e-80a1-be327e6a7469.png" },
      { id: "pullers-clamp-type", title: "Съемники-хомуты", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/3b80fce8-e738-4454-bb57-03b8c7f602b1.png" },
      { id: "pullers-clamp-builtin-drive", title: "Съемники-хомуты со встроенным приводом", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/b8886880-cdea-4135-9301-30e079338afb.png" },
      { id: "pullers-press-fitters", title: "Напрессовщики-съемники", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/2adc77bd-d783-43be-90b9-b475fbbb42a7.png" },
    ],
    features: [{ icon: "Wrench", label: "Гидро и механика" }, { icon: "Layers", label: "Демонтаж без ударов" }, { icon: "Move", label: "Подкатные варианты" }, { icon: "CircleDot", label: "Захваты для любых деталей" }],
  },
  presses: {
    title: "Прессы",
    longDesc:
      "Прессовое оборудование для правки, запрессовки, штамповки и монтажа деталей. Усилие от 10 до 200 тонн. Рамные прессы позволяют работать с крупногабаритными изделиями. Портативные гидравлические прессы для полевых условий. Кабельные прессы для опрессовки наконечников сечением до 400 мм².",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e086c588-cb03-4683-b155-f44e77dd3965.png",
    imgScale: 1.0115,
    subgroups: [
      { id: "presses-hydraulic", title: "Прессы гидравлические", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/b7fd3e04-17ba-426b-9e09-2ff9ab5dadc2.png" },
      { id: "presses-jack-test", title: "Установки для испытания домкратов", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/5467b962-3bfa-4779-ac5d-f6fdfa701b9d.png" },
      { id: "presses-hydraulic-horizontal", title: "Прессы гидравлические (горизонтальные)", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/3c4a6804-36c5-4ef9-a181-2b7780d96140.png" },
      { id: "presses-horizontal-heavy", title: "Пресс гидравлический горизонтальный крупнотоннажный", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/f28e850a-48be-4f8b-9726-064c097346b3.png" },
      { id: "presses-punch-sheet", title: "Прессы-перфораторы листовые", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9581c5b1-fa6f-4cb9-b2fc-16971230b54d.png" },
      { id: "presses-punch", title: "Прессы-перфораторы", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/ad0561fd-5f81-440b-bd09-4ed273715402.png" },
      { id: "presses-lugs-sleeves-clamps", title: "Прессы для опрессовки наконечников, гильз и зажимов", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/4decea5a-8d04-4ebe-b6f3-9b6b6875fff7.png" },
    ],
    features: [{ icon: "ArrowDownUp", label: "10–200 тонн" }, { icon: "LayoutGrid", label: "Вертикальные и горизонтальные" }, { icon: "Cable", label: "До 400 мм² кабель" }, { icon: "Ruler", label: "Рамные конструкции" }],
  },
  cutting: {
    title: "Режущий инструмент",
    longDesc:
      "Гидравлический режущий инструмент для безопасного и быстрого разрезания металлических изделий: кабелей, тросов, уголков, труб и листового металла. Компактные конструкции позволяют работать в ограниченном пространстве. Ресурс ножей — от 50 000 резов. Гайкорезы для демонтажа прикипевших болтов без повреждения резьбы в отверстии.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/533e96b4-ec15-417e-8f06-4b00d56f6927.jpg",
    imgScale: 1.0115,
    subgroups: [
      { id: "cutting-nutcutters", title: "Гайкорезы гидравлические", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/958ffc22-d3ad-4787-8610-babc2d0088e9.png" },
      { id: "cutting-pistol", title: "Ножницы гидравлические пистолетного типа", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/d809d430-2e87-4be6-ba9b-e6252ed90dad.png" },
      { id: "cutting-cable", title: "Ножницы гидравлические кабельные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/97c9d2a4-846e-43ad-92ae-a1890fce1e9f.png" },
      { id: "cutting-rope", title: "Резаки тросовые", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/237c9dcd-57c0-4888-9bef-6389c4276016.png" },
      { id: "cutting-angle", title: "Ножницы для резки уголка", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/73dc40b8-4e87-4cf5-ba30-175cffd9a675.png" },
      { id: "cutting-universal", title: "Ножницы гидравлические универсальные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/5018f206-0fe6-4b8d-a5ea-e3ad255add91.png" },
      { id: "cutting-pipe-sheet", title: "Ножницы для резки труб и стального листа", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9dd5ff57-58ee-404c-86ce-7fe362bba56b.png" },
    ],
    features: [{ icon: "Scissors", label: "Кабель, трос, уголок, лист" }, { icon: "Shield", label: "Безопасный демонтаж гаек" }, { icon: "Maximize2", label: "Работа в стеснённых местах" }, { icon: "RefreshCw", label: "50 000+ резов ресурс" }],
  },
  threading: {
    title: "Оборудование для резьбы",
    longDesc:
      "Профессиональный инструмент для монтажа и демонтажа резьбовых соединений с точным контролем усилия. Гайковерты реакционного типа обеспечивают крутящий момент до 70 000 Нм. Тензорные домкраты создают точное осевое усилие затяжки по болту. Мультипликаторы крутящего момента — для работы с ограниченным пространством вокруг соединения.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e371336d-a708-4342-8200-f79be566f3d4.png",
    imgScale: 1.0115,
    subgroups: [
      { id: "threading-cassette", title: "Гайковерты гидравлические кассетные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/2f64b997-e00b-455c-9e75-7bbe00f245e7.png" },
      { id: "threading-hydraulic", title: "Гайковерты гидравлические", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/659d9586-c320-4357-b9ad-0a6aeada42d5.png" },
      { id: "threading-magnetic", title: "Гайкодержатели магнитные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/0a080aa5-d762-42b7-8436-bf7d55656000.png" },
      { id: "threading-impact-sockets", title: "Головки ударные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9bed7cf8-726c-4013-9896-66982b901237.png" },
      { id: "threading-multipliers", title: "Мультипликаторы", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/2433caa1-1b95-40f7-8116-f30668682d5c.png" },
      { id: "threading-tensors", title: "Тензорные домкраты", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/ae3093ed-3326-4fdb-9a8f-04b0c85938ac.png" },
    ],
    features: [{ icon: "RotateCw", label: "До 70 000 Нм" }, { icon: "Target", label: "Точность ±3%" }, { icon: "Magnet", label: "Магнитные держатели" }, { icon: "Activity", label: "Тензорная затяжка" }],
  },
  benders: {
    title: "Трубогибы",
    longDesc:
      "Гидравлические трубогибы для холодного гнутья труб диаметром до 2 дюймов (DN50). Закрытая рама обеспечивает точный угол изгиба без деформации сечения. Ручные модели — для монтажных бригад без источника питания. Электрические — для высокой производительности на объекте. Автономные — для удалённых площадок.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/e750022d-9903-4995-b1ab-93ebc5631f42.png",
    subgroups: [
      { id: "benders-manual", title: "Трубогибы гидравлические с закрытой рамой", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/864377b3-103a-4fba-b704-8163880d67ae.png", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/fcb88d3b-f090-4a15-9fb9-4a8dcac76976.png" },
      { id: "benders-autonomous", title: "Трубогибы с закрытой рамой автономные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/f721997d-94e9-47f5-8b5b-d577029de748.png", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/6d2de077-ef09-4b1e-9c94-06942ebc64be.png" },
      { id: "benders-electric", title: "Трубогибы с закрытой рамой с электроприводом", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/9eb7dc65-a58b-466c-8113-b6a925889071.png", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/0675856e-97d5-4ce2-afe5-422c5cf1e263.png" },
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
  "jacks-accessories": {
    title: "Принадлежности к домкратам",
    longDesc:
      "Дополнительное оборудование для безопасной и удобной эксплуатации домкратов: предохранительные краны, гидрозамки, а также опоры различного назначения — стандартные, для алюминиевых домкратов и поддомкратные.",
    img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/17c680b8-72b3-419d-a331-7537d8497056.png",
    imgScale: 0.95,
    subgroups: [
      { id: "jacks-accessories-valves", title: "Краны предохранительные", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/64fba162-c936-40a7-83aa-ca07f259a379.png" },
      { id: "jacks-accessories-locks", title: "Гидрозамки", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/f20b63ec-a18f-4840-b3e1-367fe82fe519.png" },
      { id: "jacks-accessories-supports", title: "Опоры", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/b4fa6146-fd35-47fd-8d68-7ce4c9541265.png", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/b43d805f-826b-40c6-8552-8ad84e20973e.png" },
      { id: "jacks-accessories-alu-supports", title: "Опоры для алюминиевых домкратов", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/5d0a25fc-b691-4f29-bb5b-c52329599627.png", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/d5448656-28eb-43c4-9c58-300868aa27ac.png" },
      { id: "jacks-accessories-base-supports", title: "Поддомкратные опоры", img: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/c975d5a6-a27d-49d7-ba8a-c9c85d84ace7.png", img2: "https://cdn.poehali.dev/projects/1c53d09f-5a4e-4fbb-836d-36559c58ab56/bucket/67febaa3-2f8e-446f-90f7-8956f7f8770c.png" },
    ],
    features: [{ icon: "ShieldCheck", label: "Предохранительные краны" }, { icon: "Lock", label: "Гидрозамки" }, { icon: "CircleDot", label: "Опоры разных типов" }, { icon: "Settings", label: "Для алюминиевых домкратов" }],
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