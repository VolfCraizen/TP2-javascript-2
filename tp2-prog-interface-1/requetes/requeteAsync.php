<?php

// Pour accéder à la base de données
require_once('fonctionsDB.php');


$request_payload = file_get_contents('php://input');
$data = json_decode($request_payload, true);


if (isset($data['action'])) {

	// Switch en fonction de l'action envoyée
	switch ($data['action']) {

		case 'liste_taches':
			$data = array();

			// Obtenir les tâches dans la BD
			$taches = getAllTaches();

			// Récupérer la ligne suivante d'un ensemble de résultats sous forme de tableau associatif
			while ($tache = mysqli_fetch_assoc($taches)) { 
				$data[] = $tache;
			}
		
			header('Content-type: application/json; charset=utf-8');
			echo json_encode($data);

			break;

		case 'ajout_tache':

			if (isset($data['tache'], $data['description'], $data['importance'])) {

				$tache = htmlspecialchars($data['tache']);
				$description = htmlspecialchars($data['description']);
				$importance = htmlspecialchars($data['importance']);
		
				echo ajouteTache($tache, $description, $importance);
			
			} else {
				echo 'Erreur query string';
			}

			break;
		case 'efface_tache':

			if (isset($data['id'])) {
		
				effaceTache($data['id']);
			
			} else {
				echo 'Erreur query string';
			}

			break;
		case 'get_tache_par_id':

			if (isset($data['id'])) {
		
				$data = mysqli_fetch_assoc(getTacheById($data['id']));
			
				header('Content-type: application/json; charset=utf-8');
				echo json_encode($data);

			
			} else {
				echo json_encode('Erreur query string');
			}

			break;

		case 'trier_tache_alphabetique':

			$data = array();

			$taches = trierTacheAlphabetique();

			while ($tache = mysqli_fetch_assoc($taches)) { 
				$data[] = $tache;
			}
		
			header('Content-type: application/json; charset=utf-8');
			echo json_encode($data);

			break;

		case 'trier_tache_importance':

			$data = array();

			$taches = trierTacheImportance();

			while ($tache = mysqli_fetch_assoc($taches)) { 
				$data[] = $tache;
			}
		
			header('Content-type: application/json; charset=utf-8');
			echo json_encode($data);

			break;
	}
} else {
	echo 'Erreur action';
}

?>