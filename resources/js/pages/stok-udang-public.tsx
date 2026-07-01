import { Head } from '@inertiajs/react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

interface StokUdang {
    id: number;
    tanggal_penilaian: string;
    size_udang: number;
    total_berat: number;

    kolam: {
        nama_kolam: string;
    };
}

interface Props {
    stokUdang: StokUdang[];
}

export default function StokUdangPublic({
    stokUdang,
}: Props) {
    const totalStok = stokUdang.reduce(
        (total, item) =>
            total +
            Number(item.total_berat),
        0
    );

    const rataSize =
        stokUdang.length > 0
            ? Math.round(
                  stokUdang.reduce(
                      (total, item) =>
                          total +
                          Number(item.size_udang),
                      0
                  ) / stokUdang.length
              )
            : 0;

    const totalKolam =
        new Set(
            stokUdang.map(
                (item) =>
                    item.kolam?.nama_kolam
            )
        ).size;

    const formatTanggal = (
        tanggal: string
    ) =>
        new Date(
            tanggal
        ).toLocaleDateString(
            'id-ID',
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }
        );

    const getStatus = (
        size: number
    ) => {
        if (size <= 40)
            return {
                label:
                    'Siap Panen',
                color:
                    'bg-green-100 text-green-700',
            };

        if (size <= 80)
            return {
                label:
                    'Pembesaran',
                color:
                    'bg-amber-100 text-amber-700',
            };

        return {
            label:
                'Benur',
            color:
                'bg-blue-100 text-blue-700',
        };
    };

    return (
        <>
            <Head title="Stok Udang" />

            <Navbar />

            <div className="bg-slate-50">

                {/* HERO */}
                <section
                    className="
                        bg-gradient-to-r
                        from-teal-700
                        via-teal-600
                        to-cyan-500
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-7xl
                            px-6
                            py-24
                            text-white
                        "
                    >
                        <span
                            className="
                                rounded-full
                                bg-white/20
                                px-4
                                py-2
                                text-sm
                            "
                        >
                            Ready Stock Udang
                        </span>

                        <h1
                            className="
                                mt-6
                                text-5xl
                                font-bold
                            "
                        >
                            Stok Udang Tersedia
                        </h1>

                        <p
                            className="
                                mt-4
                                max-w-2xl
                                text-lg
                                text-white/90
                            "
                        >
                            Informasi stok udang
                            yang tersedia untuk
                            masyarakat umum.
                        </p>
                    </div>
                </section>

                {/* CONTENT */}
                <section
                    className="
                        mx-auto
                        max-w-7xl
                        px-6
                        py-16
                    "
                >

                    {/* SUMMARY */}
                    <div className="grid gap-6 md:grid-cols-3">

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="text-sm text-slate-500">
                                Total Stok
                            </div>

                            <div className="mt-2 text-4xl font-bold text-teal-600">
                                {totalStok.toLocaleString()}
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                Kg
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="text-sm text-slate-500">
                                Kolam Aktif
                            </div>

                            <div className="mt-2 text-4xl font-bold text-cyan-600">
                                {totalKolam}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="text-sm text-slate-500">
                                Rata-rata Size
                            </div>

                            <div className="mt-2 text-4xl font-bold text-amber-600">
                                {rataSize}
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                Ekor/Kg
                            </div>
                        </div>

                    </div>

                    {/* CARD */}
                    <div
                        className="
                            mt-10
                            grid
                            gap-6
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
                    >
                        {stokUdang.map(
                            (item) => {
                                const status =
                                    getStatus(
                                        Number(
                                            item.size_udang
                                        )
                                    );

                                return (
                                    <div
                                        key={
                                            item.id
                                        }
                                        className="
                                            rounded-3xl
                                            bg-white
                                            p-6
                                            shadow-sm
                                            transition
                                            hover:-translate-y-1
                                            hover:shadow-xl
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >
                                            <h3
                                                className="
                                                    text-xl
                                                    font-bold
                                                "
                                            >
                                                {
                                                    item
                                                        .kolam
                                                        ?.nama_kolam
                                                }
                                            </h3>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}
                                            >
                                                {
                                                    status.label
                                                }
                                            </span>
                                        </div>

                                        <div className="mt-5 space-y-4">

                                            <div className="flex justify-between">
                                                <span className="text-slate-500">
                                                    Stok Tersedia
                                                </span>

                                                <span className="font-semibold">
                                                    {
                                                        item.total_berat
                                                    }{' '}
                                                    Kg
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-slate-500">
                                                    Size Udang
                                                </span>

                                                <span>
                                                    {
                                                        item.size_udang
                                                    }{' '}
                                                    Ekor/Kg
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-slate-500">
                                                    Update
                                                </span>

                                                <span>
                                                    {formatTanggal(
                                                        item.tanggal_penilaian
                                                    )}
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>

                    {/* CTA */}
                    <div
                        className="
                            mt-12
                            rounded-3xl
                            bg-white
                            p-10
                            text-center
                            shadow-sm
                        "
                    >
                        <h2
                            className="
                                text-3xl
                                font-bold
                            "
                        >
                            Tertarik Membeli Udang?
                        </h2>

                        <p
                            className="
                                mt-3
                                text-slate-500
                            "
                        >
                            Hubungi kami untuk
                            informasi stok dan
                            pemesanan udang.
                        </p>

                        <a
                            href="https://wa.me/628123456789"
                            target="_blank"
                            className="
                                mt-6
                                inline-flex
                                rounded-2xl
                                bg-green-500
                                px-6
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-green-600
                            "
                        >
                            Hubungi via WhatsApp
                        </a>
                    </div>

                </section>

            </div>

            <Footer />
        </>
    );
}