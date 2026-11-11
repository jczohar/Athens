/* מדריך אתונה — נתונים. גרסה 20261110-01 */
const APP_VERSION = "20261110-01";
const FREE_DAYS_NOTE = "חינם: ראשון הראשון בכל חודש בין נובמבר למרץ (06/12/2026, 03/01/2027, 07/02/2027, 07/03/2027), וכן 06/03, 25/03, 18/04, 18/05, 28/10 וסוף השבוע האחרון של ספטמבר. בימי חינם יש תורים ארוכים.";
const CLOSED_NOTE = "האתרים הארכיאולוגיים סגורים בדרך כלל ב-01/01, 25/12, 26/12, 01/05 ובחג הפסחא האורתודוקסי.";

const CATS_SITES = {
  ancient: { he: "עתיקות", ico: "🏛️" },
  views: { he: "תצפיות ופארקים", ico: "🌄" },
  neigh: { he: "שכונות", ico: "🏘️" },
  museum: { he: "מוזיאונים", ico: "🖼️" },
  daytrip: { he: "טיולי יום", ico: "🚌" },
  culture: { he: "תרבות", ico: "🎭" }
};

/* effort: 1 קל, 2 בינוני, 3 מאומץ (הליכה/עליות) */
const SITES = [
  { id: "acropolis", he: "האקרופוליס", en: "Acropolis of Athens", gr: "Ακρόπολη Αθηνών", cat: "ancient", area: "center", lat: 37.9715, lng: 23.7257, wiki: "Acropolis of Athens", heq: "אקרופוליס אתונה",
    short: "סלע העיר ועליו הפרתנון — סמלה של אתונה והאתר החשוב בעיר.",
    long: "מקבץ המקדשים הקלאסיים: הפרתנון, האֶרֶכְתֵּיון עם עמודי הקריאטידות, מקדש אתנה ניקה ושער הפרופילאה. הגיעו בפתיחה (8:00), נעלו נעליים סגורות עם סוליה טובה (השיש חלק מאוד) והקצו 2–3 שעות. בצד הדרומי של הסלע נמצא תיאטרון דיוניסוס. קיימת מעלית לנגישות — פרטים באתר.",
    hist: "הפרתנון נבנה בין 447 ל-432 לפנה״ס בימי פריקלס, לכבוד אתנה אלת העיר. במשך הדורות שימש כנסייה ביזנטית, מסגד ואף מחסן אבק שריפה — ב-1687 פגז ונציאני פוצץ אותו וגרם לנזק הגדול. האתר הוכרז אתר מורשת עולמית של אונסק״ו ב-1987.",
    addr: "Dionysiou Areopagitou, Athens 117 42 (כניסה דרומית)", phone: "", web: "https://hhticket.gr",
    hours: "חורף (01/11–31/03): 08:00–17:00, כניסה אחרונה 16:30. קיץ: 08:00–20:00.",
    price: "€30 כניסה רגילה. חינם: ילדים עד 18 מחוץ לאיחוד האירופי, ועד גיל 25 אזרחי האיחוד (עם תעודה). הנחות לסטודנטים ולגמלאים — פרטים בקופה ובאתר.", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr — מערכת הכרטיסים הרשמית (גם בקופת האתר).", book: "כן — הכניסה לפי חלון זמן, מומלץ להזמין מראש.",
    how: "מטרו קו 2 לתחנת Akropoli (5 דקות הליכה). או מטרו Monastiraki / Thiseio והליכה. לפי מקורות, בעת עבודות הכניסה היא דרך הצד הדרומי.",
    tags: ["history", "views"], kids: true, effort: 3, paid: true },
  { id: "acromuseum", he: "מוזיאון האקרופוליס", en: "Acropolis Museum", gr: "Μουσείο Ακρόπολης", cat: "museum", area: "center", lat: 37.9685, lng: 23.7285, wiki: "Acropolis Museum", heq: "מוזיאון האקרופוליס",
    short: "מוזיאון מודרני מול האקרופוליס, עם פסלי הפרתנון והקריאטידות המקוריות.",
    long: "קומת הפרתנון מציגה את שלל הפסלים מול חזית הפרתנון עצמו. עושה סדר מצוין לפני או אחרי העלייה לסלע, ויש בו מסעדה עם נוף לאקרופוליס. 1.5–2 שעות.",
    hist: "נפתח ב-2009 במקום מוזיאון קטן שעמד על הסלע. נבנה מעל חפירה ארכיאולוגית של שכונה עתיקה, ואפשר לראות אותה מבעד לרצפת זכוכית בכניסה.",
    addr: "Dionysiou Areopagitou 15, Makrygianni", phone: "", web: "https://www.theacropolismuseum.gr",
    hours: "משתנות לפי עונה — בדקו באתר הרשמי לפני הגעה.", price: "€20 בקיץ (בחורף לרוב מוזל — לאמת באתר). אינו כלול בכרטיס האתרים.", free: "חינם: 06/03, 25/03, 18/05, 28/10 וראשון הראשון בכל חודש בחורף. גם בימי חינם צריך כרטיס בחלון זמן.",
    buy: "etickets.theacropolismuseum.gr (הרשמי; באתרי צד שלישי יש תוספת מחיר).", book: "מומלץ, במיוחד בסופי שבוע.",
    how: "מטרו קו 2 תחנת Akropoli — ממש ליד.", tags: ["history", "museum"], kids: true, effort: 1, paid: true },
  { id: "agora", he: "האגורה העתיקה", en: "Ancient Agora of Athens", gr: "Αρχαία Αγορά Αθηνών", cat: "ancient", area: "center", lat: 37.9750, lng: 23.7219, wiki: "Ancient Agora of Athens", heq: "אגורה אתונה העתיקה",
    short: "לב החיים האזרחיים של אתונה הקלאסית, עם מקדש הפייסטוס השמור להפליא.",
    long: "כאן התנהלו משפטים, מסחר ודיונים. המקדש של הפייסטוס (דורי, כ-449 לפנה״ס) הוא מהשמורים ביותר ביוון, והסטואה של אטאלוס משוחזרת ומשמשת מוזיאון. גן נעים עם צל — מתאים גם לילדים. 1.5–2 שעות.",
    hist: "האגורה נוסדה במאה ה-6 לפנה״ס. כאן הלכו סוקרטס ותלמידיו, וכאן נולדה הדמוקרטיה האתונאית בפועל. הסטואה של אטאלוס נבנתה מחדש בשנות ה-50 של המאה ה-20.",
    addr: "Adrianou 24, Monastiraki", phone: "", web: "https://hhticket.gr",
    hours: "בחורף בדרך כלל 08:00–17:00 (משוער — לאמת באתר).", price: "בתשלום, כ-€10 (משוער). ייתכן כרטיס משולב לכמה אתרים — לאמת באתר לפני הרכישה.", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr או בקופה באתר.", book: "לרוב לא נדרש מראש.", how: "מטרו קו 1 תחנת Thiseio (הכניסה מהצד הצפוני), או Monastiraki קו 1/3 והליכה קצרה.",
    tags: ["history"], kids: true, effort: 2, paid: true },
  { id: "romanagora", he: "האגורה הרומית ומגדל הרוחות", en: "Roman Agora & Tower of the Winds", gr: "Ρωμαϊκή Αγορά – Αέρηδες", cat: "ancient", area: "plaka", lat: 37.9748, lng: 23.7262, wiki: "Tower of the Winds", heq: "מגדל הרוחות",
    short: "שוק רומי עתיק ומגדל שמונה צלעות ששימש שעון שמש ושעון מים.",
    long: "אתר קטן, ביקור של 30–45 דקות. מגדל הרוחות עם תבליטי שמונה הרוחות הוא הדבר המרשים כאן.",
    hist: "השוק נבנה במאה ה-1 לפנה״ס בתרומת יוליוס קיסר ואוגוסטוס. המגדל (סביב המאה ה-1 לפנה״ס) כלל שעון שמש, שעון מים ומד רוח.",
    addr: "Pelopida & Aiolou, Plaka", phone: "", web: "https://hhticket.gr", hours: "בחורף בדרך כלל עד 15:00–17:00 (לאמת באתר).", price: "בתשלום, כ-€8 (משוער).", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr או בקופה.", book: "לא נדרש.", how: "מטרו Monastiraki — 5 דקות הליכה.", tags: ["history"], kids: false, effort: 1, paid: true },
  { id: "hadrian", he: "ספריית אדריאנוס", en: "Hadrian’s Library", gr: "Βιβλιοθήκη του Αδριανού", cat: "ancient", area: "plaka", lat: 37.9759, lng: 23.7258, wiki: "Hadrian's Library", heq: "ספריית אדריאנוס",
    short: "שרידי מתחם ספרייה רומי מימי הקיסר אדריאנוס, ממש ליד כיכר מונסטיראקי.",
    long: "ביקור קצר של כחצי שעה, מתאים להצטרף אליו מיד בדרך לאגורה.",
    hist: "נבנתה ב-132 לספירה בידי אדריאנוס, חובב התרבות היוונית, וכללה חדרי קריאה, אולמות הרצאות וגן פנימי.",
    addr: "Areos 3, Monastiraki", phone: "", web: "https://hhticket.gr", hours: "בחורף בדרך כלל 08:00–15:00/17:00 (לאמת).", price: "בתשלום, כ-€6 (משוער).", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr או בקופה.", book: "לא נדרש.", how: "מטרו Monastiraki — דקה הליכה.", tags: ["history"], kids: false, effort: 1, paid: true },
  { id: "olympieion", he: "מקדש זאוס האולימפי", en: "Temple of Olympian Zeus", gr: "Ναός του Ολυμπίου Διός", cat: "ancient", area: "center", lat: 37.9693, lng: 23.7332, wiki: "Temple of Olympian Zeus, Athens", heq: "מקדש זאוס האולימפי",
    short: "עמודים קורינתיים עצומים — כל המקדש המשוחזר ברור מכל רחבי העיר.",
    long: "15 עמודים נותרו מתוך 104 המקוריים. ביקור של 30–45 דקות, נוח בשילוב עם הגן הלאומי ואצטדיון פנאתינאיקו.",
    hist: "הבנייה התחילה במאה ה-6 לפנה״ס והסתיימה רק בשנת 132 לספירה בימי אדריאנוס — כ-650 שנה אחר כך.",
    addr: "Vasilissis Olgas Ave, Athens", phone: "", web: "https://hhticket.gr", hours: "בחורף בדרך כלל עד 15:00–17:00 (לאמת).", price: "בתשלום, כ-€10 (משוער). אפשר לראות את העמודים מבחוץ בחינם.", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr או בקופה.", book: "לא נדרש.", how: "מטרו Akropoli (קו 2) או Syntagma — 10–15 דקות הליכה.", tags: ["history"], kids: false, effort: 1, paid: true },
  { id: "kerameikos", he: "קרמיקוס", en: "Kerameikos Archaeological Site", gr: "Κεραμεικός", cat: "ancient", area: "gazi", lat: 37.9786, lng: 23.7114, wiki: "Kerameikos", heq: "קרמיקוס",
    short: "בית הקברות העתיק של אתונה — שקט, ירוק ובלי המוני תיירים.",
    long: "מצבות מרשימות, שער דיפילון ומוזיאון קטן. מתאים למי שאוהב אתרים רגועים.",
    hist: "שימש כאזור הקדרים וכבית קברות מאות שנים. כאן נשא פריקלס את נאום ההספד המפורסם (לפי תוקידידס).",
    addr: "Ermou 148, Kerameikos", phone: "", web: "https://hhticket.gr", hours: "בחורף בדרך כלל 08:00–17:00 (לאמת).", price: "בתשלום, כ-€8 (משוער).", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr או בקופה.", book: "לא נדרש.", how: "מטרו קו 3 תחנת Kerameikos — ממש ליד.", tags: ["history"], kids: false, effort: 1, paid: true },
  { id: "panathenaic", he: "אצטדיון פנאתינאיקו", en: "Panathenaic Stadium (Kallimarmaro)", gr: "Παναθηναϊκό Στάδιο (Καλλιμάρμαρο)", cat: "ancient", area: "center", lat: 37.9686, lng: 23.7411, wiki: "Panathenaic Stadium", heq: "אצטדיון פנאתינאיקו",
    short: "האצטדיון היחיד בעולם שכולו שיש, ובו נערכו המשחקים האולימפיים המודרניים הראשונים.",
    long: "אפשר לרוץ על המסלול ולעמוד על דוכן המנצחים. כולל אודיו-גייד. 45 דקות.",
    hist: "נבנה מחדש בשיש ב-1896 על שרידי אצטדיון עתיק, ואירח את האולימפיאדה המודרנית הראשונה. באולימפיאדת 2004 הסתיים בו המרתון.",
    addr: "Leof. Vasileos Konstantinou, Pagkrati", phone: "", web: "https://www.panathenaicstadium.gr", hours: "משתנות לפי עונה — בדקו באתר.", price: "בתשלום, כ-€10 (משוער) כולל אודיו-גייד.", free: "",
    buy: "בקופה באתר.", book: "לא נדרש.", how: "אוטובוס/מונית מהמרכז, או הליכה של 15 דקות מ-Syntagma דרך הגן הלאומי.", tags: ["history", "kids"], kids: true, effort: 1, paid: true },
  { id: "lycabettus", he: "גבעת ליקאבטוס", en: "Mount Lycabettus", gr: "Λυκαβηττός", cat: "views", area: "kolonaki", lat: 37.9819, lng: 23.7431, wiki: "Lycabettus", heq: "ליקאבטוס",
    short: "הגבעה הגבוהה בעיר — תצפית פנורמית על אתונה, האקרופוליס והים. מושלם לשקיעה.",
    long: "עולים ברכבל (פוניקולר) מרחוב Ploutarchou בקולונקי, או ברגל במסלול של כ-20–30 דקות. למעלה קפלת סנט ג׳ורג׳ ומסעדה.",
    hist: "לפי המיתולוגיה, אתנה הפילה אותה בטעות מהשמיים. הקפלה הלבנה בפסגה מוקדשת לסנט ג׳ורג׳.",
    addr: "הרכבל: Ploutarchou & Aristippou, Kolonaki", phone: "", web: "https://www.lycabettushill.com", hours: "הרכבל פועל לפי לוח זמנים — בדקו באתר.", price: "הרכבל כ-€10 הלוך-חזור (משוער). הליכה ברגל — חינם.", free: "",
    buy: "בקופת הרכבל.", book: "לא נדרש.", how: "מטרו Evangelismos (קו 3) והליכה של 10–15 דקות בקולונקי.", tags: ["views", "nature"], kids: true, effort: 2, paid: true },
  { id: "plaka", he: "פלאקה", en: "Plaka", gr: "Πλάκα", cat: "neigh", area: "plaka", lat: 37.9726, lng: 23.7292, wiki: "Plaka", heq: "פלאקה",
    short: "השכונה הוותיקה למרגלות האקרופוליס — סמטאות, טברנות וחנויות מזכרות.",
    long: "מתאימה להליכה איטית ושעה-שעתיים של שוטטות. רחוב Adrianou הראשי עמוס. אחה״צ מאוחר או בערב יש אווירה נעימה.",
    hist: "אחת השכונות העתיקות בעולם שעדיין מיושבות. שמרה על אופי של עיירה יוונית על אף קרבתה למרכז.",
    addr: "למרגלות האקרופוליס", phone: "", web: "", hours: "פתוחה תמיד (חנויות ומסעדות לפי שעות).", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "מטרו Monastiraki או Syntagma / Akropoli.", tags: ["food", "shopping", "walk"], kids: true, effort: 1, paid: false },
  { id: "anafiotika", he: "אנפיוטיקה", en: "Anafiotika", gr: "Αναφιώτικα", cat: "neigh", area: "plaka", lat: 37.9731, lng: 23.7312, wiki: "Anafiotika", heq: "אנפיוטיקה",
    short: "פינת איים קיקלדית בלב אתונה — בתים לבנים, פרחים וחתולים.",
    long: "הולכים בשבילים צרים מעל פלאקה. אזור מגורים — שקט וכבדו את התושבים. 30 דקות.",
    hist: "נבנתה במאה ה-19 בידי פועלי בניין מהאי אנאפי שהגיעו לבנות את ארמון המלך אוטו, והביאו עמם את הארכיטקטורה של האי.",
    addr: "צפון-מזרח לאקרופוליס, מעל פלאקה", phone: "", web: "", hours: "פתוחה תמיד.", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "הליכה מכיכר Syntagma או Monastiraki דרך פלאקה (עלייה קלה).", tags: ["walk", "photo"], kids: true, effort: 2, paid: false },
  { id: "syntagma", he: "כיכר סינטגמה והפרלמנט", en: "Syntagma Square & Hellenic Parliament", gr: "Πλατεία Συντάγματος – Βουλή", cat: "culture", area: "center", lat: 37.9755, lng: 23.7348, wiki: "Syntagma Square", heq: "כיכר סינטגמה",
    short: "הכיכר המרכזית, מבנה הפרלמנט וחילופי המשמר של האבזונים.",
    long: "החלפת משמר קצרה כל שעה עגולה מול קבר החייל האלמוני; הטקס המלא והמרשים בימי ראשון בשעה 11:00. כיכר סינטגמה היא גם צומת תחבורה מרכזי.",
    hist: "בניין הפרלמנט נבנה בשנים 1836–1843 כארמון המלך אוטו הראשון. ב-1843 נאלץ המלך להסכים כאן לחוקה — ומכאן שם הכיכר.",
    addr: "Syntagma Square", phone: "", web: "https://www.hellenicparliament.gr", hours: "החלפת משמר: כל שעה עגולה; ראשון 11:00 (טקס מלא).", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "מטרו Syntagma (קו 2 ו-3).", tags: ["history", "walk"], kids: true, effort: 1, paid: false },
  { id: "natgarden", he: "הגן הלאומי וזאפיון", en: "National Garden & Zappeion", gr: "Εθνικός Κήπος – Ζάππειο", cat: "views", area: "center", lat: 37.9720, lng: 23.7368, wiki: "National Garden of Athens", heq: "הגן הלאומי אתונה",
    short: "נווה מדבר ירוק ובריכות ברווזים, ובצידו בניין הזאפיון.",
    long: "מקום מצוין להפסקה עם ילדים, עם שבילים מוצלים. אפשר להמשיך משם לאצטדיון פנאתינאיקו ולמקדש זאוס.",
    hist: "הגן נוצר ב-1840 ביוזמת המלכה אמליה. הזאפיון (נחנך ב-1888) הוקם בתרומת האחים זאפאס ושימש מרכז תערוכות.",
    addr: "ליד כיכר Syntagma", phone: "", web: "", hours: "מהבוקר עד השקיעה.", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "מטרו Syntagma — הכניסה ממש ליד.", tags: ["nature", "kids", "walk"], kids: true, effort: 1, paid: false },
  { id: "philopappos", he: "גבעת פילופאפוס וארופגוס", en: "Philopappos Hill & Areopagus", gr: "Λόφος Φιλοπάππου – Άρειος Πάγος", cat: "views", area: "center", lat: 37.9689, lng: 23.7192, wiki: "Philopappos Monument", heq: "גבעת פילופאפוס",
    short: "גבעות בחינם עם הנוף הטוב ביותר אל האקרופוליס, במיוחד בשקיעה.",
    long: "מסלול הליכה עם שבילי אבן ועליות — מומלץ לנעליים טובות. ארופגוס (Areopagus), סלע קטן מתחת לאקרופוליס, קרוב יותר ונוח יותר לעלייה.",
    hist: "על הפסגה עומד מצבת פילופאפוס מהמאה ה-2 לספירה. ארופגוס היה בית המשפט העתיק של אתונה, ושם נשא השליח פאולוס דרשה.",
    addr: "מערב האקרופוליס (גבעה)", phone: "", web: "", hours: "מהבוקר עד השקיעה.", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "מטרו Akropoli או Thiseio והליכה במעלה.", tags: ["views", "nature", "photo"], kids: false, effort: 3, paid: false },
  { id: "namuseum", he: "המוזיאון הארכיאולוגי הלאומי", en: "National Archaeological Museum", gr: "Εθνικό Αρχαιολογικό Μουσείο", cat: "museum", area: "center", lat: 37.9890, lng: 23.7326, wiki: "National Archaeological Museum, Athens", heq: "המוזיאון הארכיאולוגי הלאומי אתונה",
    short: "האוסף הגדול בעולם של עתיקות יווניות, כולל מסכת אגממנון.",
    long: "מוזיאון ענק — בחרו אגפים (פסלים, מיקנה, הקיקלדים, מכניזם אנטיקיתרה). 2–3 שעות.",
    hist: "נוסד במאה ה-19 ומציג אוצרות מהניאוליתית ועד העת העתיקה המאוחרת, כולל מכניזם אנטיקיתרה — המחשב האנלוגי העתיק.",
    addr: "Patission 44, Exarcheia", phone: "", web: "https://www.namuseum.gr", hours: "בדקו באתר הרשמי.", price: "בתשלום — מחיר באתר.", free: "ראשון הראשון בחורף וימי חינם לאומיים (לפי הכללים הארציים).",
    buy: "באתר ובקופה.", book: "לא נדרש בדרך כלל.", how: "מטרו Viktoria (קו 1) — 5 דקות הליכה.", tags: ["museum", "history"], kids: false, effort: 1, paid: true },
  { id: "jewishmuseum", he: "המוזיאון היהודי של יוון", en: "Jewish Museum of Greece", gr: "Εβραϊκό Μουσείο Ελλάδος", cat: "museum", area: "plaka", lat: 37.9746, lng: 23.7350, wiki: "Jewish Museum of Greece", heq: "המוזיאון היהודי של יוון",
    short: "תולדות הקהילות היהודיות ביוון — מרומית ועד השואה.",
    long: "מוזיאון קטן ומרגש, קרוב לפלאקה. כדאי לבדוק שעות פתיחה ולתאם ביקור מראש.",
    hist: "הוקם ב-1977 ומציג את מורשת יהדות יוון, אחת הקהילות העתיקות באירופה.",
    addr: "Nikis 39, Plaka", phone: "", web: "https://www.jewishmuseum.gr", hours: "בדקו באתר.", price: "בתשלום — מחיר באתר.", free: "",
    buy: "בקופה.", book: "מומלץ לבדוק מראש.", how: "הליכה מכיכר Syntagma (5–7 דקות).", tags: ["museum", "jewish"], kids: false, effort: 1, paid: true },
  { id: "snfcc", he: "מרכז התרבות סטברוס נאירקוס", en: "Stavros Niarchos Foundation Cultural Center", gr: "Κέντρο Πολιτισμού Ίδρυμα Σταύρος Νιάρχος", cat: "culture", area: "coast", lat: 37.9402, lng: 23.6918, wiki: "Stavros Niarchos Foundation Cultural Center", heq: "מרכז התרבות סטברוס נאירקוס",
    short: "פארק מודרני, בית האופרה הלאומי וגג עם נוף לים ולאקרופוליס.",
    long: "מתאים למשפחות — שטחי דשא, תעלה, מזרקות. מהגג רואים את הים. בערבים לעיתים הופעות. 2–3 שעות.",
    hist: "נפתח ב-2016 בתכנון רנצו פיאנו, כתרומה של קרן נאירקוס למדינה.",
    addr: "Leof. Andrea Syngrou 364, Kallithea", phone: "", web: "https://www.snfcc.org", hours: "הפארק פתוח רוב היום; לוח אירועים באתר.", price: "הפארק חינם; אירועים בתשלום.", free: "",
    buy: "באתר.", book: "לאירועים — כן.", how: "מונית 10–15 דק׳ מהמרכז, או אוטובוס/טראם (בדקו באפליקציה).", tags: ["kids", "culture", "views"], kids: true, effort: 1, paid: false },
  { id: "psyrri", he: "פסירי", en: "Psyrri", gr: "Ψυρρή", cat: "neigh", area: "center", lat: 37.9783, lng: 23.7249, wiki: "Psyrri", heq: "פסירי",
    short: "שכונת לילה עם גרפיטי, ברים וטברנות ביוונית.",
    long: "מושלמת לארוחת ערב וטיול שאחריה. בימים שקטה יותר.",
    hist: "שכונת בעלי מלאכה ישנה שהפכה בעשורים האחרונים לאחד האזורים התוססים בעיר.",
    addr: "בין Monastiraki ל-Omonia", phone: "", web: "", hours: "פעילה בעיקר אחר הצהריים והערב.", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "מטרו Monastiraki או Thiseio.", tags: ["food", "night"], kids: false, effort: 1, paid: false },
  { id: "kolonaki", he: "קולונקי", en: "Kolonaki", gr: "Κολωνάκι", cat: "neigh", area: "kolonaki", lat: 37.9795, lng: 23.7425, wiki: "Kolonaki", heq: "קולונקי",
    short: "השכונה היוקרתית — בוטיקים, בתי קפה, גלריות.",
    long: "מתאים לקפה בבוקר, קניות ולעלייה לליקאבטוס. רחובות Skoufa ו-Tsakalof עמוסים בבתי קפה.",
    hist: "נקראת על שם עמוד קטן (קולונאקי) בכיכר. חלק מהבתים בסגנון ניאו-קלאסי.",
    addr: "מזרחית ל-Syntagma", phone: "", web: "", hours: "חנויות לפי שעות קניות.", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "מטרו Evangelismos או Syntagma והליכה.", tags: ["shopping", "food"], kids: false, effort: 1, paid: false },
  { id: "mikrolimano", he: "מיקרוליקאנו (פיראוס)", en: "Mikrolimano, Piraeus", gr: "Μικρολίμανο", cat: "neigh", area: "coast", lat: 37.9375, lng: 23.6960, wiki: "Mikrolimano", heq: "מיקרוליקאנו",
    short: "מרינה קטנה עם מסעדות דגים על המים.",
    long: "מתאים לארוחת דגים וטיול בחוף בערב. קצת יקר.",
    hist: "נמל דייגים ישן שהפך למרינה טיפוסית.",
    addr: "Piraeus (Kastella)", phone: "", web: "", hours: "מסעדות לפי שעות.", price: "חינם.", free: "",
    buy: "", book: "לא נדרש.", how: "מטרו Piraeus והמשך באוטובוס/מונית (10 דק׳).", tags: ["food", "sea"], kids: true, effort: 1, paid: false },
  { id: "sounion", he: "קייפ סוניון — מקדש פוסידון", en: "Cape Sounion – Temple of Poseidon", gr: "Σούνιο – Ναός Ποσειδώνα", cat: "daytrip", area: "far", lat: 37.6502, lng: 24.0248, wiki: "Cape Sounion", heq: "סוניון",
    short: "מקדש על צוק מעל הים האגאי — השקיעה כאן מפורסמת.",
    long: "נסיעה של כשעה וחצי עד שעתיים מהמרכז באוטובוס KTEL של Attiki מתחנת Pedion Areos, או ברכב/טיול מאורגן. כדאי להגיע לפני השקיעה — ולחזור לפני החשכה אם אין רכב.",
    hist: "המקדש הוקדש לפוסידון והוקם בסביבות 440 לפנה״ס. לורד ביירון חרט את שמו על אחד העמודים.",
    addr: "Sounion 195 00 (כ-70 ק״מ מאתונה)", phone: "", web: "https://hhticket.gr", hours: "לפי עונה, עד לפני החשכה.", price: "בתשלום, כ-€10 (משוער).", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr או בקופה.", book: "לא נדרש.", how: "אוטובוס KTEL Attiki, רכב שכור או סיור מאורגן.", tags: ["history", "views", "sea"], kids: true, effort: 2, paid: true },
  { id: "aegina", he: "האי אגינה", en: "Aegina Island", gr: "Αίγινα", cat: "daytrip", area: "far", lat: 37.7470, lng: 23.4285, wiki: "Aegina", heq: "אגינה",
    short: "האי הקרוב ביותר לאתונה — פיסטוקים, מקדש אפאיה ונמל קסום.",
    long: "מעבורת/הידרופויל מפיראוס (כ-40 דק׳–שעה ורבע לפי סוג הספינה). בחורף יש פחות הפלגות — בדקו לוח זמנים ביום שלפני.",
    hist: "בעת העתיקה הייתה איגינה מעצמה ימית ומקום הטבעת המטבעות הראשונים ביוון. מקדש אפאיה הוא מהמאה ה-5 לפנה״ס.",
    addr: "נמל Piraeus (Gate E7/E8, משוער)", phone: "", web: "", hours: "הפלגות לפי לוח זמנים.", price: "כרטיס מעבורת — לפי החברה והספינה.", free: "",
    buy: "בקופות הנמל או באתרי חברות המעבורות.", book: "בסופי שבוע מומלץ.", how: "מטרו Piraeus (קו 1 או 3), הליכה לנמל.", tags: ["sea", "nature", "daytrip"], kids: true, effort: 2, paid: true },
  { id: "delphi", he: "דלפי", en: "Delphi", gr: "Δελφοί", cat: "daytrip", area: "far", lat: 38.4824, lng: 22.5010, wiki: "Delphi", heq: "דלפי",
    short: "מקום האורקל המפורסם של אפולו — אתר אונסק״ו בהרי הפרנאסוס.",
    long: "כ-2.5–3 שעות נסיעה לכל כיוון — מתאים לסיור מאורגן יום שלם או ללינה לילה אחד. כולל המוזיאון והאתר.",
    hist: "בעת העתיקה נחשב מרכז העולם. כאן ישבה הפיתיה והעבירה את נבואות אפולו.",
    addr: "Delphi, Phocis", phone: "", web: "https://hhticket.gr", hours: "לפי עונה.", price: "בתשלום — באתר.", free: FREE_DAYS_NOTE,
    buy: "hhticket.gr", book: "לא נדרש.", how: "סיור מאורגן, רכב שכור או אוטובוס KTEL.", tags: ["history", "nature", "daytrip"], kids: false, effort: 2, paid: true },
  { id: "nafplio", he: "נאפליו ואפידאורוס", en: "Nafplio & Epidaurus", gr: "Ναύπλιο – Επίδαυρος", cat: "daytrip", area: "far", lat: 37.5673, lng: 22.8000, wiki: "Nafplio", heq: "נאפליו",
    short: "עיירה ונציאנית יפהפייה והתיאטרון העתיק המפורסם באקוסטיקה שלו.",
    long: "כ-2 שעות נסיעה. בדרך אפשר לראות את תעלת קורינתוס. ביום אחד אפשר להספיק את התיאטרון (אפידאורוס) ושוטטות בנאפליו.",
    hist: "נאפליו הייתה בירתה הראשונה של יוון המודרנית (1829–1834). התיאטרון באפידאורוס מהמאה ה-4 לפנה״ס.",
    addr: "Nafplio, Peloponnese", phone: "", web: "", hours: "לפי אתר.", price: "בתשלום לאתר אפידאורוס.", free: "",
    buy: "באתר.", book: "לא נדרש.", how: "רכב שכור או סיור מאורגן.", tags: ["history", "daytrip"], kids: true, effort: 2, paid: true }
];

const AREA_STATIONS = { center: "Syntagma", plaka: "Monastiraki", kolonaki: "Evangelismos", gazi: "Kerameikos", coast: "Piraeus", far: "Piraeus" };

const HOTELS = [
  { id: "gb", he: "מלון גראנד בריטאן", en: "Hotel Grande Bretagne, A Luxury Collection Hotel", stars: 5, area: "סינטגמה", lat: 37.9757, lng: 23.7344, wiki: "Hotel Grande Bretagne",
    why: "המלון ההיסטורי של אתונה, מול הפרלמנט ובמרכז העניינים. בריכת גג עם נוף לאקרופוליס ושירות ברמה בינלאומית. מתאים למי שרוצה הכול בהליכה.",
    addr: "Vasileos Georgiou A’ 1, Syntagma Square", phone: "+30 210 333 0000", web: "https://www.grandebretagne.gr", price: [400, 700], metro: "Syntagma" },
  { id: "kg", he: "מלון קינג ג׳ורג׳", en: "King George, A Luxury Collection Hotel", stars: 5, area: "סינטגמה", lat: 37.9757, lng: 23.7358, wiki: "",
    why: "מלון בוטיק יוקרתי מול הפרלמנט, חדרים מעוצבים ומסעדת גג. קטן ואינטימי יותר מ-Grande Bretagne.",
    addr: "Vasileos Georgiou A’ 3, Syntagma Square", phone: "", web: "https://www.kinggeorge.gr", price: [380, 650], metro: "Syntagma" },
  { id: "electra", he: "מלון אלקטרה פאלאס", en: "Electra Palace Athens", stars: 5, area: "פלאקה", lat: 37.9729, lng: 23.7295, wiki: "",
    why: "בלב פלאקה, מרחק הליכה קצר מהאקרופוליס. בגג בריכה ומסעדה עם נוף ישיר לאקרופוליס; יחס מחיר-איכות טוב לדירוג 5 כוכבים.",
    addr: "Nikodimou 18, Plaka", phone: "+30 210 337 0000", web: "https://www.electrahotels.gr", price: [170, 300], metro: "Syntagma / Akropoli" },
  { id: "hilton", he: "הילטון אתונה", en: "Hilton Athens", stars: 5, area: "אמבלוקיפי / אוואנגליסמוס", lat: 37.9751, lng: 23.7482, wiki: "Hilton Athens",
    why: "מלון גדול ומוכר עם בריכה, ספא ושירות עקבי. 5 דקות הליכה מתחנת Evangelismos, ושקט יחסית. נוח לנוסעים עם ילדים.",
    addr: "Vasilissis Sofias 46", phone: "+30 210 728 1000", web: "https://www.hilton.com", price: [150, 260], metro: "Evangelismos" },
  { id: "divani", he: "דיוואני קרוול", en: "Divani Caravel Hotel", stars: 5, area: "זוגראפו / מרכז-מזרח", lat: 37.9750, lng: 23.7550, wiki: "",
    why: "מלון עם בריכה וגינה ושעות פעילות רחבות; פחות תיירותי, מתאים למי שמעדיף שקט. נסיעה קצרה במונית או אוטובוס למרכז.",
    addr: "Vasileos Alexandrou 2, Athens", phone: "+30 210 720 7000", web: "https://www.divanis.com", price: [120, 220], metro: "Evangelismos / Megaro Moussikis" },
  { id: "herodion", he: "מלון הרודיון", en: "Herodion Hotel", stars: 4, area: "מקריאני — ליד האקרופוליס", lat: 37.9665, lng: 23.7270, wiki: "",
    why: "מלון 4 כוכבים, מרחק 3–5 דקות הליכה ממוזיאון האקרופוליס ומהכניסה לאקרופוליס; גג עם נוף. נוח מאוד למי שלא רוצה ללכת הרבה.",
    addr: "Rovertou Galli 4, Makrygianni", phone: "+30 210 923 6832", web: "https://www.herodion.gr", price: [110, 190], metro: "Akropoli" }
];
const HOTEL_NOTE = "המחירים משוערים ללילה לחדר זוגי כולל ארוחת בוקר בחורף, ומשתנים לפי תאריכים וחגים. בדקו מחיר מעודכן באתר המלון לפני ההזמנה.";

const RESTAURANTS = [
  { id: "psaras", he: "טברנת פסארס", en: "Psaras Taverna", type: "טברנה יוונית — דגים ומזה", area: "פלאקה", addr: "Erechtheos 16, Plaka", price: [20, 35], lat: 37.9726, lng: 23.7305, desc: "טברנה ותיקה בפלאקה עם חצר. דגים טריים ומזה.", web: "" },
  { id: "strofi", he: "סטרופי", en: "Strofi", type: "יווני מסורתי — גג עם נוף לאקרופוליס", area: "מקריאני", addr: "Rovertou Galli 25, Makrygianni", price: [30, 45], lat: 37.9669, lng: 23.7266, desc: "מסעדה עם גג ונוף ישיר לאקרופוליס. מומלץ להזמין מראש לערב.", web: "" },
  { id: "daphne", he: "דפנה", en: "Daphne’s", type: "יווני מודרני-יוקרתי", area: "פלאקה", addr: "Lysikratous 4, Plaka", price: [45, 80], lat: 37.9707, lng: 23.7305, desc: "בית ניאו-קלאסי עם ציורי קיר וחצר. ארוחה חגיגית.", web: "" },
  { id: "diporto", he: "דיפורטו", en: "Diporto", type: "קוטוקי (מרתף) — מטבח ביתי", area: "אומוניה / ורבקיוס", addr: "Sokratous 9 & Theatrou, Omonia", price: [12, 22], lat: 37.9812, lng: 23.7262, desc: "מרתף מפורסם ללא תפריט כתוב — מגישים מה שיש. לרוב מזומן בלבד.", web: "" },
  { id: "bairaktaris", he: "בייראקטריס", en: "Bairaktaris", type: "קבאב וסובלקי", area: "מונסטיראקי", addr: "Monastiraki Square 2", price: [15, 25], lat: 37.9760, lng: 23.7256, desc: "מקום מפורסם בכיכר מונסטיראקי, סובלקי ויווני מסורתי.", web: "" },
  { id: "thanasis", he: "תנאסיס", en: "Thanasis", type: "קבאב (קבאב-פיתה)", area: "מונסטיראקי", addr: "Mitropoleos 69, Monastiraki", price: [8, 15], lat: 37.9759, lng: 23.7254, desc: "פיתה ובשר על האש, מנה זולה ומשביעה.", web: "" },
  { id: "tzitzikas", he: "צ׳יציקס ומרמינגס", en: "Tzitzikas & Mermingas", type: "יווני מודרני — מזה", area: "סינטגמה", addr: "Mitropoleos 12–14", price: [18, 32], lat: 37.9769, lng: 23.7322, desc: "מזות מודרניות על בסיס חומרי גלם יווניים; קרוב למרכז.", web: "" },
  { id: "mavroprovato", he: "מאברו פרובאטו", en: "Mavro Provato", type: "יווני מודרני", area: "פנגרטי", addr: "Arrianou 31, Pangrati", price: [22, 38], lat: 37.9654, lng: 23.7484, desc: "אהוב על המקומיים; שכונת פנגרטי השקטה.", web: "" },
  { id: "karamanlidika", he: "קרמנלידיקה של פאני", en: "Karamanlidika tou Fani", type: "דלי יווני — נקניקים וגבינות", area: "אומוניה / ורבקיוס", addr: "Sokratous 1 & Evripidou", price: [15, 28], lat: 37.9803, lng: 23.7266, desc: "נקניקים וגבינות יווניות, יין, וצלחות מזה. ליד שוק ורבקיוס.", web: "" },
  { id: "ariston", he: "אריסטון (מאפים)", en: "Ariston", type: "טירופיטה ומאפים", area: "סינטגמה", addr: "Voulis 10", price: [3, 8], lat: 37.9766, lng: 23.7334, desc: "מאפייה ותיקה של פשטידות גבינה ותרד (טירופיטה, ספנקופיטה).", web: "" },
  { id: "lukumades", he: "לוקומאדס", en: "Lukumades", type: "קינוח — לוקומאדס", area: "מרכז", addr: "Aiolou 15", price: [5, 10], lat: 37.9784, lng: 23.7266, desc: "כדורי בצק מטוגנים עם דבש וקינמון.", web: "" },
  { id: "spondi", he: "ספונדי", en: "Spondi", type: "יוקרה — מישלן (מטבח צרפתי-יווני)", area: "פנגרטי", addr: "Pyrronos 5, Pangrati", price: [120, 220], lat: 37.9627, lng: 23.7467, desc: "אחת המסעדות היוקרתיות בעיר; דורשת הזמנה מראש.", web: "https://www.spondi.gr" }
];
const REST_NOTE = "המחירים משוערים לסועד (בלי יין). לטלפון והזמנת מקום — לחצו על ״פתח בגוגל מפות״, שם מופיעים הפרטים העדכניים.";

const FOODS = [
  { he: "סובלקי", en: "Souvlaki", gr: "Σουβλάκι", wiki: "Souvlaki", ing: "נתחי בשר (חזיר או עוף) על שיפוד, פיתה, עגבנייה, בצל וטזיקי.", note: "מנה מהירה ומשביעה, בדרך כלל €3–5." },
  { he: "גירוס", en: "Gyros", gr: "Γύρος", wiki: "Gyros", ing: "בשר מסתובב על גריל אנכי, בפיתה עם בצל, עגבנייה, צ׳יפס וטזיקי.", note: "הגרסה היוונית של שווארמה." },
  { he: "מוסקה", en: "Moussaka", gr: "Μουσακάς", wiki: "Moussaka", ing: "חצילים, בשר טחון, תפוחי אדמה, רוטב עגבניות ובשמל.", note: "בדרך כלל אינה כשרה — כוללת בשר וחלב." },
  { he: "סלט יווני (חוריאטיקי)", en: "Greek Salad (Horiatiki)", gr: "Χωριάτικη σαλάτα", wiki: "Greek salad", ing: "עגבניות, מלפפון, בצל, זיתים, גבינת פטה שלמה ושמן זית.", note: "בלי חסה — כך מגישים אותו ביוון." },
  { he: "ספנקופיטה", en: "Spanakopita", gr: "Σπανακόπιτα", wiki: "Spanakopita", ing: "בצק פילו, תרד, גבינת פטה ובצל ירוק.", note: "מצוין לארוחת בוקר מהירה." },
  { he: "טירופיטה", en: "Tiropita", gr: "Τυρόπιτα", wiki: "Tiropita", ing: "בצק פילו וגבינות (פטה וריקוטה).", note: "מוכרים במאפיות בכל פינה." },
  { he: "טזיקי", en: "Tzatziki", gr: "Τζατζίκι", wiki: "Tzatziki", ing: "יוגורט יווני, מלפפון, שום, שמן זית ושמיר או נענע.", note: "נשאר ליד הפיתה בכל ארוחה." },
  { he: "דולמאדס", en: "Dolmades", gr: "Ντολμαδάκια", wiki: "Dolma", ing: "עלי גפן ממולאים באורז, עשבי תיבול ולעיתים בשר.", note: "יש גרסה צמחונית (גיאלנג׳י)." },
  { he: "גמיסטה", en: "Gemista", gr: "Γεμιστά", wiki: "Gemista", ing: "עגבניות ופלפלים ממולאים באורז, עשבים ולעיתים בשר טחון.", note: "מנה ביתית קיצית." },
  { he: "פסטיציו", en: "Pastitsio", gr: "Παστίτσιο", wiki: "Pastitsio", ing: "פסטה, בשר טחון ברוטב עגבניות ובשמל.", note: "קרוב ללזניה יוונית." },
  { he: "סאגאנאקי", en: "Saganaki", gr: "Σαγανάκι", wiki: "Saganaki", ing: "גבינה (קפלוטירי או גרביירה) מטוגנת במחבת, עם לימון.", note: "מנת פתיחה חמה פופולרית." },
  { he: "פאבה", en: "Fava", gr: "Φάβα", wiki: "Fava (dish)", ing: "מחית אפונה צהובה מפוצלת, שמן זית, בצל ולימון.", note: "מנה ותיקה בקיקלדים; צמחונית." },
  { he: "קלפטיקו", en: "Kleftiko", gr: "Κλέφτικο", wiki: "Kleftiko", ing: "בשר כבש (לרוב) אפוי לאט עם תפוחי אדמה, שום ותבלינים.", note: "מנה חגיגית." },
  { he: "לוקומאדס", en: "Loukoumades", gr: "Λουκουμάδες", wiki: "Loukoumades", ing: "כדורי בצק מטוגנים בשמן עמוק עם דבש, קינמון ואגוזים.", note: "קינוח רחוב מהיר ומתוק." },
  { he: "בקלאווה", en: "Baklava", gr: "Μπακλαβάς", wiki: "Baklava", ing: "בצק פילו, אגוזים (מלך או פיסטוק) ודבש-סירופ.", note: "מתוק מאוד." },
  { he: "גלקטובוריקו", en: "Galaktoboureko", gr: "Γαλακτομπούρεκο", wiki: "Galaktoboureko", ing: "פילו וקרם סולת או חלב, מוגש עם סירופ.", note: "בדרך כלל חלבי." },
  { he: "בוגצה", en: "Bougatsa", gr: "Μπουγάτσα", wiki: "Bougatsa", ing: "בצק פילו במילוי קרם סולת, גבינה או בשר.", note: "מאפה בוקר — מקורו בצפון יוון." },
  { he: "קולוריה", en: "Koulouri", gr: "Κουλούρι", wiki: "Koulouri", ing: "לחמניה טבולה בשומשום בצורת טבעת.", note: "מוכרים ברחוב; מצוין לבוקר." },
  { he: "קפה יווני", en: "Greek Coffee", gr: "Ελληνικός καφές", wiki: "Greek coffee", ing: "קפה טחון דק מבושל בג׳זווה, מוגש עם הסלע.", note: "לא מערבבים — נותנים לשקוע." },
  { he: "פרפה (קפה קר)", en: "Frappé", gr: "Φραπέ", wiki: "Frappé coffee", ing: "קפה נמס קר, חלב ותוספת סוכר לפי רצון.", note: "משקה אתונאי מובהק." },
  { he: "אוזו", en: "Ouzo", gr: "Ούζο", wiki: "Ouzo", ing: "משקה אניס — מוגש עם מים וקרח והופך לחלבי.", note: "מלווה מזות." },
  { he: "רצינה", en: "Retsina", gr: "Ρετσίνα", wiki: "Retsina", ing: "יין לבן עם שרף אורן.", note: "טעם מיוחד — חלק אוהבים." },
  { he: "חלווה", en: "Halva", gr: "Χαλβάς", wiki: "Halva", ing: "סולת או טחינה עם סוכר ואגוזים.", note: "מתאים לצמחונים בצום הנוצרי." }
];

const SHOPS = [
  { he: "רחוב ארמו", en: "Ermou Street", type: "רחוב קניות", addr: "מ-Syntagma עד Monastiraki", desc: "רחוב מדרחוב ארוך עם רשתות אופנה בינלאומיות." },
  { he: "קולונקי", en: "Kolonaki", type: "בוטיקים ויוקרה", addr: "Skoufa, Tsakalof, Patriarchou Ioakeim", desc: "אופנה, תכשיטים ועיצוב יווני." },
  { he: "אטיקה — חנות כלבו", en: "Attica Department Store", type: "חנות כלבו", addr: "Panepistimiou 9, Syntagma", desc: "מותגים ובעיקר בגדים ואיפור, ליד סינטגמה." },
  { he: "המול אתונה", en: "The Mall Athens", type: "קניון", addr: "Andrea Papandreou 35, Marousi", desc: "קניון גדול עם אפשרויות אוכל ובידור.", metro: "קו 1 — Marousi או KAT (בדקו)" },
  { he: "אתנס מטרו מול", en: "Athens Metro Mall", type: "קניון", addr: "ליד תחנת Agios Dimitrios (קו 2)", desc: "קניון נוח לנסיעה במטרו." },
  { he: "מק׳ארתרגלן — אאוטלט", en: "McArthurGlen Athens Designer Outlet", type: "אאוטלט מעצבים", addr: "ליד נמל התעופה (אזור ספטה) — כתובת באתר", desc: "מותגים בהנחה; כדאי לשלב בדרך לשדה התעופה.", web: "https://www.mcarthurglen.com" },
  { he: "גליפדה", en: "Glyfada", type: "קניות וחוף", addr: "הפרוור הדרומי (טראם מ-Syntagma)", desc: "רחובות קניות, בתי קפה וקרבה לים." }
];
const SHOP_NOTE = "החזר מע״מ: מבקרים מחוץ לאיחוד האירופי זכאים להחזר (בדרך כלל מעל כ-€50 בחנות אחת). בקשו טופס בקופה. שעות קניות רגילות: חלק מהחנויות סגורות אחה״צ ובימי ראשון, ובמרכז התיירותי הרבה פתוח גם בשבת וראשון.";
const SHOP_GIFTS = ["שמן זית וזיתים", "דבש יווני", "מסטיכה (מסטיחה) וממתקים", "תבלינים ותה הרים", "ספוגים טבעיים", "קוסמטיקה יוונית", "עבודות עור וסנדלים"];

const MARKETS = [
  { he: "שוק הפשפשים מונסטיראקי", en: "Monastiraki Flea Market", gr: "Αγορά Μοναστηρακίου", addr: "Ifestou, Monastiraki", hours: "פתוח כל יום; ראשון בבוקר — שוק הפשפשים הגדול (כיכר Avissinias).", how: "מטרו Monastiraki — ממש בתחנה.", wiki: "Monastiraki", desc: "מזכרות, עתיקות ויד שנייה. התמקחו בנימוס." },
  { he: "שוק ורבקיוס (השוק המרכזי)", en: "Varvakios Central Market", gr: "Βαρβάκειος Αγορά", addr: "Athinas 42", hours: "בדרך כלל ב׳–ש׳ בבוקר ועד אחה״צ; סגור בראשון (משוער).", how: "מטרו Omonia או Monastiraki.", wiki: "Varvakios Agora", desc: "בשר, דגים, ירקות ותבלינים. מסעיר, ריחני וצפוף." },
  { he: "שוק תבלינים — רחוב אבריפידוס", en: "Evripidou Spice Street", gr: "Ευριπίδου", addr: "Evripidou", hours: "בשעות היום — חנויות.", how: "מטרו Omonia / Monastiraki.", wiki: "", desc: "חנויות תבלינים, תה, אגוזים ושמן זית." },
  { he: "השוק היומי (לייקי)", en: "Laiki Agora (street markets)", gr: "Λαϊκή Αγορά", addr: "לפי יום ושכונה (למשל Kallidromiou בשבת)", hours: "בבוקר, בדרך כלל עד אחה״צ מוקדם.", how: "מטרו Panepistimio/Omonia ומשם בהליכה.", wiki: "", desc: "פירות וירקות מקומיים. טיפ: להיות עדינים עם הנוהל — לא לגעת בלי רשות." }
];

const TIPS = [
  { t: "חירום", i: "🚨", items: ["מספר חירום אחיד באירופה: 112", "משטרה: 100 · אמבולנס: 166 · כיבוי אש: 199", "משטרת תיירים: 1571", "שגרירות ישראל באתונה: Marathonodromou 1, Psychiko"] },
  { t: "כסף", i: "💶", items: ["המטבע: אירו (€).", "כרטיסי אשראי מתקבלים כמעט בכל מקום; מזומן מומלץ לקוטוקי ולשווקים.", "טיפ במסעדה: 5–10% — אם לא כלול בחשבון.", "הימנעו מהחלפת כסף במגרש תיירים — עדיפות לכספומט של בנק."] },
  { t: "בטיחות", i: "🛡️", items: ["כייסים פעילים במטרו, במונסטיראקי ובכיכר סינטגמה — שמרו על התיק מלפנים.", "אל תקבלו ״מתנות״ מזדמנים (צמידים וכד׳) — לרוב יבקשו תשלום.", "בלילה הרחבות המרכזיות בטוחות יחסית, אבל אזור אומוניה פחות — היזהרו."] },
  { t: "שפה וסימנים", i: "🗣️", items: ["יאסו — שלום · קלימרה — בוקר טוב · קלספרה — ערב טוב", "אפחריסטו — תודה · פרקלו — בבקשה", "נה — כן · אוחי — לא · סיגנומי — סליחה", "פוסו קאני — כמה זה עולה? · לוגריאסמו — החשבון, בבקשה", "הכתב היווני שונה — לעיתים כדאי להשתמש בתרגום מצלמה."] },
  { t: "שעות פעילות", i: "🕒", items: ["אחרי הצהריים רבות מהחנויות סגורות — בבוקר ובערב פתוחות.", "מסעדות: ארוחת ערב מתחילה ב-20:00–21:00.", "ימי ראשון: רוב החנויות סגורות מלבד אזורי תיירות.", CLOSED_NOTE] },
  { t: "תחבורה והתמצאות", i: "🚇", items: ["המטרו נקי ובטוח ופועל עד חצות (בשישי-שבת מאוחר יותר).", "אפליקציית מוניות: FREENOW (לשעבר Beat) ו-Uber פועלים בעיר.", "שביתות תחבורה נפוצות בעיר — בדקו באתר OASA/חדשות לפני נסיעות חשובות.", "מומלץ להוריד מפות Google לשימוש אופליין."] },
  { t: "לבוש ונעליים", i: "👟", items: ["נעליים נוחות וסגורות — הרחובות והסלעים ליד האקרופוליס חלקים.", "בכנסיות ובמנזרים — כיסוי כתפיים וברכיים.", "בנובמבר–מרץ: קרירות עם גשם אפשרי — קחו מעיל קל ומטרייה."] },
  { t: "בריאות ושונות", i: "💧", items: ["מי ברז בטוחים לשתייה, אך רבים קונים מים בבקבוק.", "חשמל: 230V, תקע אירופי (סוג C/F).", "מומלץ לקנות ביטוח נסיעות רפואי לפני הטיול.", "קחו קרם הגנה וכובע גם בחורף — השמש חזקה."] },
  { t: "תיירות מקומית", i: "🏛️", items: ["הכניסה לאקרופוליס בחלון זמן — הזמינו מראש ב-hhticket.gr.", "בתי קפה ומסעדות: ״שבו כמה שרוצים״ — אין תחושה של לחץ לפנות שולחן.", "הצטרפו לסיורי הליכה חינם בעברית/אנגלית — בדקו בביקורות עדכניות."] },
  { t: "קהילה יהודית ואוכל כשר", i: "✡️", items: ["בית הכנסת: Beth Shalom, Melidoni 5, בפסירי; המוזיאון היהודי: Nikis 39.", "לאוכל כשר פנו לקהילה היהודית באתונה — לברר מראש שעות ופרטים.", "חלק מהמנות היווניות מבוססות בשר-חלב יחד — בררו מה כשר לכם."] }
];

const EVENTS = [
  { d: "13/11/2026", h: "21:30", t: "דימיטריס יפנטיס — הופעה (Stage7)", type: "מוזיקה", venue: "Stage7", note: "" },
  { d: "14/11/2026", h: "21:30", t: "The Jazz Express — פרנקי פוגש את אלה על האוריינט אקספרס", type: "ג׳אז", venue: "—", note: "" },
  { d: "14/11/2026", h: "23:55", t: "Raw Showcase: Athens — מסיבת טכנו (Soundnow x RAW)", type: "מסיבה/אלקטרוני", venue: "—", note: "" },
  { d: "19/11/2026", h: "21:00", t: "Lena Platonos at Klakaz (DJ set)", type: "מוזיקה", venue: "Klakaz", note: "" },
  { d: "20/11/2026", h: "", t: "Aephanemer", type: "מטאל", venue: "Arch Club", note: "" },
  { d: "21/11/2026", h: "20:30", t: "Käärijä", type: "פופ", venue: "Gagarin 205", note: "" },
  { d: "28/11/2026", h: "19:00", t: "Two Nights Beyond the Pale Dawn: Yellow Eyes, Ultha, Sun Worship", type: "מטאל", venue: "—", note: "" },
  { d: "29/11/2026", h: "", t: "Arab Strap", type: "רוק אלטרנטיבי", venue: "Gazarte Ground Stage", note: "" },
  { d: "30/11/2026", h: "", t: "Eagle-Eye Cherry", type: "רוק/פופ", venue: "Fuzz Club", note: "" },
  { d: "05/12/2026", h: "23:00", t: "Charlotte de Witte", type: "טכנו", venue: "OAKA — Spiros Louis", note: "" },
  { d: "06/12/2026", h: "", t: "Nazareth", type: "רוק", venue: "Fuzz Club", note: "" },
  { d: "07/12/2026", h: "", t: "Kovacs", type: "פופ אלטרנטיבי", venue: "Gagarin 205", note: "" },
  { d: "09/12/2026", h: "21:30", t: "Mirela Pachou & Adam Tsarouchis — Christmas Together", type: "מוזיקה", venue: "—", note: "" },
  { d: "09/12/2026", h: "", t: "Combichrist", type: "תעשייתי", venue: "Kyttaro Club", note: "" },
  { d: "15/12/2026", h: "21:00", t: "Panos Vlachos Acoustic Live", type: "לאיקו/יווני", venue: "—", note: "" },
  { d: "19/12/2026", h: "", t: "Bryan Adams", type: "רוק", venue: "Telekom Center Athens", note: "" },
  { d: "19/12/2026", h: "", t: "Chelsea Wolfe", type: "רוק", venue: "Floyd", note: "" }
];
const EVENT_LINKS = [
  { he: "כרטיסי הופעות", en: "More.com", web: "https://www.more.com" },
  { he: "כרטיסי הופעות — Viva", en: "Viva.gr", web: "https://www.viva.gr" },
  { he: "אולם הקונצרטים של אתונה", en: "Megaron", web: "https://www.megaron.gr" },
  { he: "האופרה הלאומית", en: "Greek National Opera", web: "https://www.nationalopera.gr" },
  { he: "קרן אונסיס — Stegi", en: "Onassis Stegi", web: "https://www.onassis.org" }
];
const SPORT_LINKS = [
  { he: "אולימפיאקוס", web: "https://www.olympiacos.org", note: "כדורגל וכדורסל" },
  { he: "פנאתינאיקוס", web: "https://www.pao.gr", note: "כדורגל וכדורסל" },
  { he: "AEK אתונה", web: "https://www.aekfc.gr", note: "כדורגל וכדורסל" },
  { he: "יורוליג", web: "https://www.euroleaguebasketball.net", note: "לוח משחקי כדורסל" }
];
const EVENT_NOTE = "הרשימה נאספה ממקורות כרטוס ציבוריים. תאריכים ושעות עלולים להשתנות — אמתו באתר הכרטוס לפני רכישה. ללוח משחקים מדויק — לחצו על קישורי הקבוצות.";

/* ===== מטרו ===== */
const LINES = {
  1: { he: "קו 1 (ירוק)", color: "#1e9e4a", from: "Piraeus (פיראוס)", to: "Kifissia (קיפיסיה)", st: ["piraeus","faliro","moschato","kallithea","tavros","petralona","thiseio","monastiraki","omonia","victoria","attiki","agnikolaos","katopatissia","ageleftherios","anopatissia","perissos","pefkakia","neaionia","iraklio","irini","neratziotissa","maroussi","kat","kifissia"] },
  2: { he: "קו 2 (אדום)", color: "#e53935", from: "Anthoupoli (אנתופולי)", to: "Elliniko (אליניקו)", st: ["anthoupoli","peristeri","agantonios","sepolia","attiki","larissa","metaxourgeio","omonia","panepistimio","syntagma","akropoli","syngroufix","neoskosmos","agioannis","dafni","agdimitrios","ilioupoli","alimos","argyroupoli","elliniko"] },
  3: { he: "קו 3 (כחול)", color: "#1e88e5", from: "Dimotiko Theatro (דימוטיקו תיאטרו)", to: "Airport (נמל התעופה)", st: ["dimotiko","piraeus","maniatika","nikaia","korydallos","agvarvara","agmarina","egaleo","eleonas","kerameikos","monastiraki","syntagma","evangelismos","megaro","ambelokipi","panormou","katehaki","ethnikiamyna","holargos","nomismatokopio","agparaskevi","halandri","doukissis","pallini","paiania","koropi","airport"] }
};
/* שם, עברית, יוונית (לתחנות עיקריות), קואורדינטות משוערות (לתחנות עיקריות) */
const ST = {
  piraeus: ["Piraeus", "פיראוס", "Πειραιάς", 37.9482, 23.6430], faliro: ["Faliro", "פאליירו", "", 37.9448, 23.6654], moschato: ["Moschato", "מושחאטו"], kallithea: ["Kallithea", "קליתאה", "", 37.9603, 23.6975], tavros: ["Tavros", "טברוס"],
  petralona: ["Petralona", "פטרלונה", "", 37.9686, 23.7092], thiseio: ["Thiseio", "תיסיו", "Θησείο", 37.9770, 23.7185], monastiraki: ["Monastiraki", "מונסטיראקי", "Μοναστηράκι", 37.9760, 23.7258],
  omonia: ["Omonia", "אומוניה", "Ομόνοια", 37.9841, 23.7280], victoria: ["Victoria", "ויקטוריה", "Βικτώρια", 37.9930, 23.7303], attiki: ["Attiki", "אטיקי", "Αττική", 37.9996, 23.7222], agnikolaos: ["Agios Nikolaos", "אגיוס ניקולאוס"],
  katopatissia: ["Kato Patissia", "קאטו פטיסיה"], ageleftherios: ["Agios Eleftherios", "אגיוס אלפתריוס"], anopatissia: ["Ano Patissia", "אנו פטיסיה"], perissos: ["Perissos", "פריסוס"], pefkakia: ["Pefkakia", "פפקקיה"],
  neaionia: ["Nea Ionia", "נאה יוניה"], iraklio: ["Iraklio", "איראקליו"], irini: ["Irini", "איריני"], neratziotissa: ["Neratziotissa", "נראצ׳יוטיסה", "", 38.0450, 23.7927], maroussi: ["Maroussi", "מרוסי", "", 38.0558, 23.8087],
  kat: ["KAT", "קאט"], kifissia: ["Kifissia", "קיפיסיה", "Κηφισιά", 38.0737, 23.8114],
  anthoupoli: ["Anthoupoli", "אנתופולי", "", 38.0170, 23.6924], peristeri: ["Peristeri", "פריסטרי"], agantonios: ["Agios Antonios", "אגיוס אנטוניוס", "", 38.0066, 23.6995], sepolia: ["Sepolia", "ספוליה", "", 38.0027, 23.7119],
  larissa: ["Larissa Station", "תחנת לריסה", "Σταθμός Λαρίσης", 37.9922, 23.7211], metaxourgeio: ["Metaxourgeio", "מטקסורגיו", "", 37.9863, 23.7213], panepistimio: ["Panepistimio", "פנפיסטימיו", "", 37.9807, 23.7326],
  syntagma: ["Syntagma", "סינטגמה", "Σύνταγμα", 37.9755, 23.7355], akropoli: ["Akropoli", "אקרופולי", "Ακρόπολη", 37.9684, 23.7298], syngroufix: ["Syngrou-Fix", "סינגרו-פיקס", "", 37.9643, 23.7262], neoskosmos: ["Neos Kosmos", "נאוס קוסמוס", "", 37.9576, 23.7280],
  agioannis: ["Agios Ioannis", "אגיוס יואניס"], dafni: ["Dafni", "דפני", "", 37.9494, 23.7372], agdimitrios: ["Agios Dimitrios", "אגיוס דימיטריוס", "", 37.9406, 23.7405], ilioupoli: ["Ilioupoli", "איליופולי"], alimos: ["Alimos", "אלימוס", "", 37.9183, 23.7448],
  argyroupoli: ["Argyroupoli", "ארגירופולי"], elliniko: ["Elliniko", "אליניקו", "Ελληνικό", 37.8926, 23.7460],
  dimotiko: ["Dimotiko Theatro", "דימוטיקו תיאטרו", "", 37.9437, 23.6475], maniatika: ["Maniatika", "מניאטיקה"], nikaia: ["Nikaia", "ניקאיה", "", 37.9663, 23.6476], korydallos: ["Korydallos", "קוריידלוס"], agvarvara: ["Agia Varvara", "אגיה ורוורה"],
  agmarina: ["Agia Marina", "אגיה מרינה"], egaleo: ["Egaleo", "אגאלאו"], eleonas: ["Eleonas", "אלאונס"], kerameikos: ["Kerameikos", "קרמיקוס", "Κεραμεικός", 37.9786, 23.7113], evangelismos: ["Evangelismos", "אוואנגליסמוס", "Ευαγγελισμός", 37.9765, 23.7468],
  megaro: ["Megaro Moussikis", "מגרו מוסיקיס", "", 37.9792, 23.7536], ambelokipi: ["Ambelokipi", "אמבלוקיפי", "", 37.9872, 23.7570], panormou: ["Panormou", "פנורמו"], katehaki: ["Katehaki", "קטחקי"], ethnikiamyna: ["Ethniki Amyna", "אתניקי אמינה"],
  holargos: ["Holargos", "חולארגוס"], nomismatokopio: ["Nomismatokopio", "נומיסמטוקופיו"], agparaskevi: ["Agia Paraskevi", "אגיה פרסקבי"], halandri: ["Halandri", "חלנדרי"], doukissis: ["Doukissis Plakentias", "דוקיסיס פלקנטיאס"],
  pallini: ["Pallini", "פליני"], paiania: ["Paiania-Kantza", "פאיאניה-קנצה"], koropi: ["Koropi", "קורופי", "", 37.9006, 23.8993], airport: ["Athens Airport", "נמל התעופה אתונה", "Αεροδρόμιο", 37.9364, 23.9445]
};
const INTERCHANGES = { omonia: "קווים 1+2", attiki: "קווים 1+2", monastiraki: "קווים 1+3", syntagma: "קווים 2+3 וטראם", piraeus: "קווים 1+3 (נמל)" };

const STATION_INFO = [
  { id: "akropoli", near: ["האקרופוליס (5 דק׳)", "מוזיאון האקרופוליס (ממש ליד)", "פלאקה"], wiki: "Acropolis of Athens" },
  { id: "syntagma", near: ["כיכר סינטגמה והפרלמנט", "הגן הלאומי", "פלאקה ואנפיוטיקה"], wiki: "Syntagma Square" },
  { id: "monastiraki", near: ["האגורה הרומית", "ספריית אדריאנוס", "שוק הפשפשים"], wiki: "Monastiraki" },
  { id: "thiseio", near: ["האגורה העתיקה (כניסה)", "מקדש הפייסטוס", "גבעת פילופאפוס"], wiki: "Ancient Agora of Athens" },
  { id: "kerameikos", near: ["אתר קרמיקוס", "שכונת גאזי"], wiki: "Kerameikos" },
  { id: "evangelismos", near: ["קולונקי", "רכבל ליקאבטוס (הליכה)", "הילטון אתונה"], wiki: "Lycabettus" },
  { id: "omonia", near: ["שוק ורבקיוס (הליכה)", "אבריפידוס — תבלינים", "פסירי"], wiki: "Omonia Square" },
  { id: "victoria", near: ["המוזיאון הארכיאולוגי הלאומי (הליכה)"], wiki: "National Archaeological Museum, Athens" },
  { id: "piraeus", near: ["נמל פיראוס — מעבורות לאיים", "מיקרוליקאנו (הסעה קצרה)"], wiki: "Port of Piraeus" },
  { id: "airport", near: ["נמל התעופה אלפתריוס ונייזלוס"], wiki: "Athens International Airport" }
];

const FARES = [
  ["כרטיס 90 דקות (מטרו, אוטובוס, טראם)", "€1.20", "הנחה €0.50 (ילדים 6–18, גמלאים 65+, סטודנטים). ילדים עד 6 — חינם."],
  ["כרטיס יומי (24 שעות)", "€4.10", "לא כולל שדה התעופה."],
  ["כרטיס 5 ימים", "€8.20", "לא כולל שדה התעופה."],
  ["מטרו לשדה התעופה (כיוון אחד)", "€9", "הלוך-חזור כ-€16 (לפי מקורות)."],
  ["כרטיס תייר ל-3 ימים", "€20", "כולל נסיעה הלוך-חזור לשדה (מחיר עשוי להשתנות)."],
  ["אוטובוס אקספרס X95 לשדה (סינטגמה)", "€5.50", "מגיע 24/7; כ-60–75 דק׳ תלוי בתנועה."],
  ["קנס על נסיעה ללא כרטיס", "כ-€72", "60 מחיר כרטיס רגיל."]
];
const TRANSPORT = [
  { t: "מטרו", i: "🚇", d: "3 קווים, 66 תחנות. פתוח בדרך כלל 05:00/05:30–00:00; בשישי ושבת נסיעות מאוחרות עד כ-02:00; ובשבתות פועל גם 24 שעות (קווים 2 ו-3, לפי מקורות). השילוט בתחנות ביוונית ובאנגלית.", tip: "אל תשכחו לקלף/להצמיד את הכרטיס בכניסה." },
  { t: "מוניות", i: "🚕", d: "צהובות עם מונה. אפליקציות: FREENOW ו-Uber. בין שדה התעופה למרכז — תעריף קבוע כ-€40 ביום וכ-€55 בלילה (משוער). נסיעות קצרות בעיר בדרך כלל €6–12 (משוער).", tip: "ודאו שהמונה פועל ושהנהג משתמש בו." },
  { t: "אוטובוסים וטרוליבוסים", i: "🚌", d: "כרטיס 90 הדקות תקף גם באוטובוס. רשת צפופה. קווי אקספרס לשדה: X95 (סינטגמה), X96 (פיראוס), X93 (תחנת KTEL Kifissos); X80 מפיראוס דרך האקרופוליס לסינטגמה.", tip: "השילוט ביוונית ובאנגלית." },
  { t: "טראם", i: "🚋", d: "מקשר את סינטגמה לחוף הדרומי (גליפדה, וולה, פיקרודפני) וקו נוסף לפיראוס. לעיתים יש שינויים בעבודות — בדקו באפליקציה.", tip: "אותו כרטיס 90 דקות." },
  { t: "רכבת פרוורית", i: "🚆", d: "Proastiakos מהשדה לתחנת Larissa Station (אתונה) ולקורינתוס. נוח לטיול ליום לפלופונס.", tip: "כרטיס נפרד לפי יעד." },
  { t: "השכרת רכב", i: "🚗", d: "בשדה התעופה ובמרכז העיר. בחורף כ-€25–50 ליום לרכב קטן (משוער). חניה במרכז יקרה, התנועה צפופה, וגם כבישי אגרה (Attiki Odos) — מתאים בעיקר לטיולי יום מחוץ לעיר.", tip: "בדקו מול החברה אם נדרש רישיון נהיגה בינלאומי." },
  { t: "מעבורות ואיים", i: "⛴️", d: "נמל Piraeus הוא הנמל הגדול. ספינות לאיים סרונים (אגינה, פורוס, הידרה) כל היום; בחורף בתדירות נמוכה יותר.", tip: "בדקו לוח הפלגות יום לפני." }
];
const GETTING_AROUND = [
  { from: "שדה התעופה → סינטגמה", how: "מטרו קו 3 — כ-40 דקות, €9. או אוטובוס X95 — €5.50, 24 שעות." },
  { from: "סינטגמה → אקרופוליס", how: "קו 2 תחנה אחת (Akropoli) — או הליכה של 15 דקות דרך פלאקה." },
  { from: "סינטגמה → פיראוס (מעבורות)", how: "קו 3 ל-Monastiraki, החלפה לקו 1 לכיוון Piraeus. כ-25–30 דק׳." },
  { from: "מונסטיראקי → אגורה העתיקה", how: "הליכה של 5 דקות או קו 1 תחנה אחת ל-Thiseio." }
];

const WMO = { 0: ["☀️", "שמיים בהירים"], 1: ["🌤️", "בהיר ברובו"], 2: ["⛅", "מעונן חלקית"], 3: ["☁️", "מעונן"], 45: ["🌫️", "ערפל"], 48: ["🌫️", "ערפל"], 51: ["🌦️", "טפטוף קל"], 53: ["🌦️", "טפטוף"], 55: ["🌦️", "טפטוף חזק"], 61: ["🌧️", "גשם קל"], 63: ["🌧️", "גשם"], 65: ["🌧️", "גשם חזק"], 71: ["🌨️", "שלג קל"], 80: ["🌦️", "ממטרים"], 81: ["🌧️", "ממטרים חזקים"], 82: ["⛈️", "ממטרים עזים"], 95: ["⛈️", "סופת רעמים"], 96: ["⛈️", "סופת רעמים וברד"], 99: ["⛈️", "סופת רעמים וברד"] };

const INFO_FACTS = [
  ["מדינה", "יוון (אתונה — בירה)"], ["שפה", "יוונית; אנגלית מדוברת בהרחבה באזורי תיירות"], ["מטבע", "אירו (€)"], ["שעון", "כמו בישראל (UTC+2 בחורף, UTC+3 בקיץ), למעט ימים בודדים באביב — בדקו"],
  ["חשמל", "230V, תקע אירופאי C/F"], ["טלפון", "קידומת בין-לאומית +30"], ["מים", "מי ברז בטוחים לשתייה"], ["מיסוי/החזר מע״מ", "זכאות למבקרים מחוץ לאיחוד — מעל כ-€50 בחנות"],
  ["נהיגה", "בצד ימין של הכביש. חגורת בטיחות חובה. בדקו מול חברת ההשכרה אם נדרש רישיון בינלאומי"], ["סים/אינטרנט", "eSIM זמין בכמה חברות; wifi חינם בהרבה בתי קפה ובתחנות מטרו"]
];
