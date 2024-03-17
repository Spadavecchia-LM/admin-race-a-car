import React, { useContext } from 'react'
import Header from '../Header'
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Dropdown,DropdownItem, DropdownTrigger, Button, DropdownMenu} from "@nextui-org/react";
import { GlobalContext } from '../../Context/AppContext';
import { HiDotsVertical } from 'react-icons/hi';
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/react";
import AgregarCategoria from './AgregarCategoria';



const CategoriasTable = () => {

  const {state,dispatch} = useContext(GlobalContext)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {categorias} = state

  const refresh = async () => {
    try {
      const response = await fetch("http://localhost:8085/categoria/all");
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "GET_CATEGORIAS", payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try{
      if(confirm("seguro? esta accion sera definitiva y se podran recuperar los datos")){
        const response = await fetch("http://localhost:8085/categoria/" + id,
        {
          method:"DELETE",
          headers: {
            "Context-Type": "application/json",
            "idRol": state.admin.rolUsuario.id
          }
        }
      )
      if(response.ok){
        alert("borrado con exito!")
        refresh()
      }
      }
  


    }catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <Header/>
      
      <div className="flex justify-between items-center text-fsSubtitle text-primaryBlue mb-20 mt-10 w-[98vw] mx-auto">
          <h3>Tabla de categorias</h3>
          <Button
            variant="solid"
            className="bg-primaryGold text-primaryWhite"
            size="lg"
            onPress={onOpen}
          >
            Agregar nueva categoria
          </Button>
        </div>
      <Table aria-label="Example static collection table" className='mt-10 mb-10 w-1/2 mx-auto' isStriped>
      <TableHeader>
        <TableColumn className='bg-primaryGold text-primaryWhite'>ID</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>NOMBRE</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody>
              {categorias?.map(categoria => {
                return(
                  <TableRow key={categoria.id}>
                      <TableCell>{categoria.id}</TableCell>
                      <TableCell>{categoria.categoria}</TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button><HiDotsVertical/></Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key={"editar"} aria-label='editar'>editar</DropdownItem>
                            <DropdownItem key={"eliminar"} aria-label='eliminar' color='danger' onClick={() => handleDelete(categoria.id)}>eliminar</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>

                  </TableRow>
                )
              })}
      </TableBody>
    </Table>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar nueva categoria</ModalHeader>
              <ModalBody>
                <AgregarCategoria/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CategoriasTable