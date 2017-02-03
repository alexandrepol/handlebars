(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCm1MXrj-8rHvILuQocmhrvnQGX_2gEwgE",
        authDomain: "b3-js-firebase.firebaseapp.com",
        databaseURL: "https://b3-js-firebase.firebaseio.com",
        storageBucket: "b3-js-firebase.appspot.com",
        messagingSenderId: "454751489097"
    };
    firebase.initializeApp(config);


    //Onsubmit
    var catSubmit = document.getElementById("catSubmit");
    catSubmit.addEventListener('click', function (e) {
        e.preventDefault();
       var catId = Math.round(Math.random()*3600),
       catName = document.getElementById("catName").value,
           catAge = document.getElementById("catAge").value;

       writeCatData(catId,catName,catAge);
    });


    //Ajouter des clicks avec le temps
    function writeCatData(catId, name, age) {
        firebase.database().ref('cats/' + catId).set({
            name : name,
            age : age
        });
    }
    var source = document.getElementById("contentTemplate").innerHTML;
    var template = Handlebars.compile(source);
    Handlebars.registerHelper('chats', function() {
        var nom = Handlebars.escapeExpression(this.name),
            age = Handlebars.escapeExpression(this.age);

        return new Handlebars.SafeString(
            "<div>Je suis "+nom+" et j'ai "+age+" ans.</div>"
        );
    });
    //Lire dans la base
    var listCats = firebase.database().ref('cats');
    listCats.on('value', function(snapshot) {

        var catsArray = [];
        for(var catId in snapshot.val()){
            let cat = snapshot.val()[catId];
            catsArray.push(cat);
        }
        console.log(catsArray);

            var html = template(catsArray);
            console.log(html)
            document.getElementById("ntm").innerHTML = html;


    });








})(jQuery);
