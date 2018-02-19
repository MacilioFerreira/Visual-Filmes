//altera o método de sincronização
$.ajaxSetup({
    async: false
});

var filmes = [];
var lista_filmes_plus = [];

$(document).ready(function(){
    
    //Inicia a transição dos slides AIzaSyCopyEuCquSsseOEva1HzAW6Z_b1RXwX60
    $('.slider').slider({
        full_width: true,
        interval: 7000
    });

    $('#search').keydown(function(event) {
        var genero = $('input[name=q]').val();
        if (event.keyCode == 13 && genero.length >= 1) {
            buscarOutrosGeneros(genero);
            return false;
        }
    });
    
    var urlAPI = "https://ghibliapi.herokuapp.com/films";
    $.getJSON(urlAPI, {
        format: "json"
    })
    .done(function(data) {
        var sliders = 0;
        for (let i = data.length-1; i < data.length; i--){
            const elemento = data.sort(compara)[i];
            var imagem = getImagem(elemento.title, elemento.release_date);
            if(sliders < 5 && !filmes.includes(elemento)){
                if(imagem){
                    $('#slides').append('<li><img class="ns-img" src="'+imagem+'"></img></li>');
                }else{
                    $('#slides').append('<li><img src="images/movie-play-button.png" height=250px width=200px> </img></li>');
                }
                sliders += 1;
                filmes.push(elemento);
            }else{
                if(!filmes.includes(elemento)){
                    filmes.push(elemento);
    
                    var nota_imagem = parseInt(elemento.rt_score) >= 70 ? '<label id="imgNota"><i class="material-icons small">star</i></label>'+'<h6 id="textNota">'+elemento.rt_score+'</h6>' : '<label id="imgNota2"><i class="material-icons small">star</i></label>'+'<h6 id="textNota">'+elemento.rt_score+'</h6>';
                    
                    var div_img_padrao = '<div class="col-sm-10"> <h5 id="titulo"> <span> ' +elemento.title
                    +' </span> </h5> <img src="images/movie-play-button.png" height=250px width=200px> </img>'
                    +'<p id="descricao">'+elemento.description+'</p> <h6 id="dataLancamento"> <span> Lançamento: </span>' + elemento.release_date +'</h6>'
                    +'<h6 id="diretor"> <span> Diretor: </span> ' + elemento.director +' </h6>'+ nota_imagem + '</div>';
                    
                    var div_img_poster = '<div class="col-sm-10"> <h5 id="titulo"> <span> '+elemento.title+' </span> </h5> <img src="'+imagem+'" height=250px width=200px> </img>'
                    +'<p id="descricao">'+elemento.description+'</p> <h6 id="dataLancamento"> <span> Lançamento: </span>' + elemento.release_date +'</h6>'
                    +'<h6 id="diretor"> <span> Diretor: </span> ' + elemento.director +' </h6>'+ nota_imagem + '</div>';
                    
                    if (imagem){
                        $('#lista').append(div_img_poster);
                    }else{
                        $('#lista').append(div_img_padrao);
                    }
                }
            }
        }
    
    }).fail(function(data){
        alert("Erro ao efetuar requisição.. :/ ");
    }); 
});

function getImagem(titulo, anoLancamento){
    var imagem = null;
    var url = 'http://www.omdbapi.com/?t='+titulo+'&y='+anoLancamento+'&plot=full&apikey=48c5add4';
    $.getJSON(url, {
        format: "json"
    })
    .done(function(data) {
        imagem = data.Poster;
        lista_filmes_plus.push(data);
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
}

function buscarOutrosGeneros(genero){
    var genero_en = null;
    var lista = [
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
