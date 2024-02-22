const publicaciones = [
    {
        id:1,
        marca: "BMW",
        modelo: "X7 M50i",
        anio: 2022,
        precio: 87,
        capacidad: 5,
        categoria: "SUV",
        hp:350,
        transmision:"manual",
        imagenes: [
            "https://www.wsupercars.com/wallpapers-regular/BMW/2019-BMW-X7-006-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2019-BMW-X7-004-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2019-BMW-X7-001-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2019-BMW-X7-005-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2019-BMW-X7-007-1600.jpg",
        ]

    },
    {
        id:2,
        marca: "Porsche",
        modelo: "Cayenne GTS",
        anio: 2022,
        precio: 70,
        capacidad: 4,
        categoria: "Sedan",
        hp:350,
        transmision:"manual",
        imagenes: [
            "https://www.wsupercars.com/wallpapers-regular/Porsche/2020-Porsche-Cayenne-GTS-004-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/Porsche/2020-Porsche-Cayenne-GTS-003-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/Porsche/2015-Porsche-Cayenne-GTS-005-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/Porsche/2020-Porsche-Cayenne-GTS-007-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/Porsche/2020-Porsche-Cayenne-GTS-005-1600.jpg",

        ]

    },
    {
        id:3,
        marca: "Mc Laren",
        modelo: "750s",
        anio: 2024,
        precio: 90,
        capacidad: 2,
        categoria: "GT",
        hp:350,
        transmision:"automatica",
        imagenes: [
            "https://www.wsupercars.com/wallpapers-regular/McLaren/2024-McLaren-750S-002-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/McLaren/2024-McLaren-750S-001-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/McLaren/2024-McLaren-750S-003-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/McLaren/2024-McLaren-750S-005-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/McLaren/2024-McLaren-750S-004-1600.jpg",

        ]

    },
    {
        id:4,
        marca: "BMW",
        modelo: "M5 Competition",
        anio: 2021,
        precio: 120,
        capacidad: 4,
        categoria: "Sport Coupe",
        hp:720,
        transmision:"automatica",
        imagenes: [
            "https://www.wsupercars.com/wallpapers-regular/BMW/2021-BMW-M5-Competition-002-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2021-BMW-M5-Competition-006-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2021-BMW-M5-Competition-005-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2021-BMW-M5-Competition-007-1600.jpg",
            "https://www.wsupercars.com/wallpapers-regular/BMW/2021-BMW-M5-Competition-012-1600.jpg",

        ]

    },
    
]
const autos = [
    {
        "id":1,
        "Marca": "Mercedes-Benz",
        "Modelo": "S-Class",
        "Capacidad": 5,
        "Categoria": "Sedán de lujo",
        "Estado": true,
        "Precio": 350,
        "LinkFoto": "https://cdn.motor1.com/images/mgl/koWGpQ/s3/mercedes-benz-clase-s-2024.jpg"
      },
      {
        "id":2,
        "Marca": "BMW",
        "Modelo": "7 Series",
        "Capacidad": 5,
        "Categoria": "Sedán de lujo",
        "Estado": false,
        "Precio": 300,
        "LinkFoto":" https://cdn.motor1.com/images/mgl/OXx4M/s1/el-nuevo-bmw-serie-7-llego-a-la-argentina-el-primer-ejemplar-se-exhibe-en-sergio-trepat.jpg"
      },
      {
        "id":3,
        "Marca": "Audi",
        "Modelo": "A8",
        "Capacidad": 5,
        "Categoria": "Sedán de lujo",
        "Estado": true,
        "Precio": 320,
        "LinkFoto": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Audi_A8_L_D5_IMG_0066.jpg"
      },
      {
        "id":4,
        "Marca": "Porsche",
        "Modelo": "Panamera",
        "Capacidad": 4,
        "Categoria": "Sedán deportivo de lujo",
        "Estado": false,
        "Precio": 400,
        "LinkFoto": "https://www.wsupercars.com/wallpapers-regular/Porsche/2011-Porsche-Panamera-Turbo-S-001-1440.jpg"
      },
      {
        "id":5,
        "Marca": "Lamborghini",
        "Modelo": "Urus",
        "Capacidad": 5,
        "Categoria": "SUV de lujo",
        "Estado": true,
        "Precio": 700,
        "LinkFoto": "https://cdn.motor1.com/images/mgl/lE6zyM/s3/whatsapp-image-2023-11-01-at-10.05.55.jpg"
      },
      {
        "id":20,
        "Marca": "Ferrari",
        "Modelo": "Portofino",
        "Capacidad": 4,
        "Categoria": "Convertible de lujo",
        "Estado": false,
        "Precio": 650,
        "LinkFoto": "https://www.amalgamcollection.com/cdn/shop/products/DSCF7663WIDEEDIT_2000x850_crop_center.jpg"
      },
      {
        "id":6,
        "Marca": "Aston Martin",
        "Modelo": "DB11",
        "Capacidad": 4,
        "Categoria": "Coupé de lujo",
        "Estado": true,
        "Precio": 500,
        "LinkFoto":" https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/2018_Aston_Martin_DB11_V8_Automatic_4.0.jpg/1200px-2018_Aston_Martin_DB11_V8_Automatic_4.0.jpg"
      },
      {
        "id":7,
        "Marca": "Maserati",
        "Modelo": "Quattroporte",
        "Capacidad": 5,
        "Categoria": "Sedán de lujo",
        "Estado": false,
        "Precio": 330,
        "LinkFoto": "https://upload.wikimedia.org/wikipedia/commons/d/d1/2015_Maserati_Quattroporte_DV6_Automatic_3.0_Front.jpg"
      },
      {
        "id":8,
        "Marca": "Land Rover",
        "Modelo": "Range Rover",
        "Capacidad": 5,
        "Categoria": "SUV de lujo",
        "Estado": true,
        "Precio": 450,
        "LinkFoto": "https://media.cdn-jaguarlandrover.com/api/v2/images/77398/w/1000.jpg"
      },
      {
        "id":9,
        "Marca": "McLaren",
        "Modelo": "GT",
        "Capacidad": 2,
        "Categoria": "Supercar",
        "Estado": false,
        "Precio": 1000,
        "LinkFoto": "https://www.megautos.com/wp-content/uploads/2023/12/Medium-15790-ThenewMcLarenGTS.jpg"
      },
      {
        "id":10,
        "Marca": "Bugatti",
        "Modelo": "Chiron",
        "Capacidad": 2,
        "Categoria": "Supercar",
        "Estado": true,
        "Precio": 1500,
        "LinkFoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/FoS20162016_0624_132444AA_%2827785299372%29.jpg/1200px-FoS20162016_0624_132444AA_%2827785299372%29.jpg"
      },
      {
        "id":11,
        "Marca": "Pagani",
        "Modelo": "Huayra",
        "Capacidad": 2,
        "Categoria": "Supercar",
        "Estado": false,
        "Precio": 1300,
        "LinkFoto": "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2016/02/19/14558717134655.jpg"
      },
      {
        "id":12,
        "Marca": "Koenigsegg",
        "Modelo": "Jesko",
        "Capacidad": 2,
        "Categoria": "Supercar",
        "Estado": true,
        "Precio": 2000,
        "LinkFoto": "https://img.remediosdigitales.com/169de9/koenigsegg-jesko-absolut-1/1366_2000.jpg"
      },
      {
        "id":13,
        "Marca": "Mercedes-AMG",
        "Modelo": "GT",
        "Capacidad": 2,
        "Categoria": "Coupé deportivo de lujo",
        "Estado": false,
        "Precio": 350,
        "LinkFoto": "https://storage.googleapis.com/carmuv-development.appspot.com/1/2023/08/1366_2000.jpeg"
      },
      {
        "id":14,
        "Marca": "Jaguar",
        "Modelo": "XJ",
        "Capacidad": 5,
        "Categoria": "Sedán de lujo",
        "Estado": true,
        "Precio": 250,
        "LinkFoto": "https://upload.wikimedia.org/wikipedia/commons/f/f4/2011_Jaguar_XJ-L_--_05-05-2010.jpg"
      },
      {
        "id":15,
        "Marca": "Tesla",
        "Modelo": "Model S",
        "Capacidad": 5,
        "Categoria": "Sedán eléctrico de lujo",
        "Estado": false,
        "Precio": 290,
        "LinkFoto": "https://upload.wikimedia.org/wikipedia/commons/1/14/2018_Tesla_Model_S_75D.jpg"
      },
      {
        "id":16,
        "Marca": "Bentley",
        "Modelo": "Flying Spur",
        "Capacidad": 5,
        "Categoria": "Sedán de superlujo",
        "Estado": true,
        "Precio": 600,
        "LinkFoto":" https://cdn.motor1.com/images/mgl/284vz/s1/2022-bentley-flying-spur-mulliner-three-quarters.jpg"
      },
      {
        "id":17,
        "Marca": "Rolls-Royce",
        "Modelo": "Ghost",
        "Capacidad": 5,
        "Categoria": "Sedán de superlujo",
        "Estado": false,
        "Precio": 800,
        "LinkFoto": "https://soymotor.com/sites/default/files/imagenes/noticia/rolls-royce-new-ghost-2-soymotor.jpg"
      },
      {
        "id":18,
        "Marca": "Alfa Romeo",
        "Modelo": "Giulia Quadrifoglio",
        "Capacidad": 5,
        "Categoria": "Sedán deportivo de lujo",
        "Estado": true,
        "Precio": 220,
        "LinkFoto": "https://img.remediosdigitales.com/84a8fa/img_20230914_154724540-copia/840_560.jpeg"
      },
      {
        "id":19,
        "Marca": "Lexus",
        "Modelo": "LS",
        "Capacidad": 5,
        "Categoria": "Sedán de lujo",
        "Estado": false,
        "Precio": 280,
        "LinkFoto":" https://lacddam.lexusasia.com/lexus-v3-blueprint/discover-lexus/we-are-lexus/lexus-ls/future-img-2.jpg"
      }
]

export {publicaciones, autos}