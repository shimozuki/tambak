import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface Pengeluaran {
    id: number;
    tanggal: string;
    jumlah: number;
    keterangan: string | null;

    kategori: {
        id: number;
        nama_kategori: string;
    };

    kolam: {
        id: number;
        nama_kolam: string;
    } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    pengeluarans: {
        data: Pengeluaran[];
        links: PaginationLink[];
    };

    filters: {
        search?: string;
    };
}

export default function PengeluaranIndex({
    pengeluarans,
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
            text: 'Data pengeluaran akan dihapus.',
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
                router.delete(`/pengeluarans/${id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
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
            <Head title="Pengeluaran" />

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Data Pengeluaran
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Kelola transaksi pengeluaran tambak.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/pengeluarans/create"
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            bg-[#0D9488]
                            px-6
                            py-3
                            font-bold
                            text-white
                            hover:bg-[#0F766E]
                        "
                    >
                        <Plus size={18} />
                        Tambah Pengeluaran
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
                                    '/pengeluarans',
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
                                    Kategori
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Kolam
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                                    Jumlah
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                                    Keterangan
                                </th>
{(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                                    Aksi
                                </th>
)}
                            </tr>
                        </thead>

                        <tbody>
                            {pengeluarans.data.length > 0 ? (
                                pengeluarans.data.map(
                                    (pengeluaran) => (
                                        <tr
                                            key={pengeluaran.id}
                                            className="border-b border-slate-100"
                                        >
                                            <td className="px-4 py-4">
                                                {new Date(
                                                    pengeluaran.tanggal
                                                ).toLocaleDateString(
                                                    'id-ID'
                                                )}
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    pengeluaran.kategori
                                                        ?.nama_kategori
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                {pengeluaran.kolam
                                                    ?.nama_kolam ??
                                                    '-'}
                                            </td>

                                            <td className="px-4 py-4 text-right font-semibold text-green-600">
                                                {formatRupiah(
                                                    pengeluaran.jumlah
                                                )}
                                            </td>

                                            <td className="px-4 py-4">
                                                {pengeluaran.keterangan ??
                                                    '-'}
                                            </td>
{(isAdminKeuangan || isSuperAdmin) && (
                                            <td className="px-4 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/pengeluarans/${pengeluaran.id}/edit`}
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
                                                                pengeluaran.id
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
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        Data pengeluaran belum tersedia
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end gap-2">
                    {pengeluarans.links.map((link, index) => (
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