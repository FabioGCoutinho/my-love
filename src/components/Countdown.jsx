import { useEffect, useState } from "react";

const Countdown = ({ startDate }) => {
	const [timeElapsed, setTimeElapsed] = useState({});

	const unitLabels = {
		years: "Anos",
		months: "Meses",
		days: "Dias",
		hours: "Horas",
		minutes: "Minutos",
		seconds: "Segundos",
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const start = new Date(startDate);

			let years = now.getFullYear() - start.getFullYear();
			let months = now.getMonth() - start.getMonth();
			let days = now.getDate() - start.getDate();
			let hours = now.getHours() - start.getHours();
			let minutes = now.getMinutes() - start.getMinutes();
			let seconds = now.getSeconds() - start.getSeconds();

			if (seconds < 0) {
				seconds += 60;
				minutes--;
			}
			if (minutes < 0) {
				minutes += 60;
				hours--;
			}
			if (hours < 0) {
				hours += 24;
				days--;
			}
			if (days < 0) {
				const prevMonthLastDay = new Date(
					now.getFullYear(),
					now.getMonth(),
					0,
				).getDate();
				days += prevMonthLastDay;
				months--;
			}
			if (months < 0) {
				months += 12;
				years--;
			}

			setTimeElapsed({ years, months, days, hours, minutes, seconds });
		}, 1000);

		return () => clearInterval(interval);
	}, [startDate]);

	const format = (num) =>
		num !== undefined ? num.toString().padStart(2, "0") : "00";

	return (
		<div className="flex flex-wrap justify-center gap-4 text-center">
			{Object.entries(unitLabels).map(([unit, label]) => (
				<div
					key={unit}
					className="bg-gray-700 text-white p-4 rounded-lg shadow-lg min-w-[90px]"
				>
					<div className="text-4xl font-bold">{format(timeElapsed[unit])}</div>
					<div className="text-sm uppercase tracking-wider">{label}</div>
				</div>
			))}
		</div>
	);
};

export default Countdown;
