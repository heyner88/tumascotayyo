$(document).ready(function(){

	if($('#paises').length!=0)
		{
			$.getJSON('libs/funciones-principales.php',{opc: 'paises'}).done(function(data){
				$.each(data.paises,function(i,dat){
					$('#paises').append(
								'<div id="pais1" class="pais"><a href="queessscs.html" ><img src="'+dat.Img_pais.replace('.', '')+'">'+
									'<div class="btnpais">'+
										'<h3>'+dat.Nombre_pais+'</h3></a>'+
									'</div>'+
								'</div>'
						);
				});
			});

			$('.pais').live('click',function(){
				elegido = $(this).find('h3').text();
				localStorage.setItem('pais',elegido);
			});
		}

	if($('#mdip2').length!=0)
		{	var width = 0;
			$.getJSON('libs/funciones-principales.php',{opc: 'paises'}).done(function(data){
				$.each(data.paises,function(i,dat){
					if(dat.Nombre_pais==localStorage.getItem('pais'))
						activo = '<li><a class="activo" href="">'+dat.Nombre_pais+'</a></li>';
					else
						activo = '<li><a href="">'+dat.Nombre_pais+'</a></li>';
					$('.rmm2 ul').append(activo);
				});
			});
			setTimeout(function(){
			$('.rmm2 ul li').each(function() {
				width = width + $(this).outerWidth();

			});
			$('.rmm2').css('max-width' , width*1.05+'px');
			},700);

			$('.rmm2 ul li').live('click',function(){
				elegido = $(this).text();
				localStorage.setItem('pais',elegido);
			});
		}

	if($('.ch-grid').length!=0)
		{ imcul = 0;
			$.getJSON('libs/funciones-principales.php',{opc: 'cultivos', pais: localStorage.getItem('pais')}).done(function(data){
				$.each(data.cultivos,function(i,dat){
					imcul++;
					$('.ch-grid').append(
										'<li>'+
											'<div id="cult'+imcul+'" class="ch-item">'+
												'<div class="ch-info">'+
													'<a href="javascript:void(0)" class="cultivo"><h3>'+dat.Nombre_cultivo+'</h3></a>'+
												'</div>'+
											'</div>'+
										'</li>'
										);
					$('#cult'+imcul+'').css({
						'background-image': 'url('+dat.Img_cultivo.replace('.', '')+')',
						'background-size': 'contain'
					});
				});
			});
		}

	$('.cultivo').live('click',function(){
		localStorage.setItem('cultivo',$(this).text());
		location.href='contenidoin.html';
	})

	if($('#equipo').length!=0)
	{
		$.getJSON('libs/funciones-principales.php',{opc: 'equipo', pais: localStorage.getItem('pais')}).done(function(data){
			$.each(data.equipo,function(i,dat){
				$('#equipo').append(
								    '<div id="avatar"><img src="'+dat.Img_eq.replace('.', '')+'"></div>'+
								    '<div id="conenidoavatar">'+
								        '<h3>'+dat.Zona_eq+'</h3>'+
								        '<p><strong>Nombre: </strong>'+dat.Nombre_eq+'</p>'+
								        '<p><strong>Correo: </strong>'+dat.Correo_eq+'</p>'+
								        '<p><strong>Celular: </strong>'+dat.Cel_eq+'</p>'+
								    '</div>'
									);
			});
		});
	}

	if($('.contenidovalidacion').length!=0)
	{
		$.getJSON('libs/funciones-principales.php',{opc: 'validacion', pais: localStorage.getItem('pais'),val:localStorage.getItem('cultivo')}).done(function(data){
			$.each(data.validaciones,function(i,dat){

				$('.contenidovalidacion').append('<div id="ladovalida1">'+
													'<div id="imgvalidaperfil">'+
													   ' <img src="'+dat.Img_cultivo.replace('.', '')+'">'+
													    '<h2>'+dat.Nombre_cultivo+'</h2>'+
										    		'</div>'+
										    		'<div id="validaencabezados">'+
											    		'<h3>Lugar: '+dat.Lugar_val+'</h3>'+
														'<h4>Cultivo: '+dat.Nombre_cultivo+'</h4>'+
														'<h4>Aplicacion:</h4>'+
														'<p>'+dat.Apl_val+'</p>'+
													'</div>'+
												'</div>'+
												'<div id="ladovalida2">'+
													'<h2>Fecha: <span>'+dat.Fecha_val+'</span></h2>'+
												'</div>'
												);

				$.getJSON('libs/funciones-principales.php',{opc: 'imgsvalidacion', val: dat.Id_val}).done(function(data){
						$.each(data.imgsval,function(i,dat){
/*							$('.contenidovalidacion').append('<div id="imgvalida">'+
								'<div id="testvalida"><img src="images/'+dat.Img_val+'"><figcaption><h2>Imagen Cultivo</h2></figcaption></div>'+
								'</div>');*/
							$('#imgvalida').append('<div id="testvalida"><img src="images/'+dat.Img_val+'"><figcaption><h2></h2></figcaption></div>'+
								'</div>');
						});
					});

			});
		});
	}

	if($('#zonas').length!=0)
	{
		$.getJSON('libs/funciones-principales.php',{opc: 'cadena', pais: localStorage.getItem('pais')}).done(function(data){
			$.each(data.cadena,function(i,dat){
				$('#zonas ul').append('<li><a>'+dat.zona+'</a></li>');
			});
		});
	}

	$('#zonas a').live('mouseover',function(){
		$.getJSON('libs/funciones-principales.php',{opc: 'distribuidor', val:$(this).text()}).done(function(data){
			$('#distribuidor ul, #detalles ul').empty();
			$.each(data.distribuidores,function(i,dat){
				$('#distribuidor ul').append('<li><a>'+dat.distribuidor+'</a></li>');
			});
			if(data.distribuidores!='')
				$('#distribuidor').css('opacity','1');
			else
				$('#distribuidor').css('opacity','0');
			$('#detalles').css('opacity','0');
		});
	});

	$('#distribuidor a').live('mouseover',function(){
		$.getJSON('libs/funciones-principales.php',{opc: 'detalles', val:$(this).text()}).done(function(data){
			$('#detalles ul').empty();
			$.each(data.detalles,function(i,dat){
				if(dat.Id_dis!=undefined)
				{
					$('#detalles ul').append('<li>'+dat.direccion+'</li>'+
										'<li>'+dat.telefono+'</li>'+
										'<li>'+dat.fax+'</li>');
					$('#contac ul').empty();
				}
				else
				{
					$('#contac ul').append('<li>'+dat.nombre+'</li>'+
											'<li>'+dat.cargo+'</li>'+
											'<li>Email: '+dat.email+'</li>'+
											'<li>Celular: '+dat.cel+'</li><br>');
					$('#contac').fadeIn();
				}
			});
			$('#detalles').css('opacity','1');
		});
	});

	if($('#contacto').length!=0)
	{
		$('#contacto').on('submit',function(e){
			e.preventDefault();
			data= $('#contacto').serialize();
			$.post('libs/correo.php',data).done(function(data){
				if(data=='correcto')
				{
					setTimeout(function() {
						$('#fondos').fadeIn('fast',function(){
					    $('#rp').animate({'top':'350px'},50).fadeIn();
					 	});
					}, 400);
					setTimeout(function() {
					    $("#rp").fadeOut();
					    $('#fondos').fadeOut('fast');
					}, 2000);
					$(':input, #contacto').not('input:checkbox').val('');
					$('input:checkbox').removeAttr('checked');
				}
			});
		})

	}
});