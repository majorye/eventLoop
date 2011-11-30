function watcher(){};
watcher.watchQueue=[];
watcher.intervalTime=100;
/**
* @value {JSON} {attribute:attr,viewModel:viewModel,fct:fct,callback:callback}
*/
watcher.addWatchTarget=function(obj){
  watcher.watchQueue.push(obj);
}

watcher.removeWatchTarget=function(key){
  //todo
}
watcher.startWatch=function(){
  if(!this.intervalId){
    this.intervalId=setInterval(function(){
		  for(var i=0;i<watcher.watchQueue.length;i++){
			var obj=watcher.watchQueue[i];
			setTimeout(function(){
			  watcher.playback(obj);
			},0);
		  }
	},watcher.intervalTime);
  }
}

watcher.stopWatch=function(){
  if(this.intervalId){
    window.clearInterval(this.intervalId);
  }
};

watcher.playback=function(playbackObj){
 var p=playbackObj;
 var attribute=p.attribute;
 var viewModel=p.viewModel;
 var fct=p.fct;
 var callback=p.callback;
 if(fct.apply(viewModel,[attribute])){
   callback();
 }
}

// how to delete watch target? 
// use UID as store key?
// how to watch object which has too much level?
watcher.watchUtil=function(attr,viewModel,fct){
   return {
     'do':function(f){
	   watcher.addWatchTarget({attribute:attr,viewModel:viewModel,fct:fct,callback:f});
	   if(fct.apply(viewModel,[attr])){
	     f();
	   }
	 }
   };
}
