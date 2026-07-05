import { Head } from '@inertiajs/react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';


interface Props {
    totalPanen: number;
    totalTerjual: number;
    stokTersedia: number;
}

export default function StokUdangPublic({
    totalPanen,
    totalTerjual,
    stokTersedia,
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
                            Total Panen
                        </div>

                        <div className="mt-2 text-4xl font-bold text-teal-600">
                            {Number(totalPanen).toLocaleString()}
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                            Kg
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="text-sm text-slate-500">
                            Total Terjual
                        </div>

                        <div className="mt-2 text-4xl font-bold text-red-600">
                            {Number(totalTerjual).toLocaleString()}
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                            Kg
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="text-sm text-slate-500">
                            Stok Tersedia
                        </div>

                        <div className="mt-2 text-4xl font-bold text-green-600">
                            {Number(stokTersedia).toLocaleString()}
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                            Kg
                        </div>
                    </div>

                </div>

                    {/* CARD */}
                   <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm">

                    <div className="text-sm uppercase tracking-widest text-slate-500">
                        Ready Stock
                    </div>

                    <div className="mt-4 text-7xl font-bold text-green-600">
                        {Number(stokTersedia).toLocaleString()}
                    </div>

                    <div className="mt-2 text-xl text-slate-500">
                        Kilogram
                    </div>

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