import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface Props {
    data: {
        id: number;
        nama_kolam: string;
        benur_tebar: number;
        survival_rate: number;
        udang_hidup: number;
        nilai_wajar: number;
    }[];
}

export default function StokUdang({
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

            <Head title="Stok Udang" />

            <div className="space-y-6">

                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <h1 className="text-3xl font-bold">
                        Stok Udang Tersedia
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Monitoring jumlah udang hidup
                        berdasarkan penilaian terakhir.
                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {data.map((item) => (

                        <div
                            key={item.id}
                            className="
                                rounded-3xl
                                bg-white
                                p-6
                                shadow-sm
                            "
                        >

                            <h2 className="text-xl font-bold">
                                {item.nama_kolam}
                            </h2>

                            <div className="mt-6 space-y-3">

                                <div className="flex justify-between">
                                    <span>Benur Tebar</span>

                                    <span>
                                        {item.benur_tebar.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Survival Rate</span>

                                    <span>
                                        {item.survival_rate}%
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Udang Hidup</span>

                                    <span className="font-bold text-green-600">
                                        {item.udang_hidup.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Nilai Wajar</span>

                                    <span className="font-bold text-purple-600">
                                        {rupiah(
                                            item.nilai_wajar
                                        )}
                                    </span>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </AppLayout>
    );
}