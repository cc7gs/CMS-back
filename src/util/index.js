let time= {
	getFormatTime(time){
		if(!time){
			time= new Date().getTime();
		}
		var d = new Date(time);
		var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
		return times;
	},
}

export {time}