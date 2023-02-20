import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	SEPARATOR_LINE_SIZE,
	UNIT_TYPES,
	TEXT_ALIGNMENT,
	ADV_HEADING_BG
} from "./constants/constants";

import { TITLE_TYPOGRAPHY, SUBTITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";

import objAttributes from './attributes';

const {
	ResponsiveRangeController,
	ResponsiveAlignmentControl,
	TypographyDropdown,
	BackgroundControl,
	ResponsiveDimensionsControl
} = window.RBControls;

function Inspector({ attributes, setAttributes }) {
	const { resOption, titleText, ahColor, ahBgColor } = attributes;

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	return (
		<InspectorControls key="controls">
			<PanelBody title={__("general", "robbani-blocks")} initialOpen={true}>

				<BackgroundControl
					controlName={ADV_HEADING_BG}
					resRequiredProps={resRequiredProps}
				/>

				<ResponsiveAlignmentControl
					baseLabel={__("Alignmet Control", "robbani-blocks")}
					controlName={TEXT_ALIGNMENT}
					resRequiredProps={resRequiredProps}
				/>

				<TypographyDropdown
					baseLabel={__("Typography", "robbani-blocks")}
					typographyPrefixConstant={TITLE_TYPOGRAPHY}
					resRequiredProps={resRequiredProps}
				/>

				<ResponsiveAlignmentControl
					baseLabel={__("Alignmet Control", "robbani-blocks")}
					controlName={SEPARATOR_LINE_SIZE}
					resRequiredProps={resRequiredProps}
				/>

				<ResponsiveRangeController
					baseLabel={__("Border", "robbani-blocks")}
					controlName={SEPARATOR_LINE_SIZE}
					resRequiredProps={resRequiredProps}
					units={UNIT_TYPES}
					min={0}
					max={100}
					step={1}
				/>

				<PanelColorSettings
					initialOpen={false}
					className={"rb-color-control"}
					title={__("Color", "robbani-blocks")}
					colorSettings={[
						{
							value: ahColor,
							onChange: (newColor) => setAttributes({ ahColor: newColor }),
							label: __("Text Color", "robbani-blocks"),
						},
						{
							value: ahBgColor,
							onChange: (newColor) => setAttributes({ ahBgColor: newColor }),
							label: __("Background Color", "robbani-blocks"),
						},
					]}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
