var workers = {};

workers.getWeather = function(queryKey){
  $.ajax({
  	type:"GET",
		url:'http://api.wunderground.com/api/73cea140775686f3/conditions/q/'+ queryKey + '.json',
		dataType: 'jsonp',
		success: function(data){
			console.log(data.current_observation.feelslike_c);
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
	      workers.addCity(data[0].split(',')[0]);
	    };
  	}
  })
};

workers.getQueryKey = function(locationArr){
	var location = locationArr[0].split(',');
  if(location[2] === " United States"){
  	workers.getWeather(location[1] + '/' + location[0]);
  	console.log(location[1] + '/' + location[0]);
  } else {
  	workers.getWeather(location[2] + '/' + location[0]);
  	console.log(location[2] + '/' + location[0]);
  }
};

workers.displayMyCity = function(){
	if(localStorage.city){
		console.log('displayMyCity');
		var storage = localStorage.city.split(',');
		for(var i = 0; storage.length > i; i++){
			$('.swipe-wrap').append('<div><p>' + storage[i] + '<p></div>');
		}
		// workers.addSwipe();
	};
};

workers.addCity = function(city){
  if(typeof(Storage)!== "undefined"){
  	var cities = [city];
  	if(localStorage.city){
  	  var storage = localStorage.city.split(',');
  	  for(var i = 0; storage.length > i; i++){
  			cities.push(storage[i]);
  	  }
	  }
  	  localStorage.city = cities;
  	$('.swipe-wrap').append('<div><p>' + city + '<p></div>');
  	// workers.addSwipe();
  } else {
    console.log('no storage');
  }
}

// workers.addSwipe = function(){
// 	console.log('addSwipe');
// 	window.mySwipe = new Swipe(document.getElementById('slider'),{
// 	  startSlide: 0,
// 	  speed: 400
// 	  // continuous: true,
// 	  // disableScroll: false,
// 	  // stopPropagation: false,
// 	  // callback: function(index, elem) {},
// 	  // transitionEnd: function(index, elem) {}
//   });
// };