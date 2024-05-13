import { useEffect, useState } from "react";
import Axios from 'axios'
 
function Employeeget() {
   
  const [Employee, setEmployee] = useState([])

  const fecthData = () => {
    return Axios.get("http://localhost:3000/api/Employee")
    .then((Response) => setuser(Response.data))
    .catch((error) => console.error("Error fetching data:", error))
  }

  useEffect(() => {
    fecthData()
  }, [])

  return Employee
}

export default [
  Employeeget

]
