// hämtar fetchen och lägger bilder i sidan

const form = document.querySelector('form'); // tar formulär

searchFunction = e => {
    e.preventDefault(); // Förhindrar att formuläret uppdaterar sidan
    let inputValue = document.querySelector('input').value; // Tar emot värdet från input
    let select = document.querySelector('select').value; //Tar värdet från varje alternativ innuti select
    getImages(inputValue, select);
}

getImages = (inputValue, select) => {

    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a02e608cfb3c9ba63718ff52f8215856&tags=${inputValue}&per_page=${select}&format=json&nojsoncallback=1`; // en fetch med Vilket sökord som användaren skriver in

    fetch(url)
        .then(res => res.json()) //Gör om till json format
        .then(data => {
            data.photos.photo.forEach(item => {
                let url = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
                let output = `
                
                <img src="${url}">
           
             
    
                `;

                document.getElementById("output").innerHTML += output;
            });


        });
}



form.addEventListener('submit', searchFunction) // anger en event till formuläret