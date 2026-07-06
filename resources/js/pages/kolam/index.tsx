import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

interface Kolam {
    id: number;
    kode_kolam: string;
    nama_kolam: string;
    jenis_kolam: string;
    status_kolam: string;
    keterangan: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    kolams: {
        data: Kolam[];
        links: PaginationLink[];
    };
    filters: {
        search?: string;
    };
}

export default function KolamIndex({
    kolams,
    filters,
}: Props) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        console.log('FLASH =>', flash);

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
        text: 'Data kolam yang dihapus tidak dapat dikembalikan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true,
        customClass: {
            popup: 'rounded-3xl',
            confirmButton:
                'bg-[#0D9488] text-white px-5 py-2 rounded-xl mr-2',
            cancelButton:
                'bg-red-500 text-white px-5 py-2 rounded-xl',
        },
        buttonsStyling: false,
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/kolams/${id}`, {
                preserveScroll: true,

                onError: () => {
                    toast.error(
                        'Gagal menghapus data kolam'
                    );
                },
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
            <Head title="Data Kolam" />

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Data Kolam Tambak
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Kelola data kolam tambak.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/kolams/create"
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
                        Tambah Kolam
                    </Link>
)}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search
                            size={18}
                            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            defaultValue={filters.search}
                            placeholder="Cari kode atau nama kolam..."
                            onChange={(e) =>
                                router.get(
                                    '/kolams',
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
                                pr-4
                                pl-10
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
                                    Kode Kolam
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Nama Kolam
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Jenis Kolam
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Status
                                </th>
{(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                                    Aksi
                                </th>
)}
                            </tr>
                        </thead>

                        <tbody>
                            {kolams.data.length > 0 ? (
                                kolams.data.map((kolam) => (
                                    <tr
                                        key={kolam.id}
                                        className="border-b border-slate-100"
                                    >
                                        <td className="px-4 py-4">
                                            {kolam.kode_kolam}
                                        </td>

                                        <td className="px-4 py-4">
                                            {kolam.nama_kolam}
                                        </td>

                                        <td className="px-4 py-4 capitalize">
                                            {kolam.jenis_kolam}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`
                                                    rounded-full
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    ${
                                                        kolam.status_kolam ===
                                                        'aktif'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }
                                                `}
                                            >
                                                {kolam.status_kolam}
                                            </span>
                                        </td>

{(isAdminKeuangan || isSuperAdmin) && (
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={`/kolams/${kolam.id}/edit`}
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
                                                            kolam.id
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
                                        colSpan={5}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        Data kolam tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end gap-2">
                    {kolams.links.map((link, index) => (
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