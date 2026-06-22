import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Kolam {
    id: number;
    kode_kolam: string;
    nama_kolam: string;
}

interface Benur {
    id: number;
    kolam_id: number;
    tanggal_tebar: string;
    jumlah_benur: number;
    harga_per_ekor: number | null;
    keterangan: string | null;
}

interface Props {
    benur: Benur;
    kolams: Kolam[];
}

export default function EditBenur({
    benur,
    kolams,
}: Props) {
    const { data, setData, put, processing, errors } = useForm({
        kolam_id: benur.kolam_id.toString(),
        tanggal_tebar: benur.tanggal_tebar,
        jumlah_benur: benur.jumlah_benur.toString(),
        harga_per_ekor: benur.harga_per_ekor?.toString() ?? '',
        keterangan: benur.keterangan ?? '',
    });

    const totalBiaya =
        (Number(data.jumlah_benur) || 0) *
        (Number(data.harga_per_ekor) || 0);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/benurs/${benur.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Benur" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Edit Tebar Benur
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Perbarui data tebar benur.
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

                        <div>
                            <label className="mb-2 block text-sm font-medium">
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
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            >
                                {kolams.map((kolam) => (
                                    <option
                                        key={kolam.id}
                                        value={kolam.id}
                                    >
                                        {kolam.kode_kolam} - {kolam.nama_kolam}
                                    </option>
                                ))}
                            </select>

                            {errors.kolam_id && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.kolam_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
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
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />

                            {errors.tanggal_tebar && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.tanggal_tebar}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
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
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Harga Per Ekor
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
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Total Biaya
                            </label>

                            <div className="rounded-xl bg-teal-50 px-4 py-4 text-lg font-bold text-teal-700">
                                Rp {totalBiaya.toLocaleString('id-ID')}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
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
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />
                        </div>
                    </div>

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
                            Update Data
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}