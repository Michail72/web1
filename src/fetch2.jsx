import React,{ useState, useEffect } from 'react'

const dataconv = () => {
let d = new Date();
let da = (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
let dat = da.slice(0,16);
return dat;
}

const datafix = (data) => {
let a = data.split('');
let b =a[8]+a[9]+'.'+a[5]+a[6]+'.'+a[0]+a[1]+a[2]+a[3]+' '+a[11]+a[12]+a[13]+a[14]+a[15];
return b;
};

const getdata = async (url) => {
	const response = await fetch(url);
	const body = await response.json();
	console.log(body);
	return body;
}


function copyToClipboard(id) {
        let from = document.getElementById(id);
        console.log(from)
        let range = document.createRange();
        window.getSelection().removeAllRanges();
        range.selectNode(from);
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
 }


function Fpp() {
	const [data, setdata] = useState(null);
	const [data2, setdata2] = useState(null);
	const [orders, setorders] = useState(null);
	const [order, setorder] = useState(null);
	const [files, setfiles] = useState(null);


	const endTask = async (id,customer) => {

	let dataf = new FormData();
	dataf.append('name', customer)	
	const requestOptions = {
        method: 'POST',
       // headers: { 'Content-Type': 'application/json' },
        body: dataf
    };
	await fetch(`http://90.189.213.94:2020/end/${id}`, requestOptions);
	};

	const onClickHandler = async (name) => {
	const data = await getdata(`http://90.189.213.94:2020/db/list/${name}`);
	setdata(data);
	setpersons(null)
	setorder(null)
	let l = 0;
	setorders(data.map((el) =>
	    <div className='orders' onClick={async () => onClickHandler2(el.ID,name)}> 
	    <div className='line'><h3 className="left">Наименование: </h3><h3 className="right">{el.customer}</h3></div>
	    <div className='line'><h3 onClick={(event) => {copyToClipboard(el.zakaz); event.stopPropagation() }} className="left">Заказ: </h3><h3 id={el.zakaz} className="right">{el.zakaz}</h3></div>
	    <div className='line'><h3 className="left">Адрес: </h3><h3 className="right">{el.address}</h3></div>
	    <div className='line'><h3 className="left">Контактные данные: </h3><h3 className="right" id="cont">{el.contacts}</h3></div>
		</div>))
   };

	const onClickHandler2 = async (id,name) => {
	const data2 = await getdata(`http://90.189.213.94:2020/db/${id}`);
	setdata2(data2);
	let page = 
	    <div className="orderwrap">
	    <div className="order" onClick={async () => onClickHandler(name)}>
	        <h2>Основные данные</h2>
	    	<div className='line' id="order"><h3 className="left">Размер экрана (мм): </h3><h3 className="right">{data2.displaySize}</h3></div>
	    	<div className='line'><h3 className="left">Размер кабинетов (мм): </h3><h3 className="right">{data2.cabibetSize}</h3></div>
	    	<div className='line'><h3 className="left">Вид кабинета: </h3><h3 className="right">{data2.cabinetType}</h3></div>
	    	<div className='line'><h3 className="left">Вес кабинета (кг): </h3><h3 className="right">{data2.weight}</h3></div>
	    	<div className='line'><h3 className="left">Крепеж кабинетов : </h3><h3 className="right">{data2.krep}</h3></div>
	    	<div className='line'><h3 className="left">Система управления : </h3><h3 className="right">{data2.controlSys}</h3></div>
	    	<div className='line'><h3 className="left">Размер модуля (мм): </h3><h3 className="right">{data2.moduleS}</h3></div>
	    	<div className='line'><h3 className="left">Тип модуля : </h3><h3 className="right">{data2.moduleType}</h3></div>
	    	<div className='line'><h3 className="left">Шаг пикселя (мм): </h3><h3 className="right">{data2.step}</h3></div>
	    	<div className='line'><h3 className="left">Потребляемая мощность экрана (Вт): </h3><h3 className="right">{data2.kW}</h3></div>
	    	<div className='line'><h3 className="left">Необходимость резервных линий/кольцевания : </h3><h3 className="right">{data2.reserv}</h3></div>
	    	<div className='line'><h3 className="left">Тип экрана : </h3><h3 className="right">{data2.displayType}</h3></div>
	    	<div className='line'><h3 className="left">Время проведения работ : </h3><h3 className="right">{data2.workTime}</h3></div>
	    	<div className='line'><h3 className="left">Обшивка композитными материалами : </h3><h3 className="right">{data2.frame}</h3></div>
	    	<div className='line'><h3 className="left">Место установки экрана : </h3><h3 className="right">{data2.mountPlace}</h3></div>
	    	<h2>Металлоконструкции</h2>
	    	<div className='line'><h3 className="left">Исполнение металлоконструкции : </h3><h3 className="right" id="type">{data2.frameKind}</h3></div>
	    	<h2>Дополнительная информация</h2>
	    	<h3 className="left2">{data2.additional}</h3>
	    </div>
	    <button className="filebutton"  onClick={async () => onClickHandler3(data2.zakaz.slice(1,data2.zakaz.length),id,name)}>Файлы</button>
	    <div><button className="filebutton"  onClick={async () => onClickHandler4(data2.ID,data2.man1,data2.man2,name)}>Лента</button></div>
	    <div className="end">
	    	<span onClick={(event) => {endTask(id,data2.customer); event.stopPropagation() }}>Завершить</span>
	    </div>
	  
	    </div>
	    ;
	 setorders(null);
	 setfiles(null)
	 setorder(page);
	 document.getElementById('order').scrollTo(0,0);
   };


const onClickHandler3 = async (folder,id,name) => {
	//const data = await getdata(`http://90.189.213.94:2020/files/${folder}`);
	let data = await fetch(`http://90.189.213.94:2020/files/${folder}`);
	data = await data.json();
	let array = await Object.values(data);
	let pagefiles = <div className='files' onClick={async () => onClickHandler2(id,name)}>
                <div id='f' className='head'>
	        <h2>Файлы:</h2>
	        </div>
		{await array.map(row => <p><a href={'http://90.189.213.94:2020/'+folder+'/'+row}>{row}</a></p>)}
	</div>;
	setorder(null);
	setfiles(pagefiles);
	document.getElementById('f').scrollTo(0,0);
	
	setdata(data);
	//console.log(await data.text());
	
    };

    const onClickHandler4 = async (id,man1,man2,name) => {
    	
	//let data3 = await fetch(`http://90.189.213.94:2020/comm/${id}`);
	const data3 = await getdata(`http://90.189.213.94:2020/comm/${id}`);
	let da = new Date().toISOString();
	console.log(await 'data3 - ',data3[0]);
	let pagecomms = <div className='commspage'>
                <div id='q' className='head'>
	        <h2>Cообщения:</h2>
	        </div>
	        
	        {await data3.map(row => <div className="comms" onClick={async () => onClickHandler2(id,name)}>
	        	<h2>{row.comment}</h2>
	        	<div className="commsbottom">
	        	<h3>{row.writer}</h3>
	        	<h3>{datafix(row.DATES)}</h3>
	        	</div>
	        	</div>)}

	        
	        <div className="inputs">
	        	<input className="input" id="comment" type="text"/>
	        	<div className="inputsbottom">
	        	<select className="input" id="sel">
	        	<option>{man1}</option>	
	        	<option>{man2}</option>
	        	</select>
	        	<input className="input" id="date" hidden defaultValue={dataconv()} type="datetime-local"/>
	        	<input className="input"  defaultValue={id} hidden type="number"/>
	        	<button id="sendbutton" onClick={async () => onClickHandler5(id,man1,man2)}>send</button>
	        	</div>
	        </div>
		
	</div>;
	setorder(null);
	setfiles(pagecomms);
	//document.getElementById('q').scrollTo(0,0);
	 	
    };


    const onClickHandler5 = async (id,man1,man2) => {
  let a = [];
  let list = document.getElementsByClassName("input");
  for (let i = 0;i<list.length; i++) {
   a.push(list[i].value);
  };
let  send = async () => {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
    };
    const response = await fetch(`http://90.189.213.94:2020/postcomm/`, requestOptions);
    const data = await response.text();
    document.getElementById('comment').value=null;
    console.log('null');
    setfiles(null);

    const data3 = await getdata(`http://90.189.213.94:2020/comm/${id}`);
    let da = new Date().toISOString();
    //console.log(await 'data3 - ',data3[0]);
	let pagecomms = <div className='commspage'>
                <div id='q' className='head'>
	        <h2>Cообщения:</h2>
	        </div>
	        
	        {await data3.map(row => <div className="comms">
	        	<h2>{row.comment}</h2>
	        	<div className="commsbottom">
	        	<h3>{row.writer}</h3>
	        	<h3>{datafix(row.DATES)}</h3>
	        	</div>
	        	</div>)}

	        
	        <div className="inputs">
	        	<input className="input" id="comment" type="text"/>
	        	<div className="inputsbottom">
	        	<select className="input" id="sel">
	        	<option>{man1}</option>	
	        	<option>{man2}</option>
	        	</select>
	        	<input className="input" id="date"  hidden defaultValue={dataconv()} type="datetime-local"/>
	        	<input className="input"  defaultValue={id} hidden type="number"/>
	        	<button id="sendbutton" onClick={async () => onClickHandler5(id,man1,man2)}>send</button>
	        	</div>
	        </div>
		
	</div>;
	setorder(null);
	setfiles(pagecomms);




	setorder(null);
	//setfiles(pagecomms);





    }
    send();
  console.log(a);
};



let pers = <div className='main'>
	      <div className='person' onClick={async () => onClickHandler('Тимаков')}>
	        <img className='tim' src='/rooster2.gif' />
		    <h2>Тимаков Дмитрий Александрович</h2>
	      </div>
	      <div className='person' onClick={async () => onClickHandler('Чернышев')}>
	        <img className='tim' src='./empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	      <div className='person' onClick={onClickHandler2}>
	        <img className='tim' src='./empty.png' />
		    <h2>Неизвестный монтажник</h2>
	      </div>
	    </div>;
const [persons,setpersons] = useState(pers);


return (
	<div>
	  {files}
	  {persons}  
	  {orders}
	  {order}
	  
    </div>
	) };

	export default Fpp;