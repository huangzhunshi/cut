/***
 * 返回分组的map对象(根据列名分组)
 * @param jsonObject 需要处理的execl json文本
 * @param group 分组列名
 * @returns {{}} 分组的map对象
 */
function jsonbyGroupStringArray(jsonObject,group) {
    var  jsonStringMap={};
    for(var k in jsonObject ){

        var strline=getjsonstrrowbyc(jsonObject[k],group);
        //console.log(strline);

        var row=strline[0]+",";
        var cname=strline[1];
        if(cname in jsonStringMap)
            jsonStringMap[cname]+=row;
        else
            jsonStringMap[cname]=row;


    }
    return jsonStringMap;

}

/***
 * 返回每一行的json 字符串,和分组列的值,根据数量分组
 * @param jsonrow
 * @param cname 分组列名
 * @returns {[null,null]} {[分组json字符串,分组名称]}
 */
function getjsonstrrowbyc(jsonrow,cname) {
    var rowstr="{";
    var c="";
    for(var jr in jsonrow){

        rowstr+="\""+jr+"\":"+"\""+jsonrow[jr]+"\"";
        rowstr+=",";
        if(jr+""==cname+""){
            c=jsonrow[jr];
        }
    }
    rowstr=rowstr.substring(0,rowstr.length-1);
    rowstr+="}";
    //return rowstr;
    return [rowstr,c];

}


/***
 * 返回数量分组的map对象（根据数量分组）
 * @param jsonObject  需要处理的execl json文本
 * @param size 分组数量
 * @returns {{}}  分组的map对象
 */
function jsonBySizeStringArray(jsonObject,size) {
    var  jsonStringMap={};
    for(var k in jsonObject ){

        var strline=getjsonstrbysize(jsonObject[k],k,size);
        //console.log(strline);

        var row=strline[0]+",";
        var cname=strline[1];
        if(cname in jsonStringMap)
            jsonStringMap[cname]+=row;
        else
            jsonStringMap[cname]=row;


    }
    return jsonStringMap;

}

/***
 * 返回每一行的json 字符串,和分组列的值,根据数量分组
 * @param jsonrow
 * @param k 当前行数
 * @param size 分组数量
 * @returns {[分组json字符串,分组名称]}
 */
function getjsonstrbysize(jsonrow,k,size) {
    var index=parseInt(k/size)+1;
    // console.log(index+"--"+k+"---"+size);
    var c=(index-1)*size+"-"+index*size;

    var rowstr="{";
    for(var jr in jsonrow){

        rowstr+="\""+jr+"\":"+"\""+jsonrow[jr]+"\"";
        rowstr+=",";
    }
    rowstr=rowstr.substring(0,rowstr.length-1);
    rowstr+="}";
    return [rowstr,c];

}