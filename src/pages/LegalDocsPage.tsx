import Icon from "@/components/ui/icon";

interface LegalDocsPageProps {
  onNavigate: (page: string) => void;
}

const DOCS = [
  {
    file: "/docs/prikaz-otvetstvennyy-pdn.docx",
    title: "Приказ о назначении ответственного за обработку ПДн",
    desc: "Назначает сотрудника, отвечающего за персональные данные. Требование ст. 18.1 ФЗ-152. Впишите должность и Ф.И.О., подпишите у директора.",
    icon: "FileText",
  },
  {
    file: "/docs/uvedomlenie-rkn.docx",
    title: "Уведомление в Роскомнадзор об обработке ПДн",
    desc: "Заполненная форма с вашими реквизитами и целями обработки. Подаётся через личный кабинет на pd.rkn.gov.ru или в территориальное управление.",
    icon: "FileCheck",
  },
  {
    file: "/docs/polozhenie-obrabotka-pdn.docx",
    title: "Положение об обработке и защите персональных данных",
    desc: "Основной внутренний документ: цели, категории данных, сроки хранения, меры защиты, порядок ответа на запросы. Утверждается приказом.",
    icon: "BookOpen",
  },
  {
    file: "/docs/poryadok-reagirovaniya-incidenty.docx",
    title: "Порядок реагирования на инциденты",
    desc: "Пошаговый регламент при утечке данных, включая уведомление Роскомнадзора в 24 и 72 часа по ч. 3.1 ст. 21 ФЗ-152.",
    icon: "Shield",
  },
  {
    file: "/docs/dogovor-poruchenie-obrabotki.docx",
    title: "Договор-поручение на обработку ПДн",
    desc: "Заключается с разработчиком сайта и хостинг-провайдером. Без него передача данных подрядчику неправомерна (ч. 3 ст. 6 ФЗ-152).",
    icon: "Users",
  },
];

const STEPS = [
  "Заполните пропуски в приказе о назначении ответственного и подпишите его — с этого начинается весь комплект.",
  "Утвердите приказом Положение об обработке ПДн и Порядок реагирования на инциденты, ознакомьте сотрудников под роспись.",
  "Подпишите договор-поручение с разработчиком сайта и хостинг-провайдером.",
  "Подайте уведомление в Роскомнадзор через личный кабинет на pd.rkn.gov.ru — это делается один раз.",
  "Храните подписанные оригиналы: их запрашивают при проверке.",
];

export default function LegalDocsPage({ onNavigate }: LegalDocsPageProps) {
  return (
    <div>
      <section className="pt-32 pb-12 bg-background border-b border-white/8 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Служебный раздел</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight mb-5">
            Документы по персональным данным
          </h1>
          <p className="font-body text-white/50 text-sm leading-relaxed max-w-2xl">
            Комплект документов для оформления работы с персональными данными по 152-ФЗ. Скачайте, заполните пропуски и подпишите.
          </p>
        </div>
      </section>

      <section className="py-14 bg-brand-dark-2">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          {DOCS.map((doc) => (
            <div key={doc.file} className="bg-card border border-white/8 p-6 md:p-7 rounded-sm flex flex-col md:flex-row md:items-center gap-5">
              <div className="w-12 h-12 bg-brand-red/15 border border-brand-red/30 flex items-center justify-center shrink-0 rounded-sm">
                <Icon name={doc.icon as never} size={20} className="text-brand-red" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-white text-lg tracking-wide mb-2">{doc.title}</h2>
                <p className="font-body text-white/50 text-sm leading-relaxed">{doc.desc}</p>
              </div>
              <a
                href={doc.file}
                download
                className="btn-primary px-6 py-3 text-xs rounded-sm inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
              >
                <Icon name="Download" size={14} />
                Скачать Word
              </a>
            </div>
          ))}

          <div className="bg-card border border-brand-red/25 p-6 md:p-8 rounded-sm">
            <h2 className="font-display text-white text-xl tracking-wide mb-5">Порядок оформления</h2>
            <ol className="space-y-3">
              {STEPS.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-display text-brand-red text-sm shrink-0 w-5">{i + 1}.</span>
                  <span className="font-body text-white/60 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-card border border-white/8 p-6 md:p-8 rounded-sm">
            <p className="font-body text-white/40 text-xs leading-relaxed">
              Документы подготовлены как типовые шаблоны и уже содержат реквизиты ООО «Альфа Альянс» и фактические условия работы сайта. Перед подписанием рекомендуем согласовать их с вашим юристом — ответственность за соответствие требованиям законодательства несёт оператор персональных данных.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate("privacy")}
              className="font-body text-xs tracking-[0.15em] uppercase px-5 py-3 border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors rounded-sm"
            >
              Политика на сайте
            </button>
            <button
              onClick={() => onNavigate("home")}
              className="font-body text-xs tracking-[0.15em] uppercase px-5 py-3 border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors rounded-sm"
            >
              На главную
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
