import { AddExpenseModal } from '@/components/AddExpenseModal';
import { Sidebar } from './_components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex-1'>
			<Sidebar />
			<AddExpenseModal />
			{children}
		</div>
	);
};

export default DashboardLayout;
