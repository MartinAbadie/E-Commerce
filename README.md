# E-Commerce

### Author : Martin Abadie & Jérémy Bressand
#### Projet Université de Montpellier - Architecture MEAN & Angular2






## But du projet

Ce projet consiste à développer une application de vente en ligne en Angular2, qui permet de faire des recherche de produits via un critère donné (module Recherche), 
ainsi qu'un serveur NodeJS qui recevra les requêtes du client, questionnera la base de donnée MongoDB et renverra la liste des produits répondants à la requête du client. 
Le serveur renverra cette liste au client qui les affichera sur le navigateur de l'utilisateur, qui pourra ajouter un produit dans un panier (module Panier).






## Lancement :

Créer une base de donnée newBase dans MongoDB : 

`use newBase`


Créer une nouvelle collection Produits dans la base newBase à partir du fichier Produits.json : 

`cd Server`
`mongoimport --db newBase --collection Produits --file produits.json`


Ovrir un terminal dans le dossier VentesEnLigne et lancer le serveur NodeJS : 

`cd Server`
`node nodeServer.js`


Ouvrir un nouveau terminal dans le deossier VentesEnLigne/e-commerce et lancer l'application Angular2 : 

`cd Client`
`npm start`






## Notes :

Marques disponibles dans la base de donnée : Apple - Asus - HP - Samsung
