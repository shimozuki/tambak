import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Penjualan {
    id: number;
    tanggal_penjualan: string;
    berat_kg: number;
    jumlah_penjualan: number;
    keterangan: string | null;
}

interface Props {
    penjualan: Penjualan;
}

export default function EditPenjualan({
    penjualan,
}: Props) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        tanggal_penjualan:
            penjualan.tanggal_penjualan,

        berat_kg: String(
            penjualan.berat_kg
        ),
        jumlah_penjualan: String(
            penjualan.jumlah_penjualan
        ),
        keterangan:
            penjualan.keterangan ?? '',
    });

    const submit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        put(
            `/penjualans/${penjualan.id}`
        );
    };

    const rupiah = (
        value: number
    ) =>
        new Intl.NumberFormat(
            'id-ID',
            {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }
        ).format(value);

    return (
        <AppLayout>
            <Head title="Edit Penjualan" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Edit Penjualan
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Perbarui data
                            penjualan udang.
                        </p>
                    </div>

                    <Link
                        href="/penjualans"
                        className="
                            flex items-center gap-2
                            rounded-full
                            border border-slate-200
                            px-5 py-3
                            text-slate-700
                            hover:bg-slate-50
                        "
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </Link>

                </div>

                <form onSubmit={submit}>

                    <div className="grid gap-6">

                        {/* Tanggal */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tanggal Penjualan
                            </label>

                            <input
                                type="date"
                                value={
                                    data.tanggal_penjualan
                                }
                                onChange={(e) =>
                                    setData(
                                        'tanggal_penjualan',
                                        e.target
                                            .value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            />

                            {errors.tanggal_penjualan && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.tanggal_penjualan
                                    }
                                </div>
                            )}
                        </div>

                        {/* Berat Terjual */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Berat Terjual (Kg)
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.berat_kg}
                                onChange={(e) =>
                                    setData(
                                        'berat_kg',
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            />

                            {errors.berat_kg && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.berat_kg}
                                </div>
                            )}
                        </div>

                        {/* Jumlah */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Jumlah Penjualan
                            </label>

                            <input
                                type="number"
                                value={
                                    data.jumlah_penjualan
                                }
                                onChange={(e) =>
                                    setData(
                                        'jumlah_penjualan',
                                        e.target
                                            .value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            />

                            {errors.jumlah_penjualan && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.jumlah_penjualan
                                    }
                                </div>
                            )}
                        </div>

                        {/* Preview */}
                         <div className="space-y-3">

                        <div>
                            <div className="text-sm text-green-700">
                                Berat Terjual
                            </div>

                            <div className="text-xl font-semibold text-slate-700">
                                {data.berat_kg || 0} Kg
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-green-700">
                                Nilai Penjualan
                            </div>

                            <div className="text-3xl font-bold text-green-600">
                                {rupiah(
                                    Number(
                                        data.jumlah_penjualan
                                    )
                                )}
                            </div>
                        </div>

                    </div>

                        {/* Keterangan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Keterangan
                            </label>

                            <textarea
                                rows={4}
                                value={
                                    data.keterangan
                                }
                                onChange={(e) =>
                                    setData(
                                        'keterangan',
                                        e.target
                                            .value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            />

                            {errors.keterangan && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.keterangan
                                    }
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="mt-8 flex justify-end">

                        <button
                            type="submit"
                            disabled={
                                processing
                            }
                            className="
                                flex items-center gap-2
                                rounded-full
                                bg-[#0D9488]
                                px-6 py-3
                                font-semibold
                                text-white
                            "
                        >
                            <Save size={18} />
                            Update
                        </button>

                    </div>

                </form>

            </div>
        </AppLayout>
    );
}