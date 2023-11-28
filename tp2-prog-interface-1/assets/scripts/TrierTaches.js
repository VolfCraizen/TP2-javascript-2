import Tache from './Tache.js';

export default class TrierTaches{
    #_el;
    #_elTaches;
    #_elTachesTemplate;

    constructor(el) {
        this.#_el = el;
        this.#_elTaches = document.querySelector('[data-js-taches]');
        this.#_elTachesTemplate = document.querySelector('[data-template-tache]')

        this.#init();
    }


    /**
     * Initialise les comportements
     */
    #init() {
        this.#_el.addEventListener('click', function(e) {
            let ordre = e.target.dataset.jsTrier;
                this.#trieTaches(ordre);
        }.bind(this));
    }


    /**
     * Réarrange les tâches affichées selon l'ordre demandé et réinjincte les
     */
    #trieTaches(propriete) {
        
        let data = {
            action: `trier_tache_${propriete}`,
        }

        let oOptions = { 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        fetch('requetes/requeteAsync.php', oOptions)
            .then(function(response){
                if (response.ok){
                    return response.json();
                } else throw new Error('La réponse n\'est pas correct')
            })
            .then(function(data){

                this.#_elTaches.innerHTML = '';

                for (let i = 0, l = data.length; i < l; i++) {

                    let elCloneTemplate = this.#_elTachesTemplate.cloneNode(true)

                    for (const cle in data[i]) {
                        let regex = new RegExp('{{' + cle + '}}', 'g')
                        elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[i][cle])
                    }

                    let elTache = document.importNode(elCloneTemplate.content, true)

                    this.#_elTaches.append(elTache);

                    let tache = this.#_elTaches.lastElementChild;

                    new Tache(tache);
                    
                }

            }.bind(this))
            .catch(function(err){
                
                console.log(err.message)
            })

    }
}