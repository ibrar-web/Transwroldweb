
const Formdownload = (JSONData, ReportTitle, ShowLabel,trackName) => {
    console.log('track check', trackName)
    var arrData = [];
    arrData = typeof JSONData != 'object' ? JSONData : JSONData;
    console.log(arrData, 'arrData');
    var CSV = '';
    //Set Report title in first row or line

    //CSV += ReportTitle + '\r\n\n';
    var head = ['Name', 'Value']
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in head) {
            console.log(head[index]);
            //Now convert each value to string and comma-seprated
            row += head[index] + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    arrData.forEach(function(objectval,index) {
        
        var row = "";
        row += '"' + objectval.name + '",';
        row += '"' + objectval.value + '",';
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
        row = "";
    });


    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "Infrastrature Survey Report";
    //this will remove the blank-spaces from the title and replace it with an underscore
    //fileName += ReportTitle.replace(/ /g,"_");   

    //Initialize file format you want csv or xls
    var uri = 'data:text/kml;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export default Formdownload;