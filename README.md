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
## Konfiguracja
Skrypt korzysta z pliku konfiguracyjnego config.js znajdującego się w katalogu głównym projektu. Przed uruchomieniem skryptu edytuj ten plik, aby ustawić dane logowania i preferencje dotyczące wyników
### Opcje konfiguracyjne w pliku config.js:
``` javascript
module.exports = {
  startPage: 1,  // Numer strony, od której rozpocząć zapis
  totalPages: 3,  // Łączna liczba stron do zapisania
  screenshotsParentDir: './screenshots',  // Katalog do zapisywania zrzutów ekranu
  pdfParentDir: './pdf',  // Katalog do zapisywania pliku PDF
  loginUrl: 'https://www.ibuk.pl/logowanie.html',  // URL strony logowania IBUK.PL
  targetUrl: 'https://reader.ibuk.pl/?p=book:291462',  // URL czytnika książek
  credentials: {
    username: 'YOUR_EMAIL',  // Twój login do IBUK.PL
    password: 'YOUR_PASSWORD'  // Twoje hasło do IBUK.PL
  }
};
```
## Jak uruchomić
Po zainstalowaniu zależności i zaktualizowaniu pliku config.js, możesz uruchomić skrypt!
Użyj następującego polecenia, aby rozpocząć działanie skryptu:
```bash
 node run.js 
```
- Skrypt otworzy okno przeglądarki, zaloguje się na Twoje konto IBUK.PL i rozpocznie zapisywanie zrzutów ekranu stron książki
- Każda strona zostanie zapisana w katalogu screenshots w podkatalogu nazwanym na podstawie tytułu książki
- Po zapisaniu wszystkich stron, zostaną one połączone w jeden plik PDF i zapisane w katalogu pdf
