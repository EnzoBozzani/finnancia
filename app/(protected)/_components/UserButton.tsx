'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ExitIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

type UserButtonProps = {
	user: {
		id: string;
		name: string | null;
		email: string | null;
		emailVerified: Date | null;
		image: string | null;
		totalAmount: number;
		isInitialAmountSet: boolean;
		hasUsedFreeReport: boolean;
	};
	isActive: boolean;
};

export const UserButton = ({ user, isActive }: UserButtonProps) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const isDark = useIsDarkTheme();

	return (
		<div className='flex items-center gap-x-2'>
			<div
				role='button'
				onClick={() => {
					router.push('/plans');
				}}
				className='rounded-full bg-green-600 px-4 py-1 font-black text-xs sm:text-sm text-white'
			>
				{isActive ? 'PRO' : 'GRATUITO'}
			</div>
			<DropdownMenu
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DropdownMenuTrigger asChild>
					<button
						className={cn(
							'rounded-full border border-neutral-700',
							isDark ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-black'
						)}
					>
						<Image
							src={user.image || ''}
							alt='user image'
							height={40}
							width={40}
							className='rounded-full'
						/>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className={cn('w-56', isDark && 'bg-neutral-950 border-neutral-700 text-neutral-100')}
				>
					<DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
					<DropdownMenuSeparator className={cn(isDark && 'bg-neutral-700')} />
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => setIsOpen(false)}
							className={isDark ? 'focus:bg-neutral-800 focus:text-white' : ''}
						>
							<Link href={'/plans'}>Planos</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setIsOpen(false)}
							className={isDark ? 'focus:bg-neutral-800 focus:text-white' : ''}
						>
							<Link href={'/settings'}>Configurações</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator className={cn(isDark && 'bg-neutral-700')} />
					<DropdownMenuItem
						className={cn('cursor-pointer', isDark ? 'focus:bg-neutral-800 focus:text-white' : '')}
						onClick={() => signOut()}
					>
						Sair
						<ExitIcon className='ms-2 w-4 h-4' />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
