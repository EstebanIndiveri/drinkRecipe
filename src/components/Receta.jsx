import React,{useContext,useState} from 'react'
import styled from '@emotion/styled';
import{ModalContext} from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

//ubicacion
function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
//estilo de apariencia
const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      overflow:'scroll',
      maxHeight: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));



const Imagen=styled.img`
    max-width:288px;
    margin:auto;
`;

const Carta=styled.div`
    background-color:#696969;
`;


const Receta = ({receta}) => {

    //configuracion del modal de material

    const [modalStyle]=useState(getModalStyle);

    const [open,setOpen]=useState(false);

    const classes=useStyles();

    const handleOpen=()=>{
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }
    //extraigo valores del context:
    const {guardarIdReceta,informacionreceta,guardarReceta}=useContext(ModalContext);

    //muestra y formatea ingredientes:
    const mostrarIngredientes=informacion=>{
        let ingredientes=[];
        for(let i=1; i <16; i++){
            if(informacion[`strIngredient${i}`]){
                ingredientes.push(
                    <li key={informacion[`strIngredient${i}`]}>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }
    
    
    return ( 
        
        <div className="col-md-4 mb-3">
            <Carta className="card">
                <h5 className="card-header text-white text-center mb-1">{receta.strDrink}</h5>

                <Imagen className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>

                <div className="card-body">
                    <button
                    type="button"
                    className="btn btn-block btn-dark"
                    onClick={()=>{
                        guardarIdReceta(receta.idDrink);
                        handleOpen();
                    }}
                    >Ver Receta</button> 

                    <Modal
                    open={open}
                    key={informacionreceta.strDrinkThumb}
                    onClose={()=>{
                        guardarIdReceta(null);
                        guardarReceta({})
                        handleClose();
                    }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2> {informacionreceta.strDrink} </h2>
                            <h3 className="mt-4">Instrucciones:</h3>
                            <p>
                                {informacionreceta.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={informacionreceta.strDrinkThumb} alt={informacionreceta.strDrinkThumb}/>

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(informacionreceta)}
                            </ul>
                        </div>
                    </Modal>

                </div>
            </Carta>
        </div>
     );
}
 
export default Receta;