document.addEventListener('DOMContentLoaded', () => {
    const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzYjZhZmYyNjBjYzAwMTVjYzBmOTIiLCJpYXQiOjE3MjIwMDUxNjgsImV4cCI6MTcyMzIxNDc2OH0.Yc2a3DLUY28wxwaCC1Fxp6CKT11SOAavGb01xC3EJj0";

    const btnReset = document.getElementById('reset');
    const btnSave = document.getElementById('save');
    const nameProduct = document.getElementById('title');
    const details = document.getElementById('description');
    const priceProduct = document.getElementById('price');
    const imgProduct = document.getElementById('imageUrl');

    let newProduct = {};

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            console.log('I dati sono stati ricevuti:', data);
            return data;
        } catch (error) {
            console.log('Si è verificato un errore', error);
            return null;
        }
    };

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
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            console.log('Nuovo prodotto creato:', data);
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

    const displayProducts = async () => {
        const loading = document.getElementById('loading');
        const productsList = document.getElementById('products-list');

        if (loading && productsList) {
            const data = await fetchData(endpoint);
            if (data) {
                loading.style.display = 'none';
                productsList.innerHTML = '';
                data.forEach((product) => {
                    productsList.innerHTML += `
                      <div class="card mb-2 ms-1 shadow opacity-75 scale" style="width: 19rem;">
                        <img src="${product.imageUrl}" class="card-img-top" alt="Immagine Prodotto">
                        <div class="card-body d-flex flex-column justify-content-between">
                          <div class="mb-3">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text lh-sm">${product.description}</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <a href="edit.html?id=${product._id}" class="btn btn-warning" id="edit-${product._id}">Modifica</a>
                            <a href="#" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"
                              onclick="modalFetch('${product._id}')">Scopri di più</a>
                          </div>
                        </div>
                      </div>`;
                });
            }
        } else {
            console.error('Uno o più elementi non sono stati trovati.');
        }
    };

    window.addEventListener('load', displayProducts);
});
