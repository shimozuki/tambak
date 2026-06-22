import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface Props {
    data: {
        id: number;
        kolam: string;
        tanggal_penilaian: string;
        nilai_wajar_lama: number | null;
        nilai_wajar_baru: number;
        selisih: number;
    }[];
}

export default function PerubahanNilaiWajar({
    data,
}: Props) {

    const rupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <AppLayout>

            <Head title="Perubahan Nilai Wajar" />

            <div className="space-y-6">

                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <h1 className="text-3xl font-bold">
                        Laporan Perubahan Nilai Wajar
                    </h1>

                    <p className="mt-2 text-slate-500">
                        PSAK 69 Agrikultur
                    </p>

                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">

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
                                        Nilai Lama
                                    </th>

                                    <th className="py-3 text-right">
                                        Nilai Baru
                                    </th>

                                    <th className="py-3 text-right">
                                        Selisih
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {data.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >

                                        <td className="py-4">
                                            {item.tanggal_penilaian}
                                        </td>

                                        <td className="py-4">
                                            {item.kolam}
                                        </td>

                                        <td className="py-4 text-right">
                                            {item.nilai_wajar_lama
                                                ? rupiah(
                                                    item.nilai_wajar_lama
                                                )
                                                : '-'}
                                        </td>

                                        <td className="py-4 text-right">
                                            {rupiah(
                                                item.nilai_wajar_baru
                                            )}
                                        </td>

                                        <td
                                            className={`py-4 text-right font-bold ${
                                                item.selisih >= 0
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {rupiah(
                                                item.selisih
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