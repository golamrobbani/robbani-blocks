import { useBlockProps } from "@wordpress/block-editor";
import { select } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import Inspector from "./inspector";

import {
	SEPARATOR_LINE_SIZE
} from "./constants/constants";

import {
	TITLE_TYPOGRAPHY,
	SUBTITLE_TYPOGRAPHY,
} from "./constants/typographyPrefixConstants";

const {
	HelloControl,
	softMinifyCssStrings,
	duplicateBlockIdFix,
	generateResponsiveRangeStyles,
	generateTypographyStyles,
} = window.RBControls;

function Edit(props) {
	const {
		attributes,
		setAttributes,
		isSelected,
		clientId
	} = props;

	const {
		resOption,
		blockId,
		blockMeta,
		ahColor,
		ahBgColor,
	} = attributes;

	const editorStoreForGettingPreivew =
		rb_style_handler.editor_type === "edit-site"
			? "core/edit-site"
			: "core/edit-post";

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
	useEffect(() => {
		const bodyClasses = document.body.className;
		setAttributes({
			resOption: select(
				editorStoreForGettingPreivew
			).__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for creating a unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "advanced-heading";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	//css style
	// responsive range controller Separator Line Border Size
	const {
		rangeStylesDesktop: separatorLineSizeDesktop,
		rangeStylesTab: separatorLineSizeTab,
		rangeStylesMobile: separatorLineSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: SEPARATOR_LINE_SIZE,
		property: "border-width",
		attributes,
	});

	// CSS/styling Codes Starts from Here
	const {
		typoStylesDesktop: titleTypographyDesktop,
		typoStylesTab: titleTypographyTab,
		typoStylesMobile: titleTypographyMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: TITLE_TYPOGRAPHY,
	});

	// style for Desktop
	const desktopStyles = `
        .${blockId}.advanced-heading-block-wrapper{
					${ahColor ? `color: ${ahColor};` : ""}
					${ahBgColor ? `background-color: ${ahBgColor};` : ""}
            ${separatorLineSizeDesktop};
            border-style:solid;
            border-color:red;
        }
				.${blockId}.advanced-heading-block-wrapper h1{
					${titleTypographyDesktop}
				}
    `;
	// style for tablet
	const tabStyles = `
        .${blockId}.advanced-heading-block-wrapper{
					${ahColor ? `color: ${ahColor};` : ""}
					${ahBgColor ? `background-color: ${ahBgColor};` : ""}
            ${separatorLineSizeTab};
            border-style:solid;
            border-color:red;

            ${titleTypographyTab}
        }
    `;

	//  style for mobile
	const mobileStyles = `
        .${blockId}.advanced-heading-block-wrapper{
					${ahColor ? `color: ${ahColor};` : ""}
					${ahBgColor ? `background-color: ${ahBgColor};` : ""}
            ${separatorLineSizeMobile};
            border-style:solid;
            border-color:red;
            ${titleTypographyMobile}
        }
    `;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`${desktopStyles}`);
	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`${tabStyles}`);
	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`${mobileStyles}`);

	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	return (
		<>
			{isSelected && (
				<>
					<Inspector attributes={attributes} setAttributes={setAttributes} />
				</>
			)}
			<div {...useBlockProps()}>
				<style>
					{`
                ${desktopAllStyles}

                /* mimmikcssStart */

            

                /* mimmikcssEnd */

                @media all and (max-width: 1024px) {	

                /* tabcssStart */			
                ${softMinifyCssStrings(tabAllStyles)}
                /* tabcssEnd */			
                
                }
                
                @media all and (max-width: 767px) {
                
                /* mobcssStart */			
                ${softMinifyCssStrings(mobileAllStyles)}
                /* mobcssEnd */			
                
                }
                `}
				</style>
				<div className={`advanced-heading-block-wrapper ${blockId}`}>
					<HelloControl />
					<h1>Edit {props.attributes.titleText}</h1>
				</div>
			</div>
		</>
	);
}

export default Edit;
