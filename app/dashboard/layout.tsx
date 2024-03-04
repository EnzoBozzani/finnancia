import { Sidebar } from './_components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex-1'>
			<Sidebar />
			{children}
		</div>
	);
};

export default DashboardLayout;
