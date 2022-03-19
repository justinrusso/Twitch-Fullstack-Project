import { Alert, AlertProps, Snackbar } from "@mui/material";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type NotificationProps = {
  /**
   * The message to be displayed in the alert
   */
  message: string;
} & AlertProps;

type TemporaryNotificationsContextValue = {
  enqueueNotification: (props: NotificationProps, immediate?: boolean) => void;
};

const TemporaryNotificationsContext =
  createContext<TemporaryNotificationsContextValue>(
    {} as TemporaryNotificationsContextValue
  );

export const useTemporaryNotifications = () =>
  useContext(TemporaryNotificationsContext);

type TemporaryNotificationsProviderProps = {
  children: ReactNode;

  /**
   * The amount of time for a notification to display before it is automatically hidden
   * @default 5000
   */
  autoHideDuration?: number;
};

/**
 * A context provider for temporary notifications
 * This is used to add `Snackbars` for temporary notifications with the ability to
 * display multiple notifications as necessary one after another.
 */
export default function TemporaryNotificationsProvider({
  children,
  autoHideDuration = 5000,
}: TemporaryNotificationsProviderProps): JSX.Element {
  /**
   * Stores all notifications in a ref to prevent state updates when adding pending notifications
   */
  const notificationsRef = useRef<NotificationProps[]>([]);
  const notifications = notificationsRef.current;

  /**
   * Stores the props for the currently displayed notification
   */
  const [displayedNotification, setDisplayedNotification] =
    useState<NotificationProps | null>(null);

  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    if (!displayedNotification && hasNotifications) {
      const nextNotification = notificationsRef.current.shift();
      setDisplayedNotification(nextNotification || null);
      if (!nextNotification) {
        setHasNotifications(false);
      }
    }
  }, [displayedNotification, hasNotifications]);

  /**
   *
   * @param props The properties for the snackbar component
   */
  const enqueueNotification = (props: NotificationProps) => {
    notifications.push(props);
    if (!hasNotifications) {
      setHasNotifications(true);
    }
  };

  const handleClose = () => {
    setDisplayedNotification(null);
  };

  const { message: alertMessage, ...alertProps } = displayedNotification || {};

  return (
    <TemporaryNotificationsContext.Provider
      value={{
        enqueueNotification,
      }}
    >
      {children}
      <Snackbar
        autoHideDuration={autoHideDuration}
        open={!!displayedNotification}
        onClose={handleClose}
      >
        <Alert variant="outlined" {...alertProps}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </TemporaryNotificationsContext.Provider>
  );
}
