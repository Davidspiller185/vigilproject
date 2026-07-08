export function validPostHeroe(parseHeroes,codeName,powers,threatLevel,status,affiliations){
    if (codeName === undefined){
        return {
            "success":false,
            "message":"must  to be code name"

        }
    }
    if ( typeof codeName !== "string"){
        return {
            "success":false,
            "message": "codename mast to be a sring"
        }
    }
    if (codeName.trim === ""){
        return {
            "success":false,
            "message": "codename can not be empty"
        }
    }
    for (const hero of parseHeroes){
        if(hero.codeName === codeName){
            return {
                "success":false,
                "message":"can not have duplicate code name"
            }

        
    }}
    if (powers === undefined){
        return {
            "success":false,
            "message": "most to be powers"
        }
    }
    if (powers.length === 0){
        return{
            "success":false,
            "message": "most to be not a  empty array powers"
        }
    }
    for (const power of powers){
        if (typeof power !== "string"){
            return{
                "success":false,
                "message": " power most to be a string"
            }
        }
    }
    if (threatLevel === undefined){
        return {
            "success":false,
            "message": " most to be a threatLevel"
        }
    }
    if (!(threatLevel>=1 && threatLevel<=10)){
        return{
            "success":false,
            "message": " most to be a number between 1 and 10"
        }
    }
    if (status && status !== "retried" && status !== "missing" && status !== "deceased"){
        status = "active"
    }
    if (affiliations && !Array.isArray(affiliations) ){
        return {
            "success":false,
            "message": "affiliations must to be a array"
        }
    }
    return{
        "success":true

    }
}

export function status(status) {
    this.statusCode = status;
    return this;
}

export const send = (data) => {
    try {
        this.end(JSON.stringify(data));
    } catch {
        this.end(data);
    }
}

