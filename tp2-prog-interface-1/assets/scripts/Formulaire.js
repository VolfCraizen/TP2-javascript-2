import Tache from './Tache.js';

export default class Formulaire{

    #_el;
    #_elInputTache;
    #_elInputDescription;
    #_elsInputImportance;
    #_elBouton;
    #_elTaches;
    #_elTachesTemplate;

    constructor(el) {
        this.#_el = el;
        this.#_elInputTache = this.#_el.tache;
        this.#_elInputDescription = this.#_el.description;
        this.#_elsInputImportance = this.#_el.querySelectorAll('input[name="importance"]');
        this.#_elBouton = this.#_el.querySelector('[data-js-btn]');    
        this.#_elTaches = document.querySelector('[data-js-taches]');
        this.#_elTachesTemplate = document.querySelector('[data-template-tache]')
        
        this.#init();
    }


    /**
     * Initialise les comportements
     */
    #init() {
        this.#_elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            let estValide = this.#valideFormulaire();

            /* Si valide */
            if (estValide) {
                this.#ajouteTache();
                this.#_el.reset();
            }
        }.bind(this));
    }


    /**
     * Validation du formulaire
     * @returns
     */
    #valideFormulaire() {

        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this.#_elInputTache.value == '') {
            this.#_elInputTache.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this.#_elInputTache.parentNode.classList.contains('error')) this.#_elInputTache.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this.#_el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) {
            if (this.#_elsInputImportance[0].parentNode.classList.contains('error')) this.#_elsInputImportance[0].parentNode.classList.remove('error');
        } else {
            this.#_elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }


    /**
     * Ajoute la tâche au tableau aTaches et appelle la méthode pour injecter la nouvelle tâche
     */
    #ajouteTache() {
        let tache = {
            action: 'ajout_tache',
            tache: this.#_elInputTache.value,
            description: this.#_elInputDescription.value,
            importance: this.#_el.querySelector('input[name="importance"]:checked').value
        }

        let oOptions = { 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tache)
        };

        fetch('requetes/requeteAsync.php', oOptions)
            .then(function(response){
                if (response.ok){
                    return response.text();
                } else throw new Error('La réponse n\'est pas correct')
            })
            .then(function(id){

                //ajoute id à tache
                tache.id = id;

                //injection de la nouvelle tache avec l'engin de gabarit sur l'objet tache
                let elCloneTemplate = this.#_elTachesTemplate.cloneNode(true)

                for (const cle in tache) {
                    let regex = new RegExp('{{' + cle + '}}', 'g')
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[cle])
                }

                let elNouvelleTache = document.importNode(elCloneTemplate.content, true)

                this.#_elTaches.append(elNouvelleTache);

                let nouvelleTache = this.#_elTaches.lastElementChild;

                new Tache(nouvelleTache);

            }.bind(this))
            .catch(function(err){
                console.log(err.message)
            })
    }
}
