interface Harvest {
    id: number;
    tanggal_panen: string;
    berat_panen: number;
    size: number;
    harga_per_kg: number;

    kolam: {
        nama_kolam: string;
    };
}

interface Props {
    panenTerbaru: Harvest[];
}

export default function HarvestCards({
    panenTerbaru,
}: Props) {
    const rupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold">
                    Hasil Panen Terbaru
                </h2>

                <p className="mt-4 text-slate-500">
                    Informasi hasil panen udang terbaru dari tambak.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {panenTerbaru.map((item) => (
                    <div
                        key={item.id}
                        className="
                            rounded-3xl
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            hover:-translate-y-2
                            hover:shadow-xl
                        "
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">
                                {item.kolam?.nama_kolam}
                            </h3>

                            <span
                                className="
                                    rounded-full
                                    bg-teal-100
                                    px-3 py-1
                                    text-xs
                                    font-medium
                                    text-teal-700
                                "
                            >
                                Size {item.size}
                            </span>
                        </div>

                        <div className="mt-6">
                            <div className="text-sm text-slate-500">
                                Berat Panen
                            </div>

                            <div className="mt-1 text-4xl font-bold">
                                {item.berat_panen} Kg
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-sm text-slate-500">
                                Harga Per Kg
                            </div>

                            <div className="font-semibold text-green-600">
                                {rupiah(item.harga_per_kg)}
                            </div>
                        </div>

                        <div className="mt-4 text-xs text-slate-400">
                            {item.tanggal_panen}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}