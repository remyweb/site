interface CountdownItemProps {
  value: string;
  label: string;
}

export function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-zinc-800 shadow-lg min-w-[140px] select-none">
      <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#90CA03] to-[#7AB002] mb-2 font-mono">
        {value}
      </div>
      <div className="text-zinc-400 uppercase tracking-wider text-sm font-medium">
        {label}
      </div>
    </div>
  );
}