import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface AsetBiologis {
    id: number;
    tanggal_penilaian: string;
    jumlah_benur: number;
    survival_rate: number;
    jumlah_udang_hidup: number;
    berat_rata_rata: number;
    total_berat: number;
    harga_pasar: number;
    nilai_wajar: number;

    kolam: {
        id: number;
        nama_kolam: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    asetBiologis: {
        data: AsetBiologis[];
        links: PaginationLink[];
    };

    filters: {
        search?: string;
    };
}

export default function AsetBiologisIndex({
    asetBiologis,
    filters,
}: Props) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Hapus Data?',
            text: 'Data aset biologis akan dihapus.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-3xl',
                confirmButton:
                    'bg-[#0D9488] text-white px-5 py-2 rounded-xl mr-2',
                cancelButton:
                    'bg-red-500 text-white px-5 py-2 rounded-xl',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/aset-biologis/${id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const { auth } = usePage().props as any;

    const roles: string[] =
        auth.user.roles ?? [];

    const isAdminKeuangan =
        roles.includes('admin-keuangan');

    const isSuperAdmin =
        roles.includes('super-admin');

    const rupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <AppLayout>
            <Head title="Aset Biologis" />

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Aset Biologis
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Penilaian aset biologis berdasarkan PSAK 69.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/aset-biologis/create"
                        className="
                            flex items-center gap-2
                            rounded-full
                            bg-[#0D9488]
                            px-6 py-3
                            font-bold
                            text-white
                            hover:bg-[#0F766E]
                        "
                    >
                        <Plus size={18} />
                        Tambah Penilaian
                    </Link>
                    )}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            defaultValue={filters.search}
                            placeholder="Cari kolam..."
                            onChange={(e) =>
                                router.get(
                                    '/aset-biologis',
                                    {
                                        search: e.target.value,
                                    },
                                    {
                                        preserveState: true,
                                        replace: true,
                                    }
                                )
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                py-3
                                pl-10
                                pr-4
                                focus:border-teal-500
                                focus:outline-none
                            "
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Tanggal
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Kolam
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                                    Benur
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                                    SR %
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                                    Udang Hidup
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                                    Total Berat
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                                    Nilai Wajar
                                </th>
{(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                                    Aksi
                                </th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {asetBiologis.data.length > 0 ? (
                                asetBiologis.data.map((aset) => (
                                    <tr
                                        key={aset.id}
                                        className="border-b border-slate-100"
                                    >
                                        <td className="px-4 py-4">
                                            {new Date(
                                                aset.tanggal_penilaian
                                            ).toLocaleDateString(
                                                'id-ID'
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            {aset.kolam.nama_kolam}
                                        </td>

                                        <td className="px-4 py-4 text-right">
                                            {aset.jumlah_benur.toLocaleString()}
                                        </td>

                                        <td className="px-4 py-4 text-right">
                                            {aset.survival_rate}%
                                        </td>

                                        <td className="px-4 py-4 text-right">
                                            {aset.jumlah_udang_hidup.toLocaleString()}
                                        </td>

                                        <td className="px-4 py-4 text-right">
                                            {Number(
                                                aset.total_berat
                                            ).toLocaleString()} Kg
                                        </td>

                                        <td className="px-4 py-4 text-right font-bold text-green-600">
                                            {rupiah(
                                                aset.nilai_wajar
                                            )}
                                        </td>
                                            {(isAdminKeuangan || isSuperAdmin) && (
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={`/aset-biologis/${aset.id}/edit`}
                                                    className="
                                                        rounded-lg
                                                        bg-amber-100
                                                        p-2
                                                        text-amber-600
                                                        hover:bg-amber-200
                                                    "
                                                >
                                                    <Pencil size={16} />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            aset.id
                                                        )
                                                    }
                                                    className="
                                                        rounded-lg
                                                        bg-red-100
                                                        p-2
                                                        text-red-600
                                                        hover:bg-red-200
                                                    "
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        Data aset biologis belum tersedia
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end gap-2">
                    {asetBiologis.links.map(
                        (link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url &&
                                    router.visit(link.url)
                                }
                                className={`
                                    rounded-lg
                                    border
                                    px-4
                                    py-2
                                    text-sm
                                    ${
                                        link.active
                                            ? 'bg-[#0D9488] text-white'
                                            : 'bg-white text-slate-700'
                                    }
                                `}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        )
                    )}
                </div>
            </div>
        </AppLayout>
    );
}