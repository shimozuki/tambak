import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface Pemasukan {
    id: number;
    tanggal_panen: string;
    berat_panen: number;
    size: number;
    harga_per_kg: number;
    total_pemasukan: number;

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
    pemasukans: {
        data: Pemasukan[];
        links: PaginationLink[];
    };

    filters: {
        search?: string;
    };
}

export default function PemasukanIndex({
    pemasukans,
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
            text: 'Data panen akan dihapus.',
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
                router.delete(`/pemasukans/${id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    const totalProduksi =
    pemasukans.data.reduce(
        (total, item) =>
            total + Number(item.berat_panen),
        0
    );

    const { auth } = usePage().props as any;

    const roles: string[] =
        auth.user.roles ?? [];

    const isAdminKeuangan =
        roles.includes('admin-keuangan');

    const isSuperAdmin =
        roles.includes('super-admin');

    return (
        <AppLayout>
            <Head title="Data Panen" />

            <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm text-slate-500">
                    Total Produksi Panen
                </h3>

                <div className="mt-2 text-3xl font-bold text-teal-600">
                    {totalProduksi.toLocaleString()} Kg
                </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Data Panen
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Kelola data hasil panen tambak.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/pemasukans/create"
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
                        Tambah Panen
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
                                    '/pemasukans',
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
                                    Berat (Kg)
                                </th>

                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                                    Size
                                </th>
{(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                                    Aksi
                                </th>
)}
                            </tr>
                        </thead>

                        <tbody>
                            {pemasukans.data.length > 0 ? (
                                pemasukans.data.map(
                                    (pemasukan) => (
                                        <tr
                                            key={pemasukan.id}
                                            className="border-b border-slate-100"
                                        >
                                            <td className="px-4 py-4">
                                                {new Date(
                                                    pemasukan.tanggal_panen
                                                ).toLocaleDateString(
                                                    'id-ID'
                                                )}
                                            </td>

                                            <td className="px-4 py-4">
                                                {
                                                    pemasukan.kolam
                                                        ?.nama_kolam
                                                }
                                            </td>

                                           <td className="px-6 py-4 text-right">
                                                {Number(
                                                    pemasukan.berat_panen
                                                ).toLocaleString()}
                                                {' '}Kg
                                            </td>

                                            <td className="px-4 py-4 text-center">
                                                {
                                                    pemasukan.size
                                                }
                                            </td>
{(isAdminKeuangan || isSuperAdmin) && (
                                            <td className="px-4 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/pemasukans/${pemasukan.id}/edit`}
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
                                                                pemasukan.id
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
                                        colSpan={7}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        Data panen belum tersedia
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end gap-2">
                    {pemasukans.links.map((link, index) => (
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