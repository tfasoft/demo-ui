import {
  createTheme,
  ThemeProvider,
  colors,
  CssBaseline,
  Box,
} from "@mui/material";

import { Vazirmatn } from "next/font/google";

import { Provider } from "react-redux";

import { createStore } from "redux";

import { loadState, saveState } from "@/redux/store/localstore";
import reducers from "@/redux/reducers";

import { Navbar } from "@/components";
import { AppLayout } from "@/layouts";

const vazir = Vazirmatn({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: vazir.style.fontFamily,
    },
    palette: {
      primary: {
        main: colors.indigo[500],
      },
      white: {
        main: "#ffffff",
      },
    },
  });

  const persistedState = loadState();

  let store = createStore(reducers, persistedState);

  store.subscribe(() =>
    saveState({
      user: store.getState().user,
      token: store.getState().token,
    })
  );

  // const { token } = useSelector((state) => state);

  // if (token) {
  //   API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <Navbar />
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}
