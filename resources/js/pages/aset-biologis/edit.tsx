import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, router } from '@inertiajs/react';
interface Props {
    asetBiologi: {
        id: number;
        kolam_id: number;
        tanggal_penilaian: string;
        jumlah_benur: number;
        survival_rate: number;
        size_udang: number;
        harga_pasar: number;
    };

    kolams: {
        id: number;
        nama_kolam: string;
    }[];
}

export default function EditAsetBiologis({
    asetBiologi,
    kolams,
}: Props) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        kolam_id: asetBiologi.kolam_id,
        tanggal_penilaian:
            asetBiologi.tanggal_penilaian.substring(
                0,
                10
            ),
        jumlah_benur:
            asetBiologi.jumlah_benur,

        survival_rate:
            asetBiologi.survival_rate,

        size_udang:
            asetBiologi.size_udang,

        harga_pasar:
            asetBiologi.harga_pasar,
    });

   const submit = (e: React.FormEvent) => {
            e.preventDefault();

            put(
                `/aset-biologis/${asetBiologi.id}`
            );
        };

    return (
        <AppLayout>
            <Head title="Edit Aset Biologis" />

            <div className="space-y-6">

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Edit Aset Biologis
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Ubah data aset biologis
                            tambak udang.
                        </p>
                    </div>

                    <Link href="/aset-biologis">
                        Kembali
                    </Link>

                </div>

                <form
                    onSubmit={submit}
                    className="
                        rounded-3xl
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Kolam */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Kolam
                            </label>

                            <select
                                value={
                                    data.kolam_id
                                }
                                onChange={(e) =>
                                    setData(
                                        'kolam_id',
                                        Number(
                                            e.target
                                                .value
                                        )
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
                            >
                                <option value="">
                                    Pilih Kolam
                                </option>

                                {kolams.map(
                                    (
                                        kolam
                                    ) => (
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
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.kolam_id
                                    }
                                </p>
                            )}
                        </div>

                        {/* Tanggal */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Tanggal Penilaian
                            </label>

                            <input
                                type="date"
                                value={
                                    data.tanggal_penilaian
                                }
                                onChange={(e) =>
                                    setData(
                                        'tanggal_penilaian',
                                        e.target
                                            .value
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

                            {errors.tanggal_penilaian && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.tanggal_penilaian
                                    }
                                </p>
                            )}
                        </div>

                        {/* Jumlah Benur */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Jumlah Benur
                            </label>

                            <input
                                type="number"
                                value={
                                    data.jumlah_benur
                                }
                                onChange={(e) =>
                                    setData(
                                        'jumlah_benur',
                                        Number(
                                            e.target
                                                .value
                                        )
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

                            {errors.jumlah_benur && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.jumlah_benur
                                    }
                                </p>
                            )}
                        </div>

                        {/* Survival Rate */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Survival Rate (%)
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={
                                    data.survival_rate
                                }
                                onChange={(e) =>
                                    setData(
                                        'survival_rate',
                                        e.target
                                            .value
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

                            {errors.survival_rate && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.survival_rate
                                    }
                                </p>
                            )}
                        </div>

                        {/* Size Udang */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Size Udang (ekor/kg)
                            </label>

                            <input
                                type="number"
                                value={
                                    data.size_udang
                                }
                                onChange={(e) =>
                                    setData(
                                        'size_udang',
                                        Number(
                                            e.target
                                                .value
                                        )
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

                            {errors.size_udang && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.size_udang
                                    }
                                </p>
                            )}
                        </div>

                        {/* Harga Pasar */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Harga Pasar / Kg
                            </label>

                            <input
                                type="number"
                                value={
                                    data.harga_pasar
                                }
                                onChange={(e) =>
                                    setData(
                                        'harga_pasar',
                                        Number(
                                            e.target
                                                .value
                                        )
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

                            {errors.harga_pasar && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.harga_pasar
                                    }
                                </p>
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
                                rounded-xl
                                bg-teal-600
                                px-6
                                py-3
                                text-white
                                hover:bg-teal-700
                            "
                        >
                            Simpan Perubahan
                        </button>

                    </div>

                </form>

            </div>
        </AppLayout>
    );
}