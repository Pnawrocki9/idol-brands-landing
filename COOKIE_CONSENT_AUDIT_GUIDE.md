# 📋 Przewodnik po Audycie Zgód Cookies / Cookie Consent Audit Guide

## 🎯 Cel / Purpose

**PL:** Ten dokument opisuje jak uzyskać dostęp do pełnej listy zgód na cookies dla celów audytu, zgodności z GDPR i raportowania.

**EN:** This document describes how to access the full list of cookie consents for audit, GDPR compliance and reporting purposes.

---

## 🚀 Szybki Start / Quick Start

### Dostęp do Dashboard'u / Dashboard Access

Po wdrożeniu na Netlify:
```
https://twoja-domena.netlify.app/cookie-consent-dashboard.html
```

Lokalne testowanie:
```bash
netlify dev
# Następnie otwórz: http://localhost:8888/cookie-consent-dashboard.html
```

---

## 📊 Funkcje Audytu / Audit Features

### 1. **Export do CSV (Rekomendowany dla Audytu)**

**Jak użyć:**
1. Otwórz dashboard zgód cookies
2. Kliknij przycisk **"📊 Export to CSV (Audit)"**
3. Plik zostanie automatycznie pobrany

**Zawiera:**
- Timestamp (znacznik czasu w milisekundach)
- Date (data i godzina w formacie ISO)
- Language (język: en/pl)
- Necessary (pliki niezbędne: true/false)
- Analytics (pliki analityczne: true/false)
- Marketing (pliki marketingowe: true/false)
- Type (typ zgody: Accepted All / Rejected All / Customized)
- URL (strona, na której wyrażono zgodę)
- Referrer (źródło ruchu)
- IP (adres IP użytkownika)
- User Agent (przeglądarka i system użytkownika)

**Przykładowy plik CSV:**
```csv
Timestamp,Date,Language,Necessary,Analytics,Marketing,Type,URL,Referrer,IP,User Agent
1759684995809,"2025-10-05T12:23:15.809Z",en,true,true,true,"Accepted All","https://idol-brands.com/","direct","193.93.205.108","Mozilla/5.0..."
```

**Zastosowanie:**
- ✅ Audyty wewnętrzne i zewnętrzne
- ✅ Raporty zgodności z GDPR
- ✅ Analiza w Excel/Google Sheets
- ✅ Import do systemów CRM

---

### 2. **Export do JSON (Pełne Dane)**

**Jak użyć:**
1. Otwórz dashboard zgód cookies
2. Kliknij przycisk **"📄 Export to JSON"**
3. Plik zostanie automatycznie pobrany

**Zawiera:**
- Wszystkie zgody w formacie JSON
- Statystyki zagregowane
- Data eksportu
- Łączna liczba zgód

**Struktura pliku:**
```json
{
  "stats": {
    "total": 150,
    "accepted": 100,
    "rejected": 30,
    "customized": 20,
    "analytics": 120,
    "marketing": 100,
    "byLanguage": { "en": 80, "pl": 70 },
    "byDate": { "2025-10-05": 150 }
  },
  "totalConsents": 150,
  "consents": [
    {
      "necessary": true,
      "analytics": true,
      "marketing": true,
      "language": "en",
      "timestamp": 1759684995809,
      "url": "https://idol-brands.com/",
      "referrer": "direct",
      "ip": "193.93.205.108",
      "userAgent": "Mozilla/5.0..."
    }
  ],
  "exportDate": "2025-10-05T12:30:00.000Z"
}
```

**Zastosowanie:**
- ✅ Integracja z innymi systemami
- ✅ Analiza programistyczna
- ✅ Backup danych
- ✅ Migracja danych

---

### 3. **Widok Wszystkich Zgód (w przeglądarce)**

**Jak użyć:**
1. Otwórz dashboard zgód cookies
2. Kliknij przycisk **"👁️ View All Consents"**
3. Tabela pokaże WSZYSTKIE zgody (nie tylko ostatnie 20)
4. Tytuł tabeli zmieni się na "All Consents (X total)"

**Funkcje dodatkowe:**
- ✅ Checkbox "Show detailed info (IP, URL)" - pokazuje szczegółowe informacje
- ✅ Możliwość przewijania przez całą historię
- ✅ Wszystkie dane widoczne bez pobierania pliku

**Jak wrócić do widoku ostatnich 20:**
- Kliknij ponownie "👁️ View All Consents" LUB
- Kliknij "🔄 Refresh Data"

---

## 📋 Dane Zbierane / Collected Data

### Podstawowe Informacje / Basic Information
- **Timestamp** - Dokładny czas wyrażenia zgody (Unix timestamp)
- **Language** - Język strony (en/pl)
- **Necessary** - Zgoda na pliki niezbędne (zawsze true)
- **Analytics** - Zgoda na Google Analytics (true/false)
- **Marketing** - Zgoda na remarketing (true/false)

### Dane Kontekstowe / Context Data
- **URL** - Strona, na której użytkownik wyraził zgodę
- **Referrer** - Źródło ruchu (skąd przyszedł użytkownik)
- **IP** - Adres IP (anonimizowany przez Netlify)
- **User Agent** - Przeglądarka i system operacyjny

---

## ⚖️ Zgodność z GDPR / GDPR Compliance

### Przechowywanie Danych / Data Storage

✅ **Bezpieczne:** Dane przechowywane w prywatnym repozytorium GitHub  
✅ **Szyfrowane:** Połączenie HTTPS  
✅ **Ograniczone:** Tylko niezbędne dane  
✅ **Dostępne:** Możliwość eksportu na żądanie  

### Prawa Użytkownika / User Rights

✅ **Prawo dostępu** - Możesz wyeksportować wszystkie zgody  
✅ **Prawo do usunięcia** - Możesz usunąć dane z pliku  
✅ **Prawo do przenoszenia** - Format CSV/JSON łatwy do importu  
✅ **Prawo do informacji** - Pełna transparentność zbieranych danych  

---

## 🔍 Częste Przypadki Użycia / Common Use Cases

### 1. Audyt Wewnętrzny
**Scenariusz:** Dział prawny chce sprawdzić zgodność z GDPR

**Kroki:**
1. Eksportuj dane do CSV
2. Otwórz w Excel
3. Sprawdź liczbę zgód w ostatnim miesiącu
4. Przeanalizuj współczynnik akceptacji

### 2. Raport dla Organu Ochrony Danych
**Scenariusz:** UOD żąda informacji o przetwarzanych zgodach

**Kroki:**
1. Eksportuj pełne dane do JSON
2. Przygotuj raport z:
   - Całkowitą liczbą zgód
   - Rozkładem typów zgód
   - Przykładowymi rekordami
3. Dołącz ten dokument jako instrukcję

### 3. Analiza Biznesowa
**Scenariusz:** Marketing chce wiedzieć, ile osób akceptuje cookies marketingowe

**Kroki:**
1. Otwórz dashboard
2. Kliknij "View All Consents"
3. Zobacz statystyki w kartach na górze
4. Lub eksportuj CSV i analizuj w Excel

### 4. Problem Techniczny
**Scenariusz:** Użytkownik zgłasza, że jego zgoda nie została zapisana

**Kroki:**
1. Eksportuj dane do CSV
2. Wyszukaj po IP lub dacie
3. Sprawdź, czy zgoda została zapisana
4. Zweryfikuj timestamp

---

## 📈 Przykłady Analiz / Analysis Examples

### Analiza w Excel - Współczynnik Akceptacji

```excel
=COUNTIF(F:F,"Accepted All")/COUNTA(F:F)
```
Gdzie F:F to kolumna "Type"

### Analiza w Excel - Zgody Dzisiaj

```excel
=COUNTIFS(B:B,">=2025-10-05",B:B,"<2025-10-06")
```
Gdzie B:B to kolumna "Date"

### SQL Query (jeśli zaimportujesz do bazy danych)

```sql
SELECT 
  DATE(timestamp) as consent_date,
  COUNT(*) as total_consents,
  SUM(CASE WHEN analytics = 1 THEN 1 ELSE 0 END) as analytics_accepted,
  SUM(CASE WHEN marketing = 1 THEN 1 ELSE 0 END) as marketing_accepted
FROM cookie_consents
WHERE timestamp >= '2025-10-01'
GROUP BY DATE(timestamp)
ORDER BY consent_date DESC;
```

---

## 🛡️ Bezpieczeństwo / Security

### Kto ma dostęp? / Who has access?

Dashboard jest **publiczny**, ale zawiera tylko:
- Zagregowane statystyki
- Anonimowe informacje o zgodach
- Dane niezbędne do zgodności z GDPR

### Jak zabezpieczyć dashboard?

Jeśli chcesz ograniczyć dostęp do dashboard'u:

**Opcja 1: Netlify Basic Auth**
```toml
# netlify.toml
[[redirects]]
  from = "/cookie-consent-dashboard.html"
  to = "/cookie-consent-dashboard.html"
  status = 200
  force = true
  headers = {X-From = "Netlify"}
  conditions = {Role = ["admin"]}
```

**Opcja 2: Password Protection (Netlify)**
1. Netlify Dashboard → Site Settings
2. Access Control → Visitor Access
3. Set password

**Opcja 3: IP Whitelist**
Dodaj w `netlify.toml`:
```toml
[[headers]]
  for = "/cookie-consent-dashboard.html"
  [headers.values]
    X-Allowed-IPs = "192.168.1.1, 10.0.0.1"
```

---

## 📞 API Endpoints / Endpointy API

### GET - Statystyki i Ostatnie Zgody
```bash
GET /.netlify/functions/cookie-consents
```

**Response:**
```json
{
  "stats": { ... },
  "recentConsents": [ ... ]  // Last 20
}
```

### GET - Wszystkie Zgody (JSON)
```bash
GET /.netlify/functions/cookie-consents?export=all&format=json
```

**Response:**
```json
{
  "stats": { ... },
  "totalConsents": 150,
  "consents": [ ... ],  // ALL consents
  "exportDate": "2025-10-05T12:30:00.000Z"
}
```

### GET - Wszystkie Zgody (CSV)
```bash
GET /.netlify/functions/cookie-consents?export=all&format=csv
```

**Response:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="cookie-consents-[timestamp].csv"

Timestamp,Date,Language,...
1759684995809,"2025-10-05T12:23:15.809Z",en,...
```

### POST - Zapisz Nową Zgodę
```bash
POST /.netlify/functions/cookie-consents
Content-Type: application/json

{
  "necessary": true,
  "analytics": true,
  "marketing": false,
  "language": "pl",
  "url": "https://idol-brands.com/",
  "referrer": "https://google.com"
}
```

---

## 🔧 Rozwiązywanie Problemów / Troubleshooting

### Problem: Nie mogę pobrać pliku CSV
**Rozwiązanie:**
1. Sprawdź konsolę przeglądarki (F12)
2. Upewnij się, że funkcja Netlify jest wdrożona
3. Sprawdź zmienne środowiskowe (GITHUB_TOKEN)

### Problem: Export pokazuje błąd 500
**Rozwiązanie:**
1. Sprawdź logi Netlify Functions
2. Upewnij się, że `cookie-consents.json` istnieje
3. Zweryfikuj uprawnienia GITHUB_TOKEN

### Problem: CSV ma złe kodowanie znaków
**Rozwiązanie:**
1. Otwórz plik w Notepad++
2. Encoding → Convert to UTF-8
3. Zapisz i otwórz ponownie w Excel

### Problem: Dashboard nie pokazuje wszystkich zgód
**Rozwiązanie:**
1. Kliknij "View All Consents"
2. Sprawdź tytuł tabeli - powinien pokazywać "All Consents (X total)"
3. Jeśli nadal nie działa, eksportuj do CSV i sprawdź tam

---

## 📚 Najlepsze Praktyki / Best Practices

### 1. Regularne Backupy
Eksportuj dane co miesiąc jako backup:
```bash
# Zautomatyzuj przez cron lub GitHub Actions
curl "https://twoja-domena.com/.netlify/functions/cookie-consents?export=all&format=json" > backup-$(date +%Y%m%d).json
```

### 2. Retencja Danych
Zgodnie z GDPR, przechowuj zgody maksymalnie:
- ✅ 2 lata dla celów prawnych
- ✅ 1 rok dla celów analitycznych
- ❌ Nie dłużej niż potrzebne

### 3. Dokumentacja Zmian
Prowadź log audytu zmian:
```markdown
## Audit Log
- 2025-10-05: Dodano eksport do CSV dla audytu
- 2025-10-05: Dodano widok wszystkich zgód
```

### 4. Przeglądy Okresowe
Zalecane przeglądy:
- 📅 Co miesiąc: Sprawdź statystyki
- 📅 Co kwartał: Przeanalizuj trendy
- 📅 Co rok: Pełny audyt zgodności

---

## ✅ Checklist Audytu / Audit Checklist

### Przygotowanie do Audytu
- [ ] Eksportuj pełne dane do CSV
- [ ] Eksportuj backup do JSON
- [ ] Sprawdź kompletność danych
- [ ] Zweryfikuj poprawność timestampów
- [ ] Przygotuj raport statystyk

### Weryfikacja Zgodności
- [ ] Wszystkie zgody mają timestamp
- [ ] Wszystkie zgody mają typ (Accepted/Rejected/Customized)
- [ ] IP są zapisane (dla śledzenia)
- [ ] User Agent są zapisane
- [ ] URL i Referrer są zapisane

### Dokumentacja
- [ ] Ten dokument jest aktualny
- [ ] Polityka cookies jest aktualna
- [ ] RODO/GDPR compliance jest udokumentowane
- [ ] Procedury usuwania danych są opisane

---

## 📖 Podsumowanie / Summary

System zgód cookies został rozszerzony o pełne funkcje audytu:

✅ **Export do CSV** - Łatwy dostęp do wszystkich zgód w formacie Excel  
✅ **Export do JSON** - Pełne dane w formacie programistycznym  
✅ **Widok wszystkich zgód** - Przeglądanie w przeglądarce bez pobierania  
✅ **Szczegółowe informacje** - IP, URL, Referrer, User Agent  
✅ **API endpoints** - Programistyczny dostęp do danych  
✅ **GDPR compliant** - Zgodność z przepisami o ochronie danych  

**Dla szybkiego audytu:**
1. Otwórz `cookie-consent-dashboard.html`
2. Kliknij "📊 Export to CSV (Audit)"
3. Otwórz plik w Excel
4. Gotowe! 🎉

---

**Data utworzenia:** 2025-10-05  
**Wersja:** 1.0.0  
**Status:** ✅ Gotowe do użycia / Ready for use

**Kontakt / Contact:**  
Dla pytań technicznych, sprawdź:
- `COOKIE_CONSENT_DOKUMENTACJA.md` - Dokumentacja systemu zgód
- `COOKIE_BACKEND_IMPLEMENTACJA.md` - Implementacja backendu
