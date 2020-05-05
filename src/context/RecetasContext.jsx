import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';

export const RecetasContext=createContext();

const RecetasProvider = (props) => {

    //dos state
    const[recetas,guardarReceta]=useState([]);

    const[busqueda,buscarRecetas]=useState({
        nombre:'',
        categoria:''
    });
    const[consultar,guardarConsultar]=useState(false);
    const{nombre,categoria}=busqueda;

    useEffect(()=>{
        if(consultar){
            const obtenerRecetas=async()=>{
            
            const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
            const resultado=await axios.get(url);
            
            guardarReceta(resultado.data.drinks);
        }
        obtenerRecetas();
    }
    //eslint-disable-next-line
    },[busqueda])

    return ( 
        <RecetasContext.Provider
            value={{
                buscarRecetas,
                guardarConsultar,
                recetas
            }}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;