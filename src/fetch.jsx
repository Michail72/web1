import React,{ useState, useEffect } from 'react'
let i = 0;

const getword = async (url) => {
	const response = await fetch(url);
	const body = await response.json();
	let word = body[0]+', '+body[1]+' '+body[2]+'!';
	console.log(body);
	return word;
}

const getdata = async (url) => {
	const response = await fetch(url);
	const body = await response.json();
	console.log(body);
	if (i<7) {
	i=i+1;
}
	return body[i].zakaz;

}

function Fpp() {
	const [data, setdata] = useState(null);
	const [hide, sethide] = useState(null);

	const onClickHandler = async () => {
	const data = await getword('http://90.189.213.94:2020');
	setdata(data);
	let elements = document.getElementsByClassName('person'); 
	for (let i=0;i<elements.length;i++) {
		elements[i].style.display = "none";
	}
   };
	const onClickHandler2 = async () => {
	const data = await getword('http://90.189.213.94:2020/2');
	setdata(data);
	document.getElementById("p").style.display = "none"; 
   };

const onClickHandler3 = async () => {
	const data = await getdata('http://90.189.213.94:2020/db');
	setdata(null);
	console.log(data);
	let elements = document.getElementsByClassName('person'); 
	for (let i=0;i<elements.length;i++) {
		elements[i].style.display = "flex";
	}
   };

return (
	<div>
	    <div className='main'>
	    <h1 onClick={onClickHandler3} id='p'>{data}</h1>
	      <div className='person' onClick={onClickHandler}>
	        <img className='tim' src='./public/Tima.jpg' />
		    <h2>Тимаков Дмитрий Александрович</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./public/empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./public/empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./public/empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./public/empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./public/empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	    </div>
    </div>
	) };

	export default Fpp;