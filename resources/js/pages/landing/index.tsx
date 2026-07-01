import { Head } from '@inertiajs/react';

import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Features from '@/components/landing/Features';
import PsakBanner from '@/components/landing/PsakBanner';
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
    stats: {
        total_kolam: number;
        total_panen: number;
        nilai_wajar: number;
    };

    panenTerbaru: Panen[];
}

export default function Landing({
    stats,
}: Props) {
    return (
        <>
            <Head title="Tambak Udang" />

            <div className="min-h-screen bg-slate-50">

                {/* Navbar */}
                <Navbar />

                {/* Hero */}
                <Hero />

                {/* Statistik */}
                <Stats
                    totalKolam={stats.total_kolam}
                    totalPanen={stats.total_panen}
                    nilaiWajar={stats.nilai_wajar}
                />

                {/* Features */}
                <Features />

                {/* PSAK Banner */}
                <PsakBanner />

                {/* Footer */}
                <Footer />

            </div>
        </>
    );
}