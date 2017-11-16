
(function() {
  'use strict';
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var divisa = document.getElementById('divisas');
  var cryptomonedas = document.getElementById('cryptomonedas');
  var button = document.getElementById('button-convert');

  divisa.addEventListener('change', function(){
    console.log(this.value)
  })

  cryptomonedas.addEventListener('change', function(){
    console.log(this.value)
  })

  button.addEventListener('click', function(){
    var cantidad = input.value
    var divisaValue = divisa.value
    var criptoValue = cryptomonedas.value

    fetch('https://min-api.cryptocompare.com/data/price?fsym=' + divisaValue + '&tsyms=' + criptoValue)
          .then( response => {
            if( response.ok ){
              return Promise.resolve(response)
            } else {
              return Promise.reject(new Error("No funciona"))
            }
          })
          .then(response => response.json())
          .then(data => {
            // Si tiene éxito
            var valor = convertir(data[criptoValue], cantidad)
            desplegar(valor)

          })
          .catch(error => {
            console.log(`Error: ${error}`)
          })
  })

  // Conversión
  function convertir(tasa, moneda){
    return tasa * moneda
  }

  // Desplegar
  function desplegar(valor){
    output.innerHTML = valor
  }
	
}());