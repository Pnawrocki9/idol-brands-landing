// Polish translation management for admin dashboard

document.addEventListener('DOMContentLoaded', function() {
  // Auto-initialize PL localStorage with default Polish values if not already set
  function initDefaultIfEmpty(key, defaultValue) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, defaultValue);
    }
  }

  // Initialize all default PL values
  initDefaultIfEmpty('plHeroTitle', '<span class="text-gradient">Zamień swój</span><br><span class="text-black">wpływ</span><br><span class="text-gradient">w modowe imperium</span>');
  initDefaultIfEmpty('plHeroSubtitle', 'Zajmujemy się wszystkim od projektu po dostawę, abyś Ty mógł skupić się na swojej historii. Jedyna platforma, która zamienia influencerów w właścicieli marek modowych.');
  initDefaultIfEmpty('plAboutHeroTitle', 'O Idol Brands');
  initDefaultIfEmpty('plAboutHeroSubtitle', 'Stworzone przez weteranów branży modowej. Zaprojektowane dla nowej generacji marek opartych na wpływach.');
  initDefaultIfEmpty('plAboutStory', 'Idol Brands zostało założone w 2024 roku przez zespół weteranów branży modowej, którzy obserwowali niezliczonych influencerów zmagających się z uruchomieniem własnych marek modowych. Widzieliśmy, jak ta sama historia się powtarza: pasjonaci z niesamowitymi pomysłami, którzy ponieśli porażkę, ponieważ nie potrafili poradzić sobie ze złożonością operacyjną.\n\nPo dekadach w produkcji mody, logistyce i handlu detalicznym zdaliśmy sobie sprawę, że tradycyjny model branży modowej nie sprawdza się dla nowej generacji marek opartych na wpływach. Influencerzy potrzebowali innego podejścia - takiego, które pozwala im skupić się na kreatywności i społeczności, podczas gdy eksperci zajmują się operacjami.\n\nPołączyliśmy naszą głęboką wiedzę branżową w modzie z najnowocześniejszą technologią live-commerce, aby stworzyć pierwszą platformę specjalnie zaprojektowaną dla influencerskich marek modowych. Dziś Idol Brands to więcej niż tylko usługa - jesteśmy ruchem demokratyzującym przedsiębiorczość modową.');
  initDefaultIfEmpty('plMissionTitle', 'Nasza Misja');
  initDefaultIfEmpty('plMissionDesc1', 'Demokratyzacja przedsiębiorczości modowej poprzez zapewnienie influencerom narzędzi, wiedzy i platformy, których potrzebują do budowania odnoszących sukcesy marek modowych.');
  initDefaultIfEmpty('plMissionDesc2', 'Wierzymy, że każdy influencer z zaangażowaną społecznością zasługuje na możliwość przekształcenia swoich wpływów w kwitnący biznes, bez ograniczeń wynikających z złożoności operacyjnej.');
  initDefaultIfEmpty('plVisionTitle', 'Nasza Wizja');
  initDefaultIfEmpty('plVisionDesc1', 'Zostać wiodącym na świecie rynkiem live-selling dla influencerskich marek modowych, gdzie kreatywność spotyka się z handlem w czasie rzeczywistym.');
  initDefaultIfEmpty('plVisionDesc2', 'Budujemy przyszłość, w której marki modowe rodzą się z autentycznych społeczności, a nie sal konferencyjnych - gdzie wpływy napędzają innowacje, a pasja tworzy zysk.');
  initDefaultIfEmpty('plTeamTitle', 'Weterani Branży Modowej');
  initDefaultIfEmpty('plTeamSubtitle', 'Nasz zespół łączy dekady doświadczenia w produkcji mody, logistyce, handlu detalicznym i technologii, aby wspierać sukces Twojej marki.');
  initDefaultIfEmpty('plImpactTitle', 'Nasz Wpływ');
  initDefaultIfEmpty('plImpactSubtitle', 'Rzeczywiste wyniki od prawdziwych influencerów, którzy przekształcili swoją pasję w dochodowe marki modowe.');
  // Impact Statistics (PL) - Both Values and Labels are separate from EN version
  // Note: Both values and labels are now managed in admin.html (EN & PL section)
  initDefaultIfEmpty('plImpactStat1Value', '500+');
  initDefaultIfEmpty('plImpactStat1Label', 'Uruchomionych Marek Modowych');
  initDefaultIfEmpty('plImpactStat2Value', '$50M');
  initDefaultIfEmpty('plImpactStat2Label', 'Sprzedaż Marek');
  initDefaultIfEmpty('plImpactStat3Value', '2.4M');
  initDefaultIfEmpty('plImpactStat3Label', 'Sprzedanych Produktów');
  initDefaultIfEmpty('plImpactStat4Value', '98%');
  initDefaultIfEmpty('plImpactStat4Label', 'Wskaźnik Sukcesu');
  initDefaultIfEmpty('plValuesTitle', 'Nasze Wartości');
  initDefaultIfEmpty('plValuesSubtitle', 'Zasady, które kierują wszystkim, co robimy i napędzają każdą podjętą przez nas decyzję.');
  initDefaultIfEmpty('plValue1Title', 'Autentyczność');
  initDefaultIfEmpty('plValue1Desc', 'Wierzymy w prawdziwe wpływy, prawdziwe społeczności i prawdziwe wyniki. Żadnych fałszywych metryk, żadnego sztucznego zaangażowania.');
  initDefaultIfEmpty('plValue2Title', 'Partnerstwo');
  initDefaultIfEmpty('plValue2Desc', 'Twój sukces to nasz sukces. Pracujemy jako prawdziwi partnerzy, zaangażowani w rozwój Twojej marki i długoterminowy sukces.');
  initDefaultIfEmpty('plValue3Title', 'Innowacyjność');
  initDefaultIfEmpty('plValue3Desc', 'Nieustannie poszerzamy granice tego, co możliwe w live-commerce i budowaniu influencerskich marek modowych.');
  initDefaultIfEmpty('plValue4Title', 'Wyniki');
  initDefaultIfEmpty('plValue4Desc', 'Wszystko, co robimy, jest mierzone wynikami. Zobowiązujemy się do dostarczania mierzalnego sukcesu dla każdej marki, z którą współpracujemy.');
  initDefaultIfEmpty('plAboutCtaTitle', 'Gotowy, Aby Rozpocząć Swoją Modową Historię?');
  initDefaultIfEmpty('plAboutCtaDesc', 'Dołącz do setek influencerów, którzy przekształcili swoje wpływy w kwitnące marki modowe. Twoja podróż w stronę przedsiębiorczości modowej zaczyna się teraz.');
  initDefaultIfEmpty('plAboutCtaButton', 'Załóż Swoją Markę Modową Dzisiaj');
  initDefaultIfEmpty('plAboutCtaSubtext', 'Bezpłatna konsultacja • Bez zobowiązań • Wyniki w 8 tygodni');
  // Home Page About Section (PL)
  initDefaultIfEmpty('plHomeAboutTitle', 'Stworzeni przez insiderów mody');
  initDefaultIfEmpty('plHomeAboutSubtitle', 'Rozumiemy wyzwania związane z budowaniem marki modowej, ponieważ tam byliśmy. Naszą misją jest demokratyzacja przedsiębiorczości modowej dla każdego influencera.');
  initDefaultIfEmpty('plHomeAboutExpertiseTitle', 'Doświadczenie w produkcji');
  initDefaultIfEmpty('plHomeAboutExpertiseDesc', 'Dziesięciolecia doświadczenia w produkcji mody, kontroli jakości i zarządzaniu łańcuchem dostaw na rynkach globalnych.');
  initDefaultIfEmpty('plHomeAboutLogisticsTitle', 'Mistrzostwo logistyki');
  initDefaultIfEmpty('plHomeAboutLogisticsDesc', 'Kompleksowe rozwiązania logistyczne od magazynowania po dostawę ostatniej mili, zoptymalizowane dla influencerskich marek modowych.');
  initDefaultIfEmpty('plHomeAboutInnovationTitle', 'Innowacje technologiczne');
  initDefaultIfEmpty('plHomeAboutInnovationDesc', 'Najnowocześniejsza platforma live-commerce z analizą w czasie rzeczywistym, rekomendacjami AI i bezproblemową integracją.');
  initDefaultIfEmpty('plHowTitle', 'Poznaj Live-Selling');
  initDefaultIfEmpty('plHowSubtitle', 'Zobacz, jak nasza platforma live-selling przekształca Twoje pokazy mody w wydarzenia sprzedażowe.');
  initDefaultIfEmpty('plReadyTitle', 'Gotowy Na Start Z Live-Selling?');
  initDefaultIfEmpty('plHowCtaDesc', 'Dołącz do setek influencerów, którzy przekształcili swoje wpływy w kwitnące marki modowe poprzez live-selling. Twoja podróż na marketplace zaczyna się tutaj.');
  initDefaultIfEmpty('plHowCtaFeature1Title', 'Szybka Konfiguracja');
  initDefaultIfEmpty('plHowCtaFeature1Desc', 'Twój sklep na żywo w 1 tydzień');
  initDefaultIfEmpty('plHowCtaFeature2Title', 'Gotowy Na Live-Selling');
  initDefaultIfEmpty('plHowCtaFeature2Desc', 'Profesjonalna konfiguracja streamingu');
  initDefaultIfEmpty('plHowCtaFeature3Title', 'Wbudowana Publiczność');
  initDefaultIfEmpty('plHowCtaFeature3Desc', 'Dostęp do ruchu marketplace');
  initDefaultIfEmpty('plHowCtaButton', 'Stwórz Swój Sklep Live-Selling');
  initDefaultIfEmpty('plHowCtaSubtext', 'Bezpłatna konsultacja • Brak opłat za konfigurację • Zacznij zarabiać w 6 miesięcy');
  initDefaultIfEmpty('plSuccessTitle', 'Historie Sukcesu');
  initDefaultIfEmpty('plSuccessSubtitle', 'Prawdziwi influencerzy, prawdziwe wyniki. Zobacz, jak przekształciliśmy ich wpływy w kwitnące marki modowe dzięki naszemu sprawdzonemu systemowi.');
  // Note: Success Stories statistics now use plImpactStat* values (shared with About page)
  initDefaultIfEmpty('plSuccessCtaTitle', 'Twoja Historia Sukcesu Zaczyna Się Tutaj');
  initDefaultIfEmpty('plSuccessCtaDesc', 'Dołącz do tych odnoszących sukcesy influencerów, którzy przekształcili swoją pasję w dochodowe marki modowe. Twoja podróż w stronę przedsiębiorczości modowej zaczyna się teraz.');
  initDefaultIfEmpty('plSuccessCtaFeature1Title', 'Bezpłatna Konsultacja');
  initDefaultIfEmpty('plSuccessCtaFeature1Desc', '60-minutowa sesja strategiczna');
  initDefaultIfEmpty('plSuccessCtaFeature2Title', 'Spersonalizowana Strategia');
  initDefaultIfEmpty('plSuccessCtaFeature2Desc', 'Dostosowana do Twojej publiczności');
  initDefaultIfEmpty('plSuccessCtaFeature3Title', 'Start w 8 Tygodni');
  initDefaultIfEmpty('plSuccessCtaFeature3Desc', 'Od pomysłu do działającej marki');
  initDefaultIfEmpty('plSuccessCtaButton', 'Załóż Swoją Markę Modową');
  initDefaultIfEmpty('plSuccessCtaSubtext', 'Dołącz do 500+ odnoszących sukcesy influencerów • Bez zobowiązań • Wyniki w 8 tygodni');
  initDefaultIfEmpty('plBlogTitle', 'Blog');
  initDefaultIfEmpty('plBlogSubtitle', 'Czytaj nasze najnowsze artykuły i inspiracje dotyczące mody.');
  initDefaultIfEmpty('plBlogNoPostsMessage', 'Brak wpisów na blogu.');
  initDefaultIfEmpty('plLoginTitle', 'Logowanie influencera');
  initDefaultIfEmpty('plLoginSubtitle', 'Wprowadź dane logowania z e-maila akceptacyjnego.\nAby się zarejestrować, zapisz się na listę oczekujących, a wkrótce wyślemy Ci e-mail z danymi do logowania.');
  initDefaultIfEmpty('plLoginUsernameLabel', 'Nazwa użytkownika');
  initDefaultIfEmpty('plLoginPasswordLabel', 'Hasło');
  initDefaultIfEmpty('plLoginButtonText', 'Zaloguj się');
  initDefaultIfEmpty('plLoginError', 'Nieprawidłowa nazwa użytkownika lub hasło.');
  initDefaultIfEmpty('plDocumentsTitle', 'Twoje dokumenty');
  initDefaultIfEmpty('plDocumentsMessage', 'Brak dokumentów do wyświetlenia.');
  // Timeline section
  initDefaultIfEmpty('plTimelineTitle', 'Etapy Sukcesu');
  initDefaultIfEmpty('plTimeline1Period', 'Tydzień 1–2');
  initDefaultIfEmpty('plTimeline1Desc', 'Strategia marki i projekt');
  initDefaultIfEmpty('plTimeline2Period', 'Tydzień 3–6');
  initDefaultIfEmpty('plTimeline2Desc', 'Rozwój produktu');
  initDefaultIfEmpty('plTimeline3Period', 'Tydzień 7–8');
  initDefaultIfEmpty('plTimeline3Desc', 'Konfiguracja sklepu i start');
  initDefaultIfEmpty('plTimeline4Period', 'Miesiąc 3+');
  initDefaultIfEmpty('plTimeline4Desc', 'Skalowanie i rozwój');
  // Waiting List Form
  initDefaultIfEmpty('plWaitlistTitle', 'Dołącz do listy oczekujących');
  initDefaultIfEmpty('plWaitlistSubtitle', 'Bądź pierwszą osobą, która dowie się, kiedy wystartujemy. Otrzymaj ekskluzywny wczesny dostęp i specjalne ceny na start.');
  initDefaultIfEmpty('plWaitlistFirstNameLabel', 'Imię');
  initDefaultIfEmpty('plWaitlistLastNameLabel', 'Nazwisko');
  initDefaultIfEmpty('plWaitlistEmailLabel', 'Adres e-mail');
  initDefaultIfEmpty('plWaitlistFollowersLabel', 'Liczba obserwujących');
  initDefaultIfEmpty('plWaitlistNicheLabel', 'Nisza modowa');
  initDefaultIfEmpty('plWaitlistInstagramLabel', 'Nazwa profilu na Instagramie (opcjonalnie)');
  initDefaultIfEmpty('plWaitlistSubmitButton', 'Dołącz do listy oczekujących');
  initDefaultIfEmpty('plWaitlistSuccessTitle', 'Dziękujemy za dołączenie!');
  initDefaultIfEmpty('plWaitlistSuccessMessage', 'Jesteś na liście oczekujących. Powiadomimy Cię, gdy miejsca będą dostępne.');
  // Calculator
  initDefaultIfEmpty('plCalculatorTitle', 'Kalkulator ROI');
  initDefaultIfEmpty('plCalculatorSubtitle', 'Zobacz dokładnie, jakie przychody może generować Twoja marka modowa. Wszystkie obliczenia są przejrzyste i oparte na rzeczywistych danych rynkowych.');

  // Helper to load a value with fallback to English default (from other keys)
  function loadField(fieldId, plKey, enKey, defaultVal) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    // Try to read Polish translation from localStorage
    const plVal = localStorage.getItem(plKey);
    if (plVal !== null && plVal !== undefined && plVal !== '') {
      field.value = plVal;
      return;
    }
    // Otherwise fallback to English value if provided
    let fallback = null;
    if (enKey) {
      const enVal = localStorage.getItem(enKey);
      if (enVal !== null && enVal !== '') {
        fallback = enVal;
      }
    }
    // Or use defaultVal argument
    if (!fallback && defaultVal !== undefined) {
      fallback = defaultVal;
    }
    // Or use data-default attribute on the element
    if (!fallback && field.dataset && field.dataset.default) {
      fallback = field.dataset.default;
    }
    if (fallback !== null && fallback !== undefined) {
      field.value = fallback;
    }
  }
  function saveFields(list) {
    list.forEach(function(item) {
      const field = document.getElementById(item[0]);
      if (field) {
        localStorage.setItem(item[1], field.value || '');
      }
    });
  }
  // ===== Hero (PL) =====
  loadField('admin-hero-title-pl', 'plHeroTitle', 'heroTitle');
  loadField('admin-hero-subtitle-pl', 'plHeroSubtitle', 'heroSubtitle');
  const saveHeroPl = document.getElementById('save-hero-pl');
  if (saveHeroPl) {
    saveHeroPl.addEventListener('click', function() {
      saveFields([
        ['admin-hero-title-pl','plHeroTitle'],
        ['admin-hero-subtitle-pl','plHeroSubtitle']
      ]);
      const msg = document.getElementById('hero-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  // ===== Home Page Content (PL) =====
  // Load home metrics
  const homeMap = [
    ['home-metric-market-value-pl','plMetricMarketSizeValue','metricMarketSizeValue','27B'],
    ['home-metric-market-label-pl','plMetricMarketSizeLabel','metricMarketSizeLabel','Market Size'],
    ['home-metric-growth-value-pl','plMetricGrowthRateValue','metricGrowthRateValue','39.9%'],
    ['home-metric-growth-label-pl','plMetricGrowthRateLabel','metricGrowthRateLabel','Growth Rate'],
    ['home-metric-fail-value-pl','plMetricFailRateValue','metricFailRateValue','90%'],
    ['home-metric-fail-label-pl','plMetricFailRateLabel','metricFailRateLabel','Brands Fail'],
    ['home-metric-tagline-pl','plMetricTagline','metricTagline','Unlock a $27B market growing 39.9% annually—be among the 10% who succeed.'],
    ['home-start-title-field-pl','plHomeStartTitle','homeStartTitle','Ready to Start Your Fashion Empire?'],
    ['home-start-subtitle-field-pl','plHomeStartSubtitle','homeStartSubtitle','Join hundreds of successful influencers who\'ve transformed their influence into thriving fashion brands. Your journey starts here.'],
    ['home-feature1-title-field-pl','plHomeFeature1Title','homeFeature1Title','Fast Launch'],
    ['home-feature1-desc-field-pl','plHomeFeature1Desc','homeFeature1Desc','Get your brand live in just 8 weeks'],
    ['home-feature2-title-field-pl','plHomeFeature2Title','homeFeature2Title','Done For You'],
    ['home-feature2-desc-field-pl','plHomeFeature2Desc','homeFeature2Desc','We handle everything, you focus on content'],
    ['home-feature3-title-field-pl','plHomeFeature3Title','homeFeature3Title','Proven Results'],
    ['home-feature3-desc-field-pl','plHomeFeature3Desc','homeFeature3Desc','Join the 10% who succeed'],
    ['home-cta-field-pl','plHomeCtaText','homeCtaText','See How It Works'],
    ['home-cta-subtext1-field-pl','plHomeCtaSubtext1','homeCtaSubtext1','Free consultation • No commitment • Results in 8 weeks'],
    ['home-cta-subtext2-field-pl','plHomeCtaSubtext2','homeCtaSubtext2','Limited spots available • Join 500+ influencers on the waiting list'],
    // Complete Solution Section (PL)
    ['solution-title-field-pl','plSolutionTitle','solutionTitle','Our Complete Solution'],
    ['solution-subtitle-field-pl','plSolutionSubtitle','solutionSubtitle','Everything you need to launch and scale your fashion brand, all in one platform.'],
    ['solution-step1-title-field-pl','plSolutionStep1Title','solutionStep1Title','Brand Strategy'],
    ['solution-step1-desc-field-pl','plSolutionStep1Desc','solutionStep1Desc','We develop your unique brand identity, positioning, and go-to-market strategy.'],
    ['solution-step2-title-field-pl','plSolutionStep2Title','solutionStep2Title','Product Development'],
    ['solution-step2-desc-field-pl','plSolutionStep2Desc','solutionStep2Desc','From concept to final product, we handle design, sampling, and production.'],
    ['solution-step3-title-field-pl','plSolutionStep3Title','solutionStep3Title','E-commerce Platform'],
    ['solution-step3-desc-field-pl','plSolutionStep3Desc','solutionStep3Desc','Custom online store with integrated payment processing and inventory management.'],
    ['solution-step4-title-field-pl','plSolutionStep4Title','solutionStep4Title','Marketing & Growth'],
    ['solution-step4-desc-field-pl','plSolutionStep4Desc','solutionStep4Desc','Data-driven marketing campaigns and growth strategies to scale your brand.'],
    // Home Page About Section (PL)
    ['home-about-title-field-pl','plHomeAboutTitle',null,'Stworzeni przez insiderów mody'],
    ['home-about-subtitle-field-pl','plHomeAboutSubtitle',null,'Rozumiemy wyzwania związane z budowaniem marki modowej, ponieważ tam byliśmy. Naszą misją jest demokratyzacja przedsiębiorczości modowej dla każdego influencera.'],
    ['home-about-expertise-title-field-pl','plHomeAboutExpertiseTitle',null,'Doświadczenie w produkcji'],
    ['home-about-expertise-desc-field-pl','plHomeAboutExpertiseDesc',null,'Dziesięciolecia doświadczenia w produkcji mody, kontroli jakości i zarządzaniu łańcuchem dostaw na rynkach globalnych.'],
    ['home-about-logistics-title-field-pl','plHomeAboutLogisticsTitle',null,'Mistrzostwo logistyki'],
    ['home-about-logistics-desc-field-pl','plHomeAboutLogisticsDesc',null,'Kompleksowe rozwiązania logistyczne od magazynowania po dostawę ostatniej mili, zoptymalizowane dla influencerskich marek modowych.'],
    ['home-about-innovation-title-field-pl','plHomeAboutInnovationTitle',null,'Innowacje technologiczne'],
    ['home-about-innovation-desc-field-pl','plHomeAboutInnovationDesc',null,'Najnowocześniejsza platforma live-commerce z analizą w czasie rzeczywistym, rekomendacjami AI i bezproblemową integracją.'],
    // Success Timeline (PL)
    ['timeline-title-field-pl','plTimelineTitle','timelineTitle','Success Timeline'],
    ['timeline1-period-field-pl','plTimeline1Period','timeline1Period','Week 1-2'],
    ['timeline1-desc-field-pl','plTimeline1Desc','timeline1Desc','Brand Strategy & Design'],
    ['timeline2-period-field-pl','plTimeline2Period','timeline2Period','Week 3-6'],
    ['timeline2-desc-field-pl','plTimeline2Desc','timeline2Desc','Product Development'],
    ['timeline3-period-field-pl','plTimeline3Period','timeline3Period','Week 7-8'],
    ['timeline3-desc-field-pl','plTimeline3Desc','timeline3Desc','Store Setup & Launch'],
    ['timeline4-period-field-pl','plTimeline4Period','timeline4Period','Month 3+'],
    ['timeline4-desc-field-pl','plTimeline4Desc','timeline4Desc','Scale & Growth']
  ];
  homeMap.forEach(function(entry) {
    loadField(entry[0], entry[1], entry[2], entry[3]);
  });
  const saveHomePl = document.getElementById('save-home-pl');
  if (saveHomePl) {
    saveHomePl.addEventListener('click', async function() {
      saveFields(homeMap.map(item => [item[0], item[1]]));
      const msg = document.getElementById('home-save-msg-pl');
      if (msg) {
        msg.textContent = 'Zapisywanie i publikowanie...';
        msg.classList.remove('hidden');
        
        // Auto-publish changes to server
        if (window.cmsSyncToServer) {
          const success = await window.cmsSyncToServer();
          if (success) {
            msg.textContent = 'Ustawienia strony głównej (PL) zapisane i opublikowane online!';
          } else {
            msg.textContent = 'Zapisano lokalnie. Proszę kliknąć "Publikuj Treści Online" aby opublikować.';
          }
        } else {
          msg.textContent = 'Ustawienia strony głównej (PL) zapisane.';
        }
        
        setTimeout(() => msg.classList.add('hidden'), 3000);
      }
    });
  }
  
  // ===== Waiting List Form (PL) =====
  const waitlistPairs = [
    ['waitlist-title-pl','plWaitlistTitle','waitlistTitle'],
    ['waitlist-subtitle-pl','plWaitlistSubtitle','waitlistSubtitle'],
    ['waitlist-firstname-label-pl','plWaitlistFirstNameLabel','waitlistFirstNameLabel'],
    ['waitlist-lastname-label-pl','plWaitlistLastNameLabel','waitlistLastNameLabel'],
    ['waitlist-email-label-pl','plWaitlistEmailLabel','waitlistEmailLabel'],
    ['waitlist-followers-label-pl','plWaitlistFollowersLabel','waitlistFollowersLabel'],
    ['waitlist-niche-label-pl','plWaitlistNicheLabel','waitlistNicheLabel'],
    ['waitlist-instagram-label-pl','plWaitlistInstagramLabel','waitlistInstagramLabel'],
    ['waitlist-submit-button-pl','plWaitlistSubmitButton','waitlistSubmitButton'],
    ['waitlist-success-title-pl','plWaitlistSuccessTitle','waitlistSuccessTitle'],
    ['waitlist-success-message-pl','plWaitlistSuccessMessage','waitlistSuccessMessage']
  ];
  waitlistPairs.forEach(function(p) {
    loadField(p[0], p[1], p[2]);
  });
  const saveWaitlistPl = document.getElementById('save-waitlist-pl');
  if (saveWaitlistPl) {
    saveWaitlistPl.addEventListener('click', function() {
      saveFields(waitlistPairs.map(item => [item[0], item[1]]));
      const msg = document.getElementById('waitlist-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  
  // ===== Calculator (PL) =====
  loadField('calculator-title-pl', 'plCalculatorTitle', 'calculatorTitle');
  loadField('calculator-subtitle-pl', 'plCalculatorSubtitle', 'calculatorSubtitle');
  const saveCalculatorPl = document.getElementById('save-calculator-pl');
  if (saveCalculatorPl) {
    saveCalculatorPl.addEventListener('click', function() {
      saveFields([
        ['calculator-title-pl', 'plCalculatorTitle'],
        ['calculator-subtitle-pl', 'plCalculatorSubtitle']
      ]);
      const msg = document.getElementById('calculator-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  
  // ===== About Page (PL) =====
  const aboutPairs = [
    ['admin-about-hero-title-pl','plAboutHeroTitle','aboutHeroTitle'],
    ['admin-about-hero-subtitle-pl','plAboutHeroSubtitle','aboutHeroSubtitle'],
    ['admin-about-story-pl','plAboutStory','aboutStory'],
    ['admin-mission-title-pl','plMissionTitle','missionTitle'],
    ['admin-mission-desc1-pl','plMissionDesc1','missionDesc1'],
    ['admin-mission-desc2-pl','plMissionDesc2','missionDesc2'],
    ['admin-vision-title-pl','plVisionTitle','visionTitle'],
    ['admin-vision-desc1-pl','plVisionDesc1','visionDesc1'],
    ['admin-vision-desc2-pl','plVisionDesc2','visionDesc2'],
    ['admin-team-title-pl','plTeamTitle','teamTitle'],
    ['admin-team-subtitle-pl','plTeamSubtitle','teamSubtitle'],
    ['admin-impact-title-pl','plImpactTitle','impactTitle'],
    ['admin-impact-subtitle-pl','plImpactSubtitle','impactSubtitle']
  ];
  // Note: Impact statistics (both Values and Labels for PL) are now managed in the EN section (admin.html)
  // and saved by the "Save About Content" button, so we don't load/save them here
  aboutPairs.forEach(function(p) {
    loadField(p[0], p[1], p[2]);
  });
  // Add Values section fields (PL)
  const valuePairs = [
    ['admin-values-title-pl','plValuesTitle','valuesTitle','Nasze Wartości'],
    ['admin-values-subtitle-pl','plValuesSubtitle','valuesSubtitle','Zasady, które kierują wszystkim, co robimy i napędzają każdą podjętą przez nas decyzję.'],
    ['admin-value1-title-pl','plValue1Title','value1Title','Autentyczność'],
    ['admin-value1-desc-pl','plValue1Desc','value1Desc','Wierzymy w prawdziwe wpływy, prawdziwe społeczności i prawdziwe wyniki. Żadnych fałszywych metryk, żadnego sztucznego zaangażowania.'],
    ['admin-value2-title-pl','plValue2Title','value2Title','Partnerstwo'],
    ['admin-value2-desc-pl','plValue2Desc','value2Desc','Twój sukces to nasz sukces. Pracujemy jako prawdziwi partnerzy, zaangażowani w rozwój Twojej marki i długoterminowy sukces.'],
    ['admin-value3-title-pl','plValue3Title','value3Title','Innowacyjność'],
    ['admin-value3-desc-pl','plValue3Desc','value3Desc','Nieustannie poszerzamy granice tego, co możliwe w live-commerce i budowaniu influencerskich marek modowych.'],
    ['admin-value4-title-pl','plValue4Title','value4Title','Wyniki'],
    ['admin-value4-desc-pl','plValue4Desc','value4Desc','Wszystko, co robimy, jest mierzone wynikami. Zobowiązujemy się do dostarczania mierzalnego sukcesu dla każdej marki, z którą współpracujemy.']
  ];
  // Add About CTA fields (PL)
  const aboutCtaPairs = [
    ['admin-about-cta-title-pl','plAboutCtaTitle','aboutCtaTitle','Gotowy, Aby Rozpocząć Swoją Modową Historię?'],
    ['admin-about-cta-desc-pl','plAboutCtaDesc','aboutCtaDesc','Dołącz do setek influencerów, którzy przekształcili swoje wpływy w kwitnące marki modowe. Twoja podróż w stronę przedsiębiorczości modowej zaczyna się teraz.'],
    ['admin-about-cta-button-pl','plAboutCtaButton','aboutCtaButton','Załóż Swoją Markę Modową Dzisiaj'],
    ['admin-about-cta-subtext-pl','plAboutCtaSubtext','aboutCtaSubtext','Bezpłatna konsultacja • Bez zobowiązań • Wyniki w 8 tygodni']
  ];
  // Load all About PL fields
  aboutPairs.forEach(function(p) {
    loadField(p[0], p[1], p[2]);
  });
  valuePairs.forEach(function(p) {
    loadField(p[0], p[1], p[2], p[3]);
  });
  aboutCtaPairs.forEach(function(p) {
    loadField(p[0], p[1], p[2], p[3]);
  });
  const saveAboutPl = document.getElementById('save-about-pl');
  if (saveAboutPl) {
    saveAboutPl.addEventListener('click', function() {
      saveFields(aboutPairs.map(item => [item[0], item[1]]));
      // Note: Impact statistics (PL Values & Labels) are saved by "Save About Content" button in EN section
      saveFields(valuePairs.map(item => [item[0], item[1]]));
      saveFields(aboutCtaPairs.map(item => [item[0], item[1]]));
      const msg = document.getElementById('about-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  // ===== How It Works (PL) =====
  // Map for How It Works Steps (PL)
  const howStepsPairsPL = [
    ['how-step1-title-field-pl','plHowStep1Title','howStep1Title','Konfiguracja Twojego Sklepu'],
    ['how-step1-desc-field-pl','plHowStep1Desc','howStep1Desc','Tworzymy Twój spersonalizowany sklep na rynku Idol Brands. Nie potrzebujesz oddzielnych stron internetowych ani złożonych platform e-commerce - wszystko jest zintegrowane.'],
    ['how-step2-title-field-pl','plHowStep2Title','howStep2Title','Konfiguracja Studia Live-Selling'],
    ['how-step2-desc-field-pl','plHowStep2Desc','howStep2Desc','Profesjonalna konfiguracja transmisji na żywo z interaktywnymi funkcjami. Zapewniamy wszystko, czego potrzebujesz do angażujących sesji live-selling.'],
    ['how-step3-title-field-pl','plHowStep3Title','howStep3Title','Rozwój Produktu i Kontrola Jakości'],
    ['how-step3-desc-field-pl','plHowStep3Desc','howStep3Desc','Projektujemy i rozwijamy Twoją linię produktów z myślą o live-selling. Skupiamy się na produktach, które wzbudzają emocje i napędzają zakupy impulsowe.'],
    ['how-step4-title-field-pl','plHowStep4Title','howStep4Title','Start i Wydarzenia Live-Selling'],
    ['how-step4-desc-field-pl','plHowStep4Desc','howStep4Desc','Realizujemy kompleksową strategię startu wykorzystując wydarzenia live-selling. Budujemy ekscytację, tworzymy poczucie pilności i napędzamy natychmiastową sprzedaż.'],
    ['how-step5-title-field-pl','plHowStep5Title','howStep5Title','Budowanie Społeczności i Wzrost'],
    ['how-step5-desc-field-pl','plHowStep5Desc','howStep5Desc','Buduj lojalną społeczność wokół swojej marki poprzez regularne interakcje na żywo. Przekształć obserwujących w klientów, a klientów w ambasadorów marki.'],
    ['how-step6-title-field-pl','plHowStep6Title','howStep6Title','Skalowanie i Optymalizacja'],
    ['how-step6-desc-field-pl','plHowStep6Desc','howStep6Desc','Ciągła optymalizacja oparta na danych wydajności live-selling. Skaluj swój sukces i maksymalizuj długoterminowy wzrost.']
  ];
  howStepsPairsPL.forEach(function(p) { loadField(p[0], p[1], p[2], p[3]); });
  const howCtaPairs = [
    ['admin-how-cta-desc-pl','plHowCtaDesc','howCtaDesc','Dołącz do setek influencerów, którzy przekształcili swoje wpływy w kwitnące marki modowe poprzez live-selling. Twoja podróż na marketplace zaczyna się tutaj.'],
    ['admin-how-cta-feature1-title-pl','plHowCtaFeature1Title','howCtaFeature1Title','Szybka Konfiguracja'],
    ['admin-how-cta-feature1-desc-pl','plHowCtaFeature1Desc','howCtaFeature1Desc','Twój sklep na żywo w 1 tydzień'],
    ['admin-how-cta-feature2-title-pl','plHowCtaFeature2Title','howCtaFeature2Title','Gotowy Na Live-Selling'],
    ['admin-how-cta-feature2-desc-pl','plHowCtaFeature2Desc','howCtaFeature2Desc','Profesjonalna konfiguracja streamingu'],
    ['admin-how-cta-feature3-title-pl','plHowCtaFeature3Title','howCtaFeature3Title','Wbudowana Publiczność'],
    ['admin-how-cta-feature3-desc-pl','plHowCtaFeature3Desc','howCtaFeature3Desc','Dostęp do ruchu marketplace'],
    ['admin-how-cta-button-pl','plHowCtaButton','howCtaButton','Stwórz Swój Sklep Live-Selling'],
    ['admin-how-cta-subtext-pl','plHowCtaSubtext','howCtaSubtext','Bezpłatna konsultacja • Brak opłat za konfigurację • Zacznij zarabiać w 6 miesięcy']
  ];
  loadField('admin-how-title-pl','plHowTitle','howTitle');
  loadField('admin-how-subtitle-pl','plHowSubtitle','howSubtitle');
  loadField('admin-ready-title-pl','plReadyTitle','readyTitle');
  howCtaPairs.forEach(function(p) {
    loadField(p[0], p[1], p[2], p[3]);
  });
  const saveHowPl = document.getElementById('save-how-pl');
  if (saveHowPl) {
    saveHowPl.addEventListener('click', function() {
      saveFields([
        ['admin-how-title-pl','plHowTitle'],
        ['admin-how-subtitle-pl','plHowSubtitle'],
        ['admin-ready-title-pl','plReadyTitle']
      ]);
      saveFields(howStepsPairsPL.map(item => [item[0], item[1]]));
      saveFields(howCtaPairs.map(item => [item[0], item[1]]));
      const msg = document.getElementById('how-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  // ===== Success Stories (PL) =====
  // Note: Success Stories statistics (Values & Labels) are managed via plImpactStat* fields in About section (shared)
  const successCtaPairs = [
    ['admin-success-cta-title-pl','plSuccessCtaTitle','successCtaTitle','Twoja Historia Sukcesu Zaczyna Się Tutaj'],
    ['admin-success-cta-desc-pl','plSuccessCtaDesc','successCtaDesc','Dołącz do tych odnoszących sukcesy influencerów, którzy przekształcili swoją pasję w dochodowe marki modowe. Twoja podróż w stronę przedsiębiorczości modowej zaczyna się teraz.'],
    ['admin-success-cta-feature1-title-pl','plSuccessCtaFeature1Title','successCtaFeature1Title','Bezpłatna Konsultacja'],
    ['admin-success-cta-feature1-desc-pl','plSuccessCtaFeature1Desc','successCtaFeature1Desc','60-minutowa sesja strategiczna'],
    ['admin-success-cta-feature2-title-pl','plSuccessCtaFeature2Title','successCtaFeature2Title','Spersonalizowana Strategia'],
    ['admin-success-cta-feature2-desc-pl','plSuccessCtaFeature2Desc','successCtaFeature2Desc','Dostosowana do Twojej publiczności'],
    ['admin-success-cta-feature3-title-pl','plSuccessCtaFeature3Title','successCtaFeature3Title','Start w 8 Tygodni'],
    ['admin-success-cta-feature3-desc-pl','plSuccessCtaFeature3Desc','successCtaFeature3Desc','Od pomysłu do działającej marki'],
    ['admin-success-cta-button-pl','plSuccessCtaButton','successCtaButton','Załóż Swoją Markę Modową'],
    ['admin-success-cta-subtext-pl','plSuccessCtaSubtext','successCtaSubtext','Dołącz do 500+ odnoszących sukcesy influencerów • Bez zobowiązań • Wyniki w 8 tygodni']
  ];
  loadField('admin-success-title-pl','plSuccessTitle','successTitle');
  loadField('admin-success-subtitle-pl','plSuccessSubtitle','successSubtitle');
  // Note: Statistics (Values & Labels) are loaded via About section (plImpactStat* values)
  successCtaPairs.forEach(function(p) {
    loadField(p[0], p[1], p[2], p[3]);
  });
  const saveSuccessPl = document.getElementById('save-success-pl');
  if (saveSuccessPl) {
    saveSuccessPl.addEventListener('click', function() {
      saveFields([
        ['admin-success-title-pl','plSuccessTitle'],
        ['admin-success-subtitle-pl','plSuccessSubtitle']
      ]);
      // Note: Statistics (Values & Labels) are saved via About section (plImpactStat* values)
      saveFields(successCtaPairs.map(item => [item[0], item[1]]));
      const msg = document.getElementById('success-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }

  // ===== Login Page (PL) =====
  // Load login page translations with no English fallback as they don't exist yet; provide sensible defaults
  loadField('admin-login-title-pl','plLoginTitle',null,'Logowanie influencera');
  loadField('admin-login-subtitle-pl','plLoginSubtitle',null,'Wprowadź dane logowania z e-maila akceptacyjnego.\nAby się zarejestrować, zapisz się na listę oczekujących, a wkrótce wyślemy Ci e-mail z danymi do logowania.');
  loadField('admin-login-username-label-pl','plLoginUsernameLabel',null,'Nazwa użytkownika');
  loadField('admin-login-password-label-pl','plLoginPasswordLabel',null,'Hasło');
  loadField('admin-login-button-text-pl','plLoginButtonText',null,'Zaloguj się');
  loadField('admin-login-error-pl','plLoginError',null,'Nieprawidłowa nazwa użytkownika lub hasło.');
  const saveLoginPl = document.getElementById('save-login-pl');
  if (saveLoginPl) {
    saveLoginPl.addEventListener('click', function() {
      saveFields([
        ['admin-login-title-pl','plLoginTitle'],
        ['admin-login-subtitle-pl','plLoginSubtitle'],
        ['admin-login-username-label-pl','plLoginUsernameLabel'],
        ['admin-login-password-label-pl','plLoginPasswordLabel'],
        ['admin-login-button-text-pl','plLoginButtonText'],
        ['admin-login-error-pl','plLoginError']
      ]);
      const msg = document.getElementById('login-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }

  // ===== Documents Page (PL) =====
  loadField('admin-documents-title-pl','plDocumentsTitle',null,'Twoje dokumenty');
  loadField('admin-documents-message-pl','plDocumentsMessage',null,'Brak dokumentów do wyświetlenia.');
  const saveDocsPl = document.getElementById('save-documents-pl');
  if (saveDocsPl) {
    saveDocsPl.addEventListener('click', function() {
      saveFields([
        ['admin-documents-title-pl','plDocumentsTitle'],
        ['admin-documents-message-pl','plDocumentsMessage']
      ]);
      const msg = document.getElementById('documents-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }

  // ===== Blog Page (PL) =====
  loadField('admin-blog-title-pl','plBlogTitle',null,'Blog');
  loadField('admin-blog-subtitle-pl','plBlogSubtitle',null,'Czytaj nasze najnowsze artykuły i inspiracje dotyczące mody.');
  loadField('admin-blog-noposts-pl','plBlogNoPostsMessage',null,'Brak wpisów na blogu.');
  const saveBlogPl = document.getElementById('save-blog-pl');
  if (saveBlogPl) {
    saveBlogPl.addEventListener('click', function() {
      saveFields([
        ['admin-blog-title-pl','plBlogTitle'],
        ['admin-blog-subtitle-pl','plBlogSubtitle'],
        ['admin-blog-noposts-pl','plBlogNoPostsMessage']
      ]);
      const msg = document.getElementById('blog-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }

  // ===== Hero Media Management =====
  function loadHeroMedia() {
    // Initialize with default videos if heroMediaList doesn't exist
    if (!localStorage.getItem('heroMediaList')) {
      const defaultMediaList = [
        { url: 'images/grok-video-159173c8-5359-49a7-97d7-e2eecbce1f37-1.mp4', type: 'video' },
        { url: 'images/grok-video-202b544e-4cd8-4965-bd0e-8f83c7e7f26b-2.mp4', type: 'video' },
        { url: 'images/grok-video-2747edf2-5b8d-4a0e-8b7d-f7e678e61921-4.mp4', type: 'video' },
        { url: 'images/grok-video-ff39249d-79da-4763-a118-695b61c880f6.mp4', type: 'video' }
      ];
      localStorage.setItem('heroMediaList', JSON.stringify(defaultMediaList));
    }
    
    const mediaList = JSON.parse(localStorage.getItem('heroMediaList') || '[]');
    const duration = localStorage.getItem('heroTransitionDuration') || '5';
    
    document.getElementById('hero-transition-duration').value = duration;
    
    const listEl = document.getElementById('hero-media-list');
    if (!mediaList || mediaList.length === 0) {
      listEl.innerHTML = '<p class="text-sm text-gray-500">Brak mediów. Dodaj pierwsze media powyżej.</p>';
      return;
    }
    
    listEl.innerHTML = '';
    mediaList.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'flex items-center justify-between bg-white p-3 rounded border border-gray-200';
      div.innerHTML = `
        <div class="flex items-center gap-3 flex-1">
          <span class="text-sm font-semibold text-gray-500">#${index + 1}</span>
          <span class="text-sm text-gray-700 font-medium">${item.type === 'video' ? '🎥' : '🖼️'} ${item.type === 'video' ? 'Wideo' : 'Zdjęcie'}</span>
          <span class="text-sm text-gray-600 truncate flex-1">${item.url}</span>
        </div>
        <div class="flex items-center gap-2">
          ${index > 0 ? `<button class="text-blue-600 hover:underline text-sm" onclick="moveHeroMedia(${index}, 'up')">↑</button>` : '<span class="w-4"></span>'}
          ${index < mediaList.length - 1 ? `<button class="text-blue-600 hover:underline text-sm" onclick="moveHeroMedia(${index}, 'down')">↓</button>` : '<span class="w-4"></span>'}
          <button class="text-red-600 hover:underline text-sm ml-2" onclick="deleteHeroMedia(${index})">Usuń</button>
        </div>
      `;
      listEl.appendChild(div);
    });
  }
  
  window.moveHeroMedia = function(index, direction) {
    const mediaList = JSON.parse(localStorage.getItem('heroMediaList') || '[]');
    if (direction === 'up' && index > 0) {
      [mediaList[index], mediaList[index - 1]] = [mediaList[index - 1], mediaList[index]];
    } else if (direction === 'down' && index < mediaList.length - 1) {
      [mediaList[index], mediaList[index + 1]] = [mediaList[index + 1], mediaList[index]];
    }
    localStorage.setItem('heroMediaList', JSON.stringify(mediaList));
    loadHeroMedia();
  };
  
  window.deleteHeroMedia = function(index) {
    const mediaList = JSON.parse(localStorage.getItem('heroMediaList') || '[]');
    mediaList.splice(index, 1);
    localStorage.setItem('heroMediaList', JSON.stringify(mediaList));
    loadHeroMedia();
  };
  
  const addMediaBtn = document.getElementById('add-hero-media');
  if (addMediaBtn) {
    addMediaBtn.addEventListener('click', function() {
      const url = document.getElementById('hero-media-url').value.trim();
      const type = document.getElementById('hero-media-type').value;
      
      if (!url) {
        alert('Proszę podać URL do pliku.');
        return;
      }
      
      const mediaList = JSON.parse(localStorage.getItem('heroMediaList') || '[]');
      mediaList.push({ url, type });
      localStorage.setItem('heroMediaList', JSON.stringify(mediaList));
      
      document.getElementById('hero-media-url').value = '';
      loadHeroMedia();
    });
  }
  
  const saveMediaBtn = document.getElementById('save-hero-media');
  if (saveMediaBtn) {
    saveMediaBtn.addEventListener('click', function() {
      const duration = document.getElementById('hero-transition-duration').value;
      localStorage.setItem('heroTransitionDuration', duration);
      
      const msg = document.getElementById('hero-media-save-msg');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  
  // Load hero media on page load
  loadHeroMedia();

  // ===== About Media Management =====
  function loadAboutMedia() {
    const mediaList = JSON.parse(localStorage.getItem('aboutMediaList') || '[]');
    const duration = localStorage.getItem('aboutTransitionDuration') || '5';
    
    document.getElementById('about-transition-duration').value = duration;
    
    const listEl = document.getElementById('about-media-list');
    if (!mediaList || mediaList.length === 0) {
      listEl.innerHTML = '<p class="text-sm text-gray-500">Brak mediów. Dodaj pierwsze media powyżej.</p>';
      return;
    }
    
    listEl.innerHTML = '';
    mediaList.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'flex items-center justify-between bg-white p-3 rounded border border-gray-200';
      div.innerHTML = `
        <div class="flex items-center gap-3 flex-1">
          <span class="text-sm font-semibold text-gray-500">#${index + 1}</span>
          <span class="text-sm text-gray-700 font-medium">${item.type === 'video' ? '🎥' : '🖼️'} ${item.type === 'video' ? 'Wideo' : 'Zdjęcie'}</span>
          <span class="text-sm text-gray-600 truncate flex-1">${item.url}</span>
        </div>
        <div class="flex items-center gap-2">
          ${index > 0 ? `<button class="text-blue-600 hover:underline text-sm" onclick="moveAboutMedia(${index}, 'up')">↑</button>` : '<span class="w-4"></span>'}
          ${index < mediaList.length - 1 ? `<button class="text-blue-600 hover:underline text-sm" onclick="moveAboutMedia(${index}, 'down')">↓</button>` : '<span class="w-4"></span>'}
          <button class="text-red-600 hover:underline text-sm ml-2" onclick="deleteAboutMedia(${index})">Usuń</button>
        </div>
      `;
      listEl.appendChild(div);
    });
  }
  
  window.moveAboutMedia = function(index, direction) {
    const mediaList = JSON.parse(localStorage.getItem('aboutMediaList') || '[]');
    if (direction === 'up' && index > 0) {
      [mediaList[index], mediaList[index - 1]] = [mediaList[index - 1], mediaList[index]];
    } else if (direction === 'down' && index < mediaList.length - 1) {
      [mediaList[index], mediaList[index + 1]] = [mediaList[index + 1], mediaList[index]];
    }
    localStorage.setItem('aboutMediaList', JSON.stringify(mediaList));
    loadAboutMedia();
  };
  
  window.deleteAboutMedia = function(index) {
    const mediaList = JSON.parse(localStorage.getItem('aboutMediaList') || '[]');
    mediaList.splice(index, 1);
    localStorage.setItem('aboutMediaList', JSON.stringify(mediaList));
    loadAboutMedia();
  };
  
  const addAboutMediaBtn = document.getElementById('add-about-media');
  if (addAboutMediaBtn) {
    addAboutMediaBtn.addEventListener('click', function() {
      const url = document.getElementById('about-media-url').value.trim();
      const type = document.getElementById('about-media-type').value;
      
      if (!url) {
        alert('Proszę podać URL do pliku.');
        return;
      }
      
      const mediaList = JSON.parse(localStorage.getItem('aboutMediaList') || '[]');
      mediaList.push({ url, type });
      localStorage.setItem('aboutMediaList', JSON.stringify(mediaList));
      
      document.getElementById('about-media-url').value = '';
      loadAboutMedia();
    });
  }
  
  const saveAboutMediaBtn = document.getElementById('save-about-media');
  if (saveAboutMediaBtn) {
    saveAboutMediaBtn.addEventListener('click', function() {
      const duration = document.getElementById('about-transition-duration').value;
      localStorage.setItem('aboutTransitionDuration', duration);
      
      const msg = document.getElementById('about-media-save-msg');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  
  // Load about media on page load
  loadAboutMedia();

  // ===== Blog Page (EN) =====
  loadField('admin-blog-title','blogTitle',null,'Blog');
  loadField('admin-blog-subtitle','blogSubtitle',null,'Read our latest articles and fashion inspiration.');
  loadField('admin-blog-noposts','blogNoPostsMessage',null,'No blog posts yet.');
  const saveBlogSettings = document.getElementById('save-blog-settings');
  if (saveBlogSettings) {
    saveBlogSettings.addEventListener('click', function() {
      saveFields([
        ['admin-blog-title','blogTitle'],
        ['admin-blog-subtitle','blogSubtitle'],
        ['admin-blog-noposts','blogNoPostsMessage']
      ]);
      const msg = document.getElementById('blog-settings-save-msg');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }

  // ===== Login Page (EN) =====
  loadField('admin-login-title','loginTitle',null,'Influencer Login');
  loadField('admin-login-subtitle','loginSubtitle',null,'Enter your login credentials from your acceptance email.\nTo register, sign up to waiting list and soon we will send you an email with login credentials.');
  loadField('admin-login-username-label','loginUsernameLabel',null,'Username');
  loadField('admin-login-password-label','loginPasswordLabel',null,'Password');
  loadField('admin-login-button-text','loginButtonText',null,'Login');
  loadField('admin-login-error','loginError',null,'Invalid username or password.');
  const saveLogin = document.getElementById('save-login');
  if (saveLogin) {
    saveLogin.addEventListener('click', function() {
      saveFields([
        ['admin-login-title','loginTitle'],
        ['admin-login-subtitle','loginSubtitle'],
        ['admin-login-username-label','loginUsernameLabel'],
        ['admin-login-password-label','loginPasswordLabel'],
        ['admin-login-button-text','loginButtonText'],
        ['admin-login-error','loginError']
      ]);
      const msg = document.getElementById('login-save-msg');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }

  // ===== Documents Page (EN) =====
  loadField('admin-documents-title','documentsTitle',null,'Your Documents');
  loadField('admin-documents-message','documentsMessage',null,'No documents available yet.');
  const saveDocs = document.getElementById('save-documents');
  if (saveDocs) {
    saveDocs.addEventListener('click', function() {
      saveFields([
        ['admin-documents-title','documentsTitle'],
        ['admin-documents-message','documentsMessage']
      ]);
      const msg = document.getElementById('documents-save-msg');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
});