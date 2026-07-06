import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Pencil,
    Plus,
    Search,
    Trash2,
    Wallet,
} from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface Penjualan {
    id: number;
    tanggal_penjualan: string;
    berat_kg: number;
    jumlah_penjualan: number;
    keterangan: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    penjualans: {
        data: Penjualan[];
        links: PaginationLink[];
    };

    filters: {
        search?: string;
    };
}

export default function PenjualanIndex({
    penjualans,
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
            text: 'Data penjualan akan dihapus.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    `/penjualans/${id}`
                );
            }
        });
    };

    const handleSearch = (
        value: string
    ) => {
        router.get(
            '/penjualans',
            {
                search: value,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const rupiah = (value: number) =>
        new Intl.NumberFormat(
            'id-ID',
            {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }
        ).format(value);

    const totalPenjualan =
        penjualans.data.reduce(
            (sum, item) =>
                sum +
                Number(
                    item.jumlah_penjualan
                ),
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
            <Head title="Penjualan" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Data Penjualan
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Kelola data
                            pemasukan hasil
                            penjualan udang.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/penjualans/create"
                        className="
                            flex items-center gap-2
                            rounded-xl
                            bg-[#0D9488]
                            px-5 py-3
                            text-white
                        "
                    >
                        <Plus size={18} />

                        Tambah
                    </Link>
)}

                </div>

                {/* Summary */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-4">

                        <Wallet
                            size={40}
                            className="text-green-600"
                        />
                        

                        <div>
                            <div className="text-sm text-slate-500">
                                Total Penjualan
                            </div>

                            <div className="text-3xl font-bold text-green-600">
                                {rupiah(
                                    totalPenjualan
                                )}
                            </div>
                        </div>

                    </div>

                </div>

                {/* Search */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <div className="relative max-w-md">

                        <Search
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type="text"
                            defaultValue={
                                filters.search
                            }
                            placeholder="Cari keterangan..."
                            onChange={(e) =>
                                handleSearch(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                py-3
                                pl-11
                                pr-4
                            "
                        />

                    </div>

                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="px-6 py-4 text-left">
                                    Tanggal
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Keterangan
                                </th>

                                <th className="px-6 py-4 text-right">
                                    Berat
                                </th>

                                <th className="px-6 py-4 text-right">
                                    Jumlah
                                </th>
{(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-6 py-4 text-center">
                                    Aksi
                                </th>
)}

                            </tr>

                        </thead>

                        <tbody>

                            {penjualans.data.map(
                                (
                                    item
                                ) => (
                                    <tr
                                        key={
                                            item.id
                                        }
                                        className="border-b"
                                    >
                                        <td className="px-6 py-4">
                                            {new Date(
                                                item.tanggal_penjualan
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </td>

                                        <td className="px-6 py-4">
                                            {item.keterangan ??
                                                '-'}
                                        </td>

                                        <td className="px-6 py-4 text-right font-semibold text-green-600">
                                            {item.berat_kg} kg
                                        </td>

                                        <td className="px-6 py-4 text-right font-semibold text-green-600">
                                            {rupiah(
                                                item.jumlah_penjualan
                                            )}
                                        </td>

{(isAdminKeuangan || isSuperAdmin) && (
                                        <td className="px-6 py-4">

                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    href={`/penjualans/${item.id}/edit`}
                                                    className="
                                                        rounded-lg
                                                        bg-amber-500
                                                        p-2
                                                        text-white
                                                    "
                                                >
                                                    <Pencil size={16} />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.id
                                                        )
                                                    }
                                                    className="
                                                        rounded-lg
                                                        bg-red-500
                                                        p-2
                                                        text-white
                                                    "
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </td>
)}
                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </AppLayout>
    );
}