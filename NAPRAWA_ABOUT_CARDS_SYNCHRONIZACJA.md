# Naprawa synchronizacji modułu Karty About (1-3) (PL)

## Problem
Moduł "Karty About (1-3) (PL)" w CMS Admin pokazywał teksty angielskie (EN) zamiast polskich, mimo że sekcja była oznaczona jako polska. Było to spowodowane nieprawidłową konfiguracją fallbacków w systemie.

## Przyczyna
System był skonfigurowany tak, że gdy polskie pola były puste, automatycznie ładował wartości angielskie jako fallback:

1. **W admin-pl.js**: Pola polskie miały parametr fallback do angielskich kluczy localStorage
2. **W index-pl.html**: Strona frontowa używała zagnieżdżonych wywołań `getItem()` z fallbackiem do wersji angielskiej

## Rozwiązanie

### 1. Zaktualizowano admin-pl.js

**Zmiany w konfiguracji pól (linie 200-208):**
- Usunięto fallback do angielskich kluczy (zmieniono trzeci parametr z klucza EN na `null`)
- Dodano polskie domyślne wartości (czwarty parametr)
- Teraz pola pokazują tylko polskie teksty

**Przed:**
```javascript
['home-about-expertise-title-field-pl','plHomeAboutExpertiseTitle','homeAboutExpertiseTitle','Manufacturing Expertise'],
```

**Po:**
```javascript
['home-about-expertise-title-field-pl','plHomeAboutExpertiseTitle',null,'Doświadczenie w produkcji'],
```

**Dodano inicjalizację domyślnych wartości polskich (linie 51-59):**
```javascript
// Home Page About Section (PL)
initDefaultIfEmpty('plHomeAboutTitle', 'Stworzeni przez insiderów mody');
initDefaultIfEmpty('plHomeAboutSubtitle', 'Rozumiemy wyzwania związane z budowaniem marki modowej...');
initDefaultIfEmpty('plHomeAboutExpertiseTitle', 'Doświadczenie w produkcji');
initDefaultIfEmpty('plHomeAboutExpertiseDesc', 'Dziesięciolecia doświadczenia w produkcji mody...');
initDefaultIfEmpty('plHomeAboutLogisticsTitle', 'Mistrzostwo logistyki');
initDefaultIfEmpty('plHomeAboutLogisticsDesc', 'Kompleksowe rozwiązania logistyczne...');
initDefaultIfEmpty('plHomeAboutInnovationTitle', 'Innowacje technologiczne');
initDefaultIfEmpty('plHomeAboutInnovationDesc', 'Najnowocześniejsza platforma live-commerce...');
```

### 2. Zaktualizowano index-pl.html

**Usunięto zagnieżdżone fallbacki do wersji angielskiej (linie 1093-1108):**

**Przed:**
```javascript
if (aboutExpertiseTitle) aboutExpertiseTitle.textContent = getItem('plHomeAboutExpertiseTitle', getItem('homeAboutExpertiseTitle', aboutExpertiseTitle.textContent));
```

**Po:**
```javascript
if (aboutExpertiseTitle) aboutExpertiseTitle.textContent = getItem('plHomeAboutExpertiseTitle', aboutExpertiseTitle.textContent);
```

## Zaktualizowane pola

Naprawiono synchronizację dla następujących pól:

### Sekcja About - Tytuł i podtytuł:
- `plHomeAboutTitle` - Tytuł sekcji About (PL)
- `plHomeAboutSubtitle` - Podtytuł sekcji About (PL)

### Karta 1 - Doświadczenie:
- `plHomeAboutExpertiseTitle` - "Doświadczenie w produkcji"
- `plHomeAboutExpertiseDesc` - Opis ekspertyzy produkcyjnej

### Karta 2 - Logistyka:
- `plHomeAboutLogisticsTitle` - "Mistrzostwo logistyki"
- `plHomeAboutLogisticsDesc` - Opis rozwiązań logistycznych

### Karta 3 - Innowacje:
- `plHomeAboutInnovationTitle` - "Innowacje technologiczne"
- `plHomeAboutInnovationDesc` - Opis platformy live-commerce

## Efekt

Po wprowadzeniu zmian:

1. ✅ Moduł "Karty About (1-3) (PL)" w CMS Admin teraz wyświetla **tylko polskie teksty**
2. ✅ Polska wersja frontpage (index-pl.html) wyświetla **tylko polskie teksty** z sekcji About
3. ✅ Nowe instalacje automatycznie ładują polskie domyślne wartości
4. ✅ Brak niepożądanej synchronizacji z wersją angielską

## Pliki zmodyfikowane

- `admin-pl.js` - Konfiguracja pól CMS i inicjalizacja wartości
- `index-pl.html` - Wyświetlanie treści na stronie frontowej

## Testowanie

Aby zweryfikować naprawę:

1. Otwórz CMS Admin (admin.html)
2. Przewiń do sekcji "Home Page (PL)"
3. Znajdź "Karty About (1-3) (PL)"
4. Sprawdź, czy pola zawierają polskie teksty
5. Edytuj teksty i zapisz
6. Otwórz index-pl.html i sprawdź, czy zmiany są widoczne

## Uwagi techniczne

- Zmiana nie wpływa na angielską wersję (EN)
- Istniejące dane w localStorage nie są usuwane
- Funkcja `initDefaultIfEmpty()` ładuje wartości tylko dla nowych użytkowników
- Zachowana jest możliwość edycji wszystkich pól przez CMS

## Data naprawy
2025-10-05
