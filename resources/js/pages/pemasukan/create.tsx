import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Kolam {
    id: number;
    nama_kolam: string;
}

interface Props {
    kolams: Kolam[];
}

export default function CreatePemasukan({
    kolams,
}: Props) {
    const { data, setData, post, processing, errors } =
        useForm({
            kolam_id: '',
            tanggal_panen: '',
            berat_panen: '',
            size: '',
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/pemasukans');
    };


    return (
        <AppLayout>
            <Head title="Tambah Panen" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Tambah Data Panen
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Input hasil panen tambak.
                        </p>
                    </div>

                    <Link
                        href="/pemasukans"
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
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Kolam */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Kolam
                            </label>

                            <select
                                value={data.kolam_id}
                                onChange={(e) =>
                                    setData(
                                        'kolam_id',
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
                            >
                                <option value="">
                                    Pilih Kolam
                                </option>

                                {kolams.map((kolam) => (
                                    <option
                                        key={kolam.id}
                                        value={kolam.id}
                                    >
                                        {kolam.nama_kolam}
                                    </option>
                                ))}
                            </select>

                            {errors.kolam_id && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.kolam_id}
                                </div>
                            )}
                        </div>

                        {/* Tanggal */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tanggal Panen
                            </label>

                            <input
                                type="date"
                                value={data.tanggal_panen}
                                onChange={(e) =>
                                    setData(
                                        'tanggal_panen',
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

                            {errors.tanggal_panen && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.tanggal_panen}
                                </div>
                            )}
                        </div>

                        {/* Berat */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Berat Panen (Kg)
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.berat_panen}
                                onChange={(e) =>
                                    setData(
                                        'berat_panen',
                                        e.target.value
                                    )
                                }
                                placeholder="500"
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.berat_panen && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.berat_panen}
                                </div>
                            )}
                        </div>

                        {/* Size */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Size Udang
                            </label>

                            <input
                                type="number"
                                value={data.size}
                                onChange={(e) =>
                                    setData(
                                        'size',
                                        e.target.value
                                    )
                                }
                                placeholder="80"
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.size && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.size}
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