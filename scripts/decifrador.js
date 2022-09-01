let notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
let type = ["m", "Major", "dim", "aug"];
let seventh = ["Maj7", "7", "dim7", "aug7"];
let fifth = [" b5", " #5"];
let ninth = [" b9", " 9", " #9"];
let eleventh = [" 11", " #11"];
let tirtheen = [" b13", " 13"];
let sus = ["sus2", "sus4", "sus"];
let omit = [" omit 3", " omit 5", " omit 7"];
let add = [" add b9", " add 9", " add #9"," add 11", " add #11"," add b13", " add 13", " add maj7"]
let bassin = "/";

//////CONVIRTIENDO FORMA PRIMA FORTE A ACORDE

function chordName(chord) {

    ///funcion para rotar acorde

    function rotate(array) {
        let firstElement = array.shift();
        array.push(firstElement);
        return array;
    }

    console.log(chord);
    var result = [];

    ///convirtiendo strings a arrays
    var resultArray = chord.match(/\d+/g);
    chord = Array.from(resultArray);
    var index = chord.slice(chord.indexOf(")", 1));
    chord = chord.slice(chord[0], chord.indexOf(")"));
    index = index.filter((e) => e !== ")");
    chord = chord.filter((e) => e !== "(");
    chord = chord.filter((e) => e !== ",");

    if (index.indexOf("'") > -1) {
        index.shift();
        index = index.join("");
        index = parseInt(index);
        chord = chord.map((i) => Number(i));
        index =
            index < Math.abs(chord[chord.length - 1] - chord[0]) ? index + 12 : index;
        var tramo = chord.length;
        chord.forEach(function (e) {
            chord.push(Math.abs((e - index) % 12));
        });
        chord = chord.slice(tramo, tramo * 2);
        chord.reverse();
    } else {
        index = index.join("");
        index = parseInt(index);
        chord = chord.map((i) => Number(i));
        var tramo = chord.length;
        chord.forEach(function (e) {
            chord.push(Math.abs((e + index) % 12));
        });
        chord = chord.slice(tramo, tramo * 2);
    }
    index = index % 12;

    //EVALUANDO ACORDE

    for (var h = 0; h < chord.length; h++) {
        // console.log(chord);
        var acordevaluado = [];
        var acordesumado = [];

        //evaluando por transposicion a 0
        for (var i = 0; i < chord.length; i++) {
            acordevaluado.push((chord[i] + (12 - chord[0])) % 12);
        }
        // console.log(acordevaluado);

        //extrayendo intervalos y longitudes
        for (var j = 0; j < chord.length - 1; j++) {
            var n = Math.abs(acordevaluado[j] - acordevaluado[j + 1]);
            acordesumado.push(n);
        }
        console.log(acordesumado);

        var acordesumadored = acordesumado.reduce((a, b) => a + b) % 12;
        console.log(acordesumadored);

        //condicionando acordes

        //////////////////////////////////////////////////////////////////////////////////////////////

        if (acordesumado.length == 2 && acordesumadored == 2) {

            if (acordesumado[0] == 1) { acordevaluado = notes[chord[0]] + sus[0] + add[0] + omit[1]; }

        }

        else if (acordesumado.length == 2 && acordesumadored == 11) {

            if (acordesumado[0] == 1) { acordevaluado = notes[chord[0]] + seventh[0] + add[0] + omit[1] + omit[2]; }
            else if (acordesumado[0] == 10) { acordevaluado = notes[chord[0]] + seventh[1] + add[7] + omit[0] + omit[1]; }

        }

        /////////////////////////////////////////////////////////////////////////////////////////////////

        else if (acordesumado.length == 2 && acordesumadored == 3) {

            if (acordesumado[0] == 1) { acordevaluado = notes[chord[0]] + type[0] + add[0] + omit[1]; }
            else if (acordesumado[0] == 2) { acordevaluado = notes[chord[0]] + type[0] + add[1] + omit[1]; }

        }

        //////////////////////////////////////////////////////////////////////////////////////////////////

        else if (acordesumado.length == 2 && acordesumadored == 4) {

            if (acordesumado[0] == 1) { acordevaluado = notes[chord[0]] + add[0] + omit[1]; }
            else if (acordesumado[0] == 2) { acordevaluado = notes[chord[0]] + add[1] + omit[1]; }
            else if (acordesumado[0] == 3) { acordevaluado = notes[chord[0]] + add[2] + omit[1]; }

        }

        else if (acordesumado.length == 2 && acordesumadored == 5) {

            if (acordesumado[0] == 1) { acordevaluado = notes[chord[0]] + sus[1] + ninth[0] + omit[1]; }
            else if (acordesumado[0] == 2) { acordevaluado = notes[chord[0]] + sus[1] + add[1] + omit[1]; }
            else if (acordesumado[0] == 3) { acordevaluado = notes[chord[0]] + sus[1] + add[2] + omit[1]; }
            else if (acordesumado[0] == 4) { acordevaluado = notes[chord[0]] + type[1] + add[3] + omit[1]; }

        }

        else if (acordesumado.length == 2 && acordesumadored == 6) {

            if (acordesumado[0] == 1) { acordevaluado = notes[chord[0]] + fifth[0] + add[0] + omit[0]; }
            else if (acordesumado[0] == 2) { acordevaluado = notes[chord[0]] + sus[0] + eleventh[1] + omit[1]; }
            else if (acordesumado[0] == 3) { acordevaluado = notes[chord[0]] + type[2]; }
            else if (acordesumado[0] == 4) { acordevaluado = notes[chord[0]] + type[1] + fifth[0]; }
            else if (acordesumado[0] == 5) { acordevaluado = notes[chord[0]] + sus[1] + fifth[0]; }

        }

        else if (acordesumado.length == 2 && acordesumadored == 7) {

            if (acordesumado[0] == 1) { acordevaluado = notes[chord[0]] + sus[2] + ninth[0]; }
            else if (acordesumado[0] == 2) { acordevaluado = notes[chord[0]] + sus[0]; }
            else if (acordesumado[0] == 3) { acordevaluado = notes[chord[0]] + type[0]; }
            else if (acordesumado[0] == 4) { acordevaluado = notes[chord[0]] + type[1]; }
            else if (acordesumado[0] == 5) { acordevaluado = notes[chord[0]] + sus[1]; }
            else if (acordesumado[0] == 6) { acordevaluado = notes[chord[0]] + fifth[0] + omit[0]; }

        }

        else if (acordesumado.length == 2 && acordesumadored == 8) {

            if (acordesumado[0] == 4) { acordevaluado = notes[chord[0]] + type[3]; }
            else { acordevaluado = "nodefinido"; }
        }

        else { acordevaluado = "nodefinido"; }
        result.push(acordevaluado);

        chord = rotate(chord);
    }

    result = result.filter(e => e !== 'nodefinido');
    return result;
}

var todos = [];

for (var i = 1; i <= 11; i++) {

    for (var j = 1; j <= 11; j++) {

        if (j != i && i < j) {
            var acordeadesc = "(0" + "," + i + "," + j + ")0";
            todos.push(chordName(acordeadesc),'</br>');
            // console.log(chordName(acordeadesc));
        }

    }
}

document.getElementById('my-text-box').innerHTML = todos;

