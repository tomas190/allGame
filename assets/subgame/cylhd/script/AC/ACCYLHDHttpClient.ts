

module AC {
  export class HttpClient {

    /**
     * 封装简单的ajax 函数
     * @param url  请求地址
     * @param method 请求方法 get||post
     * @param async 是否异步 true 异步 || false  同步
     * @param data 发送数据,只支持post方式
     * @param Callback  回调函数(数据, 对象)
     * @param type  回调数据类型 text||xml
     */

    static ajax(url:string, method:string="GET", async:boolean=true, data:any=null, callBack:Function=()=>{}, type:string="text") {
          //设置参数默认值
          method = method.toUpperCase();
          type = type.toLowerCase();
      
          var xhr = new XMLHttpRequest();
          if (type == "text") {
              xhr.overrideMimeType("text/plain");
          } else if (type == "xml") {
              xhr.overrideMimeType("text/xml");
          }
      
          xhr.open(method, url, async); //发起请求
          xhr.setRequestHeader("If-Modified-Since", "0"); //每次都是获取最新的内容
          if (method == "POST") { //post
              xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              xhr.send(data);
          } else {
              xhr.send(null); //get 不能发送数据
          }
      
          //指定响应处理函数
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                  //成功之后调用回调函数
                  if (type == "xml") {
                      return callBack(xhr.responseXML, xhr);
                  } else if (type == "text") {
                      return callBack(xhr.responseText, xhr);
                  }
              }
          };
      
      }
  }
}
export default AC.HttpClient