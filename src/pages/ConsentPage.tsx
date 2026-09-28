import Icon from "@/components/ui/icon";

interface ConsentPageProps {
  onNavigate: (page: string) => void;
}

const BLOCKS = [
  {
    title: "Кому даётся согласие",
    items: [
      "ООО «Альфа Альянс», ИНН 2465302921, КПП 246501001, ОГРН 1132468063331, адрес: 660077, Красноярский край, г. Красноярск, ул. Батурина, д. 38, кв. 23 (далее — Оператор).",
    ],
  },
  {
    title: "Какие данные я передаю",
    items: [
      "Фамилия, имя (или имя, указанное мной в форме).",
      "Номер контактного телефона.",
      "Адрес электронной почты (если указан).",
      "Содержание моего обращения — сведения, которые я указал добровольно.",
    ],
  },
  {
    title: "Цели обработки",
    items: [
      "Рассмотрение и обработка моей заявки или обращения.",
      "Обратная связь со мной: консультация, уточнение деталей запроса, подготовка и направление коммерческого предложения.",
      "Заключение и исполнение договора поставки или оказания услуг, если оно состоится.",
    ],
  },
  {
    title: "Разрешённые действия с данными",
    items: [
      "Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, блокирование, удаление и уничтожение персональных данных.",
      "Обработка осуществляется как с использованием средств автоматизации, так и без них.",
      "Передача данных лицам, привлечённым Оператором для обработки по поручению (хостинг-провайдер, технический исполнитель сайта), на условиях соблюдения конфиденциальности.",
      "Трансграничная передача данных не осуществляется. Данные хранятся на серверах на территории Российской Федерации.",
    ],
  },
  {
    title: "Срок действия согласия",
    items: [
      "Согласие действует с момента отправки формы и до достижения целей обработки, но не более 1 (одного) года с даты последнего взаимодействия — если иной срок не установлен заключённым договором или требованиями законодательства.",
      "По истечении срока персональные данные подлежат уничтожению.",
    ],
  },
  {
    title: "Право на отзыв согласия",
    items: [
      "Я вправе отозвать настоящее согласие в любой момент, направив письменное уведомление на адрес alfaallianse-info@mail.ru или почтой по юридическому адресу Оператора.",
      "Оператор прекращает обработку и уничтожает персональные данные в течение 30 дней с момента получения отзыва, за исключением случаев, когда обработка продолжается на ином законном основании.",
    ],
  },
  {
    title: "Подтверждение",
    items: [
      "Я подтверждаю, что действую своей волей и в своём интересе, обладаю дееспособностью в полном объёме и передаю собственные персональные данные.",
      "Я ознакомлен(а) с Политикой обработки персональных данных, размещённой на сайте, и мне понятны её положения.",
      "Согласие даётся путём проставления отметки в поле подтверждения в форме на сайте и является простым электронным подтверждением моего волеизъявления.",
    ],
  },
];

export default function ConsentPage({ onNavigate }: ConsentPageProps) {
  return (
    <div>
      <section className="pt-32 pb-12 bg-background border-b border-white/8 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-red" />
            <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">Правовая информация</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight mb-5">
            Согласие на обработку персональных данных
          </h1>
          <p className="font-body text-white/50 text-sm leading-relaxed">
            Текст согласия, которое пользователь даёт при отправке формы на сайте
          </p>
        </div>
      </section>

      <section className="py-14 bg-brand-dark-2">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="bg-card border border-white/8 p-6 md:p-8 rounded-sm">
            <p className="font-body text-white/60 text-sm leading-relaxed">
              Проставляя отметку в поле подтверждения и нажимая кнопку отправки формы на сайте alfa-alliance, я, субъект персональных данных, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» даю своё свободное, конкретное, информированное и сознательное согласие на обработку моих персональных данных на условиях, изложенных ниже.
            </p>
          </div>

          {BLOCKS.map((b) => (
            <div key={b.title} className="bg-card border border-white/8 p-6 md:p-8 rounded-sm">
              <h2 className="font-display text-white text-xl md:text-2xl tracking-wide mb-5">{b.title}</h2>
              <ul className="space-y-3">
                {b.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-brand-red mt-1.5 shrink-0">
                      <Icon name="Minus" size={12} />
                    </span>
                    <span className="font-body text-white/60 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("privacy")}
              className="font-body text-xs tracking-[0.15em] uppercase px-5 py-3 border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors rounded-sm"
            >
              Политика обработки данных
            </button>
            <button
              onClick={() => onNavigate("contacts")}
              className="font-body text-xs tracking-[0.15em] uppercase px-5 py-3 border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors rounded-sm"
            >
              Контакты
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
