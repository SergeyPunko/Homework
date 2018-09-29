const xhr = new XMLHttpRequest();
function TypeWorker(typework,firstname,secondname,thirdname,age,sex){
	this.typework = typework;
	this.firstname = firstname;
	this.secondname = secondname;
	this.thirdname = thirdname;
	this.age = age;
	this.sex = sex;
}
TypeWorker.prototype.setInfo = function(typework,firstname,secondname,thirdname,age,sex,specialty,experience,position){
	this.typework = typework;
	this.firstname = firstname;
	this.secondname = secondname;
	this.thirdname = thirdname;
	this.age = age;
	this.sex = sex;
	this.specialty=specialty;
	this.experience=experience;
	this.position=position;
} 

TypeWorker.prototype.getInfo = function(){
	return {typework:this.typework, firstname:this.firstname, secondname:this.secondname, thirdname:this.thirdname, age:this.age, sex:this.sex,specialty:this.specialty,experience:this.experience,position:this.position};
} 

function Worker (typework,firstname,secondname,thirdname,age,sex,specialty,experience,position) {
	TypeWorker.call(this,typework,firstname,secondname,thirdname,age,sex)
	this.specialty=specialty;
	this.experience=experience;
	this.position=position;
}

Worker.prototype = Object.create(TypeWorker.prototype);

let arrObj = [];
for(let i=0;i<getRequest().length;i++){
	arrObj.push(new Worker(getRequest()[i].typework , getRequest()[i].firstname , getRequest()[i].secondname , getRequest()[i].thirdname , getRequest()[i].age , getRequest()[i].sex , getRequest()[i].specialty , getRequest()[i].experience , getRequest()[i].position));
}
if(arrObj!=0){
	document.getElementById('viewObj').style.display="block";
	let parentElem = document.getElementById("allobject");
	let boxname = document.createElement('tr');
	boxname.id = "row";
	boxname.innerHTML+="<td>Тип</td><td>Имя</td><td>Фамилия</td><td>Возраст</td><td>Пол</td><td>Управление</td>";
	parentElem.appendChild(boxname);
	for(let i=0;i<arrObj.length;i++){
		let boxObj = document.createElement('tr');
		boxObj.id = "row"+i;
		boxObj.innerHTML+="<td>"+arrObj[i].typework+"</td><td>"+arrObj[i].firstname+"</td><td>"+arrObj[i].secondname+"</td><td>"+arrObj[i].age+"</td><td>"+arrObj[i].sex+"</td>";
		boxObj.innerHTML+="<td><span class=\"red\" onclick=\'saveobject("+i+")\'>delete</span><span onclick=\'setterObj("+i+")\'>edit</span><a href=\"\" class=\"blue\" onclick=\'infoObject("+i+")\'>info</a></td>"
		parentElem.appendChild(boxObj);
	}
}

function editObject(num){
	document.getElementById("saveObj").style.display="none"
	let parentElem = document.getElementById("allobject");
	let getData = getRequest();
	pos='';
	if(getValue(positionveh)==''){
		pos=getValue(positionind);
	} else{
		pos=getValue(positionveh);
	}
	titletable();
	if(!validate()) return;
	putRequest(getData[num].id , arrObj[num]);
	for(let i=0;i<arrObj.length;i++){	
		writeObject(i);
	}
	document.getElementById('addObj').click();
	if(arrObj.length!=0){
		document.getElementById('viewObj').style.display="block"
	} else {
		document.getElementById('viewObj').style.display="none"
	}
	document.getElementById("editObj").style.display="none";
}

let addobject = document.getElementById('addObj');
addobject.onclick = function(){
	clearobject();
	document.getElementById("saveObj").style.display="block";
	if(document.getElementById('setObj').style.display=="block"){
		document.getElementById('setObj').style.display="none";
		document.getElementById('addObj').textContent="Создать";
	} 	else{
			document.getElementById('setObj').style.display="block";
			document.getElementById('addObj').textContent="Отмена";
	}
}


function choose() {
	let selectBox = document.getElementById("typeObj");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue=='industr'){
   		document.getElementById('industrial').style.display="table-row";
   		document.getElementsByClassName('finfo')[0].style.display='table-row';
   		document.getElementsByClassName('finfo')[1].style.display='table-row';
   		document.getElementById('vehicle').style.display="none";

		
    }else if (selectedValue=='vehic') {
			document.getElementById('vehicle').style.display="table-row";
			document.getElementById('industrial').style.display="none";	
			document.getElementsByClassName('finfo')[0].style.display='table-row';
			document.getElementsByClassName('finfo')[1].style.display='table-row';
   	} else{
   		document.getElementById('vehicle').style.display="none";
		document.getElementById('industrial').style.display="none";	
		document.getElementsByClassName('finfo')[0].style.display='none';
		document.getElementsByClassName('finfo')[1].style.display='none';
   	}
}
function getValue(val) {
	let text = val.options[val.selectedIndex].text;
    return text;
}
function getSex(){
	let sexs = document.getElementsByName('sex');
	for(i=0; i< sexs.length; i++){
		if (sexs[i].checked){
			return sexs[i].parentNode.innerText;
			break;
     	}
	}
}

function infoObject(val){
	
	let objStringified = JSON.stringify(getRequest()[val].id);
    let objStringifiedAndEncoded = encodeURIComponent(objStringified);
            
    let a = document.getElementsByTagName("a")[val];
    a.href = "info.html?" + objStringifiedAndEncoded;     
}

function saveobject(val){
	let getData = getRequest();
	pos='';
	if(getValue(positionveh)==''){
		pos=getValue(positionind);
	} else{
		pos=getValue(positionveh);
	}
	titletable();
	if(val!=-1){
		deleteRequest(getData[val].id)
		arrObj.splice(val,1);
		document.getElementById('addObj').click();
	} else{
		if(!validate()) return;
		arrObj.push(new Worker(getValue(typeObj),document.getElementById('firstname').value,document.getElementById('secondname').value,document.getElementById('thirdname').value,document.getElementById('setage').value,getSex(),document.getElementById('specialty').value,document.getElementById('experience').value,pos));
		postRequest(arrObj[arrObj.length-1]);	
	}
	for(let i=0;i<arrObj.length;i++){	
		writeObject(i);
	}
	document.getElementById('addObj').click();
	if(arrObj.length!=0){
		document.getElementById('viewObj').style.display="block"
	} else {
		document.getElementById('viewObj').style.display="none"
	}
}

function titletable(){
	let parentElem = document.getElementById("allobject");
	document.getElementById("allobject").innerHTML='';
	let boxname = document.createElement('tr');
	boxname.id = "row";
	boxname.innerHTML+="<td>Тип</td><td>Имя</td><td>Фамилия</td><td>Возраст</td><td>Пол</td><td>Управление</td>";
	parentElem.appendChild(boxname);
}

function validate(){
	if((getValue(typeObj)=='') || (document.getElementById('firstname').value=='') || (document.getElementById('secondname').value=='') || (document.getElementById('thirdname').value=='') || (document.getElementById('setage').value=='') || (getSex()==undefined) || (document.getElementById('specialty').value=='') || (document.getElementById('experience').value=='') || (pos=='')){
		alert("Заполните все поля!");
		return false;
	} else if (!isNumeric(document.getElementById('setage').value) || !isLetter(document.getElementById('firstname').value) || !isLetter(getValue(typeObj)) || !isLetter(document.getElementById('secondname').value) || !isLetter(document.getElementById('thirdname').value) || !isLetter(getSex()) || !isLetter(document.getElementById('specialty').value) || !isLetter(document.getElementById('experience').value) || !isLetter(pos)){
		alert("Проверьте правильность введённых данных!");
		return false;
	} else return true;
}

function isNumeric( value ) {
  return (/^[\d]+$/g).test( value );
}

function isLetter( value ) {
  return (/^[A-Za-z0-9А-Яа-я ]+$/g).test( value );
}

function deleteRequest(item){
	return fetch(/worker-man/ + item, {
    	method: 'delete'
 	}).then(response => response.json());
}

function getRequest (){
	xhr.open("GET", "/worker-man/", false);
	
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function putRequest (items, postArgument) {
	xhr.open("PUT", "/worker-man/"+items, false);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	let json = JSON.stringify(postArgument);
	xhr.send(json);
}

function postRequest (postArgument) {
	xhr.open("POST", '/worker-man', false)
	xhr.setRequestHeader('Content-type', 'application/json');
	let json = JSON.stringify(postArgument);
	xhr.send(json);
}

function setterObj(num){
	document.getElementById("saveObj").style.display="none";
	document.getElementById('setObj').style.display="block";
	if(arrObj[num].typework=="Рабочий индустриального предприятия") document.getElementById('typeObj').value="industr"
	else document.getElementById('typeObj').value="vehic";
	choose();
	document.getElementById('firstname').value=arrObj[num].firstname;
	document.getElementById('secondname').value=arrObj[num].secondname;
	document.getElementById('thirdname').value=arrObj[num].thirdname;
	document.getElementById('setage').value=arrObj[num].age;
	document.getElementById('specialty').value=arrObj[num].specialty;
	document.getElementById('experience').value=arrObj[num].experience;
	if (arrObj[num].typework=='Рабочий индустриального предприятия') {
		if(arrObj[num].position=="Инженер") document.getElementById('positionind').value="engineer"
		else document.getElementById('positionind').value="tokar";
	} else{
		if(arrObj[num].position=="Водитель") document.getElementById('positionveh').value="vehicleman"
		else document.getElementById('positionind').value="buhgalt";
	};
	if (arrObj[num].sex!="Мужчина"){
		document.getElementsByName('sex')[0].checked=true;
	} else{
		document.getElementsByName('sex')[1].checked=true;
	}
	let parentElem = document.getElementById("btn");
	parentElem.innerHTML+="<button id=\"editObj\" onclick=\"editObject("+num+")\">Изменить</button>";
	document.getElementById('editObj').style.display="block";
}


function writeObject(i){
	let parentElem = document.getElementById("allobject");
	let boxObj = document.createElement('tr');
	boxObj.id = "row"+i;
	boxObj.innerHTML+="<td>"+arrObj[i].typework+"</td><td>"+arrObj[i].firstname+"</td><td>"+arrObj[i].secondname+"</td><td>"+arrObj[i].age+"</td><td>"+arrObj[i].sex+"</td>";
	boxObj.innerHTML+="<td><span class=\"red\" onclick=\'saveobject("+i+")\'>delete</span><span onclick=\'setterObj("+i+")\'>edit</span><a href=\"\" class=\"blue\" onclick=\'infoObject("+i+")\'>info</a></td>"
	parentElem.appendChild(boxObj);
}

function clearobject(){
	document.getElementById('typeObj').value='';
	document.getElementById('firstname').value='';
	document.getElementById('secondname').value='';
	document.getElementById('thirdname').value='';
	document.getElementById('setage').value='';
	document.getElementById('specialty').value='';
	document.getElementById('experience').value='';
	document.getElementById('positionveh').value='';
	document.getElementById('positionind').value='';
	for(i=0; i< document.getElementsByName('sex').length; i++){
		if (document.getElementsByName('sex')[i].checked){
			document.getElementsByName('sex')[i].checked=false;
			break;
     	}
	}
}