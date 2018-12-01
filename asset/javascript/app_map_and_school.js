// function that will execute all variables in html and put results in the demo table
function showCustomer(state, city, schooltype, level) {
    console.log("state:" + state);
    console.log("city:" + city);
    console.log("schooltype:" + schooltype);
    console.log("level:" + level);

    // set variables to values entered and selected
    var state = document.getElementById("myselect").value;
    var city = document.getElementById("validationDefault03").value;
    var schooltype = document.getElementById("school-type").value;
    var level = document.getElementById("school-level").value;


    // API key information
    var key = "00ba2783a3679909e2164da6613bf730"
    var xhttp;
    var url;
    if (state == "", city == "") {
        document.getElementById("demo").innerHTML = "";
        return;
    }

    // the url was selected to have a sort by highest parent rating first
    url = "https://api.greatschools.org/schools/" + state + "/" + city + "/" + schooltype + "/" + level + "?key=" + key + "&sort=parent_rating&limit=5";

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (xml) {
        if (this.readyState == 4 && this.status == 200) {
            // calling function to put together output from xml into table with selected values
            myFunction(this);
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// function used to create table in html demo table
function myFunction(xml) {
    console.log("myFunction works")

    var i;
    var xmlDoc = xml.responseXML;
    var table='';
    txt = "";
    var x = xmlDoc.getElementsByTagName("school");
    var latarr = [];
    var lonarr = [];
    var lat = xmlDoc.getElementsByTagName("lat")[0].childNodes[0].nodeValue;

// for loop for generating school table and map
    for (i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("name").length > 0, x[i].getElementsByTagName("type").length > 0, x[i].getElementsByTagName("parentRating").length > 0) {
            console.log(x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
            console.log(x[i].getElementsByTagName("type")[0].childNodes[0].nodeValue);
            console.log(x[i].getElementsByTagName("gradeRange")[0].childNodes[0].nodeValue)
            console.log(x[i].getElementsByTagName("parentRating")[0].childNodes[0].nodeValue);
            table += "<tr><td>" + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
                "</td><td>" + x[i].getElementsByTagName("gradeRange")[0].childNodes[0].nodeValue +
                "</td><td>" + x[i].getElementsByTagName("parentRating")[0].childNodes[0].nodeValue +
                "</td></tr>";

            var lat = x[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue;
            console.log("lat" + lat);

            var lon = x[i].getElementsByTagName("lon")[0].childNodes[0].nodeValue;
            console.log("lon" + lon);

            var name = (x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
            console.log("type of name" + typeof(name));

            latarr.push(lat);
            lonarr.push(lon)

            console.log("latarr" + latarr);
            console.log("lonarr" + lonarr);


            console.log("first position of latarr:"+latarr[0]);
            console.log("first position of latarr:"+lonarr[0]);

            console.log("first position of latarr parsefloat:"+parseFloat(latarr[0]));
            console.log("first position of latarr parsefloat:"+parseFloat(lonarr[0]));


            var school1 = {
                lat: parseFloat(latarr[0]),
                lng: parseFloat(lonarr[0])
            };

            var school2 = {
                lat: parseFloat(latarr[1]),
                lng: parseFloat(lonarr[1])
            }

            var school3 = {
                lat: parseFloat(latarr[2]),
                lng: parseFloat(lonarr[2])
            }

            var school4 = {
                lat: parseFloat(latarr[3]),
                lng: parseFloat(lonarr[3])
            }

            var school5 = {
                lat: parseFloat(latarr[4]),
                lng: parseFloat(lonarr[4])
            }

            var map = new google.maps.Map(

                document.getElementById('map'), {
                    zoom: 12,
                    center: school1
                });

            console.log("map works" + map);


            var marker1 = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: school1,
                map: map,
            });

 
            var marker2 = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: school2,
                map: map,
            });

            var marker3 = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: school3,
                map: map,
            });

            var marker4 = new google.maps.Marker({
                position: school4,
                animation: google.maps.Animation.DROP,
                map: map,
            });

            var marker5 = new google.maps.Marker({
                position: school5,
                animation: google.maps.Animation.DROP,
                map: map,
            });

        }

    }
    document.getElementById("tbodySchool").innerHTML = table;
}