import * as React from 'react';
import { Settings } from './Settings';
import { SettingsT, defaultSettings } from '../configs/styles';

type Props = {} & typeof defaultProps;

const defaultProps = {};

export const App = ({}: Props): JSX.Element => {
  const [settings, setSettings] = React.useState<SettingsT>(defaultSettings);

  // Read from localStorage if avail on componentDidMount
  React.useEffect((): void => {
    const localSettingsRaw = localStorage.getItem('settings');
    if (localSettingsRaw) {
      const localSettings: SettingsT = JSON.parse(localSettingsRaw);
      setSettings(localSettings);
    }
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        fontFamily: 'verdana, sans-serif',
        color: settings.primaryColor.color.hex,
        backgroundColor: settings.backgroundColor.color.hex,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        {/* TODO: Add the grid to place all the widgets */}
        Placeholder 
      </div>
      <Settings
        currentSettings={settings}
        updateSettings={(newSettings: SettingsT): void => {
          setSettings(newSettings);
          // Save to localStorage
          localStorage.setItem('settings', JSON.stringify(newSettings));
        }}
      />
    </div>
  );
}

App.defaultProps = defaultProps;
