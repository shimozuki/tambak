import { Link } from '@inertiajs/react';
import { Fish } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div
                        className="
                            flex h-12 w-12 items-center
                            justify-center rounded-2xl
                            bg-teal-600 text-white
                        "
                    >
                        <Fish size={24} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            Tambak Udang
                        </h1>

                        <p className="text-xs text-slate-500">
                            PSAK 69 Agrikultur
                        </p>
                    </div>
                </Link>

                {/* Menu */}
                <nav className="hidden items-center gap-8 md:flex">

                    <Link
                        href="/"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-teal-600
                        "
                    >
                        Beranda
                    </Link>

                    <Link
                        href="/hasil-panen"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-teal-600
                        "
                    >
                        Hasil Panen
                    </Link>

                    <Link
                        href="/stok-udang-public"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-teal-600
                        "
                    >
                        Stok Udang
                    </Link>

                    <Link
                        href="/tentang"
                        className="
                            font-medium
                            text-slate-600
                            transition
                            hover:text-teal-600
                        "
                    >
                        Tentang
                    </Link>
                </nav>

                {/* Button Login */}
                <div className="flex items-center gap-3">

                    <Link
                        href="/login"
                        className="
                            rounded-2xl
                            bg-teal-600
                            px-5 py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-teal-700
                        "
                    >
                        Login Admin
                    </Link>

                </div>

            </div>
        </header>
    );
}