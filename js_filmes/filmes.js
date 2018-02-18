//altera o método de sincronização
$.ajaxSetup({
    async: false
});

//Inicia a transição dos slides
$(document).ready(function(){
    $('.slider').slider({
        full_width: true,
        interval: 7000
    });
});

var filmes = [];

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

                var nota_imagem = parseInt(elemento.rt_score) >= 70 ? '<label id="imgNota1"><i class="material-icons small">star</i></label>'+'<h6 id="textNota">'+elemento.rt_score+'</h6>' : '<label id="imgNota2"><i class="material-icons small">star</i></label>'+'<h6 id="textNota">'+elemento.rt_score+'</h6>';
                
                var div_img_padrao = '<div class="col-sm-10"> <h5 id="titulo"> <span> ' +elemento.title
                +' </span> </h5> <img src="images/movie-play-button.png" height=250px width=200px> </img>'
                +'<p id="descricao">'+elemento.description+'</p> <h6 id="dataLancamento"> <span> Lançamento: </span>' + elemento.release_date +'</h6>'
                +'<h6 id="diretor"> <span> Diretor: </span> ' + elemento.director +' </h6>'+ nota_imagem + '</div>';
                
                var div_img_poster = '<div class="col-sm-10"> <h5 id="titulo"> <span> '+elemento.title+' </span> </h5> <img src="'+imagem+'" height=250px width=200px> </img>'
                +'<p id="descricao">'+elemento.description+'</p> <h6 id="dataLancamento"> <span> Lançamento: </span>' + elemento.release_date +'</h6>'
                +'<h6 id="diretor"> <span> Diretor: </span> ' + elemento.director +' </h6>'+ nota_imagem + '</div>';
                
                if (imagem){
                    $('#lista').after(div_img_poster);
                }else{
                    $('#lista').after(div_img_padrao);
                }
            }
        }
    }

}).fail(function(data){
    alert("Erro ao efetuar requisição.. :/ ");
});

function getImagem(titulo, anoLancamento){
    var imagem = null;
    var url = 'http://www.omdbapi.com/?t='+titulo+'&y='+anoLancamento+'&plot=full&apikey=';
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
