import "./App.css";
import AuthProvider from "./components/Providers/Auth.provider";
import { NotificationProvider } from "./components/Providers/Notification.provider";
import AppRouter from "./components/AppRouter/AppRouter";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
