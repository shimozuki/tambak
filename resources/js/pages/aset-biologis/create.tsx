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

export default function CreateAsetBiologis({
    kolams,
}: Props) {
    const { data, setData, post, processing, errors } =
        useForm({
            kolam_id: '',
            tanggal_penilaian: '',
            jumlah_benur: '',
            survival_rate: '',
            berat_rata_rata: '',
            harga_pasar: '',
        });

    const jumlahUdangHidup =
        (Number(data.jumlah_benur) || 0) *
        ((Number(data.survival_rate) || 0) / 100);

    const totalBerat =
        jumlahUdangHidup *
        (Number(data.berat_rata_rata) || 0);

    const nilaiWajar =
        totalBerat *
        (Number(data.harga_pasar) || 0);

    const rupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/aset-biologis');
    };

    return (
        <AppLayout>
            <Head title="Tambah Aset Biologis" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Tambah Aset Biologis
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Penilaian aset biologis berdasarkan PSAK 69.
                        </p>
                    </div>

                    <Link
                        href="/aset-biologis"
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
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />

                            {errors.tanggal_penilaian && (
                                <div className="mt-1 text-sm text-red-500">
                                    {
                                        errors.tanggal_penilaian
                                    }
                                </div>
                            )}
                        </div>

                        {/* Jumlah Benur */}
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

                        {/* Survival Rate */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Survival Rate (%)
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.survival_rate}
                                onChange={(e) =>
                                    setData(
                                        'survival_rate',
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />
                        </div>

                        {/* Berat Rata-rata */}
                       <div>
                            <label className="mb-2 block text-sm font-medium">
                                Size Udang (ekor/kg)
                            </label>

                            <input
                                type="number"
                                value={data.size_udang}
                                onChange={(e) =>
                                    setData(
                                        'size_udang',
                                        e.target.value
                                    )
                                }
                                placeholder="Contoh: 50"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />
                        </div>

                        {/* Harga Pasar */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Harga Pasar / Kg
                            </label>

                            <input
                                type="number"
                                value={data.harga_pasar}
                                onChange={(e) =>
                                    setData(
                                        'harga_pasar',
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />
                        </div>
                    </div>

                    {/* Hasil Perhitungan PSAK 69 */}
                    <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

                        <h3 className="mb-4 font-bold text-green-700">
                            Hasil Perhitungan PSAK 69
                        </h3>

                        <div className="grid gap-4 md:grid-cols-3">

                            <div>
                                <div className="text-sm text-slate-500">
                                    Udang Hidup
                                </div>

                                <div className="text-xl font-bold text-slate-900">
                                    {Math.round(
                                        jumlahUdangHidup
                                    ).toLocaleString()}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-slate-500">
                                    Total Berat
                                </div>

                                <div className="text-xl font-bold text-slate-900">
                                    {totalBerat.toFixed(2)} Kg
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-slate-500">
                                    Nilai Wajar
                                </div>

                                <div className="text-xl font-bold text-green-700">
                                    {rupiah(nilaiWajar)}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Submit */}
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