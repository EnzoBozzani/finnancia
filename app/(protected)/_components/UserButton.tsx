'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ExitIcon } from '@radix-ui/react-icons';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface UserButtonProps {
	user: User;
}

export const UserButton = ({ user }: UserButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);

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
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => setIsOpen(false)}>
						<Link href={'/billing'}>Assinatura</Link>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsOpen(false)}>
						<Link href={'/settings'}>Configurações</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onClick={() => signOut()}
				>
					Sair
					<ExitIcon className='ms-2 w-4 h-4' />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
