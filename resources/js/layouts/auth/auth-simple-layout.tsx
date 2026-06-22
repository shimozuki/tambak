import AppLogo from '@/components/app-logo';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
title?: string;
description?: string;
}

export default function AuthSimpleLayout({
children,
title,
description,
}: PropsWithChildren<AuthLayoutProps>) {
return ( <div className="flex min-h-screen items-center justify-center bg-white px-4"> <div className="w-full max-w-md"> <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100"> <div className="mb-8 text-center"> <Link href={home()}> <div className="mb-4 flex justify-center"> <AppLogo /> </div> </Link>

                    <h1 className="text-3xl font-bold text-slate-800">
                        {title}
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        {description}
                    </p>
                </div>

                {children}
            </div>
        </div>
    </div>
);
}
