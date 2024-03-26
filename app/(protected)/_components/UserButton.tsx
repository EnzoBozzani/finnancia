'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ExitIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

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

interface UserButtonProps {
	user: User;
}

export const UserButton = ({ user }: UserButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const isDark = useIsDarkTheme();

	return (
		<DropdownMenu
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DropdownMenuTrigger asChild>
				<button className='p-4'>
					<Image
						src={user.image || ''}
						alt='user image'
						height={40}
						width={40}
						className='rounded-full'
					/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('w-56', isDark ? 'bg-neutral-950 text-neutral-100' : '')}>
				<DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => setIsOpen(false)}
						className={isDark ? 'focus:bg-neutral-800 focus:text-white' : ''}
					>
						<Link href={'/billing'}>Assinatura</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setIsOpen(false)}
						className={isDark ? 'focus:bg-neutral-800 focus:text-white' : ''}
					>
						<Link href={'/settings'}>Configurações</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className={cn('cursor-pointer', isDark ? 'focus:bg-neutral-800 focus:text-white' : '')}
					onClick={() => signOut()}
				>
					Sair
					<ExitIcon className='ms-2 w-4 h-4' />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
