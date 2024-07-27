import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " You have been logged out!" } })
	}

	return (
		<>
			 <Button variant="text" color="inherit" onClick={handleLogout}> 
            LOGOUT
        </Button>
		
		</>
	)
}

export default Logout
