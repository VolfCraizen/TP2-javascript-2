import { getDetailsTache } from './TacheService.js';

export default class Router {

    #_elTache;
    #_routes;
    #_path;

    constructor(el){

        this.#_elTache = document.querySelector('[data-js-tache-detail]');

        this.#_path = location.pathname;

        this.#_routes = [
            ['/details/:id', getDetailsTache]
        ]

        this.#init();
    }

    #init(){
        this.#gereHashbang();
        window.addEventListener('hashchange', function(){
            //Si gereHashbang fonctionne (trouve une route valide avec le hash), fait le sinon retourne à l'état de base
            if (this.#gereHashbang()) {
                this.#gereHashbang();
            } else {
                this.#_elTache.innerHTML = '';
                history.replaceState(null, null, this.#_path)
            }
        }.bind(this))
    }

    #gereHashbang(){

        //enlève les 2 premier charactères du hash
        let hash = window.location.hash.slice(2),
            isRoute = false;

        //Si le hash écrit fini avec /, enlève le
        if (hash.endsWith('/')) {
            // slice 0, -1  commence de 0 et enlève le dernier 
            hash = hash.slice(0, -1);
        }

        for (let i = 0, l = this.#_routes.length; i < l; i++){
            //Va chercher dans le tableau this.#_routes les sous tableaux avec i et va checher la première valeur de ces tableaux qui serait '/details' ou peut importe
            let route = this.#_routes[i][0],
                isId = false;

            //Si il y a : à l'index 0 ou plus
            if (route.indexOf(':') > -1) {
                //Va chercher de l'index 0 à l'index du /: (excluant le /:) ex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
                route = route.substring(0, route.indexOf('/:'))
                isId = true;
            }



            if (hash.indexOf(route) > -1) {

                //Sépare le /details et le id
                let hashInArray = hash.split(route)

                if (hashInArray[1]) {
                    if (isId) {
                        //Enlève le / pour avoir le id
                        let id = hashInArray[1].slice(1);
                        this.#_routes[i][1](id);
                        isRoute = true
                        return id
                    }
                } else {
                    if (hash === this.#_routes[i][0]) {
                        this.#_routes[i][1]();
                        isRoute = true;
                    }
                    
                }
            }
        }
    }
}