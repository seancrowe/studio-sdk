import type { EditorAPI, EditorRawAPI, EditorResponse, Id } from '../types/CommonTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { Layout } from '../types/LayoutTypes';
import { CallSender } from 'penpal';

/**
 * The LayoutController is responsible for all communication regarding Layouts.
 * Methods inside this controller can be called by `window.SDK.layout.{method-name}`
 */
export class LayoutController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;
    #blobAPI: EditorRawAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
        this.#blobAPI = editorAPI as CallSender as EditorRawAPI;
    }

    /**
     * This method returns the list of layouts
     * @returns list of all layouts
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res.getLayouts().then((result) => getEditorResponseData<Layout[]>(result));
    };

    /**
     * This method returns a layout by its id
     * @param id the id of a specific layout
     * @returns layout properties
     */
    getById = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.getLayoutById(id).then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method returns a layout by its name
     * @param name the name of a specific layout
     * @returns layout properties
     */
    getByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res.getLayoutByName(name).then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method returns the selected layout
     * @returns layout properties
     */
    getSelected = async () => {
        const res = await this.#editorAPI;
        return res.getSelectedLayout().then((result) => getEditorResponseData<Layout>(result));
    };

    /**
     * This method will remove a specific layout
     * @param id the id of a specific layout
     * @returns
     */
    remove = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.removeLayout(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will create a new child layout (a new layout is always child of a root / parent)
     * @param parentId the id of a specific layout, being the parent
     * @returns id of new layout
     */
    create = async (parentId: Id) => {
        const res = await this.#editorAPI;
        return res.addLayout(parentId).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method will update the name of a specific layout
     * @param id the id of a specific layout
     * @param name the new name that the layout should receive
     * @returns
     */
    rename = async (id: Id, name: string) => {
        const res = await this.#editorAPI;
        return res.renameLayout(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will select a specific layout
     * @param id the id of a specific layout
     * @returns
     */
    select = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.selectLayout(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will duplicate a specific layout
     * @param id the id of a specific layout
     * @returns id of specific layout
     */
    duplicate = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.duplicateLayout(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method will reset a specific layout to its original value
     * @param id the id of a specific layout
     * @returns
     */
    reset = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayout(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the height of the layout to a specific value
     * @param id the id of a specific layout
     * @param height the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setHeight = async (id: Id, height: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(height);
        if (calc === null || calc === Infinity) {
            return null;
        }
        return res
            .setLayoutHeight(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will set the width of the layout to a specific value
     * @param id the id of a specific layout
     * @param width the string value that will be calculated (f.e. 1+1 will result in 2) The notation is in pixels
     * @returns
     */
    setWidth = async (id: Id, width: string) => {
        const res = await this.#editorAPI;
        const calc = getCalculatedValue(width);
        if (calc === null || calc === Infinity) {
            return null;
        }

        return res
            .setLayoutWidth(id, parseFloat(calc.toString()))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the height of a specific layout to its original value
     * @param id the id of a specific layout
     * @returns
     */
    resetHeight = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutHeight(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method will reset the width of a specific layout to its original value
     * @param id the id of a specific layout
     * @returns
     */
    resetWidth = async (id: Id) => {
        const res = await this.#editorAPI;
        return res.resetLayoutWidth(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method returns a UInt8Array containing a PNG encoded image of the currently selected layout.
     * @returns UInt8Array snapshot of the current layout
     */
    getSelectedSnapshot = async () => {
        const res = await this.#blobAPI;
        return res.getPageSnapshot().then((result) => (result as Uint8Array) ?? (result as EditorResponse<null>));
    };
}
