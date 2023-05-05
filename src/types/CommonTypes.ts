import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutListItemType, LayoutPropertiesType, LayoutWithFrameProperties } from './LayoutTypes';
import type { FrameType } from './FrameTypes';
import { Frame, FrameLayoutType, FrameTypeEnum } from './FrameTypes';
import { Variable } from './VariableTypes';
import { DocumentAction, ToolType } from '..';
import { DocumentType, UndoState } from './DocumentTypes';
import { DocumentColor } from './ColorStyleTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { DocumentFont } from './FontTypes';
import { CharacterStyle } from './CharacterStyleTypes';
import { ConnectorEvent } from './ConnectorTypes';
import { PageSize } from './PageTypes';
import { SelectedTextStyle } from './TextStyleTypes';
import { CornerRadius } from './ShapeTypes';

export type Id = string;

export type ConfigType = {
    onActionsChanged?: (state: DocumentAction[]) => void;
    onStateChanged?: () => void;
    onSelectedFrameLayoutChanged?: (state: FrameLayoutType) => void;
    onSelectedFrameContentChanged?: (state: Frame) => void;
    editorLink?: string;
    editorId?: string;
    chiliEnvironmentUrl?: string;
    documentType?: DocumentType;
    onPageSelectionChanged?: () => void;
    onSelectedLayoutPropertiesChanged?: (state: LayoutPropertiesType) => void;
    onScrubberPositionChanged?: (state: AnimationPlaybackType) => void;
    onFrameAnimationsChanged?: (animationState: FrameAnimationType[]) => void;
    onVariableListChanged?: (variableList: Variable[]) => void;
    onSelectedToolChanged?: (tool: ToolType) => void;
    onUndoStackStateChanged?: (undoStackState: UndoState) => void;
    onSelectedLayoutFramesChanged?: (frames: SelectedLayoutFrame[]) => void;
    onSelectedTextStyleChanged?: (styles: SelectedTextStyle) => void;
    onColorsChanged?: (colors: DocumentColor[]) => void;
    onParagraphStylesChanged?: (paragraphStyles: ParagraphStyle[]) => void;
    onCharacterStylesChanged?: (characterStyles: CharacterStyle[]) => void;
    onFontsChanged?: (fonts: DocumentFont[]) => void;
    onSelectedLayoutIdChanged?: (layoutId: string) => void;
    onLayoutsChanged?: (layouts: LayoutListItemType[]) => void;
    onConnectorEvent?: (event: ConnectorEvent) => void;
    onZoomChanged?: (scaleFactor: number) => void;
    onPageSizeChanged?: (pageSize: PageSize) => void;
    onShapeCornerRadiusChanged?: (cornerRadius: CornerRadius) => void;
};

export interface EditorResponse<T> {
    success: boolean;
    status: number;
    data?: string | null;
    error?: string | { code: number; error: Record<string, unknown> } | null;
    parsedData: T | null;
}

export interface EditorRawAPI extends CallSender {
    [index: string]: <T>(...args: unknown[]) => Promise<T>;
}

export interface EditorAPI extends CallSender {
    [index: string]: <T>(...args: unknown[]) => Promise<EditorResponse<T>>;
}

export type PageType = {
    pageId: Id;
    pageNumber: number;
    width: number | null;
    height: number | null;
    frames: FrameType[];
};

export type InitialStateType = {
    layouts: LayoutWithFrameProperties[];
    selectedLayoutId: Id;
    pages: PageType[];
    variables: Variable[];
};

export interface PropertyState<T> {
    value: T;
    isOverride: boolean;
}

export interface SelectedLayoutFrame {
    frameId: Id;
    frameName: string;
    frameType: FrameTypeEnum;
    included: boolean;
}

export interface MetaData {
    [key: string]: string;
}

export interface ConnectorOptions {
    [key: string]: string;
}