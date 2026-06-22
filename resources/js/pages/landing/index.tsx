import { Head, Link } from '@inertiajs/react';
import {
    Fish,
    TrendingUp,
    Landmark,
    ArrowRight,
} from 'lucide-react';

interface Props {
    stats: {
        total_kolam: number;
        total_panen: number;
    };

    panenTerbaru: {
        id: number;
        tanggal_panen: string;
        berat_panen: number;
        size: number;
        harga_per_kg: number;

        kolam: {
            nama_kolam: string;
        };
    }[];
}

export default function Landing({
    stats,
    panenTerbaru,
}: Props) {
    const rupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <>
            <Head title="Tambak Udang" />

            <div className="min-h-screen bg-slate-50">

                {/* Navbar */}
                <nav className="border-b bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                        <div>
                            <h1 className="text-xl font-bold text-teal-600">
                                Tambak Udang
                            </h1>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href="/hasil-panen"
                                className="text-slate-600 hover:text-teal-600"
                            >
                                Hasil Panen
                            </Link>

                            <Link
                                href="/tentang"
                                className="text-slate-600 hover:text-teal-600"
                            >
                                Tentang
                            </Link>

                            <Link
                                href="/login"
                                className="
                                    rounded-xl
                                    bg-teal-600
                                    px-4
                                    py-2
                                    text-white
                                "
                            >
                                Login
                            </Link>
                        </div>

                    </div>
                </nav>

                {/* Hero */}
                <section className="mx-auto max-w-7xl px-6 py-20">

                    <div className="grid items-center gap-12 md:grid-cols-2">

                        <div>
                            <span
                                className="
                                    rounded-full
                                    bg-teal-100
                                    px-4
                                    py-2
                                    text-sm
                                    text-teal-700
                                "
                            >
                                PSAK 69 Agrikultur
                            </span>

                            <h1
                                className="
                                    mt-6
                                    text-5xl
                                    font-bold
                                    leading-tight
                                "
                            >
                                Sistem Informasi
                                Pengelolaan
                                Keuangan Tambak
                                Udang
                            </h1>

                            <p
                                className="
                                    mt-6
                                    text-lg
                                    text-slate-600
                                "
                            >
                                Menyajikan informasi
                                hasil panen, stok udang,
                                serta pengelolaan aset
                                biologis berdasarkan
                                PSAK 69 Agrikultur.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <Link
                                    href="/hasil-panen"
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-teal-600
                                        px-6
                                        py-3
                                        text-white
                                    "
                                >
                                    Lihat Hasil Panen

                                    <ArrowRight
                                        size={18}
                                    />
                                </Link>

                                <Link
                                    href="/login"
                                    className="
                                        rounded-xl
                                        border
                                        px-6
                                        py-3
                                    "
                                >
                                    Login Admin
                                </Link>
                            </div>
                        </div>

                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1510130387422-82bed34b37e9"
                                alt="Tambak Udang"
                                className="
                                    rounded-3xl
                                    shadow-xl
                                "
                            />
                        </div>

                    </div>
                </section>

                {/* Statistik */}
                <section className="mx-auto max-w-7xl px-6 pb-20">

                    <div className="grid gap-6 md:grid-cols-3">

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <Fish
                                className="mb-4 text-teal-600"
                                size={30}
                            />

                            <h3 className="text-slate-500">
                                Total Kolam
                            </h3>

                            <div className="mt-2 text-4xl font-bold">
                                {stats.total_kolam}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <TrendingUp
                                className="mb-4 text-green-600"
                                size={30}
                            />

                            <h3 className="text-slate-500">
                                Total Produksi
                            </h3>

                            <div className="mt-2 text-4xl font-bold">
                                {Number(
                                    stats.total_panen
                                ).toLocaleString()}
                                kg
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <Landmark
                                className="mb-4 text-purple-600"
                                size={30}
                            />

                            <h3 className="text-slate-500">
                                Sistem PSAK 69
                            </h3>

                            <div className="mt-2 text-xl font-bold">
                                Fair Value
                            </div>
                        </div>

                    </div>
                </section>

                {/* Panen Terbaru */}
                <section className="mx-auto max-w-7xl px-6 pb-20">

                    <div className="mb-6">
                        <h2 className="text-3xl font-bold">
                            Hasil Panen Terbaru
                        </h2>

                        <p className="text-slate-500">
                            Informasi panen yang
                            tersedia.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-6 py-4 text-left">
                                        Tanggal
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Kolam
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Berat
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Size
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Harga
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {panenTerbaru.map(
                                    (item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b"
                                        >
                                            <td className="px-6 py-4">
                                                {
                                                    item.tanggal_panen
                                                }
                                            </td>

                                            <td className="px-6 py-4">
                                                {
                                                    item.kolam
                                                        ?.nama_kolam
                                                }
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {
                                                    item.berat_panen
                                                }{' '}
                                                Kg
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {
                                                    item.size
                                                }
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {rupiah(
                                                    item.harga_per_kg
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                </section>

                {/* Footer */}
                <footer className="bg-slate-900 py-10 text-center text-white">
                    <p>
                        © 2026 Sistem Informasi
                        Pengelolaan Keuangan Tambak
                        Udang Berdasarkan PSAK 69
                    </p>
                </footer>

            </div>
        </>
    );
}