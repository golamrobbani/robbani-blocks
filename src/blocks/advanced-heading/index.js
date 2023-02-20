import { registerBlockType } from "@wordpress/blocks";
import { Dashicon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

//internal dependencies
import attributes from "./attributes";
import metadata from "./block.json";
import edit from "./edit";
import save from "./save";

registerBlockType(metadata, {
	keywords: [
		__("Heading", "robbani-blocks"),
        __("robbani blocks", "robbani-blocks")
	],
	icon: {
		src: <Dashicon icon="products" />
	},
	attributes,
	save,
	edit,
});