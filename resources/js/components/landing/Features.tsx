import {
    ShieldCheck,
    Fish,
    Wallet,
    BarChart3,
} from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: ShieldCheck,
            title: 'PSAK 69 Agrikultur',
            description:
                'Penilaian aset biologis menggunakan metode Fair Value sesuai standar PSAK 69.',
        },
        {
            icon: Fish,
            title: 'Monitoring Budidaya',
            description:
                'Pantau perkembangan benur, pertumbuhan, dan siklus budidaya udang.',
        },
        {
            icon: Wallet,
            title: 'Manajemen Keuangan',
            description:
                'Catat pemasukan, pengeluaran, serta laba rugi tambak secara terstruktur.',
        },
        {
            icon: BarChart3,
            title: 'Dashboard Analitik',
            description:
                'Visualisasi data produksi dan keuangan secara real-time.',
        },
    ];

    return (
        <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-slate-900">
                    Mengapa Menggunakan Sistem Ini?
                </h2>

                <p className="mt-4 text-slate-500">
                    Membantu pengelolaan tambak udang lebih modern,
                    efisien, dan sesuai standar akuntansi.
                </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {features.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="
                                rounded-3xl
                                bg-white
                                p-8
                                shadow-sm
                                transition
                                hover:-translate-y-2
                                hover:shadow-xl
                            "
                        >
                            <div className="mb-5 inline-flex rounded-2xl bg-teal-100 p-4">
                                <Icon
                                    size={28}
                                    className="text-teal-600"
                                />
                            </div>

                            <h3 className="text-lg font-bold">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-slate-500">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}