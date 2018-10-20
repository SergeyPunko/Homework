const xhr = new XMLHttpRequest();
loadWorkerPage();
function setTableRow (index,name,setclass) {
	if(setclass==undefined)  setclass="";
	return "<tr class=\""+setclass+"\"><td><label for=\""+index+"\">"+name+"</label></td><td><input type=\"text\" id=\""+index+"\"> </td></tr>";
}

function loadWorkerPage(){
	const box2 = document.createElement('div');
	box2.id = "setObj";
	box2.innerHTML+= "<h1>Новый работник</h1>";
	document.getElementById('myApp').appendChild(box2);
	const box3 = document.createElement('table');
	box3.innerHTML+= "<tr><td><label for=\"typeObj\">Тип записи:</label></td><td><select name=\"obj\" id=\"typeObj\" onchange=\"choose()\"><option value=\"\"></option><option value=\"industr\">Рабочий индустриального предприятия</option><option value=\"vehic\">Рабочий транспортного предприятия</option></select></td></tr>";
	box3.innerHTML+= setTableRow("firstname","Имя");
	box3.innerHTML+= setTableRow("secondname","Фамилия");
	box3.innerHTML+= setTableRow("thirdname","Отчество");
	box3.innerHTML+= setTableRow("setage","Возраст");
	box3.innerHTML+= setTableRow("experience","Стаж","finfo");
	box3.innerHTML+= setTableRow("specialty","Специальность","finfo");
	box3.innerHTML+= "<tr id=\"industrial\"><td><label for=\"positionind\">Должность:</label></td><td><select name=\"objposition\" id=\"positionind\"><option value=\"\"></option><option value=\"engineer\">Инженер</option><option value=\"tokar\">Токарь</option></select></td></tr>";
	box3.innerHTML+= "<tr id=\"vehicle\"><td><label for=\"positionveh\">Должность:</label></td><td><select name=\"objposition\" id=\"positionveh\"><option value=\"\"></option><option value=\"vehicleman\">Водитель</option><option value=\"buhgalt\">Бухгалтер</option></select></td></tr>";
	box3.innerHTML+= "<tr><td>Пол</td><td><label for=\"sexman\">Мужчина<input type=\"radio\" id=\"sexman\" value=\"man\" name=\"sex\"></label><label for=\"sexwoman\">Женчина<input type=\"radio\" id=\"sexwoman\" value=\"woman\" name=\"sex\"></label></td></tr>";
	document.getElementById('setObj').appendChild(box3);
	document.getElementById("setObj").innerHTML+= "<div id=\"btn\"><button id=\"saveObj\" onclick=\"saveobject(-1)\">Сохранить</button><button id=\"clearObj\" onclick=\"clearobject()\">Отчистить</button></div>";
	//set view table
	const box = document.createElement('div');
	box.id = "viewObj";
	box.innerHTML+= "<h1>Все работники</h1><table id=\"allobject\"></table>";
	document.getElementById("myApp").appendChild(box);
	document.getElementById("myApp").innerHTML+="<button id=\"addObj\">Создать</button>";
	let datenow = new Date();
	document.getElementById("myApp").innerHTML+="<p id=\"viewData\">"+datenow.getDate()+'.'+(+datenow.getMonth()+1)+'.'+datenow.getFullYear()+"</p>";
};
function loadSetWorkerPage(){
	const box = document.createElement('div');
	box.id = "viewObj";
	box.innerHTML+= "<h1>Все работники</h1><table id=\"allobject\"></table>";
	document.body.appendChild(box);
	document.body.innerHTML+="<button id=\"addObj\">Создать</button>";
};
class Hardwork{
	info(){
		console.log(this)
	}
}
const People=superclass=>class extends superclass{
	say(){
		console.log('hello')
	}
}
class TypeWorker extends People(Hardwork){
	constructor(typework,firstname,secondname,thirdname,age,sex){
		super();
		this.typework = typework;
		this.firstname = firstname;
		this.secondname = secondname;
		this.thirdname = thirdname;
		this.age = age;
		this.sex = sex;
	}
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

class Worker extends TypeWorker{
	constructor(typework,firstname,secondname,thirdname,age,sex,specialty,experience,position){
		super(typework,firstname,secondname,thirdname,age,sex);
		this.specialty=specialty;
		this.experience=experience;
		this.position=position;
	}
}


const arrObj = [];
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

document.getElementById('addObj').addEventListener("click",function(){
	clearobject();
	document.getElementById("saveObj").style.display="block";
	if(document.getElementById('setObj').style.display=="block"){
		document.getElementById('setObj').style.display="none";
		document.getElementById('addObj').textContent="Создать";
	} 	else{
			document.getElementById('setObj').style.display="block";
			document.getElementById('addObj').textContent="Отмена";
	}
});


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

let getValue = val => val.options[val.selectedIndex].text;

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
function* myGenerator (arr) {
	for(let item in arr){
		yield arr[item];
	}
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
		let items = myGenerator(arrObj);
		for(let item in arrObj){
			console.log(items.next().value);
		}
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

let isNumeric  = value => (/^[\d]+$/g).test( value );

let isLetter = value => (/^[A-Za-z0-9А-Яа-я ]+$/g).test( value );

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

