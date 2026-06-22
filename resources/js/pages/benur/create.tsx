import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Kolam {
    id: number;
    kode_kolam: string;
    nama_kolam: string;
}

interface Props {
    kolams: Kolam[];
}

export default function CreateBenur({ kolams }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        kolam_id: '',
        tanggal_tebar: '',
        jumlah_benur: '',
        harga_per_ekor: '',
        keterangan: '',
    });

    const totalBiaya =
        (Number(data.jumlah_benur) || 0) *
        (Number(data.harga_per_ekor) || 0);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/benurs');
    };

    return (
        <AppLayout>
            <Head title="Tambah Benur" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Tambah Tebar Benur
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Input data tebar benur baru.
                        </p>
                    </div>

                    <Link
                        href="/benurs"
                        className="
                            flex items-center gap-2
                            rounded-full
                            border
                            border-slate-200
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
                                    setData('kolam_id', e.target.value)
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
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
                                        {kolam.kode_kolam} -{' '}
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
                                Tanggal Tebar
                            </label>

                            <input
                                type="date"
                                value={data.tanggal_tebar}
                                onChange={(e) =>
                                    setData(
                                        'tanggal_tebar',
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
                                "
                            />

                            {errors.tanggal_tebar && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.tanggal_tebar}
                                </div>
                            )}
                        </div>

                        {/* Jumlah Benur */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Jumlah Benur
                            </label>

                            <input
                                type="number"
                                value={data.jumlah_benur}
                                onChange={(e) =>
                                    setData(
                                        'jumlah_benur',
                                        e.target.value
                                    )
                                }
                                placeholder="Contoh: 10000"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
                                "
                            />

                            {errors.jumlah_benur && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.jumlah_benur}
                                </div>
                            )}
                        </div>

                        {/* Harga */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Harga per Ekor
                            </label>

                            <input
                                type="number"
                                value={data.harga_per_ekor}
                                onChange={(e) =>
                                    setData(
                                        'harga_per_ekor',
                                        e.target.value
                                    )
                                }
                                placeholder="Contoh: 45"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
                                "
                            />
                        </div>

                        {/* Total */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Total Biaya
                            </label>

                            <div
                                className="
                                    rounded-xl
                                    bg-teal-50
                                    px-4
                                    py-4
                                    text-lg
                                    font-bold
                                    text-teal-700
                                "
                            >
                                Rp{' '}
                                {totalBiaya.toLocaleString('id-ID')}
                            </div>
                        </div>

                        {/* Keterangan */}
                        <div className="md:col-span-2">
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
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
                                "
                            />
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
                                px-6
                                py-3
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