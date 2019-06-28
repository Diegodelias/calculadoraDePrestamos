document.getElementById('prestamo-form').addEventListener('submit', function(e){
    //ocultar resultados
    document.getElementById('resultados').style.display = 'none';
   
     //mostrar carga

     document.getElementById('cargando').style.display = 'block';
     

     setTimeout(calcularResultados,2000); //lllama a calcular resutlados despues de 2 segundos
     e.preventDefault();

});

function calcularResultados(){
    console.log('calculating...');
        
//variables formulario

const monto = document.getElementById('monto');
const interes = document.getElementById('interes');
const anios = document.getElementById('anios');
const pagoMensual = document.getElementById('pago-mensual');
const pagoTotal = document.getElementById('pago-total');
const interesTotal = document.getElementById('interes-total');


const principal = parseFloat(monto.value);
const calculoInteres = parseFloat(interes.value) / 100 / 12;
const calculoCuotas = parseFloat(anios.value) * 12;

const x = Math.pow(1 + calculoInteres, calculoCuotas );
const mensual = (principal*x*calculoInteres)/(x-1);
/*  

La función global isFinite() determina si el valor que se le pasa como argumento 
es un numero finito. 
Si es necesario, realiza una conversión a un numero al parametro pasado.

*/
if(isFinite(mensual)) {

pagoMensual.value = mensual.toFixed(2); /*to fixed fija el numero de decimales*/ 
pagoTotal.value = (mensual * calculoCuotas).toFixed(2);
interesTotal.value = ((mensual * calculoCuotas ) - principal).toFixed(2);
//mostrar resultdos
document.getElementById('resultados').style.display = 'block';

//esconbder gif carga
document.getElementById('cargando').style.display = 'none';


} else {
    
        mostrarError('Por favor revisar los datos ingresados')
}

  
}

//mostrarError

function mostrarError(error){
  //esconder resultados  

    document.getElementById('resultados').style.display = 'none';

//esconbder gif carga
document.getElementById('cargando').style.display = 'none';

    //crear div
   const errorDiv = document.createElement('div');

   //elementos
 const card = document.querySelector('.card');
 const heading = document.querySelector('.heading');



   //agregar clase al div creado
   errorDiv.className ='alert alert-danger';

   //crear texto y agregarseloa l div

   errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading); //se inserta el valor en la variable heading antes del div
    

    //borrar error despueés de 3 segundos

    setTimeout(limpiarError,3000); //llama a la función limpiarerror después 3 segundo para borrar el mensaje de error pasado ese tiempo

}


function limpiarError(){
    document.querySelector('.alert').remove();
}

