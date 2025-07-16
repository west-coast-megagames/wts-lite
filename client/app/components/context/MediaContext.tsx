import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Post } from "~/types/types";


type MediaContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type InitialMediaStateProps = {
  mediaFeed: Post[];
  setFeed: (payload: Post) => void;
  addPost: (payload: Post) => void;
//   deletePost: (post: Post) => void;
};

const initialMediaContext: InitialMediaStateProps = {
  mediaFeed: [] as Post[],
  setFeed: () => null,
  addPost: () => null,
//   deletePost: () => null
};

export const MediaContextProvider = ({
  children,
}: MediaContextProviderProps) => {
    const [mediaFeed, setMediaFeed] = useState<Post[]>(feeds);
    const setFeed = (payload: Post) => {
        const newTrack: Post[] = []
        let index = -1
        mediaFeed.forEach((el, i) => {
            if (el._id === payload._id) {
              newTrack.push(payload)
              index = i
            }
            else newTrack.push(el);
        });
        if (index === -1) newTrack.push(payload)
        console.log(newTrack);
        setMediaFeed(newTrack);
    }
    const addPost = (payload: Post) => {
        console.log('Adding Post');
        console.log(payload);
        const newFeed: Post[] = mediaFeed
        newFeed.push(payload);
        setMediaFeed(newFeed);
    }

  const value = useMemo(
    () => ({ mediaFeed, setFeed, addPost }),
    [mediaFeed, addPost, setFeed]
  )

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};
export const MediaContext =
  createContext<InitialMediaStateProps>(initialMediaContext);

export const useMediaContext = () => useContext(MediaContext);

const feeds: Post[] = [
  {
    status: 'In Progress',
    _id: '01',
    publisher: "United States",
    headline: 'BREAKING NEWS: Even with Chakra UI, I suck at Front End development',
    body:
      "I enjoy coding, and even making data driven platforms for games, but when considering scope one has to consider that I severly hate and am deficient at it...",
    author: {
      _id: '01',
      name: 'John T. Cleveland',
      role: { title: 'Random' }
    },
    createdAt: "2025-07-4T15:25:41.582Z",
    comments: [
      {
        user: {
          _id: '01',
          name: 'Juan Doe',
          team: 'us',
        },
        body: "Honestly, I'm not sure you can pull it off with the seven days remaining.",
        replies: [
          {
            user: {
              _id: '02',
              name: 'Emily Smith',
              team: 'ru',
            
            },
            body: "Maybe you should have stayed in your comfort zone and not tried!.",
            replies: [],
          },
          {
            user: {
              _id: '02',
              name: 'Jay Quick',
              team: 'au',
            
            },
            body: "I made another comment, I'm so helpful to the scaffold",
            replies: [],
          },
        ]
      },
      {
        user: {
          _id: '01',
          name: 'John Doe',
          role: 'Random Dude',
          team: 'us'
        },
        body: "This sucks ass",
        replies: []
      }
    ],
    upvotes: 24,
    tags: ['Theming', 'Moo'],
  },
]
