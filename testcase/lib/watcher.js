/**
* Author: Major
* Date: 11/30 2011
*/
if (!window.watcher) window.watcher = {};
(function(w) {

w.watchQueue=[];

/**
* @value {JSON} {attribute:attr,viewModel:viewModel,fct:fct,callback:callback}
*/
w.addWatchTarget=function(obj){
  this.watchQueue.push(obj);
};

w.removeWatchTarget=function(key){
  //todo
};

w.startWatch=function(){
  for(var i=0;i<w.watchQueue.length;i++){
	var obj=w.watchQueue[i];
	  w.playback(obj);
  }
  if(this.timeoutId) window.clearTimeout(this.timeoutId);
  this.timeoutId=window.setTimeout(w.startWatch,0);
};

//use set time, currently could not stop watch, bug or not?
w.stopWatch=function(){
  if(this.timeoutId){
    window.clearTimeout(this.timeoutId);
  }
};

w.playback=function(playbackObj){
 var p=playbackObj;
 var attribute=p.attribute;
 var viewModel=p.viewModel;
 var fct=p.fct;
 var callback=p.callback;
 if(fct.apply(viewModel,[attribute])){
   callback();
 }
};

// how to delete watch target? 
// use UID as store key?
// how to watch object which has too much level?
w.watchUtil=function(attr,viewModel,fct){
   return {
     'do':function(f){
	   w.addWatchTarget({attribute:attr,viewModel:viewModel,fct:fct,callback:f});
	   if(fct.apply(viewModel,[attr])){
	     f();
	   }
	 }
   };
};

})(watcher);
