import Header1 from './components/header/Header1'
import Header2 from './components/header/Header2'
import Header3 from './components/header/Header3'
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from './components/hero/Hero';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/scroll/ScrollToTop';
import Login from './pages/Login'; 
import Register from "./pages/register";
export default function App() {
  const [theme, colorMode] = useMode();
  
  return (
   <ColorModeContext.Provider
      // @ts-ignore
      value={colorMode}
    >
      <ThemeProvider
        // @ts-ignore
        theme={theme}
      >
        <CssBaseline />
       <BrowserRouter>
        <Header1 />
        <Header2 />
       
        {/* <Header3 /> */}
         <Box bgcolor={theme.
// @ts-ignore
         palette.bg.main}>
            <Routes>
              <Route path="/" element={<><Hero /><Main /></>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Box>
        <Footer/>
        <ScrollToTop/>
         </BrowserRouter>
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
