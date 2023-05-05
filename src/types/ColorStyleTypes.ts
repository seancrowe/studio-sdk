export enum ColorType {
    rgb = 'rgb',
    cmyk = 'cmyk',
    lab = 'lab',
    gray = 'gray',
    xyz = 'xyz',
    hls = 'hls',
    spotCmyk = 'spotCmyk',
    spotRgb = 'spotRgb',
    custom = 'custom',
}

export type ColorUpdate = {
    r: number;
    g: number;
    b: number;
    colorType: ColorType;
};

export type Color = {
    colorType: ColorType;
    r: number;
    g: number;
    b: number;
    displayValue?: string;
};

export type DocumentColor = {
    id: string;
    name: string;
    color: Color;
};

export type ColorUsageUpdate = {
    /**
     * Reference to the stylekit color, can only be used if it is a stylekit color.
     */
    colorId?: string;
    /**
     * The local color object, can only be used if it is a local color.
     */
    color?: ColorUpdate;
    usageType: ColorUsageType;
    /**
     * Opacity of the color (0-100) where 0 = fully transparent.
     */
    opacity?: number;
    /**
     * Indicates if the color will be applied or not.
     */
    isApplied?: boolean;
};

export type ColorUsage = {
    /**
     * Reference to the stylekit color, can only be used if it is a stylekit color.
     */
    colorId?: string;
    /**
     * The local color object, can only be used if it is a local color.
     */
    color?: Color;
    usageType: ColorUsageType;
    /**
     * Opacity of the color (0-100) where 0 = fully transparent.
     */
    opacity?: number;
};

export enum ColorUsageType {
    /**
     * The color is defined locally on the object
     */
    local = 'local',
    /**
     * THe color is referencing a stylekit color
     */
    stylekit = 'stylekit',
}