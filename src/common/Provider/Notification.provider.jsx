import { Alert, LinearProgress, Snackbar } from "@mui/material";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

// Create the context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => useContext(NotificationContext);

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info", // 'info', 'success', 'warning', 'error'
  });
  const [progress, setProgress] = useState(100);

  // Function to show notification
  const showNotification = useCallback((message, severity = "info") => {
    setNotification({ open: true, message, severity });
    setProgress(100); // Reset progress when showing a new notification
  }, []);

  // Function to hide notification
  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  // Progress bar countdown effect
  useEffect(() => {
    if (notification.open) {
      const timer = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 4 : 0));
      }, 100);

      // Close notification when progress reaches zero
      if (progress === 0) {
        hideNotification();
      }

      return () => clearInterval(timer);
    }
  }, [notification.open, progress, hideNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={hideNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {notification.message}
          {/* Progress bar at the bottom of the alert */}
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#fff", // Set progress bar color
              },
            }}
          />
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
