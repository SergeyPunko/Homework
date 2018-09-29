let		objStringifiedAndEncoded = location.search.substr(1), 
      	objStringified = decodeURIComponent(objStringifiedAndEncoded),
        obj = JSON.parse(objStringified);
writeInfo(obj);
setStyle();
function writeInfo (object) {
	let setTable = document.createElement("table");
	setTable.id = "styleTable";
	setTable.innerHTML+="<tr><td>Тип</td><td>"+object.typework+"</td></tr>";
	setTable.innerHTML+="<tr><td>Имя</td><td>"+object.firstname+"</td></tr>";
	setTable.innerHTML+="<tr><td>Фамилия</td><td>"+object.secondname+"</td></tr>";
	setTable.innerHTML+="<tr><td>Отчество</td><td>"+object.thirdname+"</td></tr>";
	setTable.innerHTML+="<tr><td>Возраст</td><td>"+object.age+"</td></tr>";
	setTable.innerHTML+="<tr><td>Пол</td><td>"+object.sex+"</td></tr>";
	setTable.innerHTML+="<tr><td>Специальность</td><td>"+object.specialty+"</td></tr>";
	setTable.innerHTML+="<tr><td>Стаж</td><td>"+object.experience+"</td></tr>";
	setTable.innerHTML+="<tr><td>Должность</td><td>"+object.position+"</td></tr>";
	document.body.appendChild(setTable);
	let btnhome = document.createElement("span");
	btnhome.id = "spanHome";
	btnhome.innerHTML="<button><a id=\"home\" href=\"index.html\">Назад</a></button>";
	document.body.appendChild(btnhome);
	document.getElementById("home").style.textDecoration="none";
	document.getElementById("home").style.color="#ffdbae";
}
 function setStyle(){
 	let setTable = document.getElementById("styleTable");
 	let element = document.getElementsByTagName("td");
 	setTable.style.borderCollapse="collapse";
 	setTable.style.marginTop="10%";
	setTable.style.tableLayout="fixed";
	setTable.style.width="70%";
	setTable.style.fontSize="1.1em";
	for(let i = 0 ; i<element.length; i++){
		element[i].style.cssText="border: 1px solid #aeaeae; \ text-align: center; \ ";
	}
 }