document.addEventListener('DOMContentLoaded', () => {
    const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjIwMDA3MjUsImV4cCI6MTcyMzIxMDMyNX0.ONMn3aq7hMT8YOZrbP_jT1WKZ8M93UcGIFZf-Z8aAHw";

    const btnReset = document.getElementById('reset');
    const btnSave = document.getElementById('save');
    const nameProduct = document.getElementById('title'); // ID aggiornato
    const details = document.getElementById('description'); // ID aggiornato
    const priceProduct = document.getElementById('price'); // ID aggiornato
    const imgProduct = document.getElementById('imageUrl'); // ID aggiornato

    let newProduct = {};

    const postFetch = async (product) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(`Errore durante l'invio: ${error}`);
        }
    };

    btnSave.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            if (
                nameProduct.value.trim() === "" ||
                details.value.trim() === "" ||
                imgProduct.value.trim() === "" ||
                priceProduct.value.trim() === ""
            ) {
                alert("Completa tutti i campi prima di inviare il prodotto.");
                return;
            }

            newProduct = {
                brand: "Brand di default", 
                description: details.value,
                imageUrl: imgProduct.value,
                name: nameProduct.value,
                price: priceProduct.value,
            };

            await postFetch(newProduct);

            window.location.href = 'index.html';
        } catch (error) {
            console.log(`Errore durante l'invio: ${error}`);
        }
    });

    const resetForm = () => {
        nameProduct.value = "";
        details.value = "";
        imgProduct.value = "";
        priceProduct.value = "";
    };

    btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        const conferma = confirm('Sei sicuro di voler resettare il form?');
        if (conferma) {
            resetForm();
        }
    });
});
