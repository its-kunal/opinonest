import { useEffect, Suspense, lazy } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
const Home = lazy(() => import("./views/Home"));
const Create = lazy(() => import("./views/Create"));
const Poll = lazy(() => import("./views/Poll"));
const User = lazy(() => import("./views/User"));
const Register = lazy(() => import("./views/Register"));
const Login = lazy(() => import("./views/Login"));
const MyResponses = lazy(() => import("./views/MyResponses"));
const MyPolls = lazy(() => import("./views/MyPolls"));
import { useAppContext } from "./hooks/useAppContext";
import Loader from "./components/Loader";
export default function App() {
  const { error, setError, message, setMessage } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname == "/login") {
      return;
    } else if (!localStorage.getItem("token")) {
      navigate("/register");
    }
  }, [navigate]);
  const handleErrorClose = () => {
    setError(null);
  };
  const handleMessageClose = () => {
    setMessage(null);
  };

  const myRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/mypolls",
      element: <MyPolls />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/myresponses",
      element: <MyResponses />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/poll/:pollId",
      element: <Poll />,
    },
  ];

  return (
    <Box>
      <Navbar />
      {/* Snackbar for error */}
      <Snackbar
        open={error != null}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        message={error}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      {/* Snackbar for Messages */}
      <Snackbar
        open={message != null}
        autoHideDuration={3000}
        onClose={handleMessageClose}
        message={message}
      />
      <Box sx={{ padding: 4 }}>
        <Routes>
          {myRoutes.map((v, idx) => {
            return (
              <Route
                path={v.path}
                element={<Suspense fallback={<Loader />}>{v.element}</Suspense>}
                key={idx}
              />
            );
          })}
        </Routes>
      </Box>
    </Box>
  );
}
