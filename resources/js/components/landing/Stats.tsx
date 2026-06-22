import {
    Fish,
    TrendingUp,
    Landmark,
    Activity,
} from 'lucide-react';

interface Props {
    totalKolam: number;
    totalPanen: number;
    nilaiWajar?: number;
}

export default function Stats({
    totalKolam,
    totalPanen,
    nilaiWajar = 0,
}: Props) {
    const rupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 -mt-14">

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Total Kolam */}
                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-100
                        bg-white
                        p-6
                        shadow-lg
                        transition
                        hover:-translate-y-1
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-teal-100
                        "
                    >
                        <Fish
                            size={28}
                            className="text-teal-600"
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Total Kolam
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-slate-900">
                        {totalKolam}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                        Kolam budidaya aktif
                    </p>
                </div>

                {/* Produksi */}
                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-100
                        bg-white
                        p-6
                        shadow-lg
                        transition
                        hover:-translate-y-1
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-green-100
                        "
                    >
                        <TrendingUp
                            size={28}
                            className="text-green-600"
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Produksi Panen
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-slate-900">
                        {Number(totalPanen).toLocaleString()}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                        Kilogram udang dipanen
                    </p>
                </div>

                {/* Nilai Wajar */}
                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-100
                        bg-white
                        p-6
                        shadow-lg
                        transition
                        hover:-translate-y-1
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-purple-100
                        "
                    >
                        <Landmark
                            size={28}
                            className="text-purple-600"
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Nilai Wajar
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                        {rupiah(nilaiWajar)}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                        Fair Value PSAK 69
                    </p>
                </div>

                {/* Monitoring */}
                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-100
                        bg-white
                        p-6
                        shadow-lg
                        transition
                        hover:-translate-y-1
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-orange-100
                        "
                    >
                        <Activity
                            size={28}
                            className="text-orange-600"
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Monitoring
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        Real Time
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                        Data selalu diperbarui
                    </p>
                </div>

            </div>
        </section>
    );
}