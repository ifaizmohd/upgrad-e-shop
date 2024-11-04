import "./App.css";
import AuthProvider from "./common/Provider/Auth.provider";
import AppRouter from "./components/AppRouter/AppRouter";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
