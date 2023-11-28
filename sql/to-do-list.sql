/* Nom de la db : to-do-list */

CREATE TABLE taches (
	id int NOT NULL AUTO_INCREMENT,
	tache varchar(50) NOT NULL,
	description varchar(200) NOT NULL,
	importance varchar(5) NOT NULL,
	PRIMARY KEY (id)
);


INSERT into taches(tache, description, importance) VALUES
				('Vaisselle', '', '2'),
				('Balais', 'Ne pas oublier le balcon', '3'),
				('Apéro', 'Hmmm, pinot grigio !!', '1');