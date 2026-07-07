export default {
    "GET":{
        "/helth":getServer,
        "/heroes":getHeroes,
        "/heroes/:id":getheroeById,
        "/stats": getStatistic

    },
    "POST":{
        "/heroes":createHeroe,
        "/heroes/search": searchHeroes
    },
    "PATCH":{
        "/heroes/:id":UpdateHeroe
    },
    "DELETE":{
        "/heroes/:id": DeleteHeroeById
    }



}