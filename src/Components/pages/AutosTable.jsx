import { Accordion, AccordionItem, Button, Chip } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalHeader,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import { GlobalContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const AutosTable = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { state, dispatch } = useContext(GlobalContext);

  const [ selectedAuto, setSelectedAuto ] = useState(null);



  const { autos } = state;

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(autos.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return autos.slice(start, end);
  }, [page, autos]);


  const handleSelectedAuto = (id) => {
    const autoEncontrado = autos.find((auto) => auto.id == id);
    setSelectedAuto(autoEncontrado);
    onOpen()

   
  };

  const selectedAutoItems = selectedAuto != null && [...selectedAuto?.items]
  useEffect(() => {
    console.log(selectedAutoItems)
  },[selectedAuto])

  return (
    <>
      <Header />
      <div className="w-[95vw] mx-auto min-h-screen ">
        <div className="flex justify-between items-center text-fsSubtitle text-primaryBlue mb-20 mt-10">
          <h3>Tabla de vehículos</h3>
          <Button
            variant="solid"
            className="bg-primaryGold text-primaryWhite"
            size="lg"
            onClick={() => navigate("/dashboard/agregar/auto")}
          >
            Agregar nuevo vehículo
          </Button>
        </div>

        <Table
          isStriped
          removeWrapper
          aria-label="Example static collection table"
          className="mb-20"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="warning"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              ID
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              marca
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              modelo
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              color
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              categoria
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              año
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              Capacidad
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              caballos de fuerza
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              disponible
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              Precio por dia
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              tipo de caja
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              items disponibles
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              traccion
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.marca}</TableCell>
                <TableCell>{item.modelo}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.anio}</TableCell>
                <TableCell>{item.capacidad}</TableCell>
                <TableCell>{item.caballosDeFuerza}</TableCell>
                <TableCell>
                  <Chip color={item.disponible ? "primary" : "danger"}>
                    {item.disponible ? "si" : "no"}
                  </Chip>
                </TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>{item.tipoDeCaja}</TableCell>
                <TableCell>
                  <Button
                    className="bg-primaryGold text-primaryWhite"
                    onPress={() => handleSelectedAuto(item.id)}
                  >ver items</Button>
                </TableCell>
                <TableCell>{item.traccion}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        size="sm"
                        className="border-primaryGold"
                      >
                        <HiOutlineDotsVertical />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="editar" isDisabled>
                        editar
                      </DropdownItem>
                      <DropdownItem key="cambiar estado">
                        cambiar estado
                      </DropdownItem>
                      <DropdownItem
                        key="borrar"
                        className="text-danger"
                        color="danger"
                      >
                        borrar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Items disponibles
                </ModalHeader>
                <ModalBody>
                  {selectedAuto.items.length == 0 ? 
                  <h1>no hay items asignados a este vehiculo</h1>  
                  :
                  selectedAutoItems.map((item,index) => {
                    return(
                      <Accordion key={index}>
                        
                        <AccordionItem title={`${item.nombre}`} subtitle={<Chip color={item.incluido ? "success" : "danger"}>{item.incluido ? "incluido" : "no incluido"}</Chip>}>
                        <ul >
                          <li>categoria: {item.categoria}</li>
                          <li>precio: {item.precio}</li>
                          <li>esta incluido: {item.incluido ? "si" : "no"}</li>
                      </ul>
                        </AccordionItem>
                      </Accordion>
                   
                    )
                  })
                }

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default AutosTable;
