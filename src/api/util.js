import axios from 'axios'
import axioService from './axioService'
const POCKETS = require('../../static/json/pocketConfig/pockets.conf.json');


/**
 * 处理数据卡片的输入时间值，若出现00:00:00，则替换为00:00，去除最前面小时的'00:'
 *
 * @param {*} duration
 * @returns
 */
function formateDuration(duration) {
  if (duration.length == 8 && duration.split(':')[0] === '00') {
    return duration.slice(3);
  }
  return duration;
}

function getDateTimeByDeltaSecond(dateTime, deltaSecond) {
  let date = dateTime.slice(0, 10);
  let time = dateTime.slice(11);
  console.log(date, time);
  let ret = getTimeByDeltaSecond(time, deltaSecond);
  if (ret.deltaDay > 0) {
    for (let i = 0; i < ret.deltaDay; i++) {
      date = getNextDay(date);
    }
  } else if (ret.deltaDay < 0) {
    for (let i = 0; i > ret.deltaDay; i--) {
      date = getLastDay(date);
    }
  }
  return `${date} ${ret.time}`
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getType = (obj) => {
  //tostring会返回对应不同的标签的构造函数
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

/**
* 深拷贝数据
*
* @param {*} data
* @returns
*/
function deepClone(data) {
  var type = getType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

/**
* 格式化日期
*
* @param {*} tmpDt
* @param {*} Delimiter
* @returns
*/
function formatDate(tmpDt, Delimiter) {
  let tmpStr = Delimiter ? Delimiter : '-'
  let year = tmpDt.getFullYear()
  let month = tmpDt.getMonth() + 1
  let day = tmpDt.getDate()

  let hour = tmpDt.getHours()
  let minute = tmpDt.getMinutes()
  let second = tmpDt.getSeconds()
  return [year, month, day].map(formatNumber).join(tmpStr)
}

/**
* 格式化日期时间
*
* @param {*} tmpDt
* @param {*} Delimiter1
* @param {*} Delimiter2
* @returns
*/
function formatDateTime(tmpDt, Delimiter1, Delimiter2) {
  let tmpStr1 = Delimiter1 ? Delimiter : '-'
  let tmpStr2 = Delimiter2 ? Delimiter : ':'

  let year = tmpDt.getFullYear()
  let month = tmpDt.getMonth() + 1
  let day = tmpDt.getDate()

  let hour = tmpDt.getHours()
  let minute = tmpDt.getMinutes()
  let second = tmpDt.getSeconds()

  return [year, month, day].map(formatNumber).join(tmpStr1) + ' ' + [hour, minute, second].map(formatNumber).join(tmpStr2)
}

/**
* 根据日期获取当天是星期几，支持苹果手机
*
* @param {*} tmpDate 日期格式为'yyyy-mm-dd'
* @returns
*/
function getWeekDayByDate(tmpDate) {
  let dateStr = `${tmpDate} 00:00:00`.replace(/\-/g, '/');
  let day = new Date(dateStr)
  return day.getDay();
}

// 判断一个字符串是否是正确的日期格式
function isVaildDate(mystring) {
  var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
  var str = mystring;
  var arr = reg.exec(str);
  if (str == "" || !str) return false;
  if (!reg.test(str) && RegExp.$2 <= 12 && RegExp.$3 <= 31) {
    return false;
  }
  return true;
}




function UrlSearch() {
  var name, value;
  var str = decodeURI(location.href); //取得整个地址栏

  var num = str.indexOf("?");
  var param = {};
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

  var arr = str.split("&"); //各个参数放到数组里
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      param[name] = value;
    }
  }
  return param;
}


//得到userId
function getUserId(that) {
  axiosServer.defaults.withCredentials = true;
  return new Promise((resolve, reject) => {
    let s = localStorage.getItem('userId');
    if (typeof s !== 'string') {
      if (that.$route.query.userId) {
        localStorage.setItem('userId', that.$route.query.userId);
        resolve(that.$route.query.userId)
      } else {
        axiosServer.get('pocketBook/getCookie').then(res => {
          if (res.cookie) {
            localStorage.setItem('userId', res.cookie);
            resolve(res.cookie);
          } else {
            resolve('');
          }
        }).catch(err => {
          resolve('')
        })
      }
    } else {
      resolve(s)
    }
  })
}

function parseUserIdFromCookie() {
  let cookie = document.cookie;
  if (typeof cookie == 'string') {
    return cookie.split('=')[1]
  } else {
    return ''
  }
}

//根据地址栏参数拿到对应的口袋书信息
function getPocketInfo(that) {
  let para = that.$route.query;
  if (para.tmp) {
    let temp = POCKETS.filter(item => {
      return para.tmp === item.pocketId
    })[0];
    if (temp) {
      return temp
    } else {
      return POCKETS[0];
    }
  } else {
    return POCKETS[0];
  }
}


function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLS(key) {
  let val = localStorage.getItem(key);
  if (typeof val === 'string' && val.length) {
    return JSON.parse(val)
  } else {
    return false
  }
}




let axiosServer = axios.create({
  baseURL: 'https://www.igrowth365.com.cn/',
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosServer.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error);
})

let httpServer = axios.create({
  baseURL: '',
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
});

httpServer.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error);
})

let axiosObj = axioService;
let axiosJson = axioService.jsonService;

function setBmobKey(res) {
  // if (res && typeof res['X-Bmob-Application-Id'] == 'string') {
  //   localStorage.setItem('bmobKey', JSON.stringify(res));
  // }
}

function getBmobKey() {
  // let str = localStorage.getItem('bmobKey');
  // try {
  //   return JSON.parse(str);
  // } catch (err) {
  //   return {};
  // }
  return {}
}


function getBmobKeyFromServer() {
  return new Promise((resolve, reject) => {
    resolve();
    // axiosServer.post('pocketBook/getBmobData').then(res => {
    //   setBmobKey(res);
    //   resolve();
    // }).catch(err => {
    //   console.log('get bmobData error: ', err);
    //   reject(err);
    // })
  })
}

function getUserTag() {
  let s = localStorage.getItem('iUserTagId');
  if (typeof s == 'string') {
    return s;
  } else {
    s = new Date().getTime() + '-';
    s += Math.random().toString().slice(2, 10);
    localStorage.setItem('iUserTagId', s);
    return s;
  }
}

// url埋点，记录用户点击网页的次数详情
function uploadUrlData() {
  try {
    let postData = {}
    postData.func = decodeURI(location.href);
    postData.appTag = 'pocket-';

    let s = localStorage.getItem('userId');
    if (typeof s == 'string') {
      // postData.uid = s;
      postData.uInfo = {
        "__type": "Pointer",
        "className": "wechatInfo",
        "objectId": s
      }
    }

    postData.uTag = getUserTag();

    let query = UrlSearch();
    if (query.schoolName) {
      postData.key1 = query.schoolName;
    }
    if (query.tmp) {
      postData.appTag += query.tmp
    } else {
      postData.appTag += 'e8ae2a49b6'
    }

    let para = {
      url: 'classes/userStatisfy',
      method: 'POST',
      params: postData
    }
    axiosObj.proxyPost('requestForward?para=' + JSON.stringify(para)).then(res => { }).catch(err => { })
  } catch (err) {
    console.log('upload', err);
  }
}


export {
  deepClone,
  formatDate,
  formatDateTime,
  getWeekDayByDate,
  isVaildDate,

  getLS,
  setLS,
  axiosServer,
  axiosObj,
  axiosJson,
  httpServer,

  setBmobKey,
  getBmobKey,
  getBmobKeyFromServer,
  getPocketInfo,
  // getUserId,
  uploadUrlData,
}