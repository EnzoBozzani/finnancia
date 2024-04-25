import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { EditFinanceSchema } from '@/schemas/EditFinanceSchema';
import { getUserTotalAmount } from '@/data/user';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Unauthorized!',
			},
			{ status: 401 }
		);
	}

	try {
		const financeToBeDeleted = await db.finance.findUnique({
			where: { id: params.id },
			select: { sheetId: true, amount: true, type: true },
		});

		if (!financeToBeDeleted) {
			return NextResponse.json(
				{
					error: 'Not found!',
				},
				{ status: 404 }
			);
		}

		const sheet = await db.sheet.findUnique({
			where: { id: financeToBeDeleted?.sheetId, userId: user.id },
			select: { id: true, totalAmount: true, financesCount: true },
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Not found!',
				},
				{ status: 404 }
			);
		}

		const userTotalAmount = await getUserTotalAmount(user.id);

		if (!userTotalAmount) {
			return NextResponse.json(
				{
					error: 'Not found!',
				},
				{ status: 404 }
			);
		}

		await db.finance.delete({
			where: { id: params.id, sheetId: sheet.id },
		});

		await db.sheet.update({
			where: { id: financeToBeDeleted.sheetId, userId: user.id },
			data: {
				totalAmount:
					financeToBeDeleted.type === 'PROFIT'
						? sheet.totalAmount - financeToBeDeleted.amount
						: sheet.totalAmount + financeToBeDeleted.amount,
				financesCount: sheet.financesCount - 1,
			},
		});

		await db.user.update({
			where: { id: user.id },
			data: {
				totalAmount:
					financeToBeDeleted.type === 'PROFIT'
						? userTotalAmount - financeToBeDeleted.amount
						: userTotalAmount + financeToBeDeleted.amount,
			},
		});

		return NextResponse.json({ success: 'Deletado com sucesso!' }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();

	const result = EditFinanceSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json(
			{
				error: 'Dados inválidos!',
			},
			{ status: 400 }
		);
	}

	const { title, date, amount, type } = result.data;

	if (!title && !date && !amount && !type) {
		return NextResponse.json(
			{
				error: 'Dados inválidos!',
			},
			{ status: 400 }
		);
	}

	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Unauthorized!',
			},
			{ status: 401 }
		);
	}

	const valuesToUpdate: {
		title?: string;
		date?: string;
		amount?: number;
		order?: number;
		type?: 'EXPENSE' | 'PROFIT';
	} = {};

	if (title) valuesToUpdate['title'] = title;
	if (date) valuesToUpdate['date'] = date;
	if (amount) valuesToUpdate['amount'] = amount;
	if (type) valuesToUpdate['type'] = type;

	try {
		const financeToBeEdited = await db.finance.findUnique({
			where: { id: params.id },
			select: { sheetId: true, amount: true, type: true },
		});

		if (!financeToBeEdited) {
			return NextResponse.json(
				{
					error: 'Not found',
				},
				{ status: 404 }
			);
		}

		const sheet = await db.sheet.findUnique({
			where: { id: financeToBeEdited.sheetId, userId: user.id },
			select: {
				id: true,
				totalAmount: true,
			},
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Not found',
				},
				{ status: 404 }
			);
		}

		const userTotalAmount = await getUserTotalAmount(user.id);

		if (!userTotalAmount) {
			return NextResponse.json(
				{
					error: 'Not found',
				},
				{ status: 404 }
			);
		}

		if (date) {
			const newOrder = date.split('/')[0];
			if (isNaN(Number(newOrder))) {
				return NextResponse.json(
					{
						error: 'Dados inválidos!',
					},
					{ status: 400 }
				);
			}
			valuesToUpdate['order'] = Number(newOrder);
		}

		await db.finance.update({
			where: { id: params.id, sheetId: sheet.id },
			data: {
				...valuesToUpdate,
			},
		});

		if (!amount && type && type !== financeToBeEdited.type) {
			await db.sheet.update({
				where: { id: financeToBeEdited.sheetId, userId: user.id },
				data: {
					totalAmount:
						type === 'PROFIT'
							? sheet.totalAmount + 2 * financeToBeEdited.amount
							: sheet.totalAmount - 2 * financeToBeEdited.amount,
				},
			});

			await db.user.update({
				where: { id: user.id },
				data: {
					totalAmount:
						type === 'PROFIT'
							? userTotalAmount + 2 * financeToBeEdited.amount
							: userTotalAmount - 2 * financeToBeEdited.amount,
				},
			});
		}

		if (amount) {
			if (type && type !== financeToBeEdited.type) {
				await db.sheet.update({
					where: { id: financeToBeEdited.sheetId, userId: user.id },
					data: {
						totalAmount:
							type === 'PROFIT'
								? sheet.totalAmount + financeToBeEdited.amount + amount
								: sheet.totalAmount - financeToBeEdited.amount - amount,
					},
				});

				await db.user.update({
					where: { id: user.id },
					data: {
						totalAmount:
							type === 'PROFIT'
								? userTotalAmount + financeToBeEdited.amount + amount
								: userTotalAmount - financeToBeEdited.amount - amount,
					},
				});
			} else {
				await db.sheet.update({
					where: { id: financeToBeEdited.sheetId, userId: user.id },
					data: {
						totalAmount:
							financeToBeEdited.type === 'PROFIT'
								? sheet.totalAmount - financeToBeEdited.amount + amount
								: sheet.totalAmount + financeToBeEdited.amount - amount,
					},
				});

				await db.user.update({
					where: { id: user.id },
					data: {
						totalAmount:
							financeToBeEdited.type === 'PROFIT'
								? userTotalAmount - financeToBeEdited.amount + amount
								: userTotalAmount + financeToBeEdited.amount - amount,
					},
				});
			}
		}

		return NextResponse.json(
			{
				success: 'Editado com sucesso!',
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
