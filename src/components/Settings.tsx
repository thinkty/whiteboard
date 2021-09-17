import React from 'react';
import { ColorPicker } from './ColorPicker';
import { SettingsEntryT, SettingsT } from '../configs/styles';

type Props = {
  currentSettings: SettingsT;
  updateSettings: (settings: SettingsT) => void;
} & typeof defaultProps;

const defaultProps = {
};

export const Settings = (props: Props): JSX.Element => {
  const [settings, setSettings] = React.useState<SettingsT>(props.currentSettings);
  const [hovering, setHover] = React.useState<boolean>(false);
  const [hoveringExit, setExitHover] = React.useState<boolean>(false);
  const [open, openModal] = React.useState<boolean>(false);

  return (
    <>
      {/* The settings icon button */}
      <div
        style={{
          margin: 10,
          opacity: hovering ? 0.5 : 1,
          cursor: hovering ? 'pointer' : 'default',
        }}
        onMouseEnter={() => { setHover(true); }}
        onMouseLeave={() => { setHover(false); }}
        onClick={() => { openModal(true); }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
          <path xmlns="http://www.w3.org/2000/svg" d="M12 4C11.4477 4 11 4.44772 11 5C11 6.69226 8.95399 7.53974 7.75738 6.34314C7.36686 5.95261 6.73369 5.95261 6.34317 6.34314C5.95265 6.73366 5.95265 7.36683 6.34317 7.75735C7.53982 8.954 6.69223 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C6.69236 13 7.53964 15.0461 6.34311 16.2426C5.95258 16.6332 5.95258 17.2663 6.34311 17.6569C6.73363 18.0474 7.36679 18.0474 7.75732 17.6569C8.9539 16.4603 11 17.3077 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 17.3077 15.046 16.4602 16.2427 17.6568C16.6332 18.0474 17.2664 18.0474 17.6569 17.6568C18.0474 17.2663 18.0474 16.6332 17.6569 16.2426C16.4603 15.0461 17.3077 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C17.3078 11 16.4601 8.95405 17.6568 7.75737C18.0473 7.36684 18.0473 6.73368 17.6568 6.34315C17.2663 5.95263 16.6331 5.95263 16.2426 6.34315C15.046 7.53979 13 6.69219 13 5C13 4.44772 12.5523 4 12 4ZM9.00816 4.77703C9.12224 3.2243 10.4181 2 12 2C13.5819 2 14.8778 3.2243 14.9918 4.77703C16.1704 3.75977 17.9525 3.8104 19.071 4.92894C20.1896 6.04748 20.2402 7.82955 19.2229 9.00816C20.7757 9.12221 22 10.4181 22 12C22 13.5819 20.7757 14.8778 19.223 14.9918C20.2403 16.1704 20.1896 17.9525 19.0711 19.0711C17.9525 20.1896 16.1705 20.2402 14.9918 19.2229C14.8778 20.7757 13.5819 22 12 22C10.4181 22 9.12221 20.7757 9.00816 19.2229C7.82955 20.2402 6.04745 20.1896 4.92889 19.0711C3.81034 17.9525 3.75972 16.1704 4.77702 14.9918C3.2243 14.8778 2 13.5819 2 12C2 10.4181 3.22433 9.12221 4.77709 9.00816C3.75978 7.82955 3.81041 6.04747 4.92896 4.92892C6.0475 3.81038 7.82955 3.75975 9.00816 4.77703Z" fill={props.currentSettings.primaryColor.color.hex}></path>
          <path xmlns="http://www.w3.org/2000/svg" d="M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10ZM9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157Z" fill={props.currentSettings.primaryColor.color.hex}></path>
        </svg>
      </div>
      {/* The settings modal */}
      <div
        style={{
          display: open ? 'block' : 'none',
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            overflow: 'auto',
            backgroundColor: props.currentSettings.backgroundColor.color.hex,
            padding: 20,
            border: 'thin solid transparent',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Settings modal header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 'bold',
              }}
            >
              Settings
            </div>
            <div
              style={{
                opacity: hoveringExit ? 0.5 : 1,
                cursor: hoveringExit ? 'pointer' : 'default',
              }}
              onMouseEnter={() => { setExitHover(true); }}
              onMouseLeave={() => { setExitHover(false); }}
              onClick={() => { openModal(false); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
                <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill={props.currentSettings.primaryColor.color.hex}></path>
              </svg>
            </div>
          </div>
          <hr style={{ color: props.currentSettings.primaryColor.color.hex, width: '99%' }} />
          {/* Settings modal content */}
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'baseline',
              justifyContent: 'flex-start',
              overflow: 'auto',
            }}
          >
            {
              Object.entries(settings).map((value: [string, SettingsEntryT]): JSX.Element => (
                <ColorPicker
                  key={value[0]}
                  label={value[1].label}
                  currentColor={value[1].color}
                  setValue={(newValue) => {
                    props.updateSettings({ ...settings, [value[0]]: { label: value[1].label, color: newValue } });
                    setSettings({ ...settings, [value[0]]: { label: value[1].label, color: newValue } });
                  }}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

Settings.defaultProps = defaultProps;
