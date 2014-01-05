var workers = {};

workers.getWeather = function(queryKey){
  $.ajax({
  	type:"GET",
		url:'http://api.wunderground.com/api/73cea140775686f3/conditions/q/'+ queryKey + '.json',
		dataType: 'jsonp',
		success: function(data){
			console.log(data.current_observation.feelslike_c);
			workers.displayMyCity(data.current_observation);
		}
	});
};

workers.getPosition = function(position){
	console.log(position.coords.latitude + ',' + position.coords.longitude);
	workers.getWeather(position.coords.latitude + ',' + position.coords.longitude);
};

workers.getState = function(city){
  $.ajax({
  	type:"GET",
  	url:"http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + city,
  	dataType: 'jsonp',
  	success: function(data){
  		if(data.length > 1){
	  		for(var i =1; data.length> i; i++){
	  			console.log(data[i].split(','));
	  			$('.city_list').append('<li><a class="city" href="#">'+ data[i] +'</a></li>')
	  		}
	    } else {
	      workers.getQueryKey(data);
	    };
  	}
  })
};

workers.getQueryKey = function(locationArr){
	var location = locationArr[0].split(',');
  if(location[2] === " United States"){
  	workers.addCity(location[1] + '/' + location[0]);
  	console.log(location[1] + '/' + location[0]);
  } else {
  	workers.addCity(location[2] + '/' + location[0]);
  	console.log(location[2] + '/' + location[0]);
  }
};

workers.displayMyCity = function(data){
	$('.swipe-wrap').append('<div><h3>' + data.display_location.full + '<h3><p>' + data.feelslike_c + '</p></div>');
		workers.addSwipe();
};

workers.addCity = function(querykey){
  if(typeof(Storage)!== "undefined"){
  	if(localStorage.querykey){
  		var storage = localStorage.querykey.split(',');
      if(_.every(storage, function(key){return key !== querykey})){
      	console.log('every');
  		  var keys = localStorage.querykey + ',' + querykey;
  		  localStorage.querykey = keys;
  		  workers.getWeather(querykey);	
      } else {
        alert('this city is already in your list');
  	  }
	  } else {
  	localStorage.querykey = querykey;
  	workers.getWeather(querykey);
 		}
  } else {
    console.log('no storage');
  }
}


workers.addSwipe = function(){
	console.log('addSwipe');
	window.mySwipe = new Swipe(document.getElementById('slider'),{
	  startSlide: 0,
	  speed: 400
  });
  mySwipe.prev();
};

var init = function() {
  var card = document.getElementById('card');
  
  document.getElementById('flip').addEventListener( 'click', function(){
    card.toggleClassName('flipped');
  }, false);
};

window.addEventListener('DOMContentLoaded', init, false);