import "./App.css";
import AuthProvider from "./common/Provider/Auth.provider";
import { NotificationProvider } from "./common/Provider/Notification.provider";
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
