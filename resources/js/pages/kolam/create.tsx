import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateKolam() {
const { data, setData, post, processing, errors } = useForm({
kode_kolam: '',
nama_kolam: '',
jenis_kolam: 'ternak',
status_kolam: 'aktif',
luas_m2: '',
keterangan: '',
});


const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/kolams');
};

return (
    <AppLayout>
        <Head title="Tambah Kolam" />

        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Tambah Kolam Tambak
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Lengkapi informasi kolam tambak.
                    </p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Kode Kolam */}
                    <div>
                        <Label>Kode Kolam</Label>

                        <Input
                            value={data.kode_kolam}
                            onChange={(e) =>
                                setData(
                                    'kode_kolam',
                                    e.target.value
                                )
                            }
                            placeholder="KLM-001"
                        />

                        <InputError
                            message={errors.kode_kolam}
                        />
                    </div>

                    {/* Nama Kolam */}
                    <div>
                        <Label>Nama Kolam</Label>

                        <Input
                            value={data.nama_kolam}
                            onChange={(e) =>
                                setData(
                                    'nama_kolam',
                                    e.target.value
                                )
                            }
                            placeholder="Kolam A"
                        />

                        <InputError
                            message={errors.nama_kolam}
                        />
                    </div>

                    {/* Jenis Kolam */}
                    <div>
                        <Label>Jenis Kolam</Label>

                        <select
                            value={data.jenis_kolam}
                            onChange={(e) =>
                                setData(
                                    'jenis_kolam',
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                px-3
                                py-2
                            "
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
                                setData(
                                    'status_kolam',
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                px-3
                                py-2
                            "
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
                                setData(
                                    'luas_m2',
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>

                {/* Keterangan */}
                <div className="mt-6">
                    <Label>Keterangan</Label>

                    <textarea
                        rows={4}
                        value={data.keterangan}
                        onChange={(e) =>
                            setData(
                                'keterangan',
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            p-3
                        "
                    />
                </div>

                {/* Action */}
                <div className="mt-8 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Batal
                    </Button>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="
                            bg-[#0D9488]
                            hover:bg-[#0F766E]
                            text-white
                        "
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
);


}
