import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface Benur {
    id: number;
    tanggal_tebar: string;
    jumlah_benur: number;
    harga_per_ekor: number | null;
    total_biaya: number | null;
    keterangan: string | null;

    kolam: {
        id: number;
        kode_kolam: string;
        nama_kolam: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    benurs: {
        data: Benur[];
        links: PaginationLink[];
    };

    filters: {
        search?: string;
    };
}

export default function BenurIndex({
    benurs,
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
            text: 'Data benur akan dihapus permanen.',
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
                router.delete(`/benurs/${id}`, {
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

    return (
        <AppLayout>
            <Head title="Data Benur" />

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Data Tebar Benur
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Kelola data tebar benur.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/benurs/create"
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
                        Tambah Benur
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
                                    '/benurs',
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
                                <th className="px-4 py-3 text-left">
                                    Kolam
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Tanggal Tebar
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Jumlah Benur
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Harga / Ekor
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Total Biaya
                                </th>
{(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-4 py-3 text-center">
                                    Aksi
                                </th>
)}
                            </tr>
                        </thead>

                        <tbody>
                            {benurs.data.length > 0 ? (
                                benurs.data.map((benur) => (
                                    <tr
                                        key={benur.id}
                                        className="border-b border-slate-100"
                                    >
                                        <td className="px-4 py-4">
                                            <div>
                                                <div className="font-medium">
                                                    {benur.kolam.nama_kolam}
                                                </div>

                                                <div className="text-sm text-slate-500">
                                                    {benur.kolam.kode_kolam}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            {benur.tanggal_tebar}
                                        </td>

                                        <td className="px-4 py-4">
                                            {benur.jumlah_benur.toLocaleString()}
                                        </td>

                                        <td className="px-4 py-4">
                                            Rp{' '}
                                            {Number(
                                                benur.harga_per_ekor ?? 0
                                            ).toLocaleString('id-ID')}
                                        </td>

                                        <td className="px-4 py-4 font-semibold">
                                            Rp{' '}
                                            {Number(
                                                benur.total_biaya ?? 0
                                            ).toLocaleString('id-ID')}
                                        </td>
{(isAdminKeuangan || isSuperAdmin) && (
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    href={`/benurs/${benur.id}/edit`}
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
                                                            benur.id
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
                                        colSpan={6}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        Data benur tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end gap-2">
                    {benurs.links.map((link, index) => (
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
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}