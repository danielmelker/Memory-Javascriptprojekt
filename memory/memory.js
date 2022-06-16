//Kommentarer för kod läggs ovan kodsnutt så även källor.

//Jag hade trubbel med att sätta igång spelet vilket följande hjälpte till med:
//Först kringick jag problemet genom att lägga scriptet i html bodyn istället för head. 
//Detta kändes dock som en mer sematisk lösning.
//document.addEventListener('DOMContentLoaded', () => { körs när DOM har laddat färdigt
//Källa: https://www.youtube.com/watch?v=m1DH8ljCqzo, https://www.youtube.com/watch?v=G5Or47gPH-4, https://www.javascripttutorial.net/javascript-dom/javascript-domcontentloaded/ och även kursmaterialet https://vimeo.com/83549574.
document.addEventListener('DOMContentLoaded', () => {  
    
    //Array med objekt av korten i spelet.
    //Två objekt av varje kort för att kunna para ihop med varandra.
    //Varje objekt innehar ett namn och en bild hämtat från mappen med bilder.
    //källa: bilderna är hämtade från pixabay av användare "ptra" bilderna är "Free for commercial use. No attribution required"
    //källa objekt array: kursmaterial https://vimeo.com/266033713
    
    const kortlista = [
        
        {
            name: "apa",
            Image: "bilder/apa.png"
        },

        {
            name: "apa",
            Image: "bilder/apa.png"
        },

        {
            name: "bjorn",
            Image: "bilder/bjorn.png"
        },
        
        {
            name: "bjorn",
            Image: "bilder/bjorn.png"
        },
        
        {
            name: "giraff",
            Image: "bilder/giraff.png"
        },

        {
            name: "giraff",
            Image: "bilder/giraff.png"
        },

        {
            name: "gris",
            Image: "bilder/gris.png"
        },

        {
            name: "gris",
            Image: "bilder/gris.png"
        },

        {
            name: "groda",
            Image: "bilder/groda.png"
        },

        {
            name: "groda",
            Image: "bilder/groda.png"
        },

        {
            name: "hund",
            Image: "bilder/hund.png"
        },

        {
            name: "hund",
            Image: "bilder/hund.png"
        },

        {
            name: "kanin",
            Image: "bilder/kanin.png"
        },

        {
            name: "kanin",
            Image: "bilder/kanin.png"
        },

        {
            name: "katt",
            Image: "bilder/katt.png"
        },

        {
            name: "katt",
            Image: "bilder/katt.png"
        },

        {
            name: "lejon",
            Image: "bilder/lejon.png"
        },

        {
            name: "lejon",
            Image: "bilder/lejon.png"
        },

        {
            name: "uggla",
            Image: "bilder/uggla.png"
        },

        {
            name: "uggla",
            Image: "bilder/uggla.png"
        }
    ];
    //För att inte få alla kort i ordning (så som de ligger i arrayen) behöver det slumpas från "kortlista"
    //Det var svårt att få fram en bra funktion för att slumpa men följande fungerade väldigt bra och är hämtad från följande källa: https://medium.com/@apestruy/shuffling-an-array-in-javascript-8fcbc5ff12c7
    //nedan "slumpgenerator" fungerar genom att Math.random() returnerar ett tal mellan 0 och 1. 
    //Sedan appliceras -,5 fär att få rangen till -,5 till ,5. Alttså returneras ett positivt, neutralt (0) eller negativt tal.
    //"Math.random() - 0.5" används som en jämförelsefunktion och returvärdet bestämmer hur de element som jämförs ska sorteras. 
    //metoden kritiseras dock av följande källa (som också återfinns i ovan nämnd länk): http://www.robweir.com/blog/2010/02/microsoft-random-browser-ballot.html

    kortlista.sort(() => Math.random() - 0.5);

    //spelplanen hämtar informationen från klassen spelplan med hjälp av querySelector.
    //Detta är nödvändigt för att displaya spelplanen, dvs .spelplan
    //källa querySelector https://www.youtube.com/watch?v=3oOKAJTD2F8 och https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    const plan = document.querySelector(".spelplan");

    //variabler för statistiken antal drag och funna par.
    //Dessa återfinns i html- koden med span tag som hämtar infon.
    var drag = document.querySelector(".drag");
    var par = document.querySelector(".par");

    //Följande rad bestämmer att spelet är slut när 10 st par har uppnåtts.
    //Denna är skapad för att göra koden så objektorienterad som möjligt.
    //Istället för att hårdkoda in siffran 10 har vi en variabel så att ifsatsen längst ner i koden hypotetiskt skulla kunna hämta en annan variabel om man vill utöka sahten och ha flera svårighetsgrader. tex ett lättase spel med bara 8 kort eller dylikt.
    const parISpel = 10;

    //variabler försök och funna kort är noll från början men itereras i sista funktionen rättavaldakort.
    var forsok = 0;
    var funnaKort = 0;

    //Följande överför värde på variablerna drag och par från ovan variabler försök och funnakort till drag och par som sedan displayas i statistiken.
    //detta görs med .texcontent som returnerar värdet. Det fungerar likt innerHTML men är något strängare. Se exempel i min källa 3:30 in i filmen.
    //källa textcontent https://www.youtube.com/watch?v=XW9ncbnfzZo
    drag.textContent = forsok;
    par.textContent = funnaKort;

    //en från början tom array som kommer innehålla valt kort just nu.
    var valtKort = [];
    //en array med de valde kortens id måste lagras för att se om de matchar i sista funktionen.
    var valtKortId = [];

    //Nedan finns funktionen för att aktivera planen, dvs startfältet.
    //forloopen loopar genom alla objekt i kortlistan och tilldelar varje objekt "kort" på startfältet med attribut.
    //kort.setAttribute("src", "bilder/bak.png"); sätter alla objekt i listan med "bilder/bak.png" vilket är kortens baksida. 
    //kort.setAttribute("data-id", index); hämtar varje objekts id (namn) från kortlistan med hjälp av loopen.
    //Utöver attributen tilldelas även korten med addEventListener("click", vandaKort); när man klickar på ett kort körs funktionen (vandaKort) som vänder korten.
    //plan.appendChild(kort); tar "kort" och applicerar till "plan"
    //Källa https://www.youtube.com/watch?v=e0ihEHxd6vI samt från kursmaterialet https://vimeo.com/83550083

    //funktionen aktiveraplan gör precis det. den förser alla positioner med attribut. 
    //
    //den loopar då igenom arrayen kortlista och förser varje kort med en bild hämtat från mappen bilder.

    function aktiveraPlan(){
        for (let index = 0; index < kortlista.length; index++) {
            var kort = document.createElement("img");
            kort.setAttribute("src", "bilder/bak.png");
            kort.setAttribute("data-id", index);
            kort.addEventListener("click", vandaKort);
            plan.appendChild(kort);
        }
    }

    //Följande funktion vänder kort
    //Den första ifsatsen ser till att man bara kan välja två kort åt gången. Utan den kan man klicka upp hur många kort man vill.
    //Den fungerar genom att så länge valda kort inte överskrider två körs funktionen. Det går bra att köra igen när timern har nollställts.
    //var kortId = this.getAttribute("data-id"); tilldelar kortId ett specifikt id, så man vet vilket kort som vändes.
    //om src inte är klart.png körs funktionen vidare. Denna if sats lades till för att motverka min bug om att kunna spela på redan vända och korrekta par.
    //valtKort.push(kortlista[kortId].name); valtKort pushar kortlistan som returnerar id. Så man vet vilket objekt som har valts. 
    //För att veta om funktionen ska vända tillbaka kort till klart eller bak pushar valtKortId sedan kortId.
    //Källa pushfunktionen: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push samt https://www.youtube.com/watch?v=g1hlKlovok8
    //this.setAttribute("src", kortlista[kortId].Image); är det som vänder korten. Detta görs genom att sätta ett attribut som byter ut nuvarande källan (bak) till en bild från kortlista genom att kolla id och returnera bild.
    //Funktionens sista ifsats uppgift är egentligen att starta den sista funktionen som har till uppgift att rätta de två valda korten.
    //Den körs igång när två objekt har valts och har även en timer för att displaya de två valda objektens bilder. Timern är ställd på ,6 sekunder.
    //Det är en fin linje att hålla så de inte visas för länge och man blir frustrerad men samtidigt hinna ta in vilka bilder som visades på vilka ställen.
    //En vidareutveckling för spelet vore att ha olika levels för spelet och justera tidintervallet därefter. Vilket också är tanken med koden, att kunna bygga vidare på. 
    
    function vandaKort (){
        if (valtKort.length != 2){
          var kortId = this.getAttribute("data-id");
            if (this.getAttribute("src") != "bilder/klart.png") {
                valtKort.push(kortlista[kortId].name);
                valtKortId.push(kortId);
                this.setAttribute("src", kortlista[kortId].Image);
                if (valtKort.length ==2){
                    setTimeout (rattaValdaKort, 600);
                }
            }
        }
    }

    //Sista funktionens uppgift är att rätta valda kort.
    //Här räknas även antal försök som lagras i variabln högre upp.
    //var kort innehåller alla bildelement med hjälp av querySelectorAll.
    //källa querySelectorAll: https://www.youtube.com/watch?v=D7sNpAiNMQM
    //Det finns två variabler forstaKortet och andraKortet. de har de valda kortens id som parametrar och används i kommande ifsats för att jämföras för en potentiell matchning.
    //om de två valda objekten stämmer överens med varandra ökar funnakort med 1 och objekten får klart.png som bild.
    //annars går de tillbaks till bak.png
    //När ifsatsen har körts behövs valtKort och valtKortId nollställa sina placeringar i arrayen. Annars kommer de inte gå att komma vidare i spelet.
    //Sedan uppdateras drag och par, dvs statistiken.
    //Den sista ifsatsen skickar ut en alert med grattismeddelande när funnakort uppnår parISpel, dvs 10. 

    function rattaValdaKort() {
        forsok++;
        var kort = document.querySelectorAll("img");
        var forstaKortet = valtKortId[0];
        var andraKortet = valtKortId[1];

        if (valtKort[0] == valtKort[1]) {
            funnaKort++;
            kort[forstaKortet].setAttribute("src", "bilder/klart.png");
            kort[andraKortet].setAttribute("src", "bilder/klart.png");
        }else{
            kort[forstaKortet].setAttribute("src", "bilder/bak.png");
            kort[andraKortet].setAttribute("src", "bilder/bak.png");
        }
        valtKort = [];
        valtKortId = [];
        drag.textContent = forsok;
        par.textContent = funnaKort;

        if (funnaKort == parISpel) {
            alert("Grattis du klara det på " + forsok + " försök!")
        } 

    }

    //För att fortsätta spela behöver vi köra aktiveraPlan(); funktionen igen. så att Scriptet loopar kan man säga
    aktiveraPlan(); 

})