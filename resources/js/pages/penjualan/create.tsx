import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreatePenjualan() {
    const { data, setData, post, processing, errors } =
        useForm({
            tanggal_penjualan: '',
             berat_kg: '',
            jumlah_penjualan: '',
            keterangan: '',
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/penjualans');
    };

    const rupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <AppLayout>
            <Head title="Tambah Penjualan" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Tambah Penjualan
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Tambahkan data pemasukan hasil penjualan udang.
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
                                value={data.tanggal_penjualan}
                                onChange={(e) =>
                                    setData(
                                        'tanggal_penjualan',
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.tanggal_penjualan && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.tanggal_penjualan}
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
                                placeholder="Masukkan berat yang terjual"
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.berat_kg && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.berat_kg}
                                </div>
                            )}
                        </div>

                        {/* Jumlah Penjualan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Jumlah Penjualan (Rp)
                            </label>

                            <input
                                type="number"
                                value={data.jumlah_penjualan}
                                onChange={(e) =>
                                    setData(
                                        'jumlah_penjualan',
                                        e.target.value
                                    )
                                }
                                placeholder="Masukkan jumlah penjualan"
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.jumlah_penjualan && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.jumlah_penjualan}
                                </div>
                            )}
                        </div>

                        {/* Preview */}
                        {data.jumlah_penjualan && (
                            <div className="rounded-2xl bg-green-50 p-5">

                                <div className="text-sm text-green-700">
                                    Total Penjualan
                                </div>

                                <div className="mt-2 text-3xl font-bold text-green-600">
                                    {rupiah(
                                        Number(
                                            data.jumlah_penjualan
                                        )
                                    )}
                                </div>

                            </div>
                        )}

                        {/* Keterangan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Keterangan
                            </label>

                            <textarea
                                rows={4}
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData(
                                        'keterangan',
                                        e.target.value
                                    )
                                }
                                placeholder="Contoh: Penjualan udang periode Juli 2026"
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.keterangan && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.keterangan}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-end">

                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                flex items-center gap-2
                                rounded-full
                                bg-[#0D9488]
                                px-6 py-3
                                font-semibold
                                text-white
                                hover:bg-[#0F766E]
                            "
                        >
                            <Save size={18} />
                            Simpan
                        </button>

                    </div>

                </form>

            </div>
        </AppLayout>
    );
}