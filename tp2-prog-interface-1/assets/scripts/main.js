import Formulaire from './Formulaire.js';
import Tache from './Tache.js';
import TrierTaches from './TrierTaches.js';
import Detail from './Detail.js';
import Router from './router.js';


(function() {

    let elsFormulaire = document.querySelectorAll('[data-js-formulaire]'),
        elsTrierTaches = document.querySelectorAll('[data-js-trier-taches]'),
        elsDetail = document.querySelectorAll('[data-js-detail]'),
        elsTaches = document.querySelectorAll('[data-js-tache]');


    for (let i = 0, l = elsFormulaire.length; i < l; i++) {
        new Formulaire(elsFormulaire[i]);
    }

    for (let i = 0, l = elsTaches.length; i < l; i++) {
        new Tache(elsTaches[i]);
    }

    for (let i = 0, l = elsTrierTaches.length; i < l; i++) {
        new TrierTaches(elsTrierTaches[i]);
    }

    for (let i = 0, l = elsDetail.length; i < l; i++) {
        new Detail(elsDetail[i]);
    }

    new Router()

})(); 