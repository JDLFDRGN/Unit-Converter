let category=document.querySelector('.category');
let choices=document.querySelectorAll('.choices>h2');
let logo=document.querySelector('#content>img');
let swap=document.querySelector('#swap');
let choose=document.querySelectorAll('select');
let convert=document.querySelector('.convert');
let answer=document.querySelector('#answer');
let number=document.querySelector('input');
let clear=document.querySelector('.clear');
let categoryVal=0,unit=0,numberOfUnits=0,input='', output='', inputUnit, outputUnit;
let createOption=[];
let createUnit=[];
const timeUnits=['sec','min','hr'];
const weightUnits=['mg','g','kg'];
const speedUnits=['m/s','km/h','mph','ft/s'];
const distanceUnits=['mm','cm','m','km'];
convert.addEventListener('click',()=>{
    compute();
});
choices.forEach((e,index)=>{e.addEventListener('click',()=>{
    unit=index+1;
    resetCategory();
    resetDisplay();
    switch(unit){
        case 1:speed();break;
        case 2:weight();break;
        case 3:distance();break;
        case 4:time();break;
        default: break;
    }
    animate();
})});

swap.addEventListener('click',()=>{
    let select1=choose[0].selectedIndex;
    let select2=choose[1].selectedIndex;
    createOption[select2].selected=true;
    createOption[select1+createOption.length/2].selected=true;
});

clear.addEventListener('click',resetDisplay);

logo.addEventListener('click',animate);

function animate(){
    categoryVal=1-categoryVal;
    if(categoryVal)category.classList.add('onCategory');
    else category.classList.remove('onCategory');
}

function speed(){
    noOfUnits=4;
    loop(speedUnits);
}

function weight(){
    noOfUnits=3;
    loop(weightUnits);
}

function distance(){
    noOfUnits=4;
    loop(distanceUnits);
}

function time(){
   noOfUnits=3;
   loop(timeUnits);
   
}

function loop(unitList=[]){
    for(let i=0;i<noOfUnits*2;i++){
        if(i<noOfUnits)unitList.push(unitList[i]);
        createOption[i]=document.createElement('option');
        createUnit[i]=document.createTextNode(unitList[i]);
    }
        for(let i=0;i<noOfUnits;i++){
            choose[0].appendChild(createOption[i]);
            createOption[i].appendChild(createUnit[i]);
        }
        for(let i=noOfUnits;i<noOfUnits*2;i++){
            choose[1].appendChild(createOption[i]);
            createOption[i].appendChild(createUnit[i]);
        }
}

function compute(){
   input=parseFloat(number.value);
   if(isNaN(input))return;
   inputUnit=choose[0].value;
   outputUnit=choose[1].value;
   conditions();
   answer.value=output;
}

function conditions(){
    if(inputUnit===outputUnit)output=input;
    //speed
    else if(inputUnit==='m/s' && outputUnit==='km/h') output=(input*3600)/1000;
    else if(inputUnit==='m/s' && outputUnit==='mph') output=(input*3600)/1609.344;
    else if(inputUnit==='m/s' && outputUnit==='ft/s') output=input*3.28084;
    else if(inputUnit==='km/h' && outputUnit==='m/s') output=(input*1000)/3600;
    else if(inputUnit==='km/h' && outputUnit==='mph') output=input*0.6214;
    else if(inputUnit==='km/h' && outputUnit==='ft/s') output=(input*3280.84)/3600;
    else if(inputUnit==='mph' && outputUnit==='m/s') output=(input*1609.344)/3600;
    else if(inputUnit==='mph' && outputUnit==='km/h') output=input/0.6214;
    else if(inputUnit==='mph' && outputUnit==='ft/s') output=(input*5280)/3600;
    else if(inputUnit==='ft/s' && outputUnit==='m/s') output=input/3.28084;
    else if(inputUnit==='ft/s' && outputUnit==='km/h') output=(input*3600)/3280.84;
    else if(inputUnit==='ft/s' && outputUnit==='mph') output=(input*3600)/5280;
    //weight
    else if(inputUnit==='mg' && outputUnit==='g') output=input/1000;
    else if(inputUnit==='mg' && outputUnit==='kg') output=input/1000000;
    else if(inputUnit==='g' && outputUnit==='mg') output=input*1000;
    else if(inputUnit==='g' && outputUnit==='kg') output=input/1000;
    else if(inputUnit==='kg' && outputUnit==='mg') output=input*1000000;
    else if(inputUnit==='kg' && outputUnit==='g') output=input*1000;
    //distance
    else if(inputUnit==='mm'&& outputUnit==='cm') output=input/10;
    else if(inputUnit==='mm'&& outputUnit==='m') output=input/1000;
    else if(inputUnit==='mm'&& outputUnit==='km') output=input/1000000;
    else if(inputUnit==='cm'&& outputUnit==='mm') output=input*10;
    else if(inputUnit==='cm'&& outputUnit==='m') output=input/100;
    else if(inputUnit==='cm'&& outputUnit==='km') output=input/100000;
    else if(inputUnit==='m'&& outputUnit==='mm') output=input*1000;
    else if(inputUnit==='m'&& outputUnit==='cm') output=input*100;
    else if(inputUnit==='m'&& outputUnit==='km') output=input/1000;
    else if(inputUnit==='km'&& outputUnit==='mm') output=input*1000000;
    else if(inputUnit==='km'&& outputUnit==='cm') output=input*100000;
    else if(inputUnit==='km'&& outputUnit==='m') output=input*1000;
    //time
    else if(inputUnit==='sec'&& outputUnit==='min') output=input/60;
    else if(inputUnit==='sec'&& outputUnit==='hr') output=input/3600;
    else if(inputUnit==='min'&& outputUnit==='sec') output=input*60;
    else if(inputUnit==='min'&& outputUnit==='hr') output=input/60;
    else if(inputUnit==='hr'&& outputUnit==='sec') output=input*3600;
    else if(inputUnit==='hr'&& outputUnit==='min') output=input*60;
}

function resetDisplay(){
    answer.value='';
    number.value='';
    input='';
    output='';
}
function resetCategory(){
    for(let i=0;i<createOption.length;i++)createOption[i].remove();
}
