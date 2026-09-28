import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface CookieBannerProps {
  onNavigate: (page: string) => void;
}

const STORAGE_KEY = "aa-cookie-consent";

export default function CookieBanner({ onNavigate }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-brand-dark-2/98 backdrop-blur-md border-t border-white/10 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-brand-red mt-0.5 shrink-0">
            <Icon name="Cookie" size={18} />
          </span>
          <p className="font-body text-white/55 text-xs leading-relaxed">
            Сайт использует файлы cookie и сервисы веб-аналитики для корректной работы и улучшения сервиса. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <button onClick={() => onNavigate("privacy")} className="text-brand-red hover:underline">
              Политикой обработки персональных данных
            </button>
            .
          </p>
        </div>
        <button
          onClick={accept}
          className="btn-primary px-6 py-3 text-xs rounded-sm shrink-0 whitespace-nowrap"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
