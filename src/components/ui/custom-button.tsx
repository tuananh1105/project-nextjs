export function Button({ name, icon: Icon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-[#FBCA58] hover:bg-[#FAB005] text-black w-full px-6 py-3 rounded-full cursor-pointer transition"
    >
      {name}
      <Icon />
    </button>
  );
}
