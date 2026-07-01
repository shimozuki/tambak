import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Calendar, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface Props {
summary: {
pemasukan: number;
pengeluaran: number;
laba_rugi: number;
};


filters: {
    tanggal_awal?: string;
    tanggal_akhir?: string;
};

pemasukans: any[];
pengeluarans: any[];


}

export default function LaporanIndex({
summary,
filters,
pemasukans,
pengeluarans,
}: Props) {


const rupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

const handleFilter = (
    tanggalAwal: string,
    tanggalAkhir: string
) => {
    router.get(
        '/laporan',
        {
            tanggal_awal: tanggalAwal,
            tanggal_akhir: tanggalAkhir,
        },
        {
            preserveState: true,
            replace: true,
        }
    );
};

return (
    <AppLayout>
        <Head title="Laporan Keuangan" />

        <div className="space-y-6">

            {/* Header */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">
                    Laporan Keuangan
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Ringkasan pemasukan, pengeluaran dan laba rugi.
                </p>
            </div>

            {/* Filter */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-end gap-4">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Tanggal Awal
                        </label>

                        <input
                            type="date"
                            defaultValue={
                                filters.tanggal_awal
                            }
                            id="tanggal_awal"
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                px-4
                                py-3
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Tanggal Akhir
                        </label>

                        <input
                            type="date"
                            defaultValue={
                                filters.tanggal_akhir
                            }
                            id="tanggal_akhir"
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                px-4
                                py-3
                            "
                        />
                    </div>

                    <button
                        onClick={() =>
                            handleFilter(
                                (
                                    document.getElementById(
                                        'tanggal_awal'
                                    ) as HTMLInputElement
                                ).value,
                                (
                                    document.getElementById(
                                        'tanggal_akhir'
                                    ) as HTMLInputElement
                                ).value
                            )
                        }
                        className="
                            rounded-xl
                            bg-[#0D9488]
                            px-5
                            py-3
                            text-white
                        "
                    >
                        Filter
                    </button>
                    <a
    href={`/laporan/export-pdf?tanggal_awal=${filters.tanggal_awal ?? ''}&tanggal_akhir=${filters.tanggal_akhir ?? ''}`}
    target="_blank"
    className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-red-600
        px-5
        py-3
        text-white
        hover:bg-red-700
    "
>
    Export PDF
</a>
                </div>
            </div>

            {/* Summary */}
            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="text-green-500" />
                        <span className="text-slate-500">
                            Pemasukan
                        </span>
                    </div>

                    <div className="mt-4 text-3xl font-bold text-green-600">
                        {rupiah(summary.pemasukan)}
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <TrendingDown className="text-red-500" />
                        <span className="text-slate-500">
                            Pengeluaran
                        </span>
                    </div>

                    <div className="mt-4 text-3xl font-bold text-red-600">
                        {rupiah(summary.pengeluaran)}
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Wallet className="text-teal-500" />
                        <span className="text-slate-500">
                            Laba / Rugi
                        </span>
                    </div>

                    <div
                        className={`mt-4 text-3xl font-bold ${
                            summary.laba_rugi >= 0
                                ? 'text-teal-600'
                                : 'text-red-600'
                        }`}
                    >
                        {rupiah(summary.laba_rugi)}
                    </div>
                </div>

            </div>

            {/* Penjualan */}
<div className="rounded-3xl bg-white p-6 shadow-sm">

    <h2 className="mb-4 text-lg font-bold">
        Data Penjualan
    </h2>

    <table className="w-full">

        <thead>
            <tr className="border-b">

                <th className="py-3 text-left">
                    Tanggal
                </th>

                <th className="py-3 text-left">
                    Keterangan
                </th>

                <th className="py-3 text-right">
                    Jumlah
                </th>

            </tr>
        </thead>

        <tbody>

            {pemasukans.map((item) => (
                <tr
                    key={item.id}
                    className="border-b"
                >

                    <td className="py-3">
                        {new Date(
                            item.tanggal_penjualan
                        ).toLocaleDateString(
                            'id-ID',
                            {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            }
                        )}
                    </td>

                    <td className="py-3">
                        {item.keterangan ??
                            '-'}
                    </td>

                    <td className="py-3 text-right font-semibold text-green-600">
                        {rupiah(
                            item.jumlah_penjualan
                        )}
                    </td>

                </tr>
            ))}

        </tbody>

    </table>

</div>

            {/* Pengeluaran */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="mb-4 text-lg font-bold">
                    Data Pengeluaran
                </h2>

                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 text-left">
                                Tanggal
                            </th>

                            <th className="py-3 text-left">
                                Kategori
                            </th>

                            <th className="py-3 text-right">
                                Jumlah
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {pengeluarans.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b"
                            >
                                    <td className="py-3">
                                    {new Date(
                                        item.tanggal
                                    ).toLocaleDateString(
                                        'id-ID',
                                        {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        }
                                    )}
                                </td>

                                <td className="py-3">
                                    {
                                        item.kategori
                                            ?.nama_kategori
                                    }
                                </td>

                                <td className="py-3 text-right font-semibold text-red-600">
                                    {rupiah(item.jumlah)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    </AppLayout>
);


}
