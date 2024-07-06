export default function DashboardCard({ total, text, icon }: { total: number; text: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5 px-5 py-3 flex-grow border border-blue-500 rounded-lg bg-white shadow-md">
      {icon}
      <div>
        <p className="text-xl font-bold">{total}</p>
        <p className="font-semibold text-zinc-500 text-sm">{text}</p>
      </div>
    </div>
  );
}
