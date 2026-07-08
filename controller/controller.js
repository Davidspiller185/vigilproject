import fs from "fs/promises"
import { validPostHeroe } from "../utils/utils.js"
export function getServer(req,res){
    try{
        res.status(200).send({"message": "the server is on"})
    }
    catch(error){
        res.send({"success":false,"message":error.message})
    }

}

export  async function getHeroes(req,res){
    try{
    const readHeroes = await fs.readFile("../data/heroes.json","utf-8")
    const parseHeroes = JSON.parse(readHeroes)
    const {status,power,minLevel,maxLevel,search,} = req.query
    const filterParseHeroes =parseHeroes.filter((hero) => {
        if (status && hero.status !== status){
            return false
        }
        if (power && !hero.powers.includes(power)){
            return false
        }
        if(minLevel && hero.threatLevel < Number(minLevel)){
            return false
        }
        if(maxLevel && hero.threatLevel > Number(maxLevel)){
            return false
        }
        if(search && !hero.codeName.toLowerCase().includes(search.toLowerCase()) && !hero.notes.toLowerCase().includes(search.toLowerCase())){
            return false
        }
        return true
    })
    if (filterParseHeroes.length > 0){
        res.send({"success":true,"data":filterParseHeroes})
    }
    else{
        res.send({"success":false,"message":"nof found match query"})
    }
    
    }
    catch(err){
        res.send({"success":false,"message":err.message})
    }
}

export async function getheroeById(req,res,id){
    try{
    const dataHeros = await getHeroes(req,res)
    const data = JSON.parse(dataHeros)
    const Find = data.find(hero => hero.id === id)
    if (Find){
        res.send({"success":true,"data":Find})
    }
    else{
        res.send({"success":false,"message":"id not found"})

    }
    }
    catch(err){
        res.send({"success":false,"message":err.message})
    }
}

export async function  getStatistic(req,res){
    try{
    const dataHeros = await getHeroes(req,res)
    const data = JSON.parse(dataHeros)
    const totalHeroes = data.length
    const byStatus = {
        "active": 0,
        "retired": 0,
        "missing": 0,
        "deceased": 0
    }
    for (const obj of data){
        let status = obj.status
        byStatus[status] +=1
    }
    const sumThreatLevel = data.reduce((acc,current) =>acc.threatLevel + current.threatLevel,data[0])
    const averageThreatLevel = sumThreatLevel/totalHeroes
    const allPowerr = {}
    for (const obj of data ){
        for (const heroePower of obj.powers){
                if (!(heroePower in allPowerr )){
                    allPowerr[heroePower] = 1
                }
                else{
                    allPowerr[heroePower] +=1
                }
    
        }
    }
    let max_value = 0
    let mostCommonPower = ""
    for (const key in allPowerr ){
        const value = allPowerr[key]
        if (value>max_value){
            max_value = value
            mostCommonPower = key
        }
    }
    const highestThreat = data.reduce((acc,current) => {if (current.threatLevel > acc.threatLevel){ return current} return acc},data[0])
    const newestRecord = data[data.length-1]



res.send({"success":true,"data":{totalHeroes,byStatus,averageThreatLevel,mostCommonPower,highestThreat,newestRecord}})
}
catch(err){
    res.send({"success":false,"message":err.message})
}
}
let id = 0
export async function createHeroe(req,res) {
    const readHeroes = await fs.readFile("../data/heroes.json","utf-8")
    const parseHeroes = JSON.parse(readHeroes)
    const {codeName,powers,threatLevel,status,origin,affiliations,notes} = req.body
    const getValid = validPostHeroe(codeName,powers,threatLevel,status,origin,affiliations,notes)
    if (!getValid.success){
        res.status(400).send({
            "success":false,
            "message":getValid.message

        })
    }
    parseHeroes.push(req.body)
    const write = await fs.writeFile("../data/heroes.json",JSON.stringify(parseHeroes))
    res.status(201).send({
        "success":true,
        "message": "add a new heroe"
    })

    }





