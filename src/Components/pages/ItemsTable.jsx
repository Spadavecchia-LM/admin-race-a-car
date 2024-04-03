
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Dropdown,DropdownItem, DropdownTrigger, Button, DropdownMenu} from "@nextui-org/react";
import { GlobalContext } from '../../Context/AppContext';
import { HiDotsVertical } from 'react-icons/hi';
import {  Modal,   ModalContent, ModalFooter, useDisclosure} from "@nextui-org/react";
import EditarItemIncluido from '../utils/EditarItemIncluido';
const ItemsTable = () => {

    const {state,dispatch} = useContext(GlobalContext)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [items, setItems] = useState([])

    const [selectedItem, setSelectedItem] = useState(null)
    useEffect(() => {

        const getItems = async() => {
            try{
                const response = await fetch(import.meta.env.VITE_BACKENDURL + "/items/todos")

                if(response.ok){
                    const data = await response.json()
                    setItems(data)
                }
            }catch(err){
                console.log(err)
            }
        }
getItems()
    },[])

  

    const handleSelectedItems = (id) => {
        const itemEncontrado = items.find((i) => i.id == id);
        setSelectedItem(itemEncontrado);
        onOpen();
      };
 

  return (
    <>
      <Header/>
      
      <div className="flex justify-between items-center text-fsSubtitle text-primaryBlue mb-20 mt-10 w-[98vw] mx-auto">
          <h3>Tabla de items incluidos</h3>
     
        </div>
      <Table aria-label="Example static collection table" className='mt-10 mb-10 w-1/2 h-[80vh] mx-auto' isStriped>
      <TableHeader>
        <TableColumn className='bg-primaryGold text-primaryWhite'>ID</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>NOMBRE</TableColumn>
        <TableColumn className='bg-primaryGold text-primaryWhite'>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody>
              {items?.map(item => {
                return(
                  <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.nombre}</TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button><HiDotsVertical/></Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key={"editar"} aria-label='editar' onPress={()=>handleSelectedItems(item.id)}>editar</DropdownItem>
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
                <EditarItemIncluido item={selectedItem}/>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ItemsTable