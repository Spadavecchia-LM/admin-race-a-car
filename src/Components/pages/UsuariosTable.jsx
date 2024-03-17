import React, { useContext } from "react";
import Header from "../Header";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  Button,
  DropdownMenu,
} from "@nextui-org/react";
import { GlobalContext } from "../../Context/AppContext";
import { HiDotsVertical } from "react-icons/hi";

const UsuariosTable = () => {
  const { state, dispatch } = useContext(GlobalContext);



  const { usuarios } = state;

  const refresh = async () => {
    try {
      const response = await fetch("http://localhost:8085/usuarios/all",   {
        headers: {
            "idRol": state.admin.rolUsuario.id
        }
    });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "GET_USUARIOS", payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setToUser = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8085/admin/" + id + "/rol/user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "idRol": state.admin.rolUsuario.id
          },
          body: JSON.stringify(adminId),
        }
      );

      if (response.ok) {
        alert("se cambio exitosamente");
        refresh();
      } else {
        alert("no cuentas con permisos para realizar esta accion");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setToAdmin = async(id) => {
    try {
      const response = await fetch(
        "http://localhost:8085/admin/" + id + "/rol/admin",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "idRol": state.admin.rolUsuario.id

          },
        
        }
      );

      if (response.ok) {
        alert("se cambio exitosamente");
        refresh();
      } else {
        alert("no cuentas con permisos para realizar esta accion");
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <Header />

      <div className="flex justify-between items-center text-fsSubtitle text-primaryBlue mb-20 mt-10 w-[98vw]">
        <h3 className="ml-4">Tabla de usuarios</h3>
      </div>
      <Table
        aria-label="Example static collection table"
        className="mt-10 mb-10 w-screen min-h-screen"
        isStriped
      >
        <TableHeader>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            ID
          </TableColumn>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            NOMBRE
          </TableColumn>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            APELLIDO
          </TableColumn>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            EMAIL
          </TableColumn>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            DOCUMENTO
          </TableColumn>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            TELEFONO
          </TableColumn>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            ROL
          </TableColumn>
          <TableColumn className="bg-primaryGold text-primaryWhite">
            ACCIONES
          </TableColumn>
        </TableHeader>
        <TableBody>
          {usuarios?.map((usuario) => {
            return (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.documento}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>{usuario.rolUsuario.rol}</TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button>
                        <HiDotsVertical />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      {usuario.rolUsuario.id == 1 ? (

                        <DropdownItem
                          key={"permisos"}
                          onClick={() => setToAdmin(usuario.id)}
                          aria-label="permisos"
                        >
                          hacer administrador
                        </DropdownItem>
                      ) :
                      
                      (
                        <DropdownItem
                          key={"permisos"}
                          onClick={() => setToUser(usuario.id)}
                          aria-label="permisos"
                          isDisabled={state.admin.rolUsuario.id == 3 && usuario.rolUsuario.id == 3 ? true : false}
                        >
                          quitar administrador
                        </DropdownItem>
                      ) 
                        
                    
                      }
                      <DropdownItem
                      isDisabled
                        key={"eliminar"}
                        aria-label="eliminar"
                        color="danger"
                      >
                        eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsuariosTable;
