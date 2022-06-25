import * as React from 'react';

export const defaultItems: itemType[] = [
  {
    id: 1635071086635,
    title: 'YouTube',
    url: 'https://www.youtube.com',
  },
  {
    id: 1635071086630,
    title: 'YouTube Music',
    url: 'https://music.youtube.com/',
  },
];

export type itemType = {
  id: number; // TODO: Too lazy to use uuid, just gonna use time in milliseconds
  title: string;
  url: string;
};

type Props = {
  item: itemType;
  removeItem: VoidFunction;
};

export const Item = ({ item, removeItem }: Props): JSX.Element => {

  return (
    <>
      <div
        draggable={true}
        style={{
          width: 'var(--item-width)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--item-radius)',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        }}
      >
        <ItemHeader
          title={item.title}
          removeItem={removeItem}
        />
        <ItemThumbnail
          url={item.url}
        />
      </div>
    </>
  );
}

type ItemHeaderProps = {
  title: string;
  removeItem: VoidFunction;
};

const ItemHeader = ({ title, removeItem }: ItemHeaderProps) : JSX.Element => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          fontSize: 18,
          textShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 6px, rgba(0, 0, 0, 0.3) 0px 3px 6px',
          fontWeight: 'bold',
          margin: 10,
        }}
      >
        <div>
          { title }
        </div>
        <div
          onClick={removeItem}
          style={{
            cursor: 'pointer',
            filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
            <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="var(--item-header-icon-fill)"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

type ItemThumbnailProps = {
  url: string;
};

const ItemThumbnail = ({ url }: ItemThumbnailProps) : JSX.Element => {

  // fetch(url, {
  //   method: 'GET',
  //   mode: 'cors',
    
  // })
  //   .then((resp) => resp.json())
  //   .then((data) => { console.log(data); })

  return (
    <a
      draggable={false}
      target="_blank"
      href={url}
      style={{
        textDecoration: 'none', // Override html element 'a' default style
        color: 'var(--primary)', // Override html element 'a' default style
        width: '100%',
        height: 'var(--item-thumbnail-height)',
        backgroundColor: 'var(--item-thumbnail-background)',
        borderBottomLeftRadius: 'var(--item-radius)',
        borderBottomRightRadius: 'var(--item-radius)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* TODO: get website og-image or thumbnail */}
    </a>
  );
}
