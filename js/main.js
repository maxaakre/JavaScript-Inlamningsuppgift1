
//Formulär
const form = document.querySelector('form'); // Tar formulär där man skriver in sitt sökord
//Formulär

//Sök funktion
searchFunction = e => {
    e.preventDefault(); // Förhindrar att formuläret uppdaterar sidan
    let inputValue = document.querySelector('input').value; // Tar emot värdet från input
    let select = document.querySelector('select').value; // Tar värdet från varje alternativ innuti select
    removeContent();// Tar bort bilder och input sträng efter sökning
    getImages(inputValue, select); // Kör funktionen getImages som tar emot 2 parametrar
}
//Sök funktion

//Lightbox 
getImages = (inputValue, select) => {
    document.querySelector('.close-box').addEventListener('click', () => { // Close kryset för att stänga ner lightbox
        document.querySelector('#light-box').style.display = 'none';// = Display none
    })
    //Lightbox 

    //Spinner
    https: document.querySelector(".spinner").style.display = "block"; // Min spinner börjar
    //Spinner

    //Hämtning av bilder
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=70f055a054a3f8fd8f41eda7d3679eb8&text=${inputValue}&per_page=${select}&format=json&nojsoncallback=1`; // En fetch med Vilket sökord som användaren skriver in

    fetch(url)// hämtar fetchen och lägger bilder i sidan
        .then(res => res.json()) // Får tillbaka ett response i form av en json sträng
        .then(data => { // kan sedan använda mig av ett JavaScript object som jag döper till data.
            data.photos.photo.forEach(item => { // Lopar igenom objectet i ordningen nedan
                // Skapar en lokal variabel och den heter url som bygger upp varje bild igenom url länken nedan
                let url = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`; // Bygger upp en Url länk genom att ange parametrar för att bilden ska visas korrekt
                let output = `<img src="${url}"> `; // Visar alla bilder inuti output.

                document.getElementById("output").innerHTML += output;// Visar bilder på sidan i output

                document.querySelector('#output').style.display = 'grid'; // Lägger ut bilderna i grid nät  

                document.querySelector(".spinner").style.display = "none"; // Tar bort min spinner efter fetchen är avsultad.
                //Hämtning av bilder

                //Lightbox
                const imageArray = document.querySelectorAll("#output img") // Tar alla bilder på sidan 
                imageArray.forEach(img => img.addEventListener('click', handleLightbox)) // Gör så att när du klickar så görs funktionen
                function handleLightbox(e) {
                    let lightboxImage = document.querySelector('#lightbox-image');// Tar IMG tag från lightboxen 
                    let newSource = e.target.getAttribute('src') // Tar source länken från bilden som klickas
                    lightboxImage.setAttribute('src', newSource) // Sätter src attributen till bilden innanför lightboxen
                    document.querySelector('#light-box').style.display = 'flex'; // Visar bilden i lightboxen
                }//Lightbox
            });


        });
}

//Rensar bilder
let removeContent = () => { // Detta tar bort bilder när man söker (Din nya sökning)
    document.getElementById("output").innerHTML = ""; // Tömmer sidan på bilder

};
//Rensar bilder

//Sökning med både Enter och sök knappen
form.addEventListener('submit', searchFunction) // Anger en event av submit till formuläret
//Sökning med både Enter och sök knappen