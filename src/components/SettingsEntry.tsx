import * as React from 'react';
import { TwitterPicker, ColorResult } from 'react-color';
import {
  SettingsT,
  SettingsEntryT,
  isBoolean,
  isColorResult,
} from '../configs/styles';
import { SettingsBooleanEntry } from './SettingsEntryBoolean';

type Props = {
  entryKey: string;
  entry: SettingsEntryT;
  currentSettings: SettingsT;
  updateSettings: (settings: SettingsT) => void;
} & typeof defaultProps;

const defaultProps = {};

export const SettingsEntry = (props: Props): JSX.Element => {
  const { entryKey, entry, currentSettings, updateSettings } = props;

  let entryElement: JSX.Element;
  if (isColorResult(entry.value)) {
    // ColorResult Type
    entryElement = (
      <TwitterPicker
        triangle="hide"
        color={entry.value.hex}
        onChange={(c: ColorResult, e: React.FormEvent<HTMLInputElement>): void => {
          e.preventDefault();
          updateSettings({ ...currentSettings, [entryKey]: { label: entry.label, value: c } });
        }}
      />
    );
  } else if (isBoolean(entry.value)) {
    // Boolean Type
    entryElement = (
      <SettingsBooleanEntry
        value={entry.value}
        onChange={(): void => {
          updateSettings({ ...currentSettings, [entryKey]: { label: entry.label, value: !entry.value } });
        }}
      />
    );
  } else {
    // Undefined
    entryElement = (<>Undefined Entry Type</>);
  }

  return (
    <>
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <div>
        { entry.label }
      </div>
      <div>
        { entryElement }
      </div>
    </div>
    </>
  );
}

SettingsEntry.defaultProps = defaultProps;
