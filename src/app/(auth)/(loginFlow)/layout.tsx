const LoginRoutesLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="bg-gradient-to-b from-[#dda0f3] to-[#ffffff] py-[40px] max-lg:px-6 min-h-screen flex items-center justify-center">
			{children}
		</div>
	);
};

export default LoginRoutesLayout;
