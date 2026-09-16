interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

export default function Switch({ checked, onChange, disabled }: Props) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="flex-shrink-0 rounded-full transition-colors duration-200 relative"
      style={{
        width: 51,
        height: 31,
        backgroundColor: checked ? "#5B5CE2" : "#E8E8F0",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        className="absolute top-0.5 rounded-full bg-white transition-transform duration-200"
        style={{
          width: 27,
          height: 27,
          left: 2,
          transform: checked ? "translateX(20px)" : "translateX(0)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}
