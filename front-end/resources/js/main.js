
    /*
      TODO: 1 
      Récupérer les villes visitées dans la base de données
    */
      const server = "http://localhost:3000";

      var data = {
        visit: [],
      };
  
      (async function () {
        "use strict";
  
        const resp = await fetch(`${server}/visits`);
        const con = await resp.json();
  
        con.map((el) => {
          data.visit.push(el);
        });
  
        renderCities();
      })();
  
      /*
        TODO: 2 
        Ajouter une ville dans la base de données
      */
      let addform = document.getElementById('addform');
  
      addform.addEventListener('submit', (e) => {
        e.preventDefault();
  
        /* 
          Récupération des données du formualire
        */
        let form = document.forms.addform;
        let city = form.city.value;
        let country = form.country.value;
        let year = form.year.value;
        let duration = form.duration.value;
        var u = document.getElementById("selectUnit");

        let unit = u.value;
        let visit = {
          city: city,
          country: country,
          year: year,
          duration: duration,
          unit: unit,
          wished: false,
        }
        console.log(visit)
        
        dataObjectUpdated("add", visit);
        console.log(visit)
        data.visit.push(visit)
        renderCities();
      })
  
      /*
        TODO 3: 
        Supprimer un élément au clic sur "Delete"
      */
      function deleteItem() {
  
        var item = this.parentNode.parentNode;
        var parent = item.parentNode;
        var id = parent.id;
        var value = item.innerText;
        console.log('i', item)
        console.log('p', parent)
        console.log('id', id)
        console.log('v', value)
        var visit = {
          id: data.visit[item.dataset.id]._id
        }
        data.visit.splice(data.visit.indexOf(value), 1);
        console.log(visit)
        dataObjectUpdated('delete', visit);
  
        parent.removeChild(item);
  
      }
  
      /*
         TODO 4:
         Ajoutez un formulaire d'ajout d'une ville dans votre wishlist
         1. Création du formulaire
         2. Ajout d'un nouveau tableau sur le front-end
         3. Mise à jour du back-end pour permettre le CRUD sur la wishlist
      */
  
      /*
      * On crée une nouvelle ligne dans le tableau "Cities" pour chaque ville 
      * du tableau "let cities = [...]"
      */
      function renderCities() {
        // On récupère le tableau
        let citiesTable = document.getElementById('cities-list');
  
        // Suppresssion des éléments
        citiesTable.innerHTML = '';
  
        // Pour toutes les objets du tableau
        for (i in data.visit) {
  
          // Nouvelle ligne <tr> avec comme id, la position dans le tableau
          let tr = document.createElement('tr');
          tr.dataset.id = i;
  
          // Création du <td> contenant le nom de la ville
          let city = document.createElement('td');
          let cityName = document.createTextNode(data.visit[i].city);
  
          // Création du <td> contenant le nom du pays
          let country = document.createElement('td');
          let countryName = document.createTextNode(data.visit[i].country);
  
          // Création du <td> contenant le nom du pays
          let wished = document.createElement('td');
          let wisehdValue = data.visit[i].wished == true ? document.createTextNode('Wished') : document.createTextNode(' ');

          // Création du <td> contenant le bouton d'ajout
          let action = document.createElement('td');
  
          // Création du bouton d'ajout
          let addToWishList = document.createElement('button');
          addToWishList.setAttribute('class', 'btn btn-danger');
          addToWishList.innerText = 'Retirer'
          // Exécution de la fonction au clic
          addToWishList.addEventListener('click', deleteItem)
  
          //On ajoute les textNodes aux éléments <td> puis le bouton au <td> correspondant
          city.appendChild(cityName);
          country.appendChild(countryName);
          wished.appendChild(wisehdValue);
          action.appendChild(addToWishList);
  
          // On ajoute les <td> à la ligne <tr>
          tr.appendChild(city);
          tr.appendChild(country)
          tr.appendChild(wished)
          tr.appendChild(action);
  
          // On ajoute toute la ligne au tableau
          citiesTable.appendChild(tr);
        }
  
       
  
      }
      function dataObjectUpdated(type, item) {
        switch (type) {
          case "add":
            fetch(`${server}/visits`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            }).then(res => res.json())
            .then(json => item._id = json.response);
            break;
          case "edit":
            fetch(`${server}/visits/${item.id}`, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            });
            break;
          case "delete":
            fetch(`${server}/visits/${item.id}`, {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            });
            break;
          default:
            break;
        }
      }

      let wishform = document.getElementById('wishform');
  
      wishform.addEventListener('submit', (e) => {
        e.preventDefault();
  
        /* 
          Récupération des données du formualire
        */
        let form = document.forms.wishform;
        let city = form.city.value;
        let country = form.country.value;
        let year = form.year.value;
        let duration = form.duration.value;
        var u = document.getElementById("inputCityDurationWish");

        let unit = u.value;
        console.log(form.inputCityDuration)
        let visit = {
          city: city,
          country: country,
          year: year,
          duration: duration,
          unit: unit,
          wished: true,
        }
        console.log(visit)
        data.visit.push(visit)
        dataObjectUpdated("add", visit);
        renderCities();
      })
  