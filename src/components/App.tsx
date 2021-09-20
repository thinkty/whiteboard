import * as React from 'react';
import { Settings } from './Settings';
import { Grid } from './Grid';
// import { GridItemI, defaultItems } from './GridItem';
import { SettingsT, defaultSettings, extractSettings } from '../configs/styles';

type Props = {} & typeof defaultProps;

const defaultProps = {};

export const App = ({}: Props): JSX.Element => {
  const [settings, setSettings] = React.useState<SettingsT>(defaultSettings); // Colors and etc.
  // const [items, setItems] = React.useState<GridItemI[]>(defaultItems); // Grid items and etc.

  // Read from localStorage if avail on componentDidMount
  React.useEffect((): void => {
    const localSettingsRaw = localStorage.getItem('settings');
    if (localSettingsRaw) {
      const localSettings: SettingsT = JSON.parse(localSettingsRaw);
      setSettings(localSettings);
    }
    
    // const localItemsRaw = localStorage.getItem('items');
    // if (localItemsRaw) {
    //   const localItems: GridItemI[] = JSON.parse(localItemsRaw);
    //   setItems(localItems);
    // }
  }, []);

  const { showGrid, primaryColor, backgroundColor } = extractSettings(settings);

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
        // currentItems={items}
        // updateItems={(newItems: GridItemI[]): void => {
        //   setItems(newItems);
        //   localStorage.setItem('items', JSON.stringify(newItems));
        // }}
      />
    </div>
  );
}

App.defaultProps = defaultProps;
