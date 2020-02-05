# [Dashboard - task monitoring application](https://dashboard-pwa.herokuapp.com)

Projekt **panelu do monitorowania zadaniami**. Stworzyłem aplikację internetową pozwalającą na tworzenie zadań, delegowanie ich do wykonania członkom grupy ludzi, monitorowanie stopnia ich realizacji wraz z możliwością komentowania.
Zadanie można:
- śledzić, 
- obserwować statystyki, 
- przydzielać do użytkownika, 
- monitorować postęp zadania, 
- komentować, 
- dodawać załączniki, 
- zarządzać stanem zadania. 

## Cechy projektu:
* Dane przechowywane w bazie danych w chmurze MongoDB Atlas)
* Pełna responsywność (RWD)
* Zabezpieczenia (JWT token)
* Aplikacja napisana zgodnie z zasadami PWA. Aplikację można zainstalować jako aplikacje desktopową na komputerze albo jako aplikacje mobilną na smartfonach.
* Strona dostępna pod adresem WWW na platformie heroku (https://dashboard-pwa.herokuapp.com)

### Użyte technologie:
- client: React Typescript, Bulma
- server: NodeJS, Express.js, MongoDB, Mongoose
- deploy: platforma Heroku

## Instalacja
```bash
git clone https://github.com/filiplipinski/dashboard.git dashboard
cd tree-view-rest-api
npm run install-app
npm run start-app
open: http://localhost:3000
```
