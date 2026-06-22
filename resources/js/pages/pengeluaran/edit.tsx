import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Kategori {
    id: number;
    nama_kategori: string;
}

interface Kolam {
    id: number;
    nama_kolam: string;
}

interface Pengeluaran {
    id: number;
    kategori_id: number;
    kolam_id: number | null;
    tanggal: string;
    jumlah: number;
    keterangan: string | null;
}

interface Props {
    pengeluaran: Pengeluaran;
    kategoris: Kategori[];
    kolams: Kolam[];
}

export default function EditPengeluaran({
    pengeluaran,
    kategoris,
    kolams,
}: Props) {
    const { data, setData, put, processing, errors } =
        useForm({
            kategori_id: String(
                pengeluaran.kategori_id
            ),

            kolam_id: pengeluaran.kolam_id
                ? String(pengeluaran.kolam_id)
                : '',

            tanggal: pengeluaran.tanggal,

            jumlah: String(
                pengeluaran.jumlah
            ),

            keterangan:
                pengeluaran.keterangan ?? '',
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(
            `/pengeluarans/${pengeluaran.id}`
        );
    };

    return (
        <AppLayout>
            <Head title="Edit Pengeluaran" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Edit Pengeluaran
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Perbarui data pengeluaran.
                        </p>
                    </div>

                    <Link
                        href="/pengeluarans"
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-slate-200
                            px-5
                            py-3
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

                        {/* Kategori */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Kategori Pengeluaran
                            </label>

                            <select
                                value={data.kategori_id}
                                onChange={(e) =>
                                    setData(
                                        'kategori_id',
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
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            >
                                <option value="">
                                    Pilih Kategori
                                </option>

                                {kategoris.map(
                                    (kategori) => (
                                        <option
                                            key={
                                                kategori.id
                                            }
                                            value={
                                                kategori.id
                                            }
                                        >
                                            {
                                                kategori.nama_kategori
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.kategori_id && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.kategori_id
                                    }
                                </div>
                            )}
                        </div>

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
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            >
                                <option value="">
                                    Tidak Ada
                                </option>

                                {kolams.map(
                                    (kolam) => (
                                        <option
                                            key={
                                                kolam.id
                                            }
                                            value={
                                                kolam.id
                                            }
                                        >
                                            {
                                                kolam.nama_kolam
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.kolam_id && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.kolam_id
                                    }
                                </div>
                            )}
                        </div>

                        {/* Tanggal */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tanggal
                            </label>

                            <input
                                type="date"
                                value={data.tanggal}
                                onChange={(e) =>
                                    setData(
                                        'tanggal',
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
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.tanggal && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.tanggal
                                    }
                                </div>
                            )}
                        </div>

                        {/* Jumlah */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Jumlah (Rp)
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={data.jumlah}
                                onChange={(e) =>
                                    setData(
                                        'jumlah',
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
                                    focus:border-teal-500
                                    focus:outline-none
                                "
                            />

                            {errors.jumlah && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.jumlah
                                    }
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Keterangan */}
                    <div className="mt-6">
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
                                focus:border-teal-500
                                focus:outline-none
                            "
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                flex
                                items-center
                                gap-2
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}