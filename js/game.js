// 想法
// 設定身體初始值[61]，總共大小11*11
// 將監聽事件將按建設定到arrow 左-1 右1 上-11 下11(左右間距1 一列11行)
// 用setTimeout迴圈重複執行

// 關閉身體  ->  顯示身體  ->  改變身體  ->  判斷有無死掉或贏了遊戲
//     ^												|
//     └------------------------------------------------┘ 


var list = document.getElementsByTagName("img");
var snakebody = [61];//存放蛇的身體
var arrow = 0;//現在往哪個方向
var bodyLength;//身體長度
var target;//目標 1-121
var isTarget = true;//確認target是否需要重取
var copySnakebody;
var row = 6;
var col = 6;
var dead = true;//trur：活著	false：掛了
var firstTime = 0; //記算按了幾次方向鍵
var counter = false;
var oldtarget = 0;
var oldKeycode = 0;
var second = 250;//預設秒數


//設定所有img的ID
for (var i = 0, j=i+1; i < list.length; i++,j++) 
	list[i].setAttribute("id",getId(j)) ;


showBody();
checkTarger();//取得targer





//---------------主程式-----------------
		
function main(){

		var mainStart = setTimeout(function(){

			if (arrow != 0) {

				offBody();
				showBody();//秀出蛇的身體形狀
				changeSnakebody();//更改蛇的陣列(讓蛇看起來像是移動)

			}

			main();

		}, second);

}


	document.onkeydown = function(event){

		var checkArrow = arrow;

			if (window.event.keyCode === 37) {//按下左鍵

					arrow = -1; 
					if (checkArrow === -arrow) 
						arrow = -arrow;
					firstTime++;
				
			}else if (window.event.keyCode === 38) {//按下上鍵
				
					arrow = -11; 
					if (checkArrow === -arrow) 
						arrow = -arrow;
					firstTime++;
							
			}else if (window.event.keyCode === 39) {//按下右鍵
				
					arrow = 1; 
					if (checkArrow === -arrow) 
						arrow = -arrow;
					firstTime++;

			}else if (window.event.keyCode === 40) {//按下下鍵
				
					arrow = 11; 
					if (checkArrow === -arrow) 
						arrow = -arrow;
					firstTime++;
			}
		
		
		if (firstTime === 1)//是否開始?
		{

			main();
		}
	}



//test
// var arr1 = [1,2,3,4,5];
// var arr2 = arr1.slice();
// arr1.push(6);

function isWin(){

	if (snakebody.length === 121){

		alert("YOU WIN");
		offBody();
		showBody();
		reset();
		
	}
}



function offBody(){

	for (var i = 1; i < list.length +1; i++) { //先把所有的img關掉

		if (i != target)
			document.getElementById(getId(i)).style.display = "none";

	}

}

function showBody(){

	for (i = 0 ; i < snakebody.length; i++) { //開啟與snakebody數值一樣的img

		document.getElementById(getId(snakebody[i])).style.display = "block";
		document.getElementById(getId(snakebody[i])).src = "images/block.jpg";

	}

}


function isDead(){

	if (row<1 || row>11 || col<1 || col>11) {//撞壁
		dead = false;
		alert("你已經死了!");
		reset();
	}

	for (var i = 0; i < snakebody.length-2 ; i++) {//撞到身體
		if(snakebody[snakebody.length-1] === snakebody[i]){
			dead = false;
			alert("你已經死了");
			reset();
		}
	}
	//console.log("isDead() " + "row:"+ row +"  col:"+ col );

}

function reset(){

	snakebody = [61];//存放蛇的身體
	arrow = 0;//現在往哪個方向
	bodyLength=1;//身體長度
 	checkTarger();//目標 1-121
	isTarget = true;//確認target是否需要重取
 	copySnakebody="";
	row = 6;
	col = 6;
	dead = true;//trur：活著	false：掛了
	firstTime = 0; //記算按了幾次方向鍵
	counter = false;
	oldtarget = 0;
	oldKeycode = 0;
	offBody();
	showBody();
	clearsetTimer(mainStart);

}


function changeSnakebody(){

	if (arrow != 0) {//按下方向鍵後開始

		if (snakebody[snakebody.length-1] === target){//當吃到目標
			oldtarget = target;//設定一個舊的目標
			isTarget = true;
			checkTarger();//產生一個新目標
			counter = snakebody.length;//開始計時 counter歸零時把舊的目標加到 snakebody(身體陣列)
			
		}

		for (var i=0 ; i<snakebody.length ; i++) {
			
			if (i!= snakebody.length-1)	//123,234,345	[i]=[i+1]
				snakebody[i] = snakebody[i+1];
			else
				snakebody[i] += arrow;
			if (counter)//吃到目標後開始計時
				counter--;
		}

		

		

		switch(arrow){

			case -1: //左
				col -= 1;
			break;

			case 1: //右
				col += 1;
			break;

			case -11: //上
				row -= 1;
			break;

			case 11: //下
				row += 1;
			break;
		}

		if (counter === 0) {//加進陣列第一個位置
			snakebody.unshift(oldtarget);
			counter = false;
		}

		isWin();
		isDead();
		offBody();
		showBody();

	}
}

function getId(id){

	var ID;

	if (id<10 && id>0) 
		ID = "snakeBody_" + "00" + id;

	else if (id>=10 && id<100)
		ID = "snakeBody_" + "0" + id;

	else if (id>=100 && id<=121)
		ID = "snakeBody_" + id;

	return ID;

}



function checkTarger(){//取得目標

	while(isTarget){

		target = Math.floor(Math.random()*121)+1;
		
		for (var i = 0; i < snakebody.length; i++) {
			
			if (target === snakebody[i]) {
				break;
			}

			if (i === snakebody.length-1) {
				isTarget = false;
			}
		}
	}
	isTarget = true;

	document.getElementById(getId(target)).style.display = "block";
	document.getElementById(getId(target)).src = "images/target.jpg";

}




