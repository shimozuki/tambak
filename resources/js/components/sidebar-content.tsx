import { dashboard } from '@/routes';
import { edit } from '@/routes/profile';
import { Link, usePage, router } from '@inertiajs/react';
import {
ChevronLeft,
ChevronRight,
Home,
Fish,
Package,
Wallet,
Landmark,
FileText,
DollarSign,
Settings,
Users,
UserCheck,
Tags,
LogOut,
} from 'lucide-react';
import { useState } from 'react';
import AppLogo from './app-logo';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    href?: string;
    isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    label,
    active,
    href,
    isCollapsed,
}) => {
    const content = (
        <span
            className={`flex w-full items-center gap-3 rounded-xl py-3 transition-all duration-200 ${active ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0D9488]'} ${isCollapsed ? 'justify-center px-2' : 'px-4'}`}
        >
            {icon}
            {!isCollapsed && <span className="font-medium">{label}</span>}
        </span>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="block"
                title={isCollapsed ? label : ''}
            >
                {content}
            </Link>
        );
    }

    return (
        <button className="w-full text-left" title={isCollapsed ? label : ''}>
            {content}
        </button>
    );
};

export function SidebarContent({
    isCollapsed = false,
    onToggleCollapse,
    isMobile = false,
}: {
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
    isMobile?: boolean;
}) {
    const { url, props } = usePage<any>();

    const auth = props.auth;
    const [isManageUserOpen, setIsManageUserOpen] = useState(false);

    const isActive = (path: string) => url === path || url.startsWith(path);

    const roles = auth.user.roles ?? [];

    const isSuperAdmin =
        roles.includes('super-admin');

    const isAdminKeuangan =
        roles.includes('admin-keuangan');

    return (
        <div className="relative flex h-full flex-col">
            {/* Toggle Button - Desktop Only */}
            {!isMobile && onToggleCollapse && (
                <button
                    onClick={onToggleCollapse}
                    className="absolute top-9 -right-3 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-md hover:text-[#0D9488]"
                >
                    {isCollapsed ? (
                        <ChevronRight size={14} />
                    ) : (
                        <ChevronLeft size={14} />
                    )}
                </button>
            )}

            {/* Scrollable Content */}
            <div className="scrollbar-hide flex-1 overflow-y-auto py-8">
                {/* Logo Area */}
                <div
                    className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'pl-10'} pr-4 pb-8 transition-all`}
                >
                    <Link
                        href={dashboard()}
                        className="flex items-center gap-2 text-xl font-bold text-gray-800"
                    >
                        {isCollapsed ? (
                            <div className="h-10 w-10 overflow-hidden">
                                <AppLogo />
                            </div>
                        ) : (
                            <AppLogo />
                        )}
                    </Link>
                </div>

                {/* Main Menu */}
                <div
                    className={`transition-all ${
                        isCollapsed ? 'px-2' : 'px-4 sm:px-8'
                    }`}
                >
                    {!isCollapsed && (
                        <h3 className="mb-4 pl-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Master Data
                        </h3>
                    )}


                <nav className="space-y-1">
                    <NavItem
                        icon={<Home size={20} />}
                        label="Dashboard"
                        href={dashboard().url}
                        isCollapsed={isCollapsed}
                        active={isActive(dashboard().url)}
                    />

                    <NavItem
                        icon={<Fish size={20} />}
                        label="Kolam Tambak"
                        href="/kolams"
                        isCollapsed={isCollapsed}
                        active={isActive('/kolams')}
                    />
                     <NavItem
            icon={<Tags size={20} />}
            label="Kategori Pengeluaran"
            href="/kategori-pengeluarans"
            isCollapsed={isCollapsed}
            active={isActive('/kategori-pengeluarans')}
        />

         {isSuperAdmin && (
        <NavItem
            icon={<Users size={20} />}
            label="Kelola User"
            href="/users"
            isCollapsed={isCollapsed}
            active={isActive('/users')}
        />
    )}
                </nav>


                </div>


                {/* Account Settings */}
                <div
    className={`mt-8 ${
        isCollapsed ? 'px-2' : 'px-4 sm:px-8'
    }`}
>
    {!isCollapsed && (
        <h3 className="mb-4 pl-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Transaksi
        </h3>
    )}


<nav className="space-y-1">
    <NavItem
        icon={<Package size={20} />}
        label="Tebar Benur"
        href="/benurs"
        isCollapsed={isCollapsed}
        active={isActive('/benurs')}
    />

    <NavItem
    icon={<Fish size={20} />}
    label="Stok Udang"
    href="/stok-udang"
    isCollapsed={isCollapsed}
    active={isActive('/stok-udang')}
/>

    <NavItem
        icon={<Wallet size={20} />}
        label="Pengeluaran"
        href="/pengeluarans"
        isCollapsed={isCollapsed}
        active={isActive('/pengeluarans')}
    />

    <NavItem
        icon={<DollarSign size={20} />}
        label="Penjualan"
        href="/penjualans"
        isCollapsed={isCollapsed}
        active={isActive('/penjualans')}
    />

    <NavItem
        icon={<Landmark size={20} />}
        label="Panen"
        href="/pemasukans"
        isCollapsed={isCollapsed}
        active={isActive('/pemasukans')}
    />
    
</nav>

<nav className="space-y-1"> <NavItem icon={<Fish size={20} />} label="Aset Biologis" href="/aset-biologis" isCollapsed={isCollapsed} active={isActive('/aset-biologis')} /> </nav>


</div>
<div
    className={`mt-8 ${
        isCollapsed ? 'px-2' : 'px-4 sm:px-8'
    }`}
>
    {!isCollapsed && (
        <h3 className="mb-4 pl-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Laporan
        </h3>
    )}


<nav className="space-y-1">
    <NavItem
    icon={<FileText size={20} />}
    label="Laporan Keuangan"
    href="/laporan"
    isCollapsed={isCollapsed}
    active={url === '/laporan'}
/>
    <NavItem
    icon={<Landmark size={20} />}
    label="Perubahan Nilai Wajar"
    href="/laporan/perubahan-nilai-wajar"
    isCollapsed={isCollapsed}
    active={url.startsWith('/laporan/perubahan-nilai-wajar')}
/>
</nav>


</div>



            </div>
            <div
    className={`mt-auto p-4 ${
        isCollapsed ? 'px-2' : 'px-4 sm:px-6'
    }`}
>
    <button
        onClick={() => router.post('/logout')}
        className="
            flex
            w-full
            items-center
            justify-between
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-4
            transition-all
            hover:bg-slate-100
        "
    >
        <div className="flex items-center gap-3">
            <div
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    font-bold
                    text-teal-600
                    shadow-sm
                "
            >
                {auth.user.name.charAt(0).toUpperCase()}
            </div>


        {!isCollapsed && (
            <div className="text-left">
                <div className="font-semibold text-slate-900">
                    {auth.user.name}
                </div>

                <div className="text-xs text-slate-400 uppercase">
                     {auth.user.roles?.[0]?.replace('-', ' ')}
                </div>
            </div>
        )}
    </div>

    {!isCollapsed && (
        <LogOut
            size={20}
            className="text-slate-400"
        />
    )}
</button>

</div>
        </div>
    );
}
