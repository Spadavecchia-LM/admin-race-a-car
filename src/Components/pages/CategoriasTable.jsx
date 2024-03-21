import React, { useContext, useState } from 'react'
import Header from '../Header'
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Dropdown,DropdownItem, DropdownTrigger, Button, DropdownMenu} from "@nextui-org/react";
import { GlobalContext } from '../../Context/AppContext';
import { HiDotsVertical } from 'react-icons/hi';
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/react";
import AgregarCategoria from './AgregarCategoria';
import EditarCategoria from '../utils/EditarCategoria';
import Swal from 'sweetalert2';



const CategoriasTable = () => {

  const {state,dispatch} = useContext(GlobalContext)

  const {categorias} = state

  const [selectedCategoria, setSelectedCategoria] = useState({})

  const {
    isOpen: isNuevaCategoriaOpen,
    onOpen: onNuevaCategoriaOpen,
    onClose: onNuevaCategoriaClose,
  } = useDisclosure();


  const displayAlertForDeleteAction = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion eliminara la categoria y todos los autos asignados a ella. Tambien eliminara las reservas hechas con dichos autos, no se recomienda proceder con esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Quiero eliminar de todos modos",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id)
      }
    });
  }
  
  const {
    isOpen: isEditCategoriaOpen,
    onOpen: onEditCategoriaOpen,
    onClose: onEditCategoriaClose,
  } = useDisclosure();

  const refresh = async () => {
    try {
      const response = await fetch("http://localhost:8085/categoria/all");
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "GET_CATEGORIAS", payload: data });
        const autosResponse = await fetch("http://localhost:8085/autos/all")
        if(autosResponse.ok){
          const data = await autosResponse.json()
          dispatch({ type: "GET_AUTOS", payload: data.sort((a,b) => a.id - b.id ) });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectedCategoria = (id) =>{
    const categoria = categorias.find(cat => cat.id == id)
    setSelectedCategoria(categoria)
  }

  const handleDelete = async (id) => {
    try{
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
        Swal.fire({
          title: "¡Borrado exitosamente!",
          text: "La categoria y los autos asignados a ella fueron eliminados correctamente, tambien las reservas hechas con los autos de esa categoria",
          icon: "success"
        });
        refresh()
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
            onPress={onNuevaCategoriaOpen}
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
                          <DropdownItem key={"editar"} aria-label='editar' onClick={()=> handleSelectedCategoria(categoria.id)} onPress={onEditCategoriaOpen}>editar</DropdownItem>
                            <DropdownItem key={"eliminar"} aria-label='eliminar' color='danger' onClick={() => displayAlertForDeleteAction(categoria.id)}>eliminar</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>

                  </TableRow>
                )
              })}
      </TableBody>
    </Table>
    <Modal isOpen={isNuevaCategoriaOpen} onOpenChange={onNuevaCategoriaOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar nueva categoria</ModalHeader>
              <ModalBody>
                <AgregarCategoria/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onNuevaCategoriaClose}>
                  cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditCategoriaOpen} onOpenChange={onEditCategoriaOpen}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody>
              <EditarCategoria categoria={selectedCategoria}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onEditCategoriaClose}>
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