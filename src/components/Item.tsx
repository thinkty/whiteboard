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
          alt={item.title}
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
  alt: string;
};

const ItemThumbnail = ({ url, alt }: ItemThumbnailProps) : JSX.Element => {

  const [thumbnail, setThumbnail] = React.useState<string>('');

  // TODO: using a local proxy server for bypassing CORS is meh
  fetch('http://192.168.219.200:8080/meta-fetch/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })
    .then((resp) => {
      // Code 400 means empty or malformed url
      if (!resp.ok && resp.status == 400) {
        throw new Error('400');
      }

      return resp.json();
    })
    .then((data) => {
      setThumbnail(data);
    })
    .catch(() => {
      setThumbnail('');
    });

  return (
    <a
      draggable={false}
      target="_blank"
      href={url}
      style={{
        textDecoration: 'none',   // Override html element 'a' default style
        color: 'var(--primary)',  // Override html element 'a' default style
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
      {
        thumbnail == '' &&
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
          <path xmlns="http://www.w3.org/2000/svg" d="M16.2 6C16.2 5.44772 16.6477 5 17.2 5C17.8367 5 18.4624 5.12794 19.0714 5.37152C19.7341 5.63661 20.2442 6.03001 20.7071 6.49289C21.17 6.95578 21.5634 7.4659 21.8285 8.12861C22.0721 8.73756 22.2 9.36326 22.2 10C22.2 10.6367 22.0721 11.2624 21.8285 11.8714C21.5667 12.5258 21.1798 13.0314 20.7245 13.4897L19.7399 14.5727C19.7293 14.5844 19.7183 14.5959 19.7071 14.6071L16.5071 17.8071C16.0442 18.27 15.5341 18.6634 14.8714 18.9285C14.2624 19.1721 13.6367 19.3 13 19.3C12.3633 19.3 11.7376 19.1721 11.1286 18.9285C10.4659 18.6634 9.95578 18.27 9.49289 17.8071C9.03 17.3442 8.63661 16.8341 8.37152 16.1714C8.12326 15.5507 8 14.9244 8 14.2C8 13.5633 8.12794 12.9376 8.37152 12.3286C8.63661 11.6659 9.03 11.1558 9.49289 10.6929L10.5929 9.59289C10.9834 9.20237 11.6166 9.20237 12.0071 9.59289C12.3976 9.98342 12.3976 10.6166 12.0071 11.0071L10.9071 12.1071C10.57 12.4442 10.3634 12.7341 10.2285 13.0714C10.0721 13.4624 10 13.8367 10 14.2C10 14.6756 10.0767 15.0493 10.2285 15.4286C10.3634 15.7659 10.57 16.0558 10.9071 16.3929C11.2442 16.73 11.5341 16.9366 11.8714 17.0715C12.2624 17.2279 12.6367 17.3 13 17.3C13.3633 17.3 13.7376 17.2279 14.1286 17.0715C14.4659 16.9366 14.7558 16.73 15.0929 16.3929L18.2761 13.2097L19.2601 12.1273C19.2707 12.1156 19.2817 12.1041 19.2929 12.0929C19.63 11.7558 19.8366 11.4659 19.9715 11.1286C20.1279 10.7376 20.2 10.3633 20.2 10C20.2 9.63674 20.1279 9.26244 19.9715 8.87139C19.8366 8.5341 19.63 8.24422 19.2929 7.90711C18.9558 7.56999 18.6659 7.36339 18.3286 7.22848C17.9376 7.07206 17.5633 7 17.2 7C16.6477 7 16.2 6.55228 16.2 6ZM11.3 7.5C10.9367 7.5 10.5624 7.57206 10.1714 7.72848C9.8341 7.86339 9.54422 8.07 9.20711 8.40711L5.92393 11.6903L4.93994 12.7727C4.92927 12.7844 4.91832 12.7959 4.90711 12.8071C4.57 13.1442 4.36339 13.4341 4.22848 13.7714C4.07206 14.1624 4 14.5367 4 14.9C4 15.2633 4.07206 15.6376 4.22848 16.0286C4.36339 16.3659 4.57 16.6558 4.90711 16.9929C5.24422 17.33 5.5341 17.5366 5.87139 17.6715C6.26244 17.8279 6.63674 17.9 7 17.9C7.55228 17.9 8 18.3477 8 18.9C8 19.4523 7.55228 19.9 7 19.9C6.36326 19.9 5.73756 19.7721 5.12861 19.5285C4.4659 19.2634 3.95578 18.87 3.49289 18.4071C3.03 17.9442 2.63661 17.4341 2.37152 16.7714C2.12794 16.1624 2 15.5367 2 14.9C2 14.2633 2.12794 13.6376 2.37152 13.0286C2.63328 12.3742 3.02016 11.8686 3.47551 11.4103L4.46006 10.3273C4.47073 10.3156 4.48168 10.3041 4.49289 10.2929L7.79289 6.99289C8.25578 6.53 8.7659 6.13661 9.42861 5.87152C10.0376 5.62794 10.6633 5.5 11.3 5.5C11.9367 5.5 12.5624 5.62794 13.1714 5.87152C13.8341 6.13661 14.3442 6.53 14.8071 6.99289C15.27 7.45578 15.6634 7.9659 15.9285 8.62861C16.1721 9.23756 16.3 9.86326 16.3 10.5C16.3 11.1367 16.1721 11.7624 15.9285 12.3714C15.6664 13.0265 15.279 13.5325 14.823 13.9912L13.7372 15.1757C13.364 15.5828 12.7314 15.6103 12.3243 15.2372C11.9172 14.864 11.8897 14.2314 12.2628 13.8243L13.3628 12.6243C13.3726 12.6136 13.3827 12.6031 13.3929 12.5929C13.73 12.2558 13.9366 11.9659 14.0715 11.6286C14.2279 11.2376 14.3 10.8633 14.3 10.5C14.3 10.1367 14.2279 9.76244 14.0715 9.37139C13.9366 9.0341 13.73 8.74422 13.3929 8.40711C13.0558 8.07 12.7659 7.86339 12.4286 7.72848C12.0376 7.57206 11.6633 7.5 11.3 7.5Z" fill="var(--item-thumbnail-icon-color)"></path>
        </svg>
      }
      {
        thumbnail !== '' &&
        <img
          src={thumbnail}
          alt={alt}
          decoding="async"
          style={{
            objectFit: 'cover',   // Scale to fill
            width: '100%',        // Scale to fill
            height: '100%',       // Scale to fill
            textAlign: 'center',
            lineHeight: 'var(--item-thumbnail-height)',
            borderBottomLeftRadius: 'var(--item-radius)',
            borderBottomRightRadius: 'var(--item-radius)',
          }}
        />
      }
    </a>
  );
}
