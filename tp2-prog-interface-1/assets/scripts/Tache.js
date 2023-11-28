export default class Tache {

    #_el;
    #_id;
    #_elActions;
    #_elDetail;
    #_elZoneDetail;
    #_path;

    constructor(el) {
        this.#_el = el;
        this.#_id = this.#_el.dataset.jsTache;
        this.#_elActions = this.#_el.querySelector('[data-js-actions]');
        this.#_elZoneDetail = document.querySelector('[data-js-tache-detail]');

        this.#_path = location.pathname;

        this.#init();
    }


    /**
     * Initialise les comportements
     */
    #init() {
        this.#_elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'afficher') this.#afficheDetail();
            else if (e.target.dataset.jsAction == 'supprimer') this.#supprimeTache();
        }.bind(this));
    }


    /**
     * Affiche le détail d'une tâche
     */
    #afficheDetail() {
        window.location = `#!/details/${this.#_id}`; 
    }


    /**
     * Supprime la tâche de la base de données et du dom
     */
    #supprimeTache() {
        let tache = {
            action: 'efface_tache',
            id: this.#_id
        }

        let oOptions = { 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tache)
        };

        this.#_elDetail = document.querySelector('[data-js-showDetail]');

        fetch('requetes/requeteAsync.php', oOptions)
            .then(function(response){
                if (response.ok){
                    return response.text();
                } else throw new Error('La réponse n\'est pas correct')
            })
            .then(function(data){
                // suppression de la tache du DOM
                this.#_el.remove()

                // Si le id de le détail de tâche affiché est celui de la tâche qui a été éffacé, retourne à l'état de base
                if (tache.id == this.#_elDetail.dataset.jsShowdetail) {
                    this.#_elZoneDetail.innerHTML = ""
                    history.replaceState(null, null, this.#_path)
                }

            }.bind(this))
            .catch(function(err){
                console.log(err.message)
            })
    }
}