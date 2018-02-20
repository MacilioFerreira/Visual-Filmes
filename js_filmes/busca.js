$.ajaxSetup({
    async: false
});

var filmes = [];

$(document).ready(function(){

    $('#search').keydown(function(event) {
        var genero = $('input[name=q]').val();
        if (event.keyCode == 13 && genero.length >= 1) {
            buscarOutrosGeneros(genero);
            return false;
        }
    });

    var cont = 0;
    var valores = JSON.parse(window.localStorage.getItem('argumentos'));
    filmes = valores.filmes ;
    var genero = valores.genero;

    for(let i = 0; i < filmes.length; i++){
        var filme_ = filmes[i];
        var url = 'http://www.omdbapi.com/?t='+filme_.title+'&y='+filme_.release_date+'&plot=full&apikey=48c5add4';
        $.getJSON(url, {
            format: "json"
        })
        .done(function(filme) {
            if(filme.Genre.includes(genero)){

                var div = '<div class="col-sm-10"> <h5 id="titulo"> <span> '+filme_.title+' </span> </h5> <img src="'+filme.Poster+'" height=250px width=200px> </img>'
                +'<p id="descricao">'+filme_.description+'</p> <h6 id="dataLancamento"> <span> Lançamento: </span>' + filme_.release_date +'</h6>'
                +'<h6 id="diretor"> <span> Diretor: </span> ' + filme_.director +' </div>';
                
                $('#listaResultante').append(div);
                cont += 1;
            }
        })
    }
    if(cont == 0){
        window.location="erro.html";
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

function compara(a,b){
    if(a.release_date > b.release_date){
        return 1;
    }else if(a.release_date < b.release_date){
        return -1;
    }else{
        return 0;
    }
}

function buscarGenero(genero){
    var valores = {
        'genero':genero,
        'filmes': filmes
    }
    window.localStorage.setItem('argumentos', JSON.stringify(valores));
    window.location.href="resultado_busca.html";

}

function buscarOutrosGeneros(genero){
    var genero_en = null;
    var lista = [
        'Comédia',
        'Romance',
        'Ação',
        'Drama',
        'Suspense',
        'Crime',
        'Aventura',
        'Mistério',
        'Horror',
        'Ficção científica',
        'Fantasia',
        'Animação',
        'Esporte',
        'Biografia',
        'Família',
        'Música',
        'Guerra',
        'Curto',
        'Ocidental'
    ]

    var lista_generos = [
        'Comedy',
        'Romance',
        'Action',
        'Drama',
        'Thriller',
        'Crime',
        'Adventure',
        'Mystery',
        'Horror',
        'Science Fiction ',
        'Fantasy',
        'Animation',
        'Sport',
        'Biography',
        'Family',
        'Music',
        'War',
        'Short',
        'Western'
    ]

    for(let i = 0; i < lista.length; i++){
        if(genero.toUpperCase() == lista[i].toUpperCase() || genero.toUpperCase() == lista_generos[i].toUpperCase()){
            genero_en = lista_generos[i];
        }
    }

    var valores = {
        'genero':genero_en,
        'filmes': filmes
    }

    window.localStorage.setItem('argumentos', JSON.stringify(valores));
    window.location.href="resultado_busca.html";
}