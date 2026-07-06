import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Role {
    id: number;
    name: string;
}

interface Props {
    roles: Role[];
}

export default function CreateUser({
    roles,
}: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const submit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        post('/users');
    };

    return (
        <AppLayout>
            <Head title="Tambah User" />

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Tambah User
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Tambahkan akun pengguna baru.
                        </p>
                    </div>

                    <Link
                        href="/users"
                        className="
                            flex items-center gap-2
                            rounded-full
                            border border-slate-200
                            px-5 py-3
                            text-slate-700
                            hover:bg-slate-50
                        "
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </Link>

                </div>

                <form onSubmit={submit}>

                    <div className="grid gap-6">

                        {/* Nama */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Nama
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData(
                                        'name',
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            />

                            {errors.name && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </div>
                            )}

                        </div>

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData(
                                        'email',
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            />

                            {errors.email && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </div>
                            )}

                        </div>

                        {/* Password */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData(
                                        'password',
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            />

                            {errors.password && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </div>
                            )}

                        </div>

                        {/* Role */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Role
                            </label>

                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData(
                                        'role',
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    px-4 py-3
                                "
                            >
                                <option value="">
                                    Pilih Role
                                </option>

                                {roles.map(
                                    (role) => (
                                        <option
                                            key={
                                                role.id
                                            }
                                            value={
                                                role.name
                                            }
                                        >
                                            {
                                                role.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.role && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.role}
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-end">

                        <button
                            type="submit"
                            disabled={
                                processing
                            }
                            className="
                                flex items-center gap-2
                                rounded-full
                                bg-[#0D9488]
                                px-6 py-3
                                font-semibold
                                text-white
                                hover:bg-[#0F766E]
                            "
                        >
                            <Save size={18} />
                            Simpan
                        </button>

                    </div>

                </form>

            </div>
        </AppLayout>
    );
}