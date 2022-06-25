import * as React from 'react';

type Props = {
  close: VoidFunction;
  addItem: (title: string, url: string) => void;
};

export const AddModal = ({ close, addItem }: Props): JSX.Element => {
  const [title, setTitle] = React.useState<string>('');
  const [url, setUrl] = React.useState<string>('');

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        zIndex: 99,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        onClick={(e) => { e.stopPropagation(); }}
        style={{
          backgroundColor: 'var(--background)',
          borderRadius: 'var(--add-modal-radius)',
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          gap: 10,
        }}
      >
        <AddModalTextField
          label="Title"
          value={title}
          setValue={setTitle}
        />
        <AddModalTextField
          label="URL"
          value={url}
          setValue={setUrl}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <AddModalButton
            label="Confirm"
            color="var(--primary)"
            backgroundColor="var(--add-modal-button)"
            onClick={() => {
              addItem(title, url);
              close();
            }}
          />
          <AddModalButton
            label="Cancel"
            color="var(--primary)"
            backgroundColor="var(--add-modal-button)"
            onClick={close}
          />
        </div>
      </div>
    </div>
  );
}

type addModalTextFieldProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
};

const AddModalTextField = ({ label, value, setValue }: addModalTextFieldProps): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      { label }
      <input
        value={value}
        onChange={(e) => { setValue(e.target.value); }}
        style={{
          padding: 10,
          color: 'var(--primary)',
          border: 'none',
          outline: 'none',
          backgroundColor: 'var(--add-modal-textfield-background)',
        }}
      />
    </div>
  );
}

type addModalButtonProps = {
  label: string;
  color: string;
  backgroundColor: string;
  onClick: VoidFunction;
};

const AddModalButton = ({ label, color, backgroundColor, onClick }: addModalButtonProps): JSX.Element => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color,
        backgroundColor,
        borderRadius: 'var(--add-modal-radius)',
        padding: 10,
      }}
    >
      { label }
    </div>
  );
}
