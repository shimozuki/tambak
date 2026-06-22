import { Head } from '@inertiajs/react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

interface Props {
    panens: {
        data: any[];
    };
}

export default function HasilPanen({
    panens,
}: Props) {

    const rupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

        const formatTanggal = (tanggal: string) =>
            new Date(tanggal).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });

    return (
        <>
            <Head title="Hasil Panen" />

            <Navbar />

            <div className="bg-slate-50 py-20">

                <div className="mx-auto max-w-7xl px-6">

    {/* HERO */}
    <div
        className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-r
            from-teal-600
            via-teal-500
            to-cyan-500
            px-10
            py-16
            text-white
        "
    >
        <div className="relative z-10">

            <span
                className="
                    rounded-full
                    bg-white/20
                    px-4
                    py-2
                    text-sm
                "
            >
                Hasil Panen Publik
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
                Informasi hasil panen tambak
                yang dapat diakses secara
                terbuka oleh masyarakat.
            </p>

        </div>

        <div
            className="
                absolute
                top-0
                right-0
                h-full
                w-1/2
                opacity-10
            "
        >
            🦐🦐🦐
        </div>
    </div>

    {/* SUMMARY */}
    <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">
                Total Panen
            </div>

            <div className="mt-2 text-4xl font-bold">
                {panens.data.length}
            </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">
                Produksi
            </div>

            <div className="mt-2 text-4xl font-bold text-teal-600">
                {panens.data
                    .reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            Number(
                                item.berat_panen
                            ),
                        0
                    )
                    .toLocaleString()}
                Kg
            </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">
                Total Pendapatan
            </div>

            <div className="mt-2 text-2xl font-bold text-green-600">
                {rupiah(
                    panens.data.reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            Number(
                                item.total_pemasukan
                            ),
                        0
                    )
                )}
            </div>
        </div>

    </div>

    {/* PANEN CARD */}
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {panens.data.map(
            (item) => (
                <div
                    key={item.id}
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
                                item.kolam
                                    ?.nama_kolam
                            }
                        </h3>

                        <span
                            className="
                                rounded-full
                                bg-teal-100
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-teal-700
                            "
                        >
                            Size {item.size}
                        </span>
                    </div>

                    <div className="space-y-3">

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Tanggal
                            </span>

                            <span>
                                {
                                    formatTanggal(item.tanggal_panen)
                                }
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Berat Panen
                            </span>

                            <span className="font-semibold">
                                {
                                    item.berat_panen
                                } Kg
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Harga / Kg
                            </span>

                            <span>
                                {rupiah(
                                    item.harga_per_kg
                                )}
                            </span>
                        </div>

                    </div>

                    <div
                        className="
                            mt-6
                            rounded-2xl
                            bg-green-50
                            p-4
                        "
                    >
                        <div className="text-sm text-slate-500">
                            Total Pemasukan
                        </div>

                        <div
                            className="
                                mt-1
                                text-xl
                                font-bold
                                text-green-600
                            "
                        >
                            {rupiah(
                                item.total_pemasukan
                            )}
                        </div>
                    </div>

                </div>
            )
        )}

    </div>

</div>

            </div>

            <Footer />
        </>
    );
}