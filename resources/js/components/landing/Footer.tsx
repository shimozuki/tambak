import { Link } from '@inertiajs/react';
import { Fish } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="mx-auto max-w-7xl px-6 py-16">

                <div className="grid gap-10 md:grid-cols-3">

                    {/* Logo */}
                    <div>
                        <div className="flex items-center gap-3">
                            <Fish size={28} />

                            <h3 className="text-xl font-bold">
                                Tambak Udang
                            </h3>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Sistem Informasi Pengelolaan
                            Keuangan Tambak Udang
                            Berbasis PSAK 69 Agrikultur.
                        </p>
                    </div>

                    {/* Menu */}
                    <div>
                        <h4 className="mb-4 font-bold">
                            Menu
                        </h4>

                        <div className="space-y-3 text-slate-400">
                            <Link
                                href="/"
                                className="block hover:text-white"
                            >
                                Beranda
                            </Link>

                            <Link
                                href="/hasil-panen"
                                className="block hover:text-white"
                            >
                                Hasil Panen
                            </Link>

                            <Link
                                href="/stok-udang"
                                className="block hover:text-white"
                            >
                                Stok Udang
                            </Link>

                            <Link
                                href="/tentang"
                                className="block hover:text-white"
                            >
                                Tentang
                            </Link>
                        </div>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="mb-4 font-bold">
                            Informasi
                        </h4>

                        <div className="space-y-2 text-slate-400">
                            <p>Sumbawa Besar</p>
                            <p>Nusa Tenggara Barat</p>
                            <p>Indonesia</p>
                        </div>
                    </div>

                </div>

                <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Tambak Udang.
                    Semua hak dilindungi.
                </div>

            </div>
        </footer>
    );
}