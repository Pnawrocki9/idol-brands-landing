# Naprawa Synchronizacji Dokumentów

## Problem
Dokumenty dodawane w CMS były widoczne tylko w localStorage, ale nie były publikowane online po kliknięciu przycisku "Opublikuj Online". 

**Przyczyna:** Pliki zakodowane w Base64 były zbyt duże dla GitHub API (limit ~1MB), co powodowało, że plik `cms-data.json` osiągał ogromny rozmiar i synchronizacja zawodzila.

## Rozwiązanie

### 1. Osobny System Synchronizacji dla Dokumentów
Stworzyliśmy dedykowany system do zarządzania dokumentami:

- **Nowa funkcja Netlify:** `netlify/functions/documents.js` - zarządza dokumentami osobno od treści CMS
- **Nowy skrypt synchronizacji:** `documents-sync.js` - synchronizuje dokumenty niezależnie
- **Osobny plik danych:** `documents-data.json` - przechowuje tylko dokumenty

### 2. Zaktualizowane Pliki

#### Zmodyfikowane:
- `cms-sync.js` - wykluczono klucz 'documents' z głównej synchronizacji CMS
- `admin.html` - dodano skrypty `documents-sync.js` i informacyjny komunikat
- `your-documents.html` - dodano skrypt `documents-sync.js`
- `your-documents-pl.html` - dodano skrypt `documents-sync.js`

#### Nowe:
- `netlify/functions/documents.js` - Netlify Function do zarządzania dokumentami
- `documents-sync.js` - skrypt synchronizacji dokumentów
- `documents-data.json` - pusty plik początkowy dla dokumentów

## Jak Używać

### Dla Administratora:

1. **Dodaj dokumenty** w panelu admin (sekcja "Manage Shared Documents")
2. **Kliknij "📤 Opublikuj dokumenty online"** - nowy niebieski przycisk pod listą dokumentów
3. Poczekaj na potwierdzenie "✅ Dokumenty opublikowane!"

### Dwa Osobne Przyciski:

1. **"📤 Publikuj Treści Online"** (zielony, prawy dolny róg)
   - Publikuje teksty, nagłówki, ustawienia
   - NIE publikuje dokumentów

2. **"📤 Opublikuj dokumenty online"** (niebieski, pod listą dokumentów)
   - Publikuje TYLKO dokumenty
   - Widoczny w sekcji "Manage Shared Documents"

## Techniczne Detale

### Ograniczenie Rozmiaru
- GitHub API ma limit ~1MB dla pojedynczego pliku
- Dokumenty zakodowane w Base64 są ~33% większe niż oryginalne
- Przykład: PDF 800KB → ~1.1MB w Base64 → przekracza limit

### Architektura
```
localStorage['documents'] 
    ↓
documents-sync.js
    ↓
/.netlify/functions/documents
    ↓
documents-data.json (w GitHub repo)
    ↓
Załadowane do wszystkich użytkowników
```

## Testowanie

1. Dodaj dokument w panelu admin
2. Sprawdź localStorage: `localStorage.getItem('documents')`
3. Kliknij "Opublikuj dokumenty online"
4. Otwórz konsolę - powinno być: "Documents saved to server successfully"
5. Odśwież stronę - dokumenty powinny się załadować z serwera
6. Sprawdź na innym urządzeniu - dokumenty powinny być widoczne

## Weryfikacja w Konsoli

```javascript
// Sprawdź lokalne dokumenty
JSON.parse(localStorage.getItem('documents'))

// Ręcznie załaduj z serwera
await window.documentsSync.load()

// Ręcznie opublikuj
await window.documentsSync.save()
```

## Uwagi

- Dokumenty nadal są przechowywane jako Base64 w localStorage i JSON
- Dla bardzo dużych plików (>5MB) może być konieczne użycie zewnętrznego storage (S3, Cloudinary)
- Obecne rozwiązanie działa dla typowych dokumentów PDF, obrazów do ~2-3MB
