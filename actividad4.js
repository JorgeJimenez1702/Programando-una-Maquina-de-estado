//Jorge Leopoldo Jiménez Velásquez
//A01253696


const fs = require('fs');
const readline = require('readline');

const stateMachine = {
    start: {
        digit: 'integer',
        '+-': 'error',
        '.': 'error',
        '*': 'error',
        '/': 'error',
        whitespace: 'start',
        end: 'end',
        invalid: 'error'
    },
    integer: {
        digit: 'integer',
        '.': 'decimal',
        '+-': 'sign',
        '*': 'sign',
        '/': 'sign',
        whitespace: 'whitespace',
        end: 'end',
        invalid: 'error'
    },
    decimal: {
        digit: 'decimal',
        '+-': 'sign',
        '.': 'error',
        '*': 'sign',
        '/': 'sign',
        whitespace: 'whitespace',
        end: 'end',
        invalid: 'error'
    },
    sign: {
        digit: 'integer',
        '.': 'error',
        '+-': 'error',
        '*': 'error',
        '/': 'error',
        whitespace: 'sign',
        end: 'error',
        invalid: 'error'
    },
    whitespace: {
        digit: 'integer',
        '.': 'error',
        '+-': 'sign',
        '*': 'sign',
        '/': 'sign',
        whitespace: 'whitespace',
        end: 'end',
        invalid: 'error'
    },
    error: {
        digit: 'error',
        '+-': 'error',
        '.': 'error',
        '*': 'error',
        '/': 'error',
        whitespace: 'error',
        end: 'error',
        invalid: 'error'
    },
    end: {
        digit: 'error',
        '+-': 'error',
        '.': 'error',
        '*': 'error',
        '/': 'error',
        whitespace: 'error',
        end: 'error',
        invalid: 'error'
    }
};


function verificarSintaxis(operacion) {
    let currentState = 'start';

    for (let char of operacion) {
        const category = categorizarCaracter(char);
        const nextState = stateMachine[currentState][category];
        if (!nextState) {
            return "error de carácter";
        }
        currentState = nextState;
        
    }

    return currentState === 'integer' || currentState === 'decimal' ? "accepted" : "rejected";
}


function categorizarCaracter(char) {
    if (/[0-9]/.test(char)) {
        return 'digit';
    } else if (/[+\-]/.test(char)) {
        return '+-';
    } else if (/\./.test(char)) {
        return '.';
    } else if (/\*/.test(char)) {
        return '*';
    } else if (/\//.test(char)) {
        return '/';
    } else if (/\s/.test(char)) {
        return 'whitespace';
    } else if (char === undefined) {
        return 'end';
    } else {
        return 'invalid';
    }
}


function procesarArchivo(rutaArchivo) {
    const reader = readline.createInterface({
        input: fs.createReadStream(rutaArchivo),
        output: process.stdout,
        terminal: false
    });

    reader.on('line', function(line) {
        const resultado = verificarSintaxis(line.trim());
        console.log(`${line} => ${resultado}`);
    });

    reader.on('close', function() {
        console.log('Revisión completada.');
    });
}


const rutaArchivo = './operaciones.txt';

procesarArchivo(rutaArchivo);
