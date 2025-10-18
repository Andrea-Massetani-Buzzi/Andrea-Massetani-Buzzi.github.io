class Evento {
    constructor(nome,data,categoria){
        this.nome=nome;
        this.data=data;
        this.categoria=categoria;
    }

    getCategoria(){
        return this.categoria;
    }

    toString() {
        return this.nome + " " + this.data + " " + this.categoria;
    }
}

const btnRegistra=document.getElementById("bottoneRegistra");
const btnVisualizza=document.getElementById("bottoneVisualizza");
const form=document.getElementById("form");

const imgLavoro=document.getElementById("immagineLavoro");
const imgCasa=document.getElementById("immagineCasa");
const imgTempoLib=document.getElementById("immagineTempoLib");
const imgFamiglia=document.getElementById("immagineFamiglia");

const risultato=document.getElementById("risultato");

form.addEventListener("submit", (event) => aggiungiEvento(event));

btnVisualizza.addEventListener("click", () => visualizzaPerCategoria());

//aggiungo gli event listener alle immagini

imgLavoro.addEventListener("click", () => scegliTipologia(imgLavoro.id));
imgCasa.addEventListener("click", () => scegliTipologia(imgCasa.id));
imgTempoLib.addEventListener("click", () => scegliTipologia(imgTempoLib.id));
imgFamiglia.addEventListener("click", () => scegliTipologia(imgFamiglia.id));

let eventi=[];

let immagineSelezionata=new Map();
immagineSelezionata.set(imgLavoro.id,false);
immagineSelezionata.set(imgCasa.id,false);
immagineSelezionata.set(imgTempoLib.id,false);
immagineSelezionata.set(imgFamiglia.id,false);

function aggiungiEvento(e){
    e.preventDefault();
    let app=false;
    let tipo;
    for(let i of immagineSelezionata.keys()){
        if(immagineSelezionata.get(i)===true) {
            app=true;
            tipo=i;
            break;
        }
    }

    if(!app){
        alert("Devi prima decidere la tipologia di evento");
        return;
    }

    let nome=document.getElementById("nomeEvento").value;
    let data=document.getElementById("dataEvento").value;
    let tipologia;

    switch(tipo){
        case "immagineLavoro":
            tipologia="lavoro";
            break;
        case "immagineCasa":
            tipologia="casa";
            break;
        case "immagineTempoLib":
            tipologia="tempo libero";
            break;
        case "immagineFamiglia":
            tipologia="famiglia";
            break;
    }

    let nuovoEvento = new Evento(nome,data,tipologia);
    eventi.push(nuovoEvento);
    alert("evento aggiunto con successo");
}

function scegliTipologia(id) {
    if(immagineSelezionata.get(id)===true){
        document.getElementById(id).setAttribute("border", "0px");
        immagineSelezionata.set(id,false);
    } else {
        for(let i of immagineSelezionata.keys()){
            if(i===id) {
                document.getElementById(id).setAttribute("border", "2px");
                immagineSelezionata.set(i,true);
            } else {
                immagineSelezionata.set(i,false);
                document.getElementById(i).setAttribute("border", "0px");
            }
        }
    }
}

function visualizzaPerCategoria() {
    let app=false;
    let categoriaScelta="";
    while(app!==true){
        app=true;
        categoriaScelta=prompt("Inserisci la tipologia di cui vuoi visualizzare gli eventi (lavoro/casa/tempo libero/famiglia");
        
        if(categoriaScelta!==null) {
            categoriaScelta=categoriaScelta.trim().toLocaleLowerCase();
            if(categoriaScelta!=="lavoro" && categoriaScelta!=="casa" && categoriaScelta!="tempo libero" && categoriaScelta!=="famiglia"){
                alert("La stringa inserita non è una tipologia valida");
                app=false;
            }
        } else {
            alert("La stringa inserita non è una tipologia valida");
            app=false;
        }
    }

    let logo=document.createElement("img");
    logo.setAttribute("width", "30%")
    let daStampare=[]

    for(let i=0;i<eventi.length;i++){
        if(eventi[i].categoria===categoriaScelta) {
            daStampare.push(eventi[i]);
        }
    }
    switch(categoriaScelta){
        case "lavoro":
            logo.setAttribute("src","lavoro.png");
            break;
        case "casa":
            logo.setAttribute("src","casa.png");
            break;
        case "tempo libero":
            logo.setAttribute("src","tempoLib.png");
            break;
        case "famiglia":
            logo.setAttribute("src","famiglia.png");
            break;
    }
    risultato.innerHTML="";
    if(daStampare.length===0)
    {
        risultato.textContent="Nessun appuntamento trovato per la categoria " + categoriaScelta;
    } else {
        risultato.appendChild(logo);
        let ul=document.createElement("ul");
        for(let i=0;i<daStampare.length;i++)
        {
            let li=document.createElement("li");
            li.textContent=daStampare[i].toString();
            ul.appendChild(li);
        }
        risultato.appendChild(ul);
    }
}