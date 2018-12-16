/***
 * 下载excel文件
 * @param jsonStringMap 分组文件
 * @param fname 文件名称
 */
function tojsondwon(jsonStringMap,fname) {
    if(fname==""){
        alert("请上传文件");
        return;
    }
    // console.log(jsonStringMap);
    for(k in jsonStringMap){
        var linestr=jsonStringMap[k];
        linestr=linestr.substring(0,linestr.length-1);
        linestr="["+linestr+"]";
        //console.log(linestr);

        var jsonObject= jQuery.parseJSON(linestr);
        //console.log(jsonObject);
        downloadExl(jsonObject,fname+"-"+k);

    }
}


function downloadExl(data,fname, type) {
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };//这里的数据是用来定义导出的格式类型

    const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
    wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
    saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), fname + '.' + (wopts.bookType=="biff2"?"xls":wopts.bookType));
}
//如果使用 FileSaver.js 就不要同时使用以下函数
function saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式
    var tmpa = document.createElement("a");
    tmpa.download = fileName || "下载";
    tmpa.href = URL.createObjectURL(obj); //绑定a标签
    //tmpa.click(); //模拟点击实现下载
    testclick(tmpa);
    setTimeout(function () { //延时释放
        URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}

/***
 * 下载兼容性 兼容火狐
 * @param obj
 */
function testclick(obj)
{
    if(document.all)
    {
        obj.click();
    }
    else
    {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        obj.dispatchEvent(evt);
    }
}

function s2ab(s) {
    if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
}