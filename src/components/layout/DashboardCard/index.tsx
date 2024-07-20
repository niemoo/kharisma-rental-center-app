export default function DashboardCard({ total, text, icon }: { total: number; text: string; icon: React.ReactNode }) {
  function formatRupiah(number: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  }

  return (
    <div className="flex items-center gap-5 px-5 py-3 flex-grow border border-blue-500 rounded-lg bg-white shadow-md">
      {icon}
      <div>
        <p className="text-xl font-bold">{text === 'Pendapatan' ? formatRupiah(total) : total}</p>
        <p className="font-semibold text-zinc-500 text-sm">{text}</p>
      </div>
    </div>
  );
}
