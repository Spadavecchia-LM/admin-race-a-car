import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Image,
  Input,
} from "@nextui-org/react";
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
import { Carousel } from "flowbite-react";
import PreviewCard from "../utils/PreviewCard";
import EditarAuto from "../utils/EditarAuto";

const AutosTable = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(GlobalContext);
  const { autos } = state;

  const [autosFilter, setAutosFilter] = useState("");
  const [autosFiltrados, setAutosFiltrados] = useState(autos);

  useEffect(() => {
    const autosFiltrados = autos.filter((a) =>
      a.marca.toLowerCase().includes(autosFilter.toLowerCase())
    );

    setAutosFiltrados(autosFiltrados);
  }, [autosFilter]);

  const {
    isOpen: isItemsModalOpen,
    onOpen: onItemsModalOpen,
    onClose: onItemsModalClose,
  } = useDisclosure();

  const {
    isOpen: isImagesModalOpen,
    onOpen: onImagesModalOpen,
    onClose: onImagesModalClose,
  } = useDisclosure();

  const {
    isOpen: isPreviewModalOpen,
    onOpen: onPreviewModalOpen,
    onClose: onPreviewModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditAutoModalOpen,
    onOpen: onEditAutoModalOpen,
    onClose: onEditAutoModalClose,
  } = useDisclosure();

  const refresh = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKENDURL + "/autos/all", {
        headers: { idRol: state.admin.rolUsuario.id },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "GET_AUTOS",
          payload: data.sort((a, b) => a.id - b.id),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleDisponibilidad = async (id) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKENDURL + "/autos/" + id + "/cambiar-disponibilidad",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            idRol: state.admin.rolUsuario.id,
          },
        }
      );

      if (response.ok) {
        refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedAuto, setSelectedAuto] = useState(null);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(autosFiltrados.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return autosFiltrados.slice(start, end);
  }, [page, autosFiltrados]);

  const handleSelectedAutoForItems = (id) => {
    const autoEncontrado = autos.find((auto) => auto.id == id);
    setSelectedAuto(autoEncontrado);
    onItemsModalOpen();
  };
  const handleSelectedAutoForImages = (id) => {
    const autoEncontrado = autos.find((auto) => auto.id == id);
    setSelectedAuto(autoEncontrado);
    onImagesModalOpen();
  };
  const handleSelectedAutoForPreview = (id) => {
    const autoEncontrado = autos.find((auto) => auto.id == id);
    setSelectedAuto(autoEncontrado);
    onPreviewModalOpen();
  };
  const handleSelectedAutoForEditAuto = (id) => {
    const autoEncontrado = autos.find((auto) => auto.id == id);
    setSelectedAuto(autoEncontrado);
    onEditAutoModalOpen();
  };

  const selectedAutoItems = selectedAuto != null && [...selectedAuto?.items];

  const handleDelete = async (id) => {
    const rol = {
      id: state.admin.rolUsuario.id,
    };

    try {
      if (
        confirm("seguro queres eliminar el auto? se perderan todos los datos")
      ) {
        const response = await fetch(import.meta.env.VITE_BACKENDURL + "/autos/" + id, {
          method: "DELETE",
          headers: {
            idRol: rol.id,
          },
        });
        if (response.ok) {
          alert("borrado con exito");
          refresh();
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <Input
          type="search"
          value={autosFilter}
          onValueChange={setAutosFilter}
          className="w-1/4 my-5"
          placeholder="buscar por marca"
        />
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
              items incluidos
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              imagenes
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              traccion
            </TableColumn>
            <TableColumn className="bg-primaryGold text-primaryWhite">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={`no se encontraron autos con ${autosFilter}`}
            items={items}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.marca}</TableCell>
                <TableCell>{item.modelo}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.categoria.categoria}</TableCell>
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
                    onPress={() => handleSelectedAutoForItems(item.id)}
                  >
                    ver items
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className="text-primaryGold border-primaryGold"
                    variant="bordered"
                    onPress={() => handleSelectedAutoForImages(item.id)}
                  >
                    ver fotos
                  </Button>
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
                      <DropdownItem
                        key="previw"
                        onPress={() => handleSelectedAutoForPreview(item.id)}
                      >
                        previsualizar tarjeta
                      </DropdownItem>
                      <DropdownItem
                        key="editar"
                        onPress={() => handleSelectedAutoForEditAuto(item.id)}
                      >
                        editar
                      </DropdownItem>
                      <DropdownItem
                        key="cambiar estado"
                        onClick={() => handleToggleDisponibilidad(item.id)}
                      >
                        {item.disponible
                          ? "cambiar a no disponible"
                          : "cambiar a disponible"}
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleDelete(item.id)}
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

        <Modal isOpen={isItemsModalOpen} onOpenChange={onItemsModalClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Items Incluidos
                </ModalHeader>
                <ModalBody>
                  {selectedAuto.items.length == 0 ? (
                    <h1>no hay items asignados a este vehiculo</h1>
                  ) : (
                    selectedAutoItems.map((item, index) => {
                      return (
                        <Accordion key={index}>
                          <AccordionItem
                            title={`${item.nombre}`}
                            subtitle={<Chip color="success">incluido</Chip>}
                          ></AccordionItem>
                        </Accordion>
                      );
                    })
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" variant="light" onPress={onClose}>
                    cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          size="full"
          className="bg-secondaryBlue"
          isOpen={isImagesModalOpen}
          onOpenChange={onImagesModalClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <Carousel>
                    {selectedAuto.images.map((image) => {
                      return (
                        <img
                          src={image}
                          key={image}
                          alt="foto del auto"
                          className="w-1/2"
                        />
                      );
                    })}
                  </Carousel>
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" variant="light" onPress={onClose}>
                    cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          size="lg"
          className="p-5 bg-secondaryBlue"
          isOpen={isPreviewModalOpen}
          onOpenChange={onPreviewModalClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <PreviewCard publicacion={selectedAuto} />
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" variant="solid" onPress={onClose}>
                    cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          size="full"
          scrollBehavior="inside"
          isOpen={isEditAutoModalOpen}
          onOpenChange={onEditAutoModalClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  editar auto con ID : {selectedAuto.id}
                </ModalHeader>
                <ModalBody>
                  <EditarAuto auto={selectedAuto} />
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" variant="solid" onPress={onClose}>
                    cerrar
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
