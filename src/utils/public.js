// 防抖
export function _debounce(fn, delay) {
  var delay = delay || 200;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
// 节流
export function _throttle(fn, interval) {
  var last;
  var timer;
  var interval = interval || 200;
  return function() {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  };
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/ 
//数据转化  
function formatNumber(n) {  
  n = n.toString()  
  return n[1] ? n : '0' + n  
} 
export function formatDate(format, timestamp){ 
  var formateArr  = ['Y','M','D','h','m','s'];  
  var returnArr   = [];  
  
  var date = new Date(timestamp);  
  returnArr.push(date.getFullYear());  
  returnArr.push(formatNumber(date.getMonth() + 1));  
  returnArr.push(formatNumber(date.getDate()));  
  
  returnArr.push(formatNumber(date.getHours()));  
  returnArr.push(formatNumber(date.getMinutes()));  
  returnArr.push(formatNumber(date.getSeconds()));  
  for (var i in returnArr)  
  {  
    format = format.replace(formateArr[i], returnArr[i]);  
  }  
  return format;  
 }

 //计算时长
 export function calculateTime(timeS,timeE) {
   let time = timeE - timeS;
    var leave1,leave2, hours,minutes,seconds,resultTime;
   //计算出小时数
   if(time >=3600000) {
    leave1=time%(3600*1000) //计算小时后剩余的毫秒数
    hours=Math.floor(time/(3600*1000))
    //计算相差分钟数
    if(leave1 > 60000) {
      leave2=leave1%(60*1000) //计算分钟数后剩余的毫秒数
      minutes=Math.floor(leave1/(60*1000))
    }
    //计算相差秒数
    if(leave2 > 1000) {
      seconds=Math.round(leave2/1000)
    }
    resultTime = hours + '(h)' + minutes + '(m)' + seconds+ '(s)';
   }
  //计算相差分钟数
  if(time >= 60000 && time < 3600000) {
    leave2=time%(60*1000) //计算分钟数后剩余的毫秒数
    minutes=Math.floor(time/(60*1000))
     //计算相差秒数
    seconds=Math.round(leave2/1000)
    resultTime =  minutes + '(m)' + seconds+ '(s)';
  }
  //计算相差秒数
  if(time > 1000 && time < 60000) {
    seconds=Math.round(time/1000)
    resultTime = seconds + '(s)'
  }
  return resultTime 
 }
 
