export const generateResponsiveAlignmentAttributes = (
	controlName,
	defaults = {}
) => {
	const { defaultAlignment } = defaults;
	const desktop = defaultAlignment
		? {
				[`${controlName}Alignment`]: {
					type: "string",
					default: defaultAlignment,
				},
		  }
		: {
				[`${controlName}Alignment`]: {
					type: "string",
				},
		  };
	return {
		...desktop,
		[`TAB${controlName}Alignment`]: {
			type: "string",
		},
		[`MOB${controlName}Alignment`]: {
			type: "string",
		},
	};
};

export const generateResponsiveAlignmentStyles = ({
	controlName,
	property,
	attributes,
}) => {
	const {
		[`${controlName}Alignment`]: desktopAlignment,
		[`TAB${controlName}Alignment`]: tabletAlignment,
		[`MOB${controlName}Alignment`]: mobileAlignment,
	} = attributes;

	const alignmentStylesDesktop = desktopAlignment
		? property + ":" + desktopAlignment + ";"
		: "";
	const alignmentStylesTab = tabletAlignment
		? property + ":" + tabletAlignment + ";"
		: "";
	const alignmentStylesMobile = mobileAlignment
		? property + ":" + mobileAlignment + ";"
		: "";

	return {
		alignmentStylesDesktop,
		alignmentStylesTab,
		alignmentStylesMobile,
	};
};
