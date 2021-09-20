import { ColorResult } from 'react-color';

/* Basic settings type */
export type SettingsEntryValueT = ColorResult | boolean;

export type SettingsEntryT = {
  label: string;
  value: SettingsEntryValueT;
};

export type SettingsT = {
  showGrid: SettingsEntryT;
  primaryColor: SettingsEntryT;
  backgroundColor: SettingsEntryT;
  // etc.
};

export type SettingsResultT = {
  showGrid: boolean;
  primaryColor: ColorResult;
  backgroundColor: ColorResult;
};
/* Basic settings type */

/* Type assertion using user-defined type guard */
export const isColorResult = (value: SettingsEntryValueT): value is ColorResult => {
  return (value as ColorResult).hex !== undefined;
}

export const isBoolean = (value: SettingsEntryValueT): value is boolean => {
  return typeof value === 'boolean'; // This is dumb
}
/* Type assertion using user-defined type guard */

/* Default settings */
export const defaultShowGrid: boolean = false;
export const defaultPrimaryColor: ColorResult = {
  hex: '#FFFFFF',
  hsl: {
    h: 0,
    s: 0,
    l: 100,
  },
  rgb: {
    r: 255,
    g: 255,
    b: 255,
  },
};
export const defaultBackgroundColor: ColorResult = {
  hex: '#333333',
  hsl: {
    h: 0,
    s: 0,
    l: 20,
  },
  rgb: {
    r: 33,
    g: 33,
    b: 33,
  },
};
export const defaultSettings: SettingsT = {
  showGrid: {
    label: 'Show Grid',
    value: defaultShowGrid,
  },
  primaryColor: {
    label: 'Primary Color',
    value: defaultPrimaryColor,
  },
  backgroundColor: {
    label: 'Background Color',
    value: defaultBackgroundColor,
  },
};
/* Default settings */

// Helper function to validate each settings entry and fill with default values if necessary
export const extractSettings = (settings: SettingsT): SettingsResultT => {
  const showGrid = isBoolean(settings.showGrid.value) ? settings.showGrid.value : defaultShowGrid;
  const primaryColor = isColorResult(settings.primaryColor.value) ? settings.primaryColor.value : defaultPrimaryColor;
  const backgroundColor = isColorResult(settings.backgroundColor.value) ? settings.backgroundColor.value : defaultBackgroundColor;

  return {
    showGrid,
    primaryColor,
    backgroundColor,
  };
}
