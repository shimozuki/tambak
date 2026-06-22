import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Kolam {
    id: number;
    kode_kolam: string;
    nama_kolam: string;
    jenis_kolam: string;
    status_kolam: string;
    luas_m2: number | null;
    keterangan: string | null;
}

interface Props {
    kolam: Kolam;
}

export default function EditKolam({ kolam }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        kode_kolam: kolam.kode_kolam,
        nama_kolam: kolam.nama_kolam,
        jenis_kolam: kolam.jenis_kolam,
        status_kolam: kolam.status_kolam,
        luas_m2: kolam.luas_m2 ?? '',
        keterangan: kolam.keterangan ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/kolams/${kolam.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Kolam" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Edit Kolam Tambak
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Perbarui informasi kolam tambak.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Kode Kolam */}
                        <div>
                            <Label>Kode Kolam</Label>

                            <Input
                                value={data.kode_kolam}
                                onChange={(e) =>
                                    setData('kode_kolam', e.target.value)
                                }
                            />

                            <InputError message={errors.kode_kolam} />
                        </div>

                        {/* Nama Kolam */}
                        <div>
                            <Label>Nama Kolam</Label>

                            <Input
                                value={data.nama_kolam}
                                onChange={(e) =>
                                    setData('nama_kolam', e.target.value)
                                }
                            />

                            <InputError message={errors.nama_kolam} />
                        </div>

                        {/* Jenis Kolam */}
                        <div>
                            <Label>Jenis Kolam</Label>

                            <select
                                value={data.jenis_kolam}
                                onChange={(e) =>
                                    setData('jenis_kolam', e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 px-3 py-2"
                            >
                                <option value="ternak">
                                    Ternak
                                </option>

                                <option value="tandon">
                                    Tandon
                                </option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <Label>Status Kolam</Label>

                            <select
                                value={data.status_kolam}
                                onChange={(e) =>
                                    setData('status_kolam', e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 px-3 py-2"
                            >
                                <option value="aktif">
                                    Aktif
                                </option>

                                <option value="kosong">
                                    Kosong
                                </option>

                                <option value="panen">
                                    Panen
                                </option>
                            </select>
                        </div>

                        {/* Luas */}
                        <div>
                            <Label>Luas Kolam (m²)</Label>

                            <Input
                                type="number"
                                value={data.luas_m2}
                                onChange={(e) =>
                                    setData('luas_m2', e.target.value)
                                }
                            />

                            <InputError message={errors.luas_m2} />
                        </div>
                    </div>

                    {/* Keterangan */}
                    <div className="mt-6">
                        <Label>Keterangan</Label>

                        <textarea
                            rows={4}
                            value={data.keterangan}
                            onChange={(e) =>
                                setData('keterangan', e.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 p-3"
                        />

                        <InputError message={errors.keterangan} />
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-end gap-3">
                        <Link href="/kolams">
                            <Button
                                type="button"
                                variant="outline"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="
                                bg-[#0D9488]
                                text-white
                                hover:bg-[#0F766E]
                            "
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}