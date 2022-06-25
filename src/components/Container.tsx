import * as React from 'react';
import { AddButton } from './AddButton';
import { AddModal } from './AddModal';
import { defaultItems, Item, itemType } from './Item';

export const Container = (): JSX.Element => {
  const [items, setItems] = React.useState<itemType[]>(defaultItems);
  const [openModal, setModal] = React.useState<boolean>(false);

  // componentDidMount
  React.useEffect((): void => {

    // Fetching from localStorage for previous items
    const rawLocalItems = localStorage.getItem('items');
    if (rawLocalItems) {
      const localItems: itemType[] = JSON.parse(rawLocalItems);
      setItems(localItems);
    } else {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          // border: 'thin dotted var(--primary)',
        }}
      >
        {
          items.map((cItem) =>
            <Item
              key={cItem.id}
              item={cItem}
              removeItem={() => {
                const newItems = items.filter((item) => item.id !== cItem.id);
                setItems(newItems);

                // Update localstorage
                localStorage.setItem('items', JSON.stringify(newItems));
              }}
            />
          )
        }
        <AddButton openModal={() => { setModal(true); }} />
      </div>
      {
        openModal &&
        <AddModal
          close={() => { setModal(false); }}
          addItem={(title: string, url: string): void => {
            const newItems = items.concat([{
              id: Date.now(),
              title,
              url,
            }]);

            setItems(newItems);

            // Update local
            localStorage.setItem('items', JSON.stringify(newItems));
          }}
        />
      }
    </>
  );
}
