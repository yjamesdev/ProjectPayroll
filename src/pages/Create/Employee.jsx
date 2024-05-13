import React, { useState, useEffect } from "react";
import "react-widgets/styles.css";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography
} from "@material-tailwind/react";
import axios from "axios";
import DropdownList from "react-widgets/Combobox";

export function CreateEmployee({ open, handleClose }) {
  const [departments, setDepartments] = useState([]);
  const [Status, setStatus ] = useState([])
  const [formData, setFormData] = useState({
    "IdCard": "",
    "Adress": "",
    "Phone": "",
    "Name": "",
    "Lastname": "",
    "DepartamentId": parseInt(""), 
    "Contract": 1,
    "Post": "",
    "BankCheck": 0,
    "Date": "",
    "status": "Active",
  });

  const isAnyFieldFilled = Object.values(formData).some(value => value !== "");

  if (!isAnyFieldFilled) {
    alert("Please fill in at least one field.");
    return;
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Departament");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchStatus = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/Employee");
            const employeeStatus = response.data.map(employee => employee.status);
            setStatus(employeeStatus);
        } catch (error) {
            console.error("Error fetching Employee:", error);
        }
    }
  
    fetchStatus()
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "DepartamentId" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };
  
  const handleSubmit = async () => {
    try {
      // Convertir la fecha a formato ISO-8601
      const isoDate = new Date(formData.Date).toISOString();
  
      let departmentId;
      if (formData.DepartamentId) {
        departmentId = formData.DepartamentId;
      } else {
        const departmentResponse = await axios.post("http://localhost:3000/api/Departament");
        departmentId = departmentResponse.data.id;
      }

      setFormData({
        "IdCard": "",
        "Adress": "",
        "Phone": "",
        "Name": "",
        "Lastname": "",
        "DepartamentId": parseInt(""), 
        "Contract": 1,
        "Post": "",
        "BankCheck": 0,
        "Date": "",
        "status": "Active",
      });
  
      const employeeData = {
        Name: formData.Name,
        Lastname: formData.Lastname,
        IdCard: formData.IdCard,
        Adress: formData.Adress,
        Phone: formData.Phone,
        DepartamentId: departmentId,
        Contract: formData.Contract,
        Post: formData.Post,
        BankCheck: formData.BankCheck,
        Date: isoDate, 
        status: formData.status,
      };
  
      const response = await axios.post("http://localhost:3000/api/Employee", employeeData);
      console.log("Employee created:", response.data);
      
      // Cerrar el diálogo
      handleClose();
      
      // Actualizar la tabla de empleados
      fetchEmployees();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };
  
  

  return (
    <Dialog open={open} onClose={handleClose} size="lg">
      <DialogHeader className="flex justify-center">
        <Typography className="mb-1" variant="h4">
          Create Employee
        </Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute top-2 right-2 h-5 w-5 cursor-pointer"
          onClick={handleClose}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </DialogHeader>
      <DialogBody>
        <div className="grid gap-6 grid-cols-2">
          <Input
            label="Identification card"
            name="IdCard"
            value={formData.IdCard}
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            label="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            label="Lastname"
            name="Lastname"
            value={formData.Lastname}
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            label="Phone"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            label="Adress"
            name="Adress"
            value={formData.Adress}
            onChange={handleChange}
            required
            className="w-full"
          />
          <DropdownList
            data={departments}
            textField="Name"
            valueField="ID"
            onChange={(department) => setFormData({ ...formData, DepartamentId: department.ID })}
            defaultValue={formData.DepartamentId}
          />

          <Input
            label="Workstation"
            name="Post"
            value={formData.Post}
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            label="Contract"
            name="Contract"
            value={formData.Contract}
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            label="Date"
            name="Date"
            type="date"
            value={formData.Date}
            onChange={handleChange}
            className="w-full"
          />
          <DropdownList data={["Active"]} />
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button variant="text" color="gray" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="gray" onClick={handleSubmit} onAuxClick={handleClose}>
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default CreateEmployee;
