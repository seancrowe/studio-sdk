import { EditorAPI } from '../../types/CommonTypes';
import { ParagraphStyle, ParagraphStyleUpdate } from '../../types/ParagraphStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The ParagraphStyleController is responsible for all communication regarding paragraph styles.
 * Methods inside this controller can be called by `window.SDK.paragraphStyle.{method-name}`
 */
export class ParagraphStyleController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * This method returns the list of paragraph styles
     * @returns
     */
    getParagraphStyles = async () => {
        const res = await this.#editorAPI;
        return res.getParagraphStyles().then((result) => getEditorResponseData<ParagraphStyle[]>(result));
    };

    /**
     * This method returns a paragraph style by id
     * @param paragraphStyleId The ID of a specific paragraph style
     * @returns
     */
    getParagraphStyleById = async (paragraphStyleId: string) => {
        const res = await this.#editorAPI;
        return res
            .getParagraphStyleById(paragraphStyleId)
            .then((result) => getEditorResponseData<ParagraphStyle>(result));
    };

    /**
     * This method create a new paragraph style
     * @returns the new created paragraph style id
     */
    createParagraphStyle = async () => {
        const res = await this.#editorAPI;
        return res.createParagraphStyle().then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method duplicates a paragraph style
     * @param paragraphStyleId The ID of a specific paragraph style
     * @returns the new paragraph style id
     */
    duplicateParagraphStyle = async (paragraphStyleId: string) => {
        const res = await this.#editorAPI;
        return res.duplicateParagraphStyle(paragraphStyleId).then((result) => getEditorResponseData<string>(result));
    };

    /**
     * This method updates a paragraph style
     * @param id The ID of a specific paragraph style
     * @param paragraphStyle The new paragraph style properties
     * @returns
     */
    updateParagraphStyle = async (id: string, paragraphStyle: ParagraphStyleUpdate) => {
        const res = await this.#editorAPI;
        return res
            .updateParagraphStyle(id, JSON.stringify(paragraphStyle))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method renames a paragraph style
     * @param id The ID of a specific paragraph style
     * @param name The new name of the paragraph style
     * @returns
     */
    renameParagraphStyle = async (id: string, name: string) => {
        const res = await this.#editorAPI;
        return res.renameParagraphStyle(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method removes a paragraph style
     * @param id The ID of a specific paragraph style
     * @returns
     */
    removeParagraphStyle = async (id: string) => {
        const res = await this.#editorAPI;
        return res.removeParagraphStyle(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of paragraph styles
     * @param order The position of the paragraph styles
     * @param paragraphStyleIds The list of paragraph styles ids
     * @returns
     */
    moveParagraphStyles = async (order: number, paragraphStyleIds: string[]) => {
        const res = await this.#editorAPI;
        return res.moveParagraphStyles(order, paragraphStyleIds).then((result) => getEditorResponseData<null>(result));
    };
}