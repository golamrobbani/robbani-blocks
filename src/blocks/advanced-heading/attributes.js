import {
	SEPARATOR_LINE_SIZE
} from "./constants/constants";
import * as typographyObjs from "./constants/typographyPrefixConstants";
const {
	generateResponsiveRangeAttributes,
	generateTypographyAttributes,
} = window.RBControls;

const attributes = {
	resOption: {
		type: "string",
		default: "Desktop",
	},

	blockId: {
		type: 'string'
	},

	blockRoot: {
		type: "string",
		default: "robbani_block",
	},

	blockMeta: {
		type: "object",
	},


	titleText: {
		type: "string",
		default: "Hello text"
	},
	ahColor: {
		type: "string",
	},
	ahBgColor: {
		type: "string",
	},
	// range controller Separator Line Border Size
	...generateResponsiveRangeAttributes(SEPARATOR_LINE_SIZE, {
		defaultRange: 4,
	}),
	// typography attributes ⬇
	...generateTypographyAttributes(Object.values(typographyObjs)),
}

export default attributes;
