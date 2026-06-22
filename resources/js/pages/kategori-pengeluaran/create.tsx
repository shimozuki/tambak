import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateKategoriPengeluaran() {
    const { data, setData, post, processing, errors } = useForm({
        nama_kategori: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/kategori-pengeluarans');
    };

    return (
        <AppLayout>
            <Head title="Tambah Kategori Pengeluaran" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Tambah Kategori Pengeluaran
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Tambahkan kategori pengeluaran baru.
                        </p>
                    </div>

                    <Link
                        href="/kategori-pengeluarans"
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

                {/* Form */}
                <form onSubmit={submit}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Nama Kategori
                        </label>

                        <input
                            type="text"
                            value={data.nama_kategori}
                            onChange={(e) =>
                                setData(
                                    'nama_kategori',
                                    e.target.value
                                )
                            }
                            placeholder="Contoh: Pakan"
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

                        {errors.nama_kategori && (
                            <div className="mt-2 text-sm text-red-500">
                                {errors.nama_kategori}
                            </div>
                        )}
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
                                transition
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