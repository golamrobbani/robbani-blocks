import { Tooltip } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import WithResBtns from "./responsive-btn";
function ResponsiveAlignmentControl({
	baseLabel,
	controlName,
	resRequiredProps,
}) {
	const { attributes, setAttributes, resOption, alignOptions } =
		resRequiredProps;

	const {
		[`${controlName}Alignment`]: desktopAlignment,
		[`TAB${controlName}Alignment`]: tabletAlignment,
		[`MOB${controlName}Alignment`]: mobileAlignment,
	} = attributes;

	const defaultAlign =
		alignOptions && Array.isArray(alignOptions)
			? alignOptions
			: [
					{ label: "Left", value: "left" },
					{ label: "Center", value: "center" },
					{ label: "Right", value: "right" },
			  ];

	const setSettings = (controlName, val) => {
		setAttributes({ [controlName]: val });
	};

	return (
		<div className="responsive-alignment-control-wrapper">
			{resOption == "Desktop" && (
				<WithResBtns
					label={baseLabel}
					resRequiredProps={resRequiredProps}
					controlName={controlName}
				>
					{defaultAlign.map((alignItem, index) => {
						return (
							<button
								onClick={() =>
									setSettings([`${controlName}Alignment`], alignItem.value)
								}
								className={`rb-button ${
									desktopAlignment == alignItem.value ? "active" : ""
								}`}
								key={index}
							>
								<Tooltip text={alignItem.label}>
									<span>{alignItem.label}</span>
								</Tooltip>
							</button>
						);
					})}
					<h2>desktop</h2>
				</WithResBtns>
			)}

			{resOption == "Tablet" && (
				<WithResBtns
					label={baseLabel}
					resRequiredProps={resRequiredProps}
					controlName={controlName}
				>
					{defaultAlign.map((alignItem, index) => {
						return (
							<button
								onClick={() =>
									setSettings([`TAB${controlName}Alignment`], alignItem.value)
								}
								className={`rb-button ${
									tabletAlignment == alignItem.value ? "active" : ""
								}`}
								key={index}
							>
								<Tooltip text={__(alignItem.label, "robbani-blocks")}>
									<span>{__(alignItem.label, "robbani-blocks")}</span>
								</Tooltip>
							</button>
						);
					})}
					<h2>Tablet</h2>
				</WithResBtns>
			)}

			{resOption == "Mobile" && (
				<WithResBtns
					label={baseLabel}
					resRequiredProps={resRequiredProps}
					controlName={controlName}
				>
					{defaultAlign.map((alignItem, index) => {
						return (
							<button
								onClick={() =>
									setSettings([`MOB${controlName}Alignment`], alignItem.value)
								}
								className={`rb-button ${
									mobileAlignment == alignItem.value ? "active" : ""
								}`}
								key={index}
							>
								<Tooltip text={__(alignItem.label, "robbani-blocks")}>
									<span>{__(alignItem.label, "robbani-blocks")}</span>
								</Tooltip>
							</button>
						);
					})}
					<h2>Mobile</h2>
				</WithResBtns>
			)}
		</div>
	);
}

export default ResponsiveAlignmentControl;
