import React, { useState, useEffect, useContext } from "react";
import { Snackbar } from "react-native-paper";
import { AppContext } from "../context/AppContext";

export const Notification = () => {
  const [isVisible, setVisible] = useState(false);
  const [notification, setNotification] = useState({});
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.notification) {
      setVisible(true);
      setNotification(state.notification);
    }
  }, [state.notification]);
  return (
    <>
      {notification && (
        <Snackbar
          visible={isVisible}
          onDismiss={() => setVisible(false)}
          duration={notification.duration ? notification.duration : 5000}
          action={{
            icon: notification.icon ? notification.icon : "",
            label: notification.buttonLabel ? notification.buttonLabel : "",
            onPress: () => {},
          }}
        >
          {notification.message}
        </Snackbar>
      )}
    </>
  );
};
