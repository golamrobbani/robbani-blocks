import { registerBlockType } from "@wordpress/blocks";
const { omit } = lodash;

export {
	generateBackgroundAttributes,
	generateBackgroundControlStyles,
} from "./backgroundHelpers";
export {
	generateBorderShadowAttributes,
	generateBorderShadowStyles,
} from "./borderShadowHelpers";
export {
	generateDimensionsAttributes,
	generateDimensionsControlStyles,
} from "./dimensionHelpers";
export { getButtonClasses, getFlipTransform } from "./flipboxHelpers";
export {
	duplicateBlockIdFix,
	mimmikCssForPreviewBtnClick,
	mimmikCssForResBtns,
	mimmikCssOnPreviewBtnClickWhileBlockSelected,
} from "./funcsForUseEffect";
export {
	handleDesktopBtnClick,
	handleMobileBtnClick,
	handleTabBtnClick,
} from "./handlingPreviewBtnsHelpers";
export {
	generateRandomNumber,
	hardMinifyCssStrings,
	isCssExists,
	softMinifyCssStrings,
	textInsideForEdit,
} from "./miniHelperFuncs";
export {
	generateResponsiveAlignmentAttributes,
	generateResponsiveAlignmentStyles,
} from "./responsiveAlignmentHelpers";
export {
	generateResponsiveRangeAttributes,
	generateResponsiveRangeStyles,
} from "./responsiveRangeHelpers";
export {
	generateTypographyAttributes,
	generateTypographyStyles,
} from "./typoHelpers";

export const ebConditionalRegisterBlockType = (metadata, settings) => {
	const { name } = metadata;
	if (EssentialBlocksLocalize.eb_wp_version >= 5.8) {
		registerBlockType({ name, ...metadata }, settings);
	} else {
		registerBlockType(`${name}`, {
			...omit(metadata, ["name"]),
			...settings,
		});
	}
};
