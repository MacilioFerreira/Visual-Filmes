$.ajaxSetup({
    async: false
});

var filmes = [];

$(document).ready(function(){
    var valores = JSON.parse(window.localStorage.getItem('argumentos'));
    filmes = valores.filmes;
    var slider_img = valores.slider_img;
    
    for (let i = 0; i < filmes.length; i++){
        const elemento = filmes[i];
        var imagem = getImagem(elemento.title, elemento.release_date);
        
        if(slider_img == imagem){

            var div_img_poster = '<div class="col-sm-10"> <h5 id="titulo"> <span> '+elemento.title+' </span> </h5> <img src="'+imagem+'" height=250px width=200px> </img>'
            +'<p id="descricao">'+elemento.description+'</p> <h6 id="dataLancamento"> <span> Lançamento: </span>' + elemento.release_date +'</h6>'
            +'<h6 id="diretor"> <span> Diretor: </span> ' + elemento.director +'</div>';


            $('#detalhes').append(div_img_poster);
        }
    }
});

function getImagem(titulo, anoLancamento){
    var imagem = null;
    var url = 'http://www.omdbapi.com/?t='+titulo+'&y='+anoLancamento+'&plot=full&apikey=48c5add4';
    $.getJSON(url, {
        format: "json"
    })
    .done(function(data) {
        imagem = data.Poster;
    })
    return imagem
}
