# ibuk-pdf
Ten skrypt automatyzuje proces zapisywania wypożyczonej książki z serwisu IBUK.PL w formacie PDF. Sam serwis nie udostępnia opcji pobierania wypożyczonych książek, więc skrypt wykonuje zrzuty ekranu każdej strony książki i łączy je w jeden plik PDF.

## Funkcje
- Automatyzuje logowanie do IBUK.PL
- Wykonuje zrzuty ekranu stron książki i zapisuje je w dynamicznie utworzonym folderze
- Łączy zrzuty ekranu w jeden plik PDF z nazwą na podstawie tytułu książki
- Opcje konfiguracji dla danych logowania, zakresu stron i lokalizacji zapisu

## Wymagania
Node.js: Upewnij się, że masz zainstalowany Node.js na swoim systemie. Jeśli nie, pobierz go [tutaj](https://nodejs.org)

## Instalacja
- Sklonuj repozytorium lub lub pobierz pliki z tej strony
- Zainstaluj zależności. W katalogu projektu uruchom następujące polecenie, aby zainstalować wymagane pakiety Node.js:
```bash
 npm install 
```
