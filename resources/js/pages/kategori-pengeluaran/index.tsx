import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface KategoriPengeluaran {
    id: number;
    nama_kategori: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    kategoriPengeluarans: {
        data: KategoriPengeluaran[];
        links: PaginationLink[];
    };
    filters: {
        search?: string;
    };
}

export default function Index({
    kategoriPengeluarans,
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
            text: 'Data kategori pengeluaran akan dihapus.',
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
                router.delete(
                    `/kategori-pengeluarans/${id}`,
                    {
                        preserveScroll: true,
                    }
                );
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
            <Head title="Kategori Pengeluaran" />

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Kategori Pengeluaran
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Kelola master kategori pengeluaran.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/kategori-pengeluarans/create"
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
                        Tambah Kategori
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
                            placeholder="Cari kategori..."
                            onChange={(e) =>
                                router.get(
                                    '/kategori-pengeluarans',
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
                                    No
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Nama Kategori
                                </th>

                            {(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                                    Aksi
                                </th>
                            )}
                            </tr>
                        </thead>

                        <tbody>
                            {kategoriPengeluarans.data.length > 0 ? (
                                kategoriPengeluarans.data.map(
                                    (kategori, index) => (
                                        <tr
                                            key={kategori.id}
                                            className="border-b border-slate-100"
                                        >
                                            <td className="px-4 py-4">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-4 font-medium">
                                                {
                                                    kategori.nama_kategori
                                                }
                                            </td>
                                                {(isAdminKeuangan || isSuperAdmin) && (
                                            <td className="px-4 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/kategori-pengeluarans/${kategori.id}/edit`}
                                                        className="
                                                            rounded-lg
                                                            bg-amber-100
                                                            p-2
                                                            text-amber-600
                                                            hover:bg-amber-200
                                                        "
                                                    >
                                                        <Pencil
                                                            size={16}
                                                        />
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                kategori.id
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
                                                        <Trash2
                                                            size={16}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                                )}
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        Data kategori tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end gap-2">
                    {kategoriPengeluarans.links.map(
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