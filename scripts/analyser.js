const list = [[0, 4, 7, 11], [2, 5, 9, 0], [6, 8, 10, 0], [2, 5, 7, 9]]
const notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]

var ejeX = d3.select('.drawer').classed("svg-container", true).append('svg')
.attr("preserveAspectRatio", "xMidYMid meet")
// .attr("viewBox", "0 0 400 100")
// .classed("svg-content-responsive-diapason", true);
ejeX.append('text')
        .text(notes)
        .attr('x', 0)
        .attr('y', 30 )
        .attr("font-size", "20px")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "left")
        .attr("stroke-width",);


for (var i = 0; i < list.length; i++) {
   

    


}