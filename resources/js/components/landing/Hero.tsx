import { Link } from '@inertiajs/react';
import { ArrowRight, Fish, TrendingUp } from 'lucide-react';

export default function Hero() {
    return (
        <section
            className="
                relative
                overflow-hidden
                bg-gradient-to-r
                from-slate-900
                via-teal-800
                to-cyan-700
            "
        >
            {/* Background Blur */}
            <div
                className="
                    absolute
                    -top-32
                    -left-32
                    h-96
                    w-96
                    rounded-full
                    bg-white/10
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    -right-32
                    bottom-0
                    h-96
                    w-96
                    rounded-full
                    bg-cyan-300/20
                    blur-3xl
                "
            />

            <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left Content */}
                    <div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white/10
                                px-4
                                py-2
                                text-sm
                                text-white
                            "
                        >
                            <TrendingUp size={16} />

                            PSAK 69 Agrikultur
                        </div>

                        <h1
                            className="
                                mt-8
                                text-5xl
                                font-extrabold
                                leading-tight
                                text-white
                                lg:text-7xl
                            "
                        >
                            Sistem Informasi
                            <span className="block text-cyan-300">
                                Tambak Udang
                            </span>
                        </h1>

                        <p
                            className="
                                mt-6
                                max-w-xl
                                text-lg
                                leading-relaxed
                                text-slate-200
                            "
                        >
                            Platform modern untuk
                            mengelola budidaya udang,
                            pencatatan keuangan,
                            laporan laba rugi,
                            serta penilaian aset biologis
                            berdasarkan PSAK 69.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                href="/hasil-panen"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-2xl
                                    bg-white
                                    px-6
                                    py-4
                                    font-semibold
                                    text-teal-700
                                    shadow-lg
                                    transition
                                    hover:-translate-y-1
                                "
                            >
                                Lihat Hasil Panen

                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/login"
                                className="
                                    rounded-2xl
                                    border
                                    border-white/30
                                    px-6
                                    py-4
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-white/10
                                "
                            >
                                Login Admin
                            </Link>

                        </div>

                        {/* Small Stats */}
                        <div className="mt-12 flex flex-wrap gap-8">

                            <div>
                                <div className="text-3xl font-bold text-white">
                                    100%
                                </div>

                                <div className="text-sm text-slate-300">
                                    PSAK 69 Ready
                                </div>
                            </div>

                            <div>
                                <div className="text-3xl font-bold text-white">
                                    Real Time
                                </div>

                                <div className="text-sm text-slate-300">
                                    Monitoring
                                </div>
                            </div>

                            <div>
                                <div className="text-3xl font-bold text-white">
                                    Digital
                                </div>

                                <div className="text-sm text-slate-300">
                                    Farm Management
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Right Content */}
                    <div className="relative">

                        <img
                            src="/images/tambak.png"
                            alt="Tambak Udang"
                            className="
                                h-[500px]
                                w-full
                                rounded-[40px]
                                object-cover
                                shadow-2xl
                            "
                        />

                        {/* Floating Card */}
                        <div
                            className="
                                absolute
                                -bottom-6
                                -left-6
                                rounded-3xl
                                bg-white
                                p-5
                                shadow-xl
                            "
                        >
                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-teal-100
                                        text-teal-600
                                    "
                                >
                                    <Fish size={24} />
                                </div>

                                <div>
                                    <div className="text-sm text-slate-500">
                                        Budidaya Udang
                                    </div>

                                    <div className="font-bold text-slate-900">
                                        Modern & Terintegrasi
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}