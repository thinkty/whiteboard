import { ColorResult } from 'react-color';

export type SettingsEntryT = {
  label: string,
  color: ColorResult,
};

export type SettingsT = {
  primaryColor: SettingsEntryT;
  backgroundColor: SettingsEntryT;
  randomShit: SettingsEntryT;
  anotherRandomShit: SettingsEntryT;
  iNeedToSleep: SettingsEntryT;
  // etc.
};

export const defaultSettings: SettingsT = {
  primaryColor: {
    label: 'Color',
    color: {
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
    },
  },
  backgroundColor: {
    label: 'Background Color',
    color: {
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
    },
  },
  randomShit: {
    label: 'Temp',
    color: {
      hex: '#008080',
      hsl: {
        h: 180,
        s: 100,
        l: 25,
      },
      rgb: {
        r: 0,
        g: 128,
        b: 128,
      },
    },
  },
  anotherRandomShit: {
    label: 'Temp',
    color: {
      hex: '#008080',
      hsl: {
        h: 180,
        s: 100,
        l: 25,
      },
      rgb: {
        r: 0,
        g: 128,
        b: 128,
      },
    },
  },
  iNeedToSleep: {
    label: 'Temp',
    color: {
      hex: '#008080',
      hsl: {
        h: 180,
        s: 100,
        l: 25,
      },
      rgb: {
        r: 0,
        g: 128,
        b: 128,
      },
    },
  },
};
