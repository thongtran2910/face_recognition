import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userRoute } from "./routes/userRoute";

function App() {
  return (
    <div className="App croll-smooth h-screen">
      <BrowserRouter>
        <Routes>
          {userRoute.map((route, index) => {
            if (route.isUseLayout) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              );
            }
            return (
              <Route key={index} path={route.path} element={route.component} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
