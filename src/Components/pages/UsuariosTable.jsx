import React, { useContext } from 'react'
import Header from '../Header'
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Dropdown,DropdownItem, DropdownTrigger, Button, DropdownMenu} from "@nextui-org/react";
import { GlobalContext } from '../../Context/AppContext';
import { HiDotsVertical } from 'react-icons/hi';


const UsuariosTable = () => {

  const {state} = useContext(GlobalContext)

  const {usuarios} = state

  return (
    <div>
      <Header/>

      <div className="flex justify-between items-center text-fsSubtitle text-primaryBlue mb-20 mt-10 w-[98vw] mx-auto">
          <h3>Tabla de usuarios</h3>
        </div>
      <Table aria-label="Example static collection table" className='mt-10 mb-10 w-screen' isStriped>
      <TableHeader>
        <TableColumn className='bg-primaryGold text-primaryWhite'>ID</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>NOMBRE</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>APELLIDO</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>EMAIL</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>DOCUMENTO</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>TELEFONO</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>ROL</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>ACCIONES</TableColumn>





      </TableHeader>
      <TableBody>
              {usuarios?.map(usuario => {
                return(
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
                            <Button><HiDotsVertical/></Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key={"permisos"} aria-label='permisos'>{usuario.rolUsuario.rol == "USER" ? "hacer administrador" : "quitar administrador"}</DropdownItem>
                            <DropdownItem key={"eliminar"} aria-label='eliminar' color='danger'>eliminar</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>

                  </TableRow>
                )
              })}
      </TableBody>
    </Table>
    </div>
  )
}

export default UsuariosTable