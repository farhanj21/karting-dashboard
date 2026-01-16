interface KartTypeSelectorProps {
  kartTypes: string[];
  selectedKartType: string | null;
  onKartTypeChange: (kartType: string | null) => void;
}

export default function KartTypeSelector({
  kartTypes,
  selectedKartType,
  onKartTypeChange,
}: KartTypeSelectorProps) {
  if (kartTypes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onKartTypeChange(null)}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          selectedKartType === null
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'bg-surface text-gray-400 hover:text-white hover:bg-surfaceHover border border-surfaceHover'
        }`}
      >
        All Karts
      </button>

      {kartTypes.map((kartType) => (
        <button
          key={kartType}
          onClick={() => onKartTypeChange(kartType)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedKartType === kartType
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-surface text-gray-400 hover:text-white hover:bg-surfaceHover border border-surfaceHover'
          }`}
        >
          {kartType}
        </button>
      ))}
    </div>
  );
}
