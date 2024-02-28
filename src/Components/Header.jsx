import React, { useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate()

  return (
    <Navbar className="bg-primaryBlue text-primaryWhite">
      <NavbarBrand>
      
        <p className="font-bold text-inherit cursor-pointer" onClick={() => navigate("/dashboard")}>RACE-A-CAR</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-primaryWhite"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                Vehículos
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="agregarAuto"
              onClick={() => navigate("/dashboard/agregar/auto")}
            >
              Agregar nuevo vehículo
            </DropdownItem>
            <DropdownItem
              key="autos"
              onClick={() => navigate("/dashboard/autos")}
            >
              Tabla de vehículos
            </DropdownItem>
        
          </DropdownMenu>
        </Dropdown>


        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                isDisabled
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-primaryWhite"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                Categorias
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              onClick={()=> navigate("/dashboard/agregar/publicacion")}
            >
              Agregar nueva categoria
            </DropdownItem>
            <DropdownItem
              key="autoscaling"
              onClick={() => navigate("/dashboard/publicaciones")}
            >
              Tabla de categorias
            </DropdownItem>
        
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                isDisabled
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-primaryWhite"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                Usuarios
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              onClick={() => navigate("/dashboard/publicaciones")}
            >
              Tabla de Usuarios
            </DropdownItem>
        
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                isDisabled
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-primaryWhite"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                Items
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              onClick={() => navigate("/dashboard/publicaciones")}
            >
              tabla de Items incluidos
            </DropdownItem>
        
          </DropdownMenu>
        </Dropdown>
  
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                isDisabled
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-primaryWhite"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                Reservas
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              onClick={() => navigate("/dashboard/publicaciones")}
            >
              Tabla de reservas
            </DropdownItem>
        
          </DropdownMenu>
        </Dropdown>
       
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={() => navigate("/")} color="danger" href="#" variant="solid">
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;