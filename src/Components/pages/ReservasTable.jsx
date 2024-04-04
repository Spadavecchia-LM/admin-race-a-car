import React, { useEffect, useState } from "react";
import Header from "../Header";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  chip,
  Spinner,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { set } from "firebase/database";

const ReservasTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reservas, setReservas] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedReserva, setSelectedReserva] = useState(null)

  const handleSelectedReserva = (reserva) => {
    setSelectedReserva(reserva)
    onOpen()
  }

  useEffect(() => {
    const getReservas = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          import.meta.env.VITE_BACKENDURL + "/reservas/all"
        );

        if (response.ok) {
          const data = await response.json();
          setReservas(
            data.sort(
              (a, b) => new Date(b.fechaComienzo) - new Date(a.fechaComienzo)
            )
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        console.log(reservas);
        setIsLoading(false);
      }
    };

    getReservas();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen w-screen">
        {isLoading ? (
          <div className="w-screen h-screen grid place-items-center">
            <Spinner label="Cargando reservas" color="warning"></Spinner>
          </div>
        ) : (
          <>
            <h1 className="text-[50px] text-center py-10">Reservas</h1>
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  USUARIO
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  AUTO
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  FECHA INICIO
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  FECHA FIN
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  LUGAR RECOGIDA
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  LUGAR ENTREGA
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  METODO DE PAGO
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  TOTAL
                </TableColumn>
                <TableColumn className="bg-primaryGold text-primaryWhite">
                  ESTADO
                </TableColumn>
              </TableHeader>
              <TableBody>
                {reservas.map((r) => {
                  const fin = new Date(r.fechaFin).getTime(); // Obtener el tiempo en milisegundos
                  const hoy = new Date().getTime();

                  return (
                    <TableRow key={r.id}>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-primaryGold text-primaryWhite"
                          onClick={()=> handleSelectedReserva(r)}
                        >
                          ver datos
                        </Button>
                      </TableCell>
                      <TableCell>
                        {r.auto.marca} {r.auto.modelo}
                      </TableCell>
                      <TableCell>
                        {r.fechaComienzo.split("-").reverse().join("/")}
                      </TableCell>
                      <TableCell>
                        {r.fechaFin.split("-").reverse().join("/")}
                      </TableCell>
                      <TableCell>{r.recogida}</TableCell>
                      <TableCell>{r.entrega}</TableCell>
                      <TableCell>{r.formaDePago}</TableCell>
                      <TableCell>$ {r.total}</TableCell>
                      <TableCell>
                        {fin - hoy > 0 ? (
                          <Chip color="primary">Activa</Chip>
                        ) : (
                          <Chip color="danger">Finalizada</Chip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Datos del usuario
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex w-full flex-col">
                        <Tabs aria-label="Options">
                          <Tab key="Nombre" title="Nombre">
                            <Card>
                              <CardBody>
                              {selectedReserva.usuario.nombre} {selectedReserva.usuario.apellido} 
                              </CardBody>
                            </Card>
                          </Tab>
                          <Tab key="Email" title="Email">
                            <Card>
                              <CardBody>
                              {selectedReserva.usuario.email} 
                              </CardBody>
                            </Card>
                          </Tab>
                          <Tab key="Teléfono" title="Teléfono">
                            <Card>
                              <CardBody>
                              {selectedReserva.usuario.telefono} 
                              </CardBody>
                            </Card>
                          </Tab>
                          <Tab key="Documento" title="Documento">
                            <Card>
                              <CardBody>
                              {selectedReserva.usuario.documento} 
                              </CardBody>
                            </Card>
                          </Tab>
                          <Tab key="valoracion" title="Valoración">
                            <Card>
                              <CardBody>
                              {selectedReserva.valoracion == null ? "sin valoracion" : `${selectedReserva.valoracion.resena} - ${selectedReserva.valoracion.valoracion} ⭐`} 
                              </CardBody>
                            </Card>
                          </Tab>
                        </Tabs>
                      </div>
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
          </>
        )}
      </div>
    </>
  );
};

export default ReservasTable;
