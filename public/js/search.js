export document.getElementsByClassName('search-btn')[0].addEventListener("click",function(){
	let[_secondname,_firstname,_thirdname,]=document.getElementById('searching').value.split(" ");
	for(let i=0;i<arrObj.length;i++){
		if(arrObj[i].firstname==_firstname && arrObj[i].secondname==_secondname && arrObj[i].thirdname==_thirdname){
			let objStringified = JSON.stringify(getRequest()[i].id);
		    let objStringifiedAndEncoded = encodeURIComponent(objStringified);
		    document.location.href = "info.html?" + objStringifiedAndEncoded; 
		} else {
			
		}
	}
});
