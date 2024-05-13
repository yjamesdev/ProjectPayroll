import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import DialogCreate from '../Create/Employee'

export function TablesEmployee() {
  const [dataEmployee, setDataEmployee] = useState([]);
  const [openCreateEmployeeDialog, setOpenCreateEmployeeDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Employee");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataEmployee(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  const handleOpenCreateEmployeeDialog = () => {
    setOpenCreateEmployeeDialog(true);
  };

  const handleCloseCreateEmployeeDialog = () => {
    setOpenCreateEmployeeDialog(false);
    fetchData(); 
  };
  
  const handleDeleteEmployee = async (id) => {  
    try {
      const response = await axios.delete(`http://localhost:3000/api/Employee/${id}`);
      console.log("Employee deleted:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Table Employee
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <Button className="flex items-center gap-3" onClick={handleOpenCreateEmployeeDialog}>
            <UserPlusIcon fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5" />
            Add to Employee
          </Button>
          <DialogCreate open={openCreateEmployeeDialog} handleClose={handleCloseCreateEmployeeDialog} />
        </CardBody>

          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Cod",
                  "Identification card",
                  "Name",
                  "Lastname",
                  "Departament",
                  "Position",
                  "status",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataEmployee.map(
                ({
                  ID,
                  CodEmployee,
                  IdCard,
                  Name,
                  Lastname,
                  Departament,
                  Post,
                  status,
                }) => (
                  <tr key={parseInt(ID)}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {CodEmployee}
                    </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {IdCard}
                    </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {Name}
                    </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {Lastname}
                    </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {Departament.Name}
                    </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {Post}
                    </Typography>
                    </td>
                   <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Chip
                    variant="gradient"
                    color={status === "Active" ? "green" : status === "Disabled" ? "red" : "blue-gray"}
                    value={status}
                   className="py-0.5 px-2 text-[11px] font-medium w-fit"
                   />
                    </td> 
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Tooltip content="Edit User">
                        <IconButton >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td> 
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Tooltip content="Delete User">
                    <IconButton onClick={() => handleDeleteEmployee(ID)}>
  <TrashIcon className="h-4 w-4" />
</IconButton>

                      </Tooltip>  
                    </td> 
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default TablesEmployee;
