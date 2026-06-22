import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    Fish,
    Wallet,
    TrendingUp,
    TrendingDown,
    Landmark,
    Package,
} from 'lucide-react';

interface Props {
    summary: {
        total_kolam: number;
        total_benur: number;
        total_pemasukan: number;
        total_pengeluaran: number;
        laba_rugi: number;
        nilai_wajar: number;
    };

    grafik: {
        kategori: string;
        nilai: number;
    }[];

    neraca: {
        kas: number;
        aset_biologis: number;
        total_aset: number;
        modal_pemilik: number;
    };

    fairValueReport: any[];
}

export default function Dashboard({
    summary,
    grafik,
    neraca,
    fairValueReport,
}: Props) {
    const rupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">

                {/* Header */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-bold">
                        Dashboard Tambak Udang
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Ringkasan keuangan dan aset biologis berdasarkan PSAK 69.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <Fish className="mb-3 text-teal-600" />
                        <div className="text-sm text-slate-500">
                            Total Kolam
                        </div>
                        <div className="text-3xl font-bold">
                            {summary.total_kolam}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <Package className="mb-3 text-blue-600" />
                        <div className="text-sm text-slate-500">
                            Total Benur
                        </div>
                        <div className="text-3xl font-bold">
                            {summary.total_benur.toLocaleString()}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <TrendingUp className="mb-3 text-green-600" />
                        <div className="text-sm text-slate-500">
                            Pemasukan
                        </div>
                        <div className="text-lg font-bold text-green-600">
                            {rupiah(summary.total_pemasukan)}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <TrendingDown className="mb-3 text-red-600" />
                        <div className="text-sm text-slate-500">
                            Pengeluaran
                        </div>
                        <div className="text-lg font-bold text-red-600">
                            {rupiah(summary.total_pengeluaran)}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <Wallet className="mb-3 text-amber-600" />
                        <div className="text-sm text-slate-500">
                            Laba Rugi
                        </div>
                        <div
                            className={`text-lg font-bold ${
                                summary.laba_rugi >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {rupiah(summary.laba_rugi)}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <Landmark className="mb-3 text-purple-600" />
                        <div className="text-sm text-slate-500">
                            Nilai Wajar
                        </div>
                        <div className="text-lg font-bold text-purple-600">
                            {rupiah(summary.nilai_wajar)}
                        </div>
                    </div>

                </div>

                {/* Grafik */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">
                        Grafik Ringkasan
                    </h2>

                    <div className="space-y-4">
                        {grafik.map((item) => (
                            <div key={item.kategori}>
                                <div className="mb-1 flex justify-between">
                                    <span>{item.kategori}</span>

                                    <span className="font-semibold">
                                        {rupiah(item.nilai)}
                                    </span>
                                </div>

                                <div className="h-4 rounded-full bg-slate-100">
                                    <div
                                        className="h-4 rounded-full bg-teal-600"
                                        style={{
                                            width: `${Math.min(
                                                item.nilai /
                                                    1000000,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Neraca */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">
                        Neraca Sederhana
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <h3 className="mb-3 font-semibold">
                                Aset
                            </h3>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Kas</span>
                                    <span>{rupiah(neraca.kas)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Aset Biologis</span>
                                    <span>
                                        {rupiah(
                                            neraca.aset_biologis
                                        )}
                                    </span>
                                </div>

                                <hr />

                                <div className="flex justify-between font-bold">
                                    <span>Total Aset</span>
                                    <span>
                                        {rupiah(
                                            neraca.total_aset
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 font-semibold">
                                Modal
                            </h3>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Modal Pemilik</span>

                                    <span>
                                        {rupiah(
                                            neraca.modal_pemilik
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* PSAK 69 */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">
                        PSAK 69 Fair Value Report
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 text-left">
                                        Tanggal
                                    </th>

                                    <th className="py-3 text-left">
                                        Kolam
                                    </th>

                                    <th className="py-3 text-right">
                                        Nilai Wajar
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {fairValueReport.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >
                                        <td className="py-3">
                                            {
                                                item.tanggal_penilaian
                                            }
                                        </td>

                                        <td className="py-3">
                                            {
                                                item.kolam
                                                    ?.nama_kolam
                                            }
                                        </td>

                                        <td className="py-3 text-right font-semibold text-green-600">
                                            {rupiah(
                                                item.nilai_wajar
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}