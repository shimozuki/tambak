import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    Fish,
    Package,
    Wallet,
    TrendingUp,
    Landmark,
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

    neraca: {
        kas: number;

        aset_biologis: {
            kolam: string;
            nilai_wajar: number;
        }[];

        total_aset_biologis: number;

        total_aset: number;

        modal_pemilik: number;
    };

    fairValueReport: any[];
}

export default function Dashboard({
    summary,
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
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Dashboard Tambak Udang
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Ringkasan keuangan, produksi, dan aset biologis
                        berdasarkan PSAK 69 Agrikultur.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <Fish
                            size={32}
                            className="mb-4 text-teal-600"
                        />

                        <div className="text-sm text-slate-500">
                            Total Kolam
                        </div>

                        <div className="mt-2 text-4xl font-bold">
                            {summary.total_kolam}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <Package
                            size={32}
                            className="mb-4 text-blue-600"
                        />

                        <div className="text-sm text-slate-500">
                            Total Benur
                        </div>

                        <div className="mt-2 text-4xl font-bold">
                            {summary.total_benur.toLocaleString()}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <TrendingUp
                            size={32}
                            className="mb-4 text-green-600"
                        />

                        <div className="text-sm text-slate-500">
                            Total Pemasukan
                        </div>

                        <div className="mt-2 text-xl font-bold text-green-600">
                            {rupiah(summary.total_pemasukan)}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <Wallet
                            size={32}
                            className="mb-4 text-amber-600"
                        />

                        <div className="text-sm text-slate-500">
                            Laba Bersih
                        </div>

                        <div
                            className={`mt-2 text-xl font-bold ${
                                summary.laba_rugi >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {rupiah(summary.laba_rugi)}
                        </div>
                    </div>

                </div>

                {/* Ringkasan Keuangan */}
                <div className="grid gap-6 lg:grid-cols-2">

                    <div className="rounded-3xl bg-white p-6 shadow-sm">

                        <h2 className="mb-6 text-xl font-bold">
                            Ringkasan Keuangan
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Total Pemasukan</span>

                                <span className="font-bold text-green-600">
                                    {rupiah(summary.total_pemasukan)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Total Pengeluaran</span>

                                <span className="font-bold text-red-600">
                                    {rupiah(summary.total_pengeluaran)}
                                </span>
                            </div>

                            <hr />

                            <div className="flex justify-between">
                                <span>Laba Bersih</span>

                                <span className="font-bold text-teal-600">
                                    {rupiah(summary.laba_rugi)}
                                </span>
                            </div>

                        </div>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">

                        <div className="mb-6 flex items-center gap-3">

                            <Landmark
                                size={28}
                                className="text-purple-600"
                            />

                            <h2 className="text-xl font-bold">
                                PSAK 69 Agrikultur
                            </h2>

                        </div>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Nilai Wajar</span>

                                <span className="font-bold text-purple-600">
                                    {rupiah(summary.nilai_wajar)}
                                </span>
                            </div>

                            <div className="rounded-2xl bg-purple-50 p-4">
                                <p className="text-sm text-purple-700">
                                    Nilai aset biologis dihitung menggunakan
                                    metode Fair Value sesuai PSAK 69.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Neraca */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">

    <div className="mb-8">

        <h2 className="text-2xl font-bold">
            Laporan Posisi Keuangan
        </h2>

        <p className="text-slate-500">
            Berdasarkan PSAK 69 Agrikultur
        </p>

    </div>

    {/* ASET */}

    <div className="mb-8">

        <h3
            className="
                mb-4
                border-b
                pb-2
                text-lg
                font-bold
                text-teal-600
            "
        >
            ASET
        </h3>

        <div className="space-y-3">

            <div className="flex justify-between">
                <span>Kas</span>

                <span className="font-semibold">
                    {rupiah(neraca.kas)}
                </span>
            </div>

        </div>

    </div>

    {/* ASET BIOLOGIS */}

    <div className="mb-8">

        <h3
            className="
                mb-4
                border-b
                pb-2
                text-lg
                font-bold
                text-purple-600
            "
        >
            Aset Biologis
        </h3>

        <div className="space-y-3">

            {neraca.aset_biologis.map(
                (item: any, index: number) => (
                    <div
                        key={index}
                        className="flex justify-between"
                    >
                        <span>
                            {item.kolam}
                        </span>

                        <span className="font-semibold">
                            {rupiah(
                                item.nilai_wajar
                            )}
                        </span>
                    </div>
                )
            )}

            <div className="mt-4 flex justify-between border-t pt-4 font-bold">

                <span>
                    Total Aset Biologis
                </span>

                <span>
                    {rupiah(
                        neraca.total_aset_biologis
                    )}
                </span>

            </div>

        </div>

    </div>

    {/* TOTAL ASET */}

    <div
        className="
            mb-8
            rounded-2xl
            bg-teal-50
            p-4
        "
    >
        <div className="flex justify-between">

            <span className="font-bold">
                TOTAL ASET
            </span>

            <span className="text-lg font-bold text-teal-700">
                {rupiah(
                    neraca.total_aset
                )}
            </span>

        </div>
    </div>

    {/* EKUITAS */}

    <div className="mb-6">

        <h3
            className="
                mb-4
                border-b
                pb-2
                text-lg
                font-bold
                text-green-600
            "
        >
            EKUITAS
        </h3>

        <div className="flex justify-between">

            <span>
                Modal Pemilik
            </span>

            <span className="font-semibold">
                {rupiah(
                    neraca.modal_pemilik
                )}
            </span>

        </div>

    </div>

    {/* TOTAL EKUITAS */}

    <div
        className="
            rounded-2xl
            bg-green-50
            p-4
        "
    >
        <div className="flex justify-between">

            <span className="font-bold">
                TOTAL EKUITAS
            </span>

            <span className="text-lg font-bold text-green-700">
                {rupiah(
                    neraca.modal_pemilik
                )}
            </span>

        </div>
    </div>

</div>

                {/* Fair Value Report */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-xl font-bold">
                            PSAK 69 Fair Value Report
                        </h2>

                        <span
                            className="
                                rounded-full
                                bg-green-100
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-green-700
                            "
                        >
                            PSAK 69
                        </span>

                    </div>

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
                                            {item.tanggal_penilaian}
                                        </td>

                                        <td className="py-3">
                                            {item.kolam?.nama_kolam}
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