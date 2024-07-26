document.addEventListener('DOMContentLoaded', () => {
    const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzYjZhZmYyNjBjYzAwMTVjYzBmOTIiLCJpYXQiOjE3MjIwMDUxNjgsImV4cCI6MTcyMzIxNDc2OH0.Yc2a3DLUY28wxwaCC1Fxp6CKT11SOAavGb01xC3EJj0";

    let editProduct = {};

    const btnDelete = document.getElementById('delete');
    const btnReset = document.getElementById('reset');
    const btnSave = document.getElementById('save');
    const nameProduct = document.getElementById('game-title');
    const details = document.getElementById('game-description');
    const brandProduct = document.getElementById('game-brand');
    const priceProduct = document.getElementById('game-price');
    const imgProduct = document.getElementById('game-image');
    const loading = document.getElementById('loading');

    const dataFetch = async () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');

            if (!id) return;

            const apiUrl = `${endpoint}${id}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (loading) loading.style.display = 'none';

                nameProduct.value = data.name;
                details.textContent = data.description;
                brandProduct.textContent = data.brand;
                priceProduct.textContent = `${data.price}€`;
                imgProduct.src = data.imageUrl;
            }
        } catch (error) {
            console.log('Si è verificato un errore', error);
        }
    };

    const putFetch = async () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');

            if (!id) return;

            const apiUrl = `${endpoint}${id}`;

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editProduct),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(`Errore durante l'invio: ${error}`);
        }
    };

    const deleteFetch = async () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');

            if (!id) return;

            const apiUrl = `${endpoint}${id}`;

            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                console.log('Eliminazione non riuscita. Status:', response.status);
            }
        } catch (error) {
            console.log(`Errore durante l'eliminazione: ${error}`);
        }
    };

    if (btnSave) {
        btnSave.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                if (
                    !nameProduct.value.trim() ||
                    !details.textContent.trim() ||
                    !brandProduct.textContent.trim() ||
                    !priceProduct.textContent.trim() ||
                    !imgProduct.src.trim()
                ) {
                    alert("Completa tutti i campi prima di inviare il prodotto.");
                    return;
                }

                editProduct = {
                    brand: brandProduct.textContent,
                    description: details.textContent,
                    imageUrl: imgProduct.src,
                    name: nameProduct.value,
                    price: priceProduct.textContent.replace('€', '').trim(),
                };

                await putFetch();
                window.location.href = 'index.html';
            } catch (error) {
                console.log(`Errore durante l'invio: ${error}`);
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', (e) => {
            e.preventDefault();
            const conferma = confirm('Sei sicuro di voler resettare il form?');

            if (conferma) {
                resetForm();
            }
        });
    }

    if (btnDelete) {
        btnDelete.addEventListener('click', async (e) => {
            e.preventDefault();

            const conferma = confirm('Sei sicuro di voler eliminare il prodotto?');

            if (conferma) {
                await deleteFetch();
            }
        });
    }

    dataFetch();
});
