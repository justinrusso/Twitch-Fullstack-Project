import { createContext, ReactNode, useContext, useState } from "react";

type AppBarContextValue = {
  title: string;
  setTitle: (newTitle: string) => void;
};

const AppBarContext = createContext<AppBarContextValue>(
  {} as AppBarContextValue
);

export const useAppBar = () => useContext(AppBarContext);

type AppBarProviderProps = {
  children: ReactNode;
  defaultTitle: string;
};

export default function AppBarProvider({
  children,
  defaultTitle,
}: AppBarProviderProps): JSX.Element {
  const [title, setTitle] = useState<string>(defaultTitle);

  return (
    <AppBarContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </AppBarContext.Provider>
  );
}
