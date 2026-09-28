import Icon from "@/components/ui/icon";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  onNavigate?: (page: string) => void;
}

export default function ConsentCheckbox({ checked, onChange, onNavigate }: ConsentCheckboxProps) {
  const go = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = `/?page=${page}`;
    }
  };

  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <span
        className={`mt-0.5 w-[18px] h-[18px] shrink-0 border rounded-[3px] flex items-center justify-center transition-colors ${
          checked ? "bg-brand-red border-brand-red" : "bg-transparent border-white/30"
        }`}
      >
        {checked && <Icon name="Check" size={12} className="text-white" />}
      </span>
      <span className="font-body text-white/45 text-xs leading-relaxed">
        Я даю{" "}
        <a href="/consent" onClick={go("consent")} className="text-brand-red hover:underline">
          согласие на обработку персональных данных
        </a>{" "}
        и ознакомлен(а) с{" "}
        <a href="/privacy" onClick={go("privacy")} className="text-brand-red hover:underline">
          Политикой обработки персональных данных
        </a>
      </span>
    </label>
  );
}
