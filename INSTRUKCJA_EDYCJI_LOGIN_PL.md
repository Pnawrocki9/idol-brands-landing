# Instrukcja: Edycja tekstów formularza logowania influencera (PL)

## 📍 Lokalizacja w CMS

Teksty formularza logowania w wersji polskiej możesz edytować w panelu administracyjnym:

1. **Otwórz panel CMS:** `admin.html`
2. **Zaloguj się** jako administrator
3. **Przewiń stronę w dół** do sekcji: **"Strona logowania (PL)"**

## ✏️ Dostępne pola do edycji

W sekcji "Strona logowania (PL)" znajdziesz następujące pola:

### 1. Tytuł logowania (PL)
- **Domyślna wartość:** "Logowanie influencera"
- **Gdzie się wyświetla:** Główny nagłówek formularza

### 2. Podtytuł logowania (PL)
- **Domyślna wartość:** "Wprowadź dane logowania z e-maila akceptacyjnego.\nAby się zarejestrować, zapisz się na listę oczekujących, a wkrótce wyślemy Ci e-mail z danymi do logowania."
- **Gdzie się wyświetla:** Tekst pod nagłówkiem
- **Uwaga:** Użyj `\n` aby dodać nową linię

### 3. Etykieta pola użytkownik (PL)
- **Domyślna wartość:** "Nazwa użytkownika"
- **Gdzie się wyświetla:** Label i placeholder dla pola username

### 4. Etykieta pola hasło (PL)
- **Domyślna wartość:** "Hasło"
- **Gdzie się wyświetla:** Label i placeholder dla pola password

### 5. Tekst przycisku logowania (PL)
- **Domyślna wartość:** "Zaloguj się"
- **Gdzie się wyświetla:** Przycisk submit formularza

### 6. Komunikat błędu logowania (PL)
- **Domyślna wartość:** "Nieprawidłowa nazwa użytkownika lub hasło."
- **Gdzie się wyświetla:** Komunikat błędu przy niepoprawnym logowaniu

## 📝 Jak zapisać zmiany

### Krok 1: Edytuj teksty
Wprowadź nowe wartości w odpowiednich polach.

### Krok 2: Zapisz lokalnie
Kliknij przycisk **"Zapisz treści logowania (PL)"**

Zobaczysz komunikat: *"Treści logowania (PL) zapisane."*

### Krok 3: Opublikuj online
Kliknij zielony przycisk **"📤 Publikuj Treści Online"** (prawy dolny róg strony)

Poczekaj na komunikat: *"✅ Treści opublikowane!"*

### Krok 4: Sprawdź efekt
Otwórz stronę `login-pl.html` i odśwież (Ctrl+F5 lub Cmd+Shift+R)

## 🧪 Testowanie zmian

### Metoda 1: Plik testowy
Otworzyłem plik `test-login-pl.html` gdzie możesz:
- Zobaczyć wszystkie wartości z localStorage
- Zobaczyć podgląd formularza z aktualnymi tekstami
- Przetestować czy zmiany zostały zapisane

### Metoda 2: Konsola przeglądarki
Otwórz konsolę przeglądarki (F12) na stronie `login-pl.html` i wpisz:
```javascript
console.log('plLoginTitle:', localStorage.getItem('plLoginTitle'));
console.log('plLoginSubtitle:', localStorage.getItem('plLoginSubtitle'));
console.log('plLoginUsernameLabel:', localStorage.getItem('plLoginUsernameLabel'));
console.log('plLoginPasswordLabel:', localStorage.getItem('plLoginPasswordLabel'));
console.log('plLoginButtonText:', localStorage.getItem('plLoginButtonText'));
console.log('plLoginError:', localStorage.getItem('plLoginError'));
```

## 🔧 Naprawy techniczne wykonane

### 1. Poprawiona synchronizacja w `login-pl.html`
- Dodano 500ms opóźnienie aby cms-sync.js mógł załadować dane z serwera
- Dodano console.log do debugowania wartości
- Naprawiono obsługę białych znaków w podtytule (pre-line)

### 2. Zaktualizowano `cms-data.json`
- Pełny podtytuł z instrukcją rejestracji
- Wszystkie 6 kluczy są obecne i zsynchronizowane

### 3. Utworzono plik testowy
- `test-login-pl.html` - do testowania tłumaczeń

## 📂 Pliki związane z tłumaczeniami logowania

- **admin.html** (linie 1278-1309) - interfejs edycji w CMS
- **admin-pl.js** (linie 79-84, 407-432) - inicjalizacja i zapisywanie
- **login-pl.html** - strona logowania z dynamicznymi tekstami
- **cms-data.json** - przechowywanie wartości
- **cms-sync.js** - synchronizacja z serwerem

## ❓ Rozwiązywanie problemów

### Problem: Teksty nie zmieniają się na stronie login-pl.html

**Rozwiązanie:**
1. Upewnij się, że kliknąłeś "Zapisz treści logowania (PL)" w admin.html
2. Upewnij się, że kliknąłeś "📤 Publikuj Treści Online"
3. Wyczyść cache przeglądarki (Ctrl+Shift+Delete)
4. Odśwież stronę login-pl.html (Ctrl+F5)

### Problem: W CMS nie widzę sekcji "Strona logowania (PL)"

**Rozwiązanie:**
1. Upewnij się, że jesteś zalogowany jako admin
2. Przewiń stronę admin.html **w dół** - sekcja jest po "Historie sukcesu (PL)"
3. Użyj Ctrl+F i wyszukaj "Strona logowania"

### Problem: Zmiany zapisują się tylko lokalnie

**Rozwiązanie:**
1. Pamiętaj aby kliknąć "📤 Publikuj Treści Online" po zapisaniu
2. Sprawdź konsolę przeglądarki czy nie ma błędów
3. Upewnij się, że masz połączenie z internetem

## ✅ Status

- ✅ Sekcja "Strona logowania (PL)" dostępna w CMS
- ✅ Wszystkie 6 pól tekstowych edytowalne
- ✅ Automatyczna synchronizacja z localStorage
- ✅ Plik testowy do weryfikacji zmian
- ✅ Publikacja online przez funkcję Netlify

---

**Ostatnia aktualizacja:** 2025-10-04
