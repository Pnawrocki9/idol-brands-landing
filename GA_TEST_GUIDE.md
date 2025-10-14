# Instrukcja testowania Google Analytics

## Test 1: Sprawdź czy GA wysyła dane (z cookies)

### Krok 1: Otwórz stronę w trybie incognito
```
1. Otwórz Chrome/Firefox w trybie incognito
2. Wejdź na swoją stronę (np. https://yourdomain.com)
3. Otwórz DevTools (F12)
4. Przejdź do zakładki "Console"
```

### Krok 2: Zaakceptuj cookies
```
1. Kliknij "Accept All" / "Zaakceptuj wszystkie"
2. W konsoli powinno się pojawić: "Analytics cookies enabled"
```

### Krok 3: Sprawdź Network
```
1. Przejdź do zakładki "Network" w DevTools
2. Filtruj po "collect" lub "analytics"
3. Powinieneś zobaczyć requesty do:
   - google-analytics.com/g/collect
   - www.google-analytics.com/j/collect
   
4. Kliknij na request i sprawdź:
   - Status: 200 OK
   - Request Headers powinny zawierać dane
```

### Krok 4: Sprawdź w Google Analytics Real-Time
```
1. Zaloguj się do Google Analytics 4
2. Idź do: Reports > Realtime
3. Powinieneś zobaczyć aktywnego użytkownika (to Ty!)
4. Kliknij na różne strony - powinny się pojawiać w czasie rzeczywistym
```

---

## Test 2: Sprawdź czy GA NIE wysyła danych (bez cookies)

### Krok 1: Otwórz stronę w trybie incognito
```
1. Nowa karta incognito
2. Wejdź na swoją stronę
3. DevTools (F12) -> Network
```

### Krok 2: Odrzuć wszystkie cookies
```
1. Kliknij "Reject All" / "Odrzuć wszystkie"
2. W konsoli: "Analytics cookies disabled"
```

### Krok 3: Sprawdź Network
```
1. Filtruj po "collect"
2. Powinieneś zobaczyć:
   - BRAK requestów do /g/collect z pełnymi danymi
   - LUB requesty z parametrem gcs=G100 (Consent Mode denied)
```

### Krok 4: Sprawdź w GA Real-Time
```
1. Powinieneś NIE widzieć tego użytkownika
2. LUB zobaczyć użytkownika jako "modelowany" (bez szczegółów)
```

---

## Test 3: Sprawdź Consent Mode w konsoli

Wklej to do konsoli przeglądarki po załadowaniu strony:

```javascript
// Sprawdź czy gtag istnieje
console.log('gtag function:', typeof gtag);

// Sprawdź dataLayer
console.log('dataLayer:', window.dataLayer);

// Sprawdź ostatnie 5 zdarzeń w dataLayer
console.log('Last events:', window.dataLayer.slice(-5));
```

**Co powinieneś zobaczyć:**
```javascript
// Przed zaakceptowaniem cookies:
['consent', 'default', {analytics_storage: 'denied', ...}]

// Po zaakceptowaniu:
['consent', 'update', {analytics_storage: 'granted', ...}]
```

---

## Test 4: Sprawdź cookies w przeglądarce

### W DevTools:
```
1. Application tab
2. Cookies > yourdomain.com
3. Powinieneś zobaczyć:
   - idol_brands_cookie_consent (Twoja zgoda)
   - _ga (jeśli zaakceptowałeś)
   - _ga_V3K8KE25ZW (jeśli zaakceptowałeś)
```

**Jeśli odrzuciłeś cookies:**
- Tylko: idol_brands_cookie_consent={...analytics: false}
- BRAK: _ga, _ga_*

---

## Test 5: Monitor długoterminowy (24h-48h)

### Po 24-48 godzinach sprawdź w GA4:

```
1. Reports > Acquisition > Traffic acquisition
2. Reports > Engagement > Pages and screens
3. Reports > User attributes > Overview
```

**Co powinieneś zobaczyć:**
- Wzrost ruchu (jeśli ludzie akceptują cookies)
- Dane modelowane dla użytkowników bez zgody
- Mieszanka obu typów danych

---

## Rozwiązywanie problemów

### Problem 1: Brak danych w GA Real-Time
**Możliwe przyczyny:**
- [ ] Sprawdź czy używasz poprawnego GA ID: G-V3K8KE25ZW
- [ ] Sprawdź czy zaakceptowałeś cookies
- [ ] Sprawdź Network tab - czy są requesty do GA?
- [ ] Sprawdź konsolę - czy są błędy JavaScript?
- [ ] Upewnij się że GA4 property jest aktywna

### Problem 2: Dane są wysyłane nawet po odrzuceniu
**To może być OK jeśli:**
- [ ] Widzisz parametr gcs=G100 w requestach (Consent Mode denied)
- [ ] W GA nie ma szczegółowych danych użytkownika
- [ ] To są "pings" modelowane

**To jest problem jeśli:**
- [ ] Widzisz _ga cookies mimo odrzucenia
- [ ] Requesty zawierają szczegółowe dane użytkownika
- [ ] Brak parametru gcs w requestach

### Problem 3: Banner cookies się nie pokazuje
**Sprawdź:**
- [ ] Czy jest załadowany cookie-consent.css?
- [ ] Czy jest załadowany cookie-consent.js?
- [ ] Czy w konsoli są błędy?
- [ ] Czy już nie wyraziłeś zgody wcześniej? (usuń cookie i odśwież)

---

## Oczekiwane zachowanie (PRAWIDŁOWE)

### Scenariusz 1: Nowy użytkownik
1. Wchodzi na stronę
2. Widzi banner cookie (po ~500ms)
3. GA jest załadowane ale NIE śledzi (consent=denied)
4. Po kliknięciu "Accept All":
   - Cookie consent zapisany
   - gtag('consent', 'update', {analytics_storage: 'granted'})
   - GA zaczyna śledzić
   - Pojawia się w Real-Time

### Scenariusz 2: Powracający użytkownik (zaakceptował wcześniej)
1. Wchodzi na stronę
2. Brak bannera (zgoda już zapisana)
3. GA od razu śledzi (consent już granted)
4. Natychmiast widoczny w Real-Time

### Scenariusz 3: Użytkownik odrzucający cookies
1. Wchodzi na stronę
2. Widzi banner, klika "Reject All"
3. GA jest załadowane ale NIE śledzi szczegółowo
4. Może być widoczny jako dane modelowane (bez szczegółów)
5. BRAK cookies _ga

---

## Metryki do monitorowania

W Google Analytics 4, po kilku dniach sprawdź:

### 1. Consent Rate
Niestety GA4 nie pokazuje tego bezpośrednio, ale możesz:
- Porównać liczbę użytkowników vs. dane modelowane
- Sprawdzić spadek ruchu (jeśli jest znaczny = dużo odmów)

### 2. Data Quality
```
Admin > Data Settings > Data Collection
```
Sprawdź czy Consent Mode jest aktywny

### 3. Comparison z poprzednim okresem
- Jeśli ruch mocno spadł = dużo ludzi odrzuca cookies
- Jeśli bez zmian = większość akceptuje

---

## Przydatne linki

- [Google Analytics Real-Time](https://analytics.google.com/analytics/web/#/realtime)
- [GA4 DebugView](https://analytics.google.com/analytics/web/#/debugview) (wymaga debug mode)
- [Tag Assistant](https://tagassistant.google.com/)

---

**Ostatnia aktualizacja:** 2025-10-14
**Measurement ID:** G-V3K8KE25ZW
**GTM ID:** GTM-P2747G38
