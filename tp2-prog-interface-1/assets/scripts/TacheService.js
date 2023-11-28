//Utilise le pour l'affichage des détails mais demande au prof si detail.js n'est pas préférable

class TacheService{

    #_elTemplateTache;
    #_elTache;
    #_path;

    constructor(){
        this.#_elTemplateTache = document.querySelector('[data-template-detail]');
        this.#_elTache = document.querySelector('[data-js-tache-detail]');

        this.#_path = location.pathname;

        this.getDetailsTache = this.#getDetailsTache.bind(this);
    }

    #getDetailsTache(id){
        
        let data = {
            action: 'get_tache_par_id',
            id: id
        }

        let oOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('requetes/requeteAsync.php', oOptions)
            .then(function(response){
                if (response.ok){
                    return response.json();
                } else throw new Error('La réponse n\'est pas correct')
            })
            .then(function(data){
                
                /**
                 * Vérifie si il y a une tache qui éxiste sinon retourne à l'état de base   (Pour les mauvais id dans le url)
                */
                if (data) {

                    this.#_elTache.innerHTML = '';

                    if (data.description == "") {
                        data.description = "Aucune description disponible.";
                    }
    
                    let elCloneTemplate = this.#_elTemplateTache.cloneNode(true)
    
                    for (const cle in data) {
                        let regex = new RegExp('{{' + cle + '}}', 'g');
                        
                        elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[cle]);
                    }
    
                    let elNouvelleTache = document.importNode(elCloneTemplate.content, true);
    
                    this.#_elTache.append(elNouvelleTache);


                    // Descend automatiquement vers la section détail (Si le fond de la page n'a pas déjà été atteint)
                    window.scrollTo({
                        top: this.#_elTache.getBoundingClientRect().top - 50,
                        behavior: 'smooth'
                    })

                }else {
                    this.#_elTache.innerHTML = '';
                    history.replaceState(null, null, this.#_path)
                }

            }.bind(this))
            .catch(function(err){
                console.log(err.message);
            })

    }
}

export const {getDetailsTache} = new TacheService();