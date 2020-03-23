arr = [4,8,12,1];
function addRemove(arr,n){
	if(arr.indexOf(n) == -1){
	arr.unshift(5);
  }else{
  arr.splice(arr.indexOf(n), 1);
  }
  console.log(arr)
}
addRemove(arr,5);