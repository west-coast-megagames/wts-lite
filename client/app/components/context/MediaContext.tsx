import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Article } from "~/types/types";


type MediaContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type InitialMediaStateProps = {
  mediaFeed: Article[];
  setFeed: (payload: Article) => void;
  addArticle: (payload: Article) => void;
//   deleteArticle: (article: Article) => void;
};

const initialMediaContext: InitialMediaStateProps = {
  mediaFeed: [] as Article[],
  setFeed: () => null,
  addArticle: () => null,
//   deleteArticle: () => null
};

export const MediaContextProvider = ({
  children,
}: MediaContextProviderProps) => {
    const [mediaFeed, setMediaFeed] = useState<Article[]>([]);
    const setFeed = (payload: Article) => {
        const newTrack: Article[] = []
        mediaFeed.forEach((el, i) => {
            if (el.id === payload.id) newTrack.push(payload);
            else newTrack.push(el);
        
            setMediaFeed(newTrack);
        });
    }
    const addArticle = (payload: Article) => {
        const newFeed: Article[] = mediaFeed
        newFeed.push(payload);
        setMediaFeed(newFeed);
    }

  const value = useMemo(
    () => ({ mediaFeed, setFeed, addArticle }),
    [mediaFeed]
  )

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};
export const MediaContext =
  createContext<InitialMediaStateProps>(initialMediaContext);

export const useMediaContext = () => useContext(MediaContext);