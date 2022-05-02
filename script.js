'use strict';

//Selacao do visor
const display = document.getElementById('display');

//Selecao dos butoes
const buttons = document.querySelectorAll('.button');

//Ultimo numero inserido inserido
let lastNumber = '';

//Ultimo operador +,-,/ ou * inserido
let ultimoOperador = '';

//Mensagens
const errorMessage = 'Error';
const notANumber = 'Not a number';

//Determinar dois ultimos caracteres de uma String (se a string tiver menos de 3 caracteres, devolve a string)
function doisUltimosCaracteres(string) {
  return string.slice(string.length - 2, string.length);
}

//Determinar ultimo caractere de uma string
function ultimoCaractere(string) {
  return string.slice(string.length - 1, string.length);
}

//Eliminar ultimo caractere de uma string
function eliminarUltimoCaractere(string) {
  return string.slice(0, display.value.length - 1);
}

//Calcular o resultado da expressão introduzida no visor
function calcularResultado(input) {
  if (input === errorMessage || input === notANumber) {
    ultimoOperador = '';
    lastNumber = '';
    return errorMessage;
  }
  try {
    input = input.replaceAll('÷', '/'); //substituir ÷ por /
    input = input.replaceAll('×', '*'); //substituir × por *
    input = input.replaceAll(',', '.'); //substituir virgulas por pontos
    console.log(`input: ${input}`);

    let result;
    if (divisaoPorZero()) {
      ultimoOperador = '';
      lastNumber = '';
      result = notANumber;
      return result;
    } else {
      ultimoOperador = '';
      lastNumber = '';
      result = String(eval(input)); //Calcular valor da expressão introduzida
      result = result.replaceAll('.', ','); //substituir pontos por vírgulas
      return result; //Resultado a ser mostrado no visor
    }
  } catch {
    return errorMessage;
  }
}

//Verificar se o numero que esta a ser introduzido já tem separador decimal (virgula) e caso nao tenha inserir virgula
function inserirVirgula(stringVisor) {
  if (!lastNumber.includes(',')) {
    lastNumber += ',';
    return stringVisor + ',';
  } else {
    return stringVisor;
  }
}

//Inserir operador +, -, /, ou *
function inserirOperador(stringVisor, stringOperadorAInserir) {
  let aux = ultimoCaractere(stringVisor);
  if (stringVisor !== errorMessage && stringVisor !== notANumber) {
    if (divisaoPorZero()) {
      ultimoOperador = '';
      lastNumber = '';
      return notANumber;
    } else if (aux === '÷' || aux === '×' || aux === '+' || aux === '-') {
      let novaStringVisor =
        eliminarUltimoCaractere(stringVisor) + stringOperadorAInserir;
      novaStringVisor = novaStringVisor.replaceAll('*', '×');
      novaStringVisor = novaStringVisor.replaceAll('/', '÷');
      ultimoOperador = stringOperadorAInserir;
      lastNumber = '';
      return novaStringVisor;
    } else {
      let novaStringVisor = stringVisor + stringOperadorAInserir;
      novaStringVisor = novaStringVisor.replaceAll('*', '×');
      novaStringVisor = novaStringVisor.replaceAll('/', '÷');
      ultimoOperador = stringOperadorAInserir;
      lastNumber = '';
      return novaStringVisor;
    }
  } else {
    return stringVisor;
  }
}

//Inserir algarismo
function inserirAlgarismo(stringVisor, stringAlgarismoAInserir) {
  let aux = doisUltimosCaracteres(stringVisor);
  if (
    stringVisor === '0' ||
    stringVisor === errorMessage ||
    stringVisor === notANumber
  ) {
    console.log(stringAlgarismoAInserir);
    lastNumber = stringAlgarismoAInserir;
    return stringAlgarismoAInserir;
  } else if (aux === '÷0' || aux === '×0' || aux === '+0' || aux === '-0') {
    lastNumber = stringAlgarismoAInserir;
    return eliminarUltimoCaractere(stringVisor) + stringAlgarismoAInserir;
  } else {
    lastNumber += stringAlgarismoAInserir;
    return stringVisor + stringAlgarismoAInserir;
  }
}

//Alterar string no visor
function mostrarNoVisor(string) {
  display.value = string;
}

//Verificar divisao por 0. Qualquer divisao por zero retorna a menssagem "Not a number"
function divisaoPorZero() {
  lastNumber = lastNumber.replaceAll(',', '.');
  lastNumber === '' ? lastNumber === '' : lastNumber === Number(lastNumber);
  console.log(lastNumber);
  lastNumber = String(lastNumber);
  if (
    lastNumber === '0' &&
    (ultimoOperador === '/' || ultimoOperador === '÷')
  ) {
    return true;
  } else {
    return false;
  }
}

//Evento: Clicar num botão
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];

  button.addEventListener('click', e => {
    switch (e.target.textContent) {
      case 'C':
        mostrarNoVisor('0');
        break;
      case '=':
        mostrarNoVisor(calcularResultado(display.value));
        break;

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        console.log(display.value, e.target.textContent);
        mostrarNoVisor(inserirAlgarismo(display.value, e.target.textContent));
        console.log(lastNumber);
        break;
      case ',':
        mostrarNoVisor(inserirVirgula(display.value));
        break;
      case '+':
      case '-':
      case '*':
      case '×':
      case '/':
      case '÷':
        mostrarNoVisor(inserirOperador(display.value, e.target.textContent));
        break;
      default:
        mostrarNoVisor(errorMessage);
    }
  });
}

//Evento: Clicar numa tecla
document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'Escape':
      mostrarNoVisor('0');
      break;
    case 'Enter':
      mostrarNoVisor(calcularResultado(display.value));
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      console.log(display.value, e.key);
      mostrarNoVisor(inserirAlgarismo(display.value, e.key));
      console.log(lastNumber);
      break;
    case ',':
    case '.':
      mostrarNoVisor(inserirVirgula(display.value));
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      mostrarNoVisor(inserirOperador(display.value, e.key));
      break;
  }
});
