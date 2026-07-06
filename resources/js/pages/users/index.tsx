import AppLayout from '@/layouts/app-layout';
import {
    Head,
    Link,
    router,
    usePage,
} from '@inertiajs/react';

import {
    Pencil,
    Plus,
    Search,
    Trash2,
    Users,
} from 'lucide-react';

import { useEffect } from 'react';

import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface User {
    id: number;
    name: string;
    email: string;

    roles: {
        id: number;
        name: string;
    }[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    users: {
        data: User[];
        links: PaginationLink[];
    };

    filters: {
        search?: string;
    };
}

export default function UserIndex({
    users,
    filters,
}: Props) {
    const { flash } =
        usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(
                flash.success
            );
        }

        if (flash?.error) {
            toast.error(
                flash.error
            );
        }
    }, [flash]);

    const handleDelete = (
        id: number
    ) => {
        Swal.fire({
            title: 'Hapus User?',
            text: 'Data user akan dihapus.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText:
                'Ya, Hapus',
            cancelButtonText:
                'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    `/users/${id}`
                );
            }
        });
    };

    const handleSearch = (
        value: string
    ) => {
        router.get(
            '/users',
            {
                search: value,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
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
            <Head title="Kelola User" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Kelola User
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Kelola akun pengguna
                            aplikasi.
                        </p>
                    </div>
{(isAdminKeuangan || isSuperAdmin) && (
                    <Link
                        href="/users/create"
                        className="
                            flex items-center gap-2
                            rounded-xl
                            bg-[#0D9488]
                            px-5 py-3
                            text-white
                        "
                    >
                        <Plus size={18} />
                        Tambah User
                    </Link>
)}

                </div>

                {/* Summary */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-4">

                        <Users
                            size={40}
                            className="text-teal-600"
                        />

                        <div>

                            <div className="text-sm text-slate-500">
                                Total User
                            </div>

                            <div className="text-3xl font-bold text-teal-600">
                                {users.data.length}
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
                            placeholder="Cari user..."
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
                                    Nama
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Role
                                </th>
{(isAdminKeuangan || isSuperAdmin) && (
                                <th className="px-6 py-4 text-center">
                                    Aksi
                                </th>
)}

                            </tr>

                        </thead>

                        <tbody>

                            {users.data.map(
                                (user) => (
                                    <tr
                                        key={
                                            user.id
                                        }
                                        className="border-b"
                                    >

                                        <td className="px-6 py-4 font-medium">
                                            {
                                                user.name
                                            }
                                        </td>

                                        <td className="px-6 py-4">
                                            {
                                                user.email
                                            }
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className="
                                                    rounded-full
                                                    bg-teal-100
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-semibold
                                                    text-teal-700
                                                "
                                            >
                                                {
                                                    user
                                                        .roles?.[0]
                                                        ?.name ??
                                                    '-'
                                                }
                                            </span>

                                        </td>
{(isAdminKeuangan || isSuperAdmin) && (
                                        <td className="px-6 py-4">

                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    href={`/users/${user.id}/edit`}
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
                                                            user.id
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
                    <div className="flex items-center justify-center gap-2 p-6">
    {users.links.map(
        (link, index) => (
            <Link
                key={index}
                href={link.url ?? '#'}
                dangerouslySetInnerHTML={{
                    __html: link.label,
                }}
                className={`
                    rounded-xl px-4 py-2 text-sm
                    ${
                        link.active
                            ? 'bg-teal-600 text-white'
                            : 'bg-white border border-slate-200'
                    }
                    ${
                        !link.url
                            ? 'pointer-events-none opacity-50'
                            : ''
                    }
                `}
            />
        )
    )}
</div>

                </div>

            </div>
        </AppLayout>
    );
}