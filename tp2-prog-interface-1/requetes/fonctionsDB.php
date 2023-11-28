<?php
	$connexion = connexionDB();
		
	/**
	 * Connection avec la base de données
	 */
	function connexionDB() {
		define('DB_HOST', 'localhost');
		define('DB_USER', 'root');
		define('DB_PASSWORD', '');

		$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
				
		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
		}
		
		$db = mysqli_select_db($laConnexion, 'to-do-list');

		if (!$db) {
			die ('La base de données n\'existe pas.');
		}
		
		mysqli_query($laConnexion, 'SET NAMES "utf8"');
		return $laConnexion;
	}

    /**
	 * Exécute la requête SQL
	 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
	 */
	function executeRequete($requete, $insert = false) {
		global $connexion;
		if ($insert) {
			mysqli_query($connexion, $requete);
			return $connexion->insert_id;
		} else {
			$resultats = mysqli_query($connexion, $requete);
			return $resultats;
		}
	}

    /**
	 * Retourne la liste des tâches
	 */
	function getAllTaches() {
		return executeRequete("SELECT * FROM taches");		
	}

	/**
	 * Ajoute une tâche à la base de données
	 */
	function ajouteTache($tache, $description, $importance) {
		$query = "INSERT INTO taches (`tache`, `description`, `importance`) 
				  VALUES ('" . $tache . "','" . $description . "','" . $importance. "')"; 
		return executeRequete($query, true);
	}

	/**
	 * Éfface une tâche de la base de données
	 */
	function effaceTache($id) {
		$query = "DELETE FROM taches WHERE id = " . $id;
		return executeRequete($query);
	}

	/**
	 * Retourne la tâche qui correspond au id
	 */
	function getTacheById($id) {
		$query = "SELECT * FROM taches WHERE id = " . $id;
		return executeRequete($query);
	}

	/**
	 * Retourne la liste des tâches en ordre alphabétique
	 */
	function trierTacheAlphabetique() {
		return executeRequete("SELECT * FROM taches ORDER BY tache ASC");
	}

	/**
	 * Retourne la liste des tâches en ordre d'importance
	 */
	function trierTacheImportance() {
		return executeRequete("SELECT * FROM taches ORDER BY importance ASC");
	}
?>