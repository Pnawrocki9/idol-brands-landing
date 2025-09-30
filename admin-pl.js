// Polish translation management for admin dashboard

document.addEventListener('DOMContentLoaded', function() {
  // Helper to load a value with fallback to English default (from other keys)
  function loadField(fieldId, plKey, enKey, defaultVal) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const plVal = localStorage.getItem(plKey);
    if (plVal !== null) {
      field.value = plVal;
    } else if (enKey) {
      const enVal = localStorage.getItem(enKey);
      if (enVal !== null) field.value = enVal; else if (defaultVal !== undefined) field.value = defaultVal;
    } else if (defaultVal !== undefined) {
      field.value = defaultVal;
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
    ['home-cta-field-pl','plHomeCtaText','homeCtaText','See How It Works']
  ];
  homeMap.forEach(function(entry) {
    loadField(entry[0], entry[1], entry[2], entry[3]);
  });
  const saveHomePl = document.getElementById('save-home-pl');
  if (saveHomePl) {
    saveHomePl.addEventListener('click', function() {
      saveFields(homeMap.map(item => [item[0], item[1]]));
      const msg = document.getElementById('home-save-msg-pl');
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
  aboutPairs.forEach(function(p) {
    loadField(p[0], p[1], p[2]);
  });
  const saveAboutPl = document.getElementById('save-about-pl');
  if (saveAboutPl) {
    saveAboutPl.addEventListener('click', function() {
      saveFields(aboutPairs.map(item => [item[0], item[1]]));
      const msg = document.getElementById('about-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  // ===== How It Works (PL) =====
  loadField('admin-how-title-pl','plHowTitle','howTitle');
  loadField('admin-how-subtitle-pl','plHowSubtitle','howSubtitle');
  loadField('admin-ready-title-pl','plReadyTitle','readyTitle');
  const saveHowPl = document.getElementById('save-how-pl');
  if (saveHowPl) {
    saveHowPl.addEventListener('click', function() {
      saveFields([
        ['admin-how-title-pl','plHowTitle'],
        ['admin-how-subtitle-pl','plHowSubtitle'],
        ['admin-ready-title-pl','plReadyTitle']
      ]);
      const msg = document.getElementById('how-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
  // ===== Success Stories (PL) =====
  loadField('admin-success-title-pl','plSuccessTitle','successTitle');
  loadField('admin-success-subtitle-pl','plSuccessSubtitle','successSubtitle');
  const saveSuccessPl = document.getElementById('save-success-pl');
  if (saveSuccessPl) {
    saveSuccessPl.addEventListener('click', function() {
      saveFields([
        ['admin-success-title-pl','plSuccessTitle'],
        ['admin-success-subtitle-pl','plSuccessSubtitle']
      ]);
      const msg = document.getElementById('success-save-msg-pl');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
      }
    });
  }
});