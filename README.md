# PPP-PROJ-Movie-Garden

Projekt stworzony na poczet przedmiotów Praktyka Progamowania Python i Programowanie Aplikacji Internetowej.

Backend został stworzony w Python 3.10 a frontend w  Angular 15.1.

Do uruchumienia potrzebne będą:
  - Python 3.10
  - Angular 15.1
  - Node v18.1
  - npm 8.19
  - docker 20.10
  - docker compose v2.10
  
Aby uruchomić aplikację należy w pierwszej kolejności uruchomić baze danych Postgre korzystając z pliku compose.yaml. W tym celu należy uruchomić dockera i będąc w
głownym folderze z projektem wywołać z konsoli komende `docker compose up -d`. Następnie na uruchomionej bazie danych należy wykonać skrypt sql znajdujący się
w pliku `database_script.sql` stworzy to odpowiednie tabele i zapełni bazę danymi.
  
Po stworzeniu bazy danych można uruchomić projekt backendFlask. W tym celu należy przejść do folderu backendFlask i w konsoli wykonać następujące kroki:
będać w katalogu backendFlask stworzyć virtual enviroment przy pomocy komendy `python -m venv venv` (tylko jedna wersja pythona może być zainstalowana na systemie 
jeśli więcje niż jenda wersja jest obecna komenda ta może utworzyć środowisko z złą wersją ptyhona, upewnij się że środowisko jest stworzyło się z wersją pythona 3.10),
następnie uruchomić środowisko komendą `venv\Scripts\activate.bat` po czym zainstalować potrzebne zależności z pliku `requirements.txt` za pomocą komendy
`pip install -r requirements.txt`, następnie uruchomić projekt komendą `python app.py`.

Po uruchomieniu backendu należy uruchomić frontend w tym celu należy przejść do folderu frontend i w konsoli uruchomić komende `npm install` zainstaluje ona 
potrzebne biblioteku. Następnie można uruchomić projekt komendą `ng serve`. 

Po uruchomieniu obu projektów można przejść na strone `http://localhost:4200` i korzystać z aplikacji.
