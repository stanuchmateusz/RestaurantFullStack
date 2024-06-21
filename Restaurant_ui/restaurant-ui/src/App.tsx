import {Box, ChakraProvider,} from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import customTheme from "./theme"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import Footer from "./components/Footer"
import MessageComponent from "./components/MessageComponent"
import {MessageProvider} from "./MessageContext"
import Page404 from "./pages/404"

export const App = () => (
    <ChakraProvider theme={customTheme}>
        <MessageProvider>
            <Header/>
            <Navbar/>
            <MessageComponent/>
            <Box minHeight="80vh">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </Box>
        </MessageProvider>
        <Footer/>
    </ChakraProvider>
)
