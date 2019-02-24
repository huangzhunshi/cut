/***
 * 设置不同选项的隐藏域
 * @param obj
 */
function selectgroupradio(obj) {
    if (obj.value == "1") {
        $("#div_value_1").show();
        $("#div_value_2").hide();
        return;
    }
    if (obj.value == "2") {
        $("#div_value_1").hide();
        $("#div_value_2").show();
    }
}

/**
 *
 */
var zzexcel;


/***
 * 解析excel得出的 json字符串 全局
 * @type {string}
 */
var jsonstr = "";

/***
 * 文件名称 全局变量
 * @type {string}
 */
var fname = "";

/**
 * excel json对象，全局
 */
var jsonObject = null;

/***
 * 加载上传的文件
 * @param obj input file 对象
 */
function sendfile(obj) {

    jsonstr = "";
    jsonObject = null;
    $("#div_tool").hide();

    if (!obj.files) {
        return;
    }


    var f = obj.files[0];

    if (typeof(f) == "undefined") {
        return;
    }


    // console.log(f);


    fname = f.name.split('.')[0];
    var ext = f.name.split('.').pop().toLowerCase();
    if (ext != "xls" && ext != "xlsx") {
        fname = "";
        ext = ""
        alert("请上传 xls或者xlsx类型的文件");
        return;
    }
    //显示加载excel提示
    $("#div_excel_loading").show();

    var reader = new FileReader();
    reader.readAsBinaryString(f);
    reader.onload = function (e) {
        var data = e.target.result;
        zzexcel = XLSX.read(data, {
            type: 'binary'
        });
        for (var i = 0; i < zzexcel.SheetNames.length; i++) {
            jsonstr = JSON.stringify(XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]));

            showolumn(jsonstr);
            break;
        }
    }

}


/***
 * 加载上传的文件
 * @param obj input file 对象
 */
function sendfileUI(obj) {

    jsonstr = "";
    jsonObject = null;
    $("#div_tool").hide();

    if (!obj.files) {
        return;
    }


    var f = obj.files[0];

    if (typeof(f) == "undefined") {
        return;
    }


    // console.log(f);


    fname = f.name.split('.')[0];
    var ext = f.name.split('.').pop().toLowerCase();
    if (ext != "xls" && ext != "xlsx") {
        fname = "";
        ext = ""
        alert("请上传 xls或者xlsx类型的文件");
        return;
    }
    //显示加载excel提示
    $("#div_excel_loading").show();

    $("#fileShowName").html(fname);

    var reader = new FileReader();
    reader.readAsBinaryString(f);
    reader.onload = function (e) {
        var data = e.target.result;
        zzexcel = XLSX.read(data, {
            type: 'binary'
        });
        for (var i = 0; i < zzexcel.SheetNames.length; i++) {
            jsonstr = JSON.stringify(XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]));

            showolumn(jsonstr);
            break;
        }
    }

}

function showolumn(jsonstr) {
    if (jsonstr == "") {
        alert("请上传excel文件");
        return;
    }
    jsonObject = jQuery.parseJSON(jsonstr);

    if (jsonObject.length == 0) {
        alert("excel无数据");
        return;
    }
    var grouphtml = "<ul>";
    for (var jr in jsonObject[0]) {
        grouphtml += "<li><input type=\"radio\" name=\"radio_group_column\" value='" + jr + "'/>";
        grouphtml += jr + "";
        grouphtml += "</li>";

    }
    grouphtml += "</ul>";
    $("#div_tool").show();
    $("#div_excel_loading").hide();

    $("#div_group_column").html(grouphtml);
}