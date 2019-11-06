// hämtar fetchen och lägger bilder i sidan

const form = document.querySelector('form'); // Tar formulär


searchFunction = e => {
    e.preventDefault(); // Förhindrar att formuläret uppdaterar sidan
    let inputValue = document.querySelector('input').value; // Tar emot värdet från input
    let select = document.querySelector('select').value; // Tar värdet från varje alternativ innuti select
    removeContent();
    getImages(inputValue, select); // Samlar ihop värdet som man sedan nedanför 
}

getImages = (inputValue, select) => {
    document.querySelector('.close-box').addEventListener('click', () => { // Close kryset för att stänga ner lightbox
        document.querySelector('#light-box').style.display = 'none';// = Display none
    })


    https: document.querySelector(".spinner").style.display = "block"; // Min spinner börjar

    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=70f055a054a3f8fd8f41eda7d3679eb8&tags=${inputValue}&per_page=${select}&format=json&nojsoncallback=1`; // en fetch med Vilket sökord som användaren skriver in

    fetch(url)
        .then(res => res.json()) //Gör om till json format från js object
        .then(data => {
            data.photos.photo.forEach(item => { // Lopar igenom objectet i ordningen nedan
                // Skapar en lokal variabel och den heter url som fetchar varje bild igenom utl länken nedan
                let url = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`; // För att få ut nödvändig data
                let output = `
                
                <img src="${url}">  
           
                `; // hämtar bilder

                document.getElementById("output").innerHTML += output;// Visar bilder på sidan i output

                document.querySelector('#output').style.display = 'grid'; // Lägger ut bilderna i grid  

                document.querySelector(".spinner").style.display = "none"; // Tar bort min spinner

                const imageArray = document.querySelectorAll("#output img") // Tar alla bilder på sidan 
                imageArray.forEach(img => img.addEventListener('click', handleLightbox)) // Gör så att när du klickar så görs funktionen
                function handleLightbox(e) {
                    let lightboxImage = document.querySelector('#lightbox-image');// Väljer Lightbox elementet
                    let newSource = e.target.getAttribute('src') // Tar source länken från bilden som klickas
                    lightboxImage.setAttribute('src', newSource) // Sätter src attributen till bilden innanför lightboxen
                    document.querySelector('#light-box').style.display = 'flex'; // Visar bilden i lightboxen
                }
            });


        });
}


let removeContent = () => { // Detta tar bort bilder när man söker
    document.getElementById("output").innerHTML = ""; // Tömmer sidan på bilder
    document.querySelector("input").value = "";// Tömmer sökruta
};

form.addEventListener('submit', searchFunction) // Anger en event till formuläret