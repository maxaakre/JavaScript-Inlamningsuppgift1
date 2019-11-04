// hämtar fetchen och lägger bilder i sidan

const form = document.querySelector('form'); // tar formulär


searchFunction = e => {
    e.preventDefault(); // Förhindrar att formuläret uppdaterar sidan
    let inputValue = document.querySelector('input').value; // Tar emot värdet från input
    let select = document.querySelector('select').value; //Tar värdet från varje alternativ innuti select
    removeContent();
    getImages(inputValue, select); //samlar ihop värdet som man sedan nedanför 
}

getImages = (inputValue, select) => {
    document.querySelector('.close-box').addEventListener('click', () => { //close kryset för att stänga ner lightbox
        document.querySelector('#light-box').style.display = 'none';// =display none
    })


    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f0ba267d7ad25a32cb67fab3494fbc83&tags=${inputValue}&per_page=${select}&format=json&nojsoncallback=1`; // en fetch med Vilket sökord som användaren skriver in

    fetch(url)
        .then(res => res.json()) //Gör om till json format
        .then(data => {
            data.photos.photo.forEach(item => {
                let url = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
                let output = `
                
                <img src="${url}">
           
             
    
                `;




                document.getElementById("output").innerHTML += output;



                const imageArray = document.querySelectorAll("#output img")
                imageArray.forEach(img => img.addEventListener('click', handleLightbox))
                function handleLightbox(e) {
                    let lightboxImage = document.querySelector('#lightbox-image');
                    let newSource = e.target.getAttribute('src') // tar source länken från bilden som klickas
                    lightboxImage.setAttribute('src', newSource) // sätter src attributen till bilden innanför lightboxen
                    document.querySelector('#light-box').style.display = 'flex'; // visar bilden i lightboxen
                }
            });


        });
}


let removeContent = () => {
    document.getElementById("output").innerHTML = "";
    document.querySelector("input").value = "";
};

form.addEventListener('submit', searchFunction) // anger en event till formuläret