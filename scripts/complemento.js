////////////////////////////////////////////////////////////////////ESTE CÓDIGO HACE POSIBLE EL CÁLCULO DE LAS MANERAS DE AGRUPAR EL COMPLMENTO EN FORMAS PRIMAS DE ENTRE TRES Y SEIS NOTAS

let all = [];
let dat = amplify.store("complemento");
let chunkIndx = [];

/////////////////////////////////////////////////// PARTICIÓN DE DATOS

if (dat.length == 6) {
  chunkIndx = [];
  chunkIndx.push(3);
}

if (dat.length == 7) {
  chunkIndx = [];
  chunkIndx.push(4);
}

if (dat.length == 8) {
  chunkIndx = [];
  chunkIndx.push(4);
  chunkIndx.push(5);
}

if (dat.length == 9) {
  chunkIndx = [];
  chunkIndx.push(3);
  chunkIndx.push(5);
  chunkIndx.push(6);
}

////////////////////////////////////////////////////////// PERMUTACIONES DE HEAP

var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

var heapsPermute = function (array, n, results = []) {
  n = n || array.length;
  if (n === 1) {
    results.push(array.slice());
  } else {
    for (var i = 1; i <= n; i += 1) {
      heapsPermute(array, n - 1, results);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1);
    }
  }
  return results;
};


/////////////////////////////////////////////////////////////////////////////////////////////// FUNCIÓN PRINCIPAL //////////////////////////////////////////////////////////////////////////

function permutaciones(notes) {
  var fPrR2;
  var formaPrimaIn2;
  var tricorde = notes;
  var permu = [];
  var formaPrimaCal = [];
  var formaPrimaSel = [];
  var formaPrimaOri = [];

  for (var e = 0; e < tricorde.length; e++) {
    var tri0 = [];
    var retro0 = [];
    var tri0sum;
    var tri0Max;
    var tri0Min;
    var retro0sum;
    var retro0Max;
    var retro0Min;

    tricorde.forEach(function (nota) {
      var nuevoValor = (nota - tricorde[e] + 12) % 12;
      tri0.push(nuevoValor);
      tri0.sort((a, b) => a - b);
      // tri0sum = tri0.reduce((a, b) => a + b, 0);
      tri0Max = Math.max(...tri0);
      tri0Min = Math.min(...tri0);
      tri0sum = tri0Max - tri0Min;

      var nuevoValorR = (tricorde[e] - nota + 12) % 12;
      retro0.push(nuevoValorR);
      retro0.sort((a, b) => a - b);
      // retro0sum = retro0.reduce((a, b) => a + b, 0);
      retro0Max = Math.max(...retro0);
      retro0Min = Math.min(...retro0);
      retro0sum = retro0Max - retro0Min;

    });

    formaPrimaCal.push(tri0sum, retro0sum);
    formaPrimaSel.push(tri0, retro0);
    formaPrimaOri.push(tricorde[e].toString(), "'" + tricorde[e].toString());
    permu.push(
      "(" + tri0 + ")" + " " + tricorde[e].toString(),
      "(" + retro0 + ")" + " '" + tricorde[e].toString(),
    );
  }

  var allindx = getAllIndexes(formaPrimaCal, Math.min(...formaPrimaCal));
  var lastcomp = [];
  var lastcompIndx = [];
  var lastcompVal;
  var namIndx = []

  for (var i = 0; i < allindx.length; i++) {
    lastcompVal = formaPrimaSel[allindx[i]]
    lastcompVal = lastcompVal.reduce((a, b) => a + b, 0);
    lastcomp.push(lastcompVal);
    lastcompIndx.push(formaPrimaSel[allindx[i]]);
    namIndx.push(allindx[i]);
  }
  var formaPrimaIndex = Math.min(...lastcomp);
  formaPrimaIn2 = lastcompIndx[lastcomp.indexOf(formaPrimaIndex)];

  // var formaPrimaIn = formaPrimaCal.indexOf(Math.min(...formaPrimaCal));
  fPrR2 = `(${formaPrimaIn2}) ${formaPrimaOri[namIndx[lastcomp.indexOf(formaPrimaIndex)]]}`;
  return fPrR2;
}

var perm = heapsPermute(dat);
console.log(permutaciones(dat));
console.log(perm)

function NewTab(notasNuevas) {
  amplify.store("pisadas", notasNuevas);
  var w = window.open(
    "/diagramGen.html", "_blank");
}

function getIndexOfArray(array, findArray) {
  let index;
  array.some((item, i) => {
    if (JSON.stringify(item) === JSON.stringify(findArray)) {
      index = i;
      return true;
    }
  });
  return index;
}

for (var a = 0; a < chunkIndx.length; a++) {
  all = [];
  for (var j = 0; j < perm.length; j++) {
    var turn = perm[j]
    let chunks = _.chunk(turn, chunkIndx[a]);  ///////////
    chunks.forEach(function (e) { e.sort() });
    chunks.sort(([a, b], [c, d]) => a - c || d - b);
    all.push(chunks)
  }
  console.log(all)

  let lut = {},
    red = all.filter(a => lut[a] ? false : lut[a] = true);

  console.log(red)

  var allFpperm = [];
  for (var i = 0; i < red.length; i++) {
    allFpperm.push([]);
    for (var j = 0; j < red[i].length; j++) {
      allFpperm[i].push(permutaciones(red[i][j]));
    }
  }

  let red2 = allFpperm
  console.log(red2);

  for (var j = 0; j < red2.length; j++) {
    var chordC = d3.select(".listacomplemento").append("div").attr("id", "cuadrito");

    for (var k = 0; k < red2[j].length; k++) {

      var notasF;

      var notasFP = red2[j][k].substring(1, red2[j][k].indexOf(')'));
      notasFP = notasFP.split(",").map(Number);

      var arreglo = red2[j][k].slice(red2[j][k].indexOf(')'));
      arreglo = arreglo.slice(1);

      if (arreglo.includes("'") == true) {
        arreglo = arreglo.replace("'", "");
        arreglo = parseInt(arreglo)
        // console.log('retrogrado de ', arreglo);
        notasF = [];
        for (var y = 0; y < notasFP.length; y++) {
          notasF.push(Math.abs(notasFP[y] - arreglo) % 12);
        }
        chordC.append("div")
          .attr("id", notasF)
          .text(red2[j][k] + " ")
          .on("click", function () {
            var notasNewTab = this.id.split(",").map(Number);
            console.log(notasNewTab)
            NewTab(notasNewTab);
          })
          .style("cursor", "pointer")
          .on("mouseover", function (d) {
            this.className = 'textorojo';
          }).on("mouseout", function (d) {
            this.className = 'textonegro';
          });
      } else {
        arreglo = parseInt(arreglo);
        // console.log('desde ', arreglo);
        notasF = [];
        for (var y = 0; y < notasFP.length; y++) {
          notasF.push((notasFP[y] + arreglo) % 12);
        }
        chordC.append("div")
          .attr("id", notasF)
          .text(red2[j][k] + " ")
          .on("click", function () {
            var notasNewTab = this.id.split(",").map(Number);
            console.log(notasNewTab)
            NewTab(notasNewTab);
          })
          .style("cursor", "pointer")
          .on("mouseover", function () {
            this.className = 'textorojo';
          }).on("mouseout", function () {
            this.className = 'textonegro';
          });
      }
    }
  }
}

d3.select(".head").append("text").
  text(permutaciones(dat));