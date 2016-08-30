PEDRA = 1;
PAPEL = 2;
TESOURA = 3;
ptsPlayer = 0;
ptsPc = 0;
new WOW().init();
$('.step.one').show();
nome = 'Bubassauro';
mode = 'easy';

 $('#seunome').click(function(){
 	nome = $('#nome').val();
 	$('.player').text(nome)
 	$(this).parent().parent().addClass('fadeOutLeft');
 	console.log('.step.'+$(this).attr('data-next-step'))
 	$('.step.'+$(this).attr('data-next-step')+'').show();
 	$('.step.'+$(this).attr('data-next-step')+'').addClass('fadeInRight')
 })


 $('.mode').click(function(){
 	mode = $(this).attr('data-mode')
 	console.log('Modo: '+mode);
 	$(this).parent().parent().addClass('fadeOutUp');
 	next = $(this).attr('data-next-step')
 	$('.load').show();
 	$('.load').addClass('fadeInUp');

 	setTimeout(function(){
 		$('.load .quadrado').css('animation','zoom 0.3s linear')
 		setTimeout(function(){
 			$('.load').hide();
 			$('body').css('background','#E91E63');
 			$('.'+next+'').show();
 			$('.arena').show();
 				$('.sidebar').show();
 			$('.'+next+'').addClass('fadeInRight');
 		},290)
 	},1500)
 })


$('.action').click(function(){
	if($(this).hasClass('pc'))
	{
		$('#vencedor').text('Ladrão! Não use os comandos de seu adversáriO! Jogue direito!! Cabra safado!');
		return false;
	}


	player_jogada = $(this).attr('data-action')
	$(this).css('transform','translateY(-100px)');
	player = nome;

	armas = [PEDRA,PAPEL,TESOURA]

	console.log(armas)
	if(mode == 'easy'){
			console.log('Jogando no EASY');
			computador_jogada_indice = Math.floor((Math.random() * 3) + 0);
			console.log(computador_jogada_indice);
			computador_jogada = armas[computador_jogada_indice]
			
		}else if(mode == 'hard'){
			console.log('Jogando no hard');

			console.log(player_jogada);

			if(player_jogada == PEDRA)
			{
			 	computador_jogada = PAPEL
			}

			if(player_jogada == PAPEL)
			{
				computador_jogada = TESOURA
			}

			if(player_jogada == TESOURA)
			{
				computador_jogada = PEDRA
			}
		}
		$('div[data-action-pc='+computador_jogada+']').css('transform','translateY(100px)');
		win = fight(player_jogada,computador_jogada);

		console.log('WIN = '+win)
		if(win == -1){
			win = 'Computador'
			ptsPc += 1;
			resultado = 'Você perdeu!';
		}
		if(win == 0){
			win = 'Empatou';
			resultado = 'Empate!';
		}

		if(win == 1){
			win = player;
			resultado = 'Você venceu!';
			ptsPlayer += 1;
		}

		$('.ptsPlayer').text(ptsPlayer)
		$('.ptsPc').text(ptsPc)
	
		$('#vencedor').text(resultado);
			setTimeout(function(){resetPosition();
		},2000)


})


$('#resetar').click(function(){
	ptsPlayer = 0;
	ptsPc = 0;
	$('.ptsPlayer').text(ptsPlayer)
		$('.ptsPc').text(ptsPc)
	return false;
})





 function fight(player_jogada,computador_jogada){
	console.log('Player: '+player_jogada+' vS Computador:'+computador_jogada);

	if(player_jogada == computador_jogada)
	{
		return 0
	}

	if(player_jogada == PEDRA)
	{
		if(computador_jogada == TESOURA)
			return 1
		else
			return -1;
	}

	if(player_jogada == PAPEL)
	{
		if(computador_jogada == PEDRA)
			return 1
		else
			return -1;
	}

	if(player_jogada == TESOURA)
	{
		if(computador_jogada == PAPEL)
			return 1
		else
			return -1;
	}
}

function resetPosition(){
	$('.action').css('transform','translateY(0)');
}