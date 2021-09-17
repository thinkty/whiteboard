import * as React from 'react';
import { Settings } from './Settings';
import { SettingsT, defaultSettings } from '../configs/styles';

type Props = {} & typeof defaultProps;

const defaultProps = {};

export const App = ({}: Props): JSX.Element => {
  const [settings, setSettings] = React.useState<SettingsT>(defaultSettings);

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
        Placeholder
      </div>
      <Settings
        currentSettings={settings}
        updateSettings={setSettings}
      />
    </div>
  );
}

App.defaultProps = defaultProps;
