export default function KonfirmasiPembayaranCard() {
  const nama = localStorage.getItem('nama');

  return (
    <div className="p-5 border border-gray-300 rounded-lg">
      <h3 className="text-xl font-semibold">Konfirmasi Pembayaran</h3>
      <hr className="my-3" />
      <div className="flex">
        <div>
          <p>Nama Lengkap</p>
          <p>Alamat Pemesan</p>
          <p>Instagram</p>
          <p>Tujuan Sewa</p>
          <p>Rute Perjalanan</p>
          <p>Jaminan</p>
          <p>Tanggal Mulai Sewa</p>
          <p>Tanggal Akhir Sewa</p>
          <p>Jam Mulai Sewa</p>
          <p>Jam Akhir Sewa</p>
          <p>Tempat Pengambilan Mobil</p>
        </div>
        <div className="ml-10">
          <p>Edi Cahyono</p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
