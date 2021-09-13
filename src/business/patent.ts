import { Request, Response } from 'express';
import { connect } from '../database/database';

// función getPatents : consulta todas las patentes en la base de datos

export async function getPatents(req: Request, res: Response){
    let { id  } = req.params;  
    const con = await connect(); 

    await con.query('SELECT * FROM patents')
    .then((patents : string[] | any) => 
    (String(patents[0]).length>0) ?
        res.status(200)
        .json(patents[0]) :
        res.status(404).json({error:'no existe la patente'})
    )
}

// función getPatents : busca una patente por id en la base de datos

export async function getPatent(req: Request, res: Response){
    let { id  } = req.params;  
    const con = await connect(); 

    await con.query('SELECT * FROM patents WHERE id = ?', [id])
    .then((patent : string[] | any) => 
    (String(patent[0]).length>0) ?
        res.status(200)
        .json(patent[0]) :
        res.status(404).json({error:'no existe la patente'})
    )
}

// función postPatents : registra una nueva patente en la base de datos

export async function postPatent(req: Request, res: Response){
    const newPatent = req.body;
    const con = await connect(); 

    /*  Para generar el dominio, busco la cantidad de registros que tiene la base de datos y así rastrear
        el id que vá a tener */

    await (con.query('SELECT COUNT(*) FROM patents'))
    .then((id : string[] | any) => {

    //  Con el id genero el dominio por medio de la función getDomain

        newPatent.domain = getDomain(Number.parseInt(JSON.stringify(id[0])[13]));
        
        (newPatent.domain.length>1) ?

    //  Ya con toda la información incluyendo el dominio registro la nueva patente
        con.query('INSERT INTO patents SET ?', [ newPatent ])

        .then(() => 
        res.status(200)
        .json({msg: 'Patente registrado'}))

        .catch(e => res.status(400).json(e)) :
        res.status(400).json({message: 'La base de datos está llena'})
        
    })
}

// función getDomain : genera el dominio a partir del id que se le proporciona

function getDomain(id : number) : string{

    // Valida si el id supera el numero que corresponde al dominio [ ZZZZ999 ]

    if(id < 456976001){

        let letter = letterSide(id, 1000);

        // rellena con A las letras que no cambian en el dominio, ejemplo: [ AAA ] B

        for (let i = 2; i < 5; i++) {
            if(letter.length<i){
                letter = 'A'.concat(letter);
            }
        }

        // devuelve el dominio
        return(letter.concat(numberSide(id)))
    }else{        

        // en caso de que el id sea ya muy grande devuelve un string vacio
    return ''
    }

    // function numberSide : obtiene el lado que corresponde a los numeros del dominio

    function numberSide (id : number) : string {
        let n = id % 1000

        return  (n/10<1) ? 
                '00'.concat(String(n)) : 
                (n/100<1) ? 
                '0'.concat(String(n)) : 
                String(n)
    }

    // function letterSide : obtiene el lado que corresponde a las letras del dominio

    function letterSide(number : number, limit: number ) : string {
        number = Math.trunc(number/limit);
        return (number>17576000)?
                    letterSide(number, 17576000)
                    .concat(letterSide(number%17576000, 676))
                    .concat((letterSide(number%676, 26)))
                    .concat(letterSide(number%26, 1))
                : (number>675) ?
                    letterSide(number, 676)
                    .concat((letterSide(number%676, 26)))
                    .concat(letterSide(number%26, 1))
                : (number>=26) ?
                    letterSide(number, 26)
                    .concat(letterSide(number%26, 1))
                : (number > 0) ?
                    letterUp(number, 'A')
                :
                'A';
    }

    // function letterUp : esta funcion se encarga del autoincremento de las letras

    function letterUp(number : number, letter: string) : string{
        for (let index = 0; index < number; index++) {
            letter = String.fromCharCode(letter.charCodeAt(0)+1); 
        }
        return letter;
    }
}

