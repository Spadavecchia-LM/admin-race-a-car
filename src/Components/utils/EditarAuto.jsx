import { Input, Select, SelectItem, Button, Spinner } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { uploadFiles } from "../../firebase/config";
import { GlobalContext } from "../../Context/AppContext";
const EditarAuto = ({ auto }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategorias = async () => {
      const response = await fetch("http://localhost:8085/categoria/all");

      if (response.ok) {
        const data = await response.json();
        setCategorias([...data]);
      }
    };
    getCategorias();
  }, []);

  const { state, dispatch } = useContext(GlobalContext);

  const refresh = async () => {
    try {
      const response = await fetch("http://localhost:8085/autos/all", {
        headers: {"idRol": state.admin.rolUsuario.id, },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "GET_AUTOS", payload: data.sort((a,b) => a.id - b.id ) });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [categorias, setCategorias] = useState([]);

  const [nuevoAuto, setNuevoAuto] = React.useState({
    id: auto.id,
    marca: auto.marca,
    modelo: auto.modelo,
    color: auto.color,
    idCategoria: auto.idCategoria,
    anio: auto.anio,
    capacidad: auto.capacidad,
    tipoDeCaja: auto.tipoDeCaja,
    caballosDeFuerza: auto.caballosDeFuerza,
    traccion: auto.traccion,
    combustion: auto.combustion,
    valor: auto.valor,
    disponible: true,
  });

  const [imagenes, setImagenes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNuevoAuto({ ...nuevoAuto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postAutoPromise = fetch("http://localhost:8085/autos/" + auto.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "idRol": state.admin.rolUsuario.id,
        },
        body: JSON.stringify(nuevoAuto),
      });

      const postAutoResponse = await postAutoPromise;

      if (postAutoResponse.ok) {
        alert("el auto se edito correctamente");
        setNuevoAuto({
          id: null,
          marca: "",
          modelo: "",
          color: "",
          idCategoria: null,
          anio: null,
          capacidad: null,
          tipoDeCaja: "",
          caballosDeFuerza: null,
          traccion: "",
          combustion: "",
          valor: null,
          disponible: true,
        });

        document.querySelector("#form").reset();
        refresh();
      } else {
        alert("ocurrio un error al querer editar el auto");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form id="form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          className="w-1/2"
          name="marca"
          variant="underlined"
          size="md"
          label="nueva marca"
          onChange={handleInputChange}
          defaultValue={auto.marca}
        ></Input>

        <Input
          className="w-1/2"
          name="modelo"
          variant="underlined"
          size="md"
          label="nuevo modelo"
          onChange={handleInputChange}
          defaultValue={auto.modelo}
        ></Input>

        <Input
          className="w-1/2"
          name="color"
          variant="underlined"
          size="md"
          label="nuevo color"
          onChange={handleInputChange}
          defaultValue={auto.color}
        ></Input>

        <Input
          className="w-1/2"
          name="anio"
          type="number"
          variant="underlined"
          label="nuevo año"
          size="md"
          onChange={handleInputChange}
          defaultValue={auto.anio}
        ></Input>

        <Input
          className="w-1/2"
          name="capacidad"
          type="number"
          variant="underlined"
          label="nueva capacidad"
          defaultValue={auto.capacidad}
          size="md"
          onChange={handleInputChange}
        ></Input>

        <Input
          className="w-1/2"
          name="caballosDeFuerza"
          type="number"
          label="nuevos caballos de fuerza"
          variant="underlined"
          defaultValue={auto.caballosDeFuerza}
          size="md"
          onChange={handleInputChange}
        ></Input>

        <Select
          className="w-1/2"
          name="idCategoria"
          label="nueva categoria"
          variant="underlined"
          defaultValue={auto.idCategoria}
          size="md"
          onChange={handleInputChange}
        >
          {categorias?.map((categoria) => {
            return (
              <SelectItem key={categoria.id} value={categoria.id}>
                {categoria.categoria}
              </SelectItem>
            );
          })}
        </Select>

        <Select
          className="w-1/2"
          name="tipoDeCaja"
          label="nuevo tipo de caja"
          defaultValue={auto.tipoDeCaja}
          variant="underlined"
          size="md"
          onChange={handleInputChange}
        >
          <SelectItem key={"Automática"} value={"Automática"}>
            Automatica
          </SelectItem>
          <SelectItem key={"Manual"} value={"Manual"}>
            Manual
          </SelectItem>
        </Select>

        <Select
          className="w-1/2"
          name="combustion"
          label="nuevo tipo de combustion"
          defaultValue={auto.combustion}
          variant="underlined"
          size="md"
          onChange={handleInputChange}
        >
          <SelectItem key={"Naftero"} value={"Naftero"}>
            Naftero
          </SelectItem>
          <SelectItem key={"Hibrido"} value={"Hibrido"}>
            Hibrido
          </SelectItem>
          <SelectItem key={"Electrico"} value={"Electrico"}>
            Electrico
          </SelectItem>
        </Select>

        <Select
          className="w-1/2"
          name="traccion"
          label="nuevo tipo de traccion"
          defaultValue={auto.traccion}
          variant="underlined"
          size="md"
          onChange={handleInputChange}
        >
          <SelectItem key={"Delantera"} value={"Delantera"}>
            Delantera
          </SelectItem>
          <SelectItem key={"Trasera"} value={"Trasera"}>
            Trasera
          </SelectItem>
          <SelectItem key={"Integral"} value={"Integral"}>
            Integral
          </SelectItem>
        </Select>

        <Input
          className="w-1/2"
          name="valor"
          type="number"
          label="nuevo precio"
          defaultValue={auto.valor}
          variant="underlined"
          size="md"
          onChange={handleInputChange}
        ></Input>

        <div className="flex mt-10">
          <Button
            className="w-1/2 mx-auto bg-primaryBlue text-primaryWhite"
            type="submit"
          >
            {isLoading ? <Spinner /> : "confirmar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditarAuto;
