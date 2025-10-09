import {
	DateRange,
	DayPicker,
	Mode,
	OnSelectHandler,
	Matcher,
} from "react-day-picker";

interface IDatepicker {
	selectedDate?: Date;
	setSelectedDate?: (date: Date) => void;
	mode: Mode;
	selectedRange?: DateRange;
	onSelectRange?: OnSelectHandler<DateRange>;
	disabled?: Matcher | Matcher[]
}
const Datepicker = ({
	selectedDate,
	setSelectedDate,
	mode,
	selectedRange,
	onSelectRange,
	disabled,
}: IDatepicker) => {
	if (mode === "range") {
		return (
			<DayPicker
				required
				disabled={{ before: new Date() }}
				mode={mode}
				navLayout="around"
				selected={selectedRange}
				onSelect={onSelectRange}
			/>
		);
	}

	if (mode === "multiple") {
		return null;
	}

	return (
		<DayPicker
			disabled={disabled}
			required
			mode={mode}
			navLayout="around"
			selected={selectedDate}
			onSelect={setSelectedDate}
		/>
	);
};

export default Datepicker;
