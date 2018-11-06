import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials=true; //不禁用cookie
axios.defaults.baseURL='http://120.79.179.26:8888'

axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use((config)=>{
	if(config.method == 'post'){
		config.data = qs.stringify(config.data,{arrayFormat:'repeat'});
	}
	return config;
})
// 在请求回来的时候先判断是否包含未登录信息如果未登录则跳转到登录页面
axios.interceptors.response.use((response)=>{
	// alert(JSON.stringify(response));
	if(response && response.data.status==500 && response.data.message=='尚未登录，请登录!'){
		window.vm.currentComponent='Login';
	}	
	return response;
})
export default axios;