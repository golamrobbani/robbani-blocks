 
import { useBlockProps } from "@wordpress/block-editor";
 
 function Save({attributes}){
    const {
        blockId,
        titleText
    }=attributes;
    return(
        <div {...useBlockProps.save()}>
            <div className={`advanced-heading-block-wrapper ${blockId}`}>
                <h1>save {titleText}</h1>
            </div>
        </div>
    )
}
export default Save;