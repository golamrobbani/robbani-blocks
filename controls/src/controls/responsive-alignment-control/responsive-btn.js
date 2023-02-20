import { dispatch } from "@wordpress/data";

import {
	handleDesktopBtnClick,
	handleMobileBtnClick,
	handleTabBtnClick,
} from "../../helpers";

function WithResBtns({
	children,
	resRequiredProps,
	label,
	controlName,
	onReset,
}) {
	const { setAttributes, resOption, objAttributes } = resRequiredProps;

	onReset = () => {
		resOption == "Desktop"
			? setAttributes({
					[`${controlName}Alignment`]:
						objAttributes[`${controlName}Alignment`].default,
			  })
			: "";
		resOption == "Tablet"
			? setAttributes({
					[`TAB${controlName}Alignment`]:
						objAttributes[`TAB${controlName}Alignment`].default,
			  })
			: "";
		resOption == "Mobile"
			? setAttributes({
					[`MOB${controlName}Alignment`]:
						objAttributes[`MOB${controlName}Alignment`].default,
			  })
			: "";
	};

	return (
		<div className="responsive-btn-wrapper">
			<div className="responsive-btn">
				<span className="responsive-btn-label">{label}</span>

				<span
					onClick={() =>
						handleDesktopBtnClick({
							setPreviewDeviceType:
								dispatch("core/edit-post").__experimentalSetPreviewDeviceType,
							setAttributes,
						})
					}
					className={`rb-responsive-button dashicons dashicons-desktop  ${
						resOption === "Desktop" ? "active" : " "
					}`}
				></span>

				<span
					onClick={() =>
						handleTabBtnClick({
							setPreviewDeviceType:
								dispatch("core/edit-post").__experimentalSetPreviewDeviceType,
							setAttributes,
						})
					}
					className={`rb-responsive-button dashicons dashicons-tablet ${
						resOption === "Tablet" ? "active" : " "
					}`}
				></span>

				<span
					onClick={() =>
						handleMobileBtnClick({
							setPreviewDeviceType:
								dispatch("core/edit-post").__experimentalSetPreviewDeviceType,
							setAttributes,
						})
					}
					className={`rb-responsive-button dashicons dashicons-smartphone ${
						resOption === "Mobile" ? "active" : " "
					}`}
				></span>
			</div>

			<div className="rb-component-wrapper">
				{children}
				<button className="rb-reset-btn" onClick={onReset}>
					<span className="dashicon dashicons dashicons-image-rotate"></span>
				</button>
			</div>
		</div>
	);
}

export default WithResBtns;
