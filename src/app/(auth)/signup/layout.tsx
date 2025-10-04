const SignupLayout = ({ children }: { children: React.ReactNode }) => {
	const icons = ["📊", "📈", "📉", "🔗", "📊", "📈", "📉", "🔗", "📧"];
	return (
		<div className="bg-[#fff] h-screen flex p-4 2xl:p-8">
			<div className="w-full lg:w-[40%] lg:h-full lg:overflow-auto">{children}</div>
			<div className="hidden flex-1 lg:flex items-center justify-center bg-gradient-to-b from-[#20012f] to-[#f5b2e9] border-6 border-[#20012f] rounded-4xl text-white">
				<div className="w-3/4 text-center">
					<span className="block h-[2px] w-[300px] bg-[#fff] mx-auto mb-8" />
					<p className="text-3xl font-semibold mb-[4px]">
						Seamless collaboration
					</p>
					<p>Get the features you need to sync with your team</p>

					<div className="overflow-hidden h-[270px] relative flex items-center justify-center">
						{/* Center Circle */}
						<div className="size-20 mt-40 rounded-full bg-[#B79785] flex items-center justify-center shadow-xl z-10">
							<span className="text-4xl text-white">🧑‍🤝‍🧑</span>
						</div>

						{/* Orbit Container */}
						<div className="absolute mt-75 w-[600px] h-[300px] animate-[spin_20s_linear_infinite]">
							{icons.map((icon, index) => {
								const angle = (index / icons.length) * 360;
								return (
									<div
										key={index}
										className="absolute w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
										style={{
											transform: `rotate(${angle}deg) translate(190px) rotate(-${angle}deg)`,
											top: "50%",
											left: "50%",
											margin: "-32px",
										}}
									>
										<span className="text-2xl">{icon}</span>
									</div>
								);
							})}
						</div>
						{/* Bottom Fade */}
						<div className="max-2xl:hidden absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#b578b5] via-[#b578b5]/5 to-transparent pointer-events-none" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupLayout;
