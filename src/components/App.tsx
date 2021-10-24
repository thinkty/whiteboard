import * as React from 'react';
import { Settings } from './Settings';
import { Grid } from './Grid';
import { GridItemT, defaultItems } from './GridItem';
import { SettingsT, defaultSettings, extractSettings } from '../configs/styles';

type Props = {} & typeof defaultProps;

const defaultProps = {};

export const App = ({}: Props): JSX.Element => {
  const [settings, setSettings] = React.useState<SettingsT>(defaultSettings); // Colors and etc.
  const [items, setItems] = React.useState<GridItemT[]>(defaultItems); // Grid items and etc.

  // Read from localStorage if avail on componentDidMount
  React.useEffect((): void => {
    const localSettingsRaw = localStorage.getItem('settings');
    if (localSettingsRaw) {
      const localSettings: SettingsT = JSON.parse(localSettingsRaw);
      setSettings(localSettings);
    } else {
      localStorage.setItem('settings', JSON.stringify(settings));
    }

    const localItemsRaw = localStorage.getItem('items');
    if (localItemsRaw) {
      const localItems: GridItemT[] = JSON.parse(localItemsRaw);
      setItems(localItems);
    } else {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, []);

  const { showGrid, primaryColor, backgroundColor } = extractSettings(settings);
  const style = {
    "--primary": primaryColor.hex,
    "--background": backgroundColor.hex,
  } as React.CSSProperties;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'verdana, sans-serif',
        color: primaryColor.hex,
        backgroundColor: backgroundColor.hex,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Settings menu */}
      <Settings
        currentSettings={settings}
        updateSettings={(newSettings: SettingsT): void => {
          setSettings(newSettings);
          // Save to localStorage
          localStorage.setItem('settings', JSON.stringify(newSettings));
        }}
      />
      {/* Grid */}
      <Grid
        showGrid={showGrid}
        currentItems={items}
        updateItems={(newItem: GridItemT): void => {
          const newItems = items.slice();
          newItems.push(newItem);
          setItems(newItems);
          localStorage.setItem('items', JSON.stringify(newItems));
        }}
      />
    </div>
  );
}

App.defaultProps = defaultProps;
