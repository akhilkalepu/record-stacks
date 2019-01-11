//openFile will read XML file and input it into text field
var openFile = function (event) {
    var input = event.target;
    var text = "";
    var reader = new FileReader();
    var onload = function (event) {
        text = reader.result;
        parseFile(text);

    };

    reader.onload = onload;
    reader.readAsText(input.files[0]);

};

//this will parse XML file and output it to website
var parseFile = function (text) {
    var xmlDoc = $.parseXML(text),
        $xml = $(xmlDoc),
        $options = $xml.find("option");

    $.each($options, function () {
        $("#output").append("<li>" + $(this).text() + "</li >");
    });

};