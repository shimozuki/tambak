import { Head } from '@inertiajs/react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

interface Panen {
    id: number;
    tanggal_panen: string;
    berat_panen: number;
    size: number;

    kolam: {
        nama_kolam: string;
    };
}

interface Props {
    panens: {
        data: Panen[];
    };
}

export default function HasilPanen({
    panens,
}: Props) {
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

    const totalProduksi =
        panens.data.reduce(
            (
                total,
                item
            ) =>
                total +
                Number(
                    item.berat_panen
                ),
            0
        );

    const rataRataSize =
        panens.data.length > 0
            ? Math.round(
                  panens.data.reduce(
                      (
                          total,
                          item
                      ) =>
                          total +
                          Number(
                              item.size
                          ),
                      0
                  ) /
                      panens.data.length
              )
            : 0;

    const totalKolam =
        new Set(
            panens.data.map(
                (item) =>
                    item.kolam
                        ?.nama_kolam
            )
        ).size;

    const getGrade = (
        size: number
    ) => {
        if (size <= 40)
            return {
                label:
                    'Premium',
                color:
                    'bg-emerald-100 text-emerald-700',
            };

        if (size <= 60)
            return {
                label: 'Super',
                color:
                    'bg-blue-100 text-blue-700',
            };

        return {
            label:
                'Standar',
            color:
                'bg-amber-100 text-amber-700',
        };
    };

    return (
        <>
            <Head title="Hasil Panen" />

            <Navbar />

            <div className="bg-slate-50">

                {/* HERO */}
                <section
                    className="
                        relative
                        overflow-hidden
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
                            Produksi Tambak Udang
                        </span>

                        <h1
                            className="
                                mt-6
                                text-5xl
                                font-bold
                            "
                        >
                            Hasil Panen Udang
                        </h1>

                        <p
                            className="
                                mt-4
                                max-w-2xl
                                text-lg
                                text-white/90
                            "
                        >
                            Informasi hasil
                            panen udang
                            vaname yang dapat
                            diakses secara
                            terbuka sebagai
                            bentuk transparansi
                            usaha tambak.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/10
                                    px-6
                                    py-4
                                    backdrop-blur
                                "
                            >
                                <div className="text-sm">
                                    Total Produksi
                                </div>

                                <div className="text-3xl font-bold">
                                    {totalProduksi.toLocaleString()}
                                    Kg
                                </div>
                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/10
                                    px-6
                                    py-4
                                    backdrop-blur
                                "
                            >
                                <div className="text-sm">
                                    Total Panen
                                </div>

                                <div className="text-3xl font-bold">
                                    {
                                        panens
                                            .data
                                            .length
                                    }
                                </div>
                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/10
                                    px-6
                                    py-4
                                    backdrop-blur
                                "
                            >
                                <div className="text-sm">
                                    Kolam Aktif
                                </div>

                                <div className="text-3xl font-bold">
                                    {
                                        totalKolam
                                    }
                                </div>
                            </div>

                        </div>
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
                    <div className="grid gap-6 md:grid-cols-4">

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="text-sm text-slate-500">
                                Total Panen
                            </div>

                            <div className="mt-2 text-4xl font-bold">
                                {
                                    panens.data
                                        .length
                                }
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="text-sm text-slate-500">
                                Produksi
                            </div>

                            <div className="mt-2 text-4xl font-bold text-teal-600">
                                {totalProduksi.toLocaleString()}
                                Kg
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="text-sm text-slate-500">
                                Kolam Aktif
                            </div>

                            <div className="mt-2 text-4xl font-bold text-cyan-600">
                                {
                                    totalKolam
                                }
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="text-sm text-slate-500">
                                Rata-rata Size
                            </div>

                            <div className="mt-2 text-4xl font-bold text-amber-600">
                                {
                                    rataRataSize
                                }
                            </div>
                        </div>

                    </div>

                    {/* PANEN CARD */}
                    <div
                        className="
                            mt-10
                            grid
                            gap-6
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
                    >
                        {panens.data.map(
                            (
                                item
                            ) => {
                                const grade =
                                    getGrade(
                                        item.size
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
                                                mb-4
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
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${grade.color}`}
                                            >
                                                {
                                                    grade.label
                                                }
                                            </span>
                                        </div>

                                        <div className="space-y-3">

                                            <div className="flex justify-between">
                                                <span className="text-slate-500">
                                                    Tanggal
                                                </span>

                                                <span>
                                                    {formatTanggal(
                                                        item.tanggal_panen
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-slate-500">
                                                    Berat Panen
                                                </span>

                                                <span className="font-semibold">
                                                    {
                                                        item.berat_panen
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
                                                        item.size
                                                    }{' '}
                                                    ekor/kg
                                                </span>
                                            </div>

                                        </div>

                                        <div
                                            className="
                                                mt-6
                                                rounded-2xl
                                                bg-gradient-to-r
                                                from-teal-50
                                                to-cyan-50
                                                p-4
                                            "
                                        >
                                            <div className="text-sm text-slate-500">
                                                Produksi
                                                Panen
                                            </div>

                                            <div
                                                className="
                                                    mt-1
                                                    text-2xl
                                                    font-bold
                                                    text-teal-700
                                                "
                                            >
                                                {
                                                    item.berat_panen
                                                }{' '}
                                                Kg
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>

                </section>

            </div>

            <Footer />
        </>
    );
}