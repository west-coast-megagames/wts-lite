import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Post } from "~/types/types";
import { toaster } from "../ui/toaster";
import { server } from "~/config";


type MediaContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type InitialMediaStateProps = {
  mediaFeed: Post[];
  deletePost: (post: Post) => void;
  refreshFeed: () => void;
  wipeFeed: () => void;
};

const initialMediaContext: InitialMediaStateProps = {
  mediaFeed: [] as Post[],
  deletePost: () => null,
  refreshFeed: () => null,
  wipeFeed: () => null
};

export const MediaContextProvider = ({
  children,
}: MediaContextProviderProps) => {
    const [mediaFeed, setMediaFeed] = useState<Post[]>(feeds);
    

    const deletePost = async (payload: Post) => {
      console.log(`Deleting Post ${ payload.headline }`);
      await fetch(`${server}api/posts/${payload._id}`, { // Replace with your API endpoint
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        return res.json();
      }).then(json => {
        console.log(json);
        refreshFeed();
      });
    }

    const refreshFeed = async () => {
      await fetch(`${ server }api/posts`).then((res) => {
          !res.ok ? toaster.create({ type: 'error', description: `Failed to load Posts`, duration: 5000}) : undefined;
          return res.json();
        }).then(json => {
          toaster.create({ type: 'success', description: `${json.length} post${json.length > 1 ? 's' : ''} loaded into feed`, duration: 5000})
          setMediaFeed(json);
        });
        
      }

      const wipeFeed = async () => {
        try {
          fetch(`${server}api/posts/deleteAll`, { // Replace with your API endpoint
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(res => {
            console.log(res);
            if (!res.ok) {
              toaster.create({ type: 'error', description: `Failed to load Posts`, duration: 5000})
            } else {

            }
          }).then(json => {
            const errorData = json;
            console.log(json);
            refreshFeed();
          });
        } catch (err) {
          // Handle network errors or errors thrown from the response.ok check
          console.log(err)
          toaster.create({ type: 'error', description: 'Error submitting data: ' + err.message});
        }
      }

  const value = useMemo(
    () => ({ mediaFeed, deletePost, refreshFeed, wipeFeed }),
    [mediaFeed, deletePost, wipeFeed]
  )

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};
export const MediaContext =
  createContext<InitialMediaStateProps>(initialMediaContext);

export const useMediaContext = () => useContext(MediaContext);

const feeds: Post[] = []
