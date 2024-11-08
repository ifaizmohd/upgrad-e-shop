import "./App.css";
import AuthProvider from "./components/Providers/Auth.provider";
import { NotificationProvider } from "./components/Providers/Notification.provider";
import AppRouter from "./components/AppRouter/AppRouter";
import StoreProvider from "./components/Providers/Store.provider";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <NotificationProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </NotificationProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
