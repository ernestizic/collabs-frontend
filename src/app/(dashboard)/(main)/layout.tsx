import MainHeader from "@/components/mainheader/MainHeader";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Sidebar />

			<div className="ml-[272px]">
        <MainHeader />
        <div className="mt-[72px]">
          {children}
        </div>
      </div>
		</div>
	);
};

export default DashboardLayout;
