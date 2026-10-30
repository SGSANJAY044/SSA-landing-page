/**
 * Service catalogue — the single source of copy for cards and service pages.
 *
 * Shape:
 *   slug         URL segment and illustration name
 *   group        'registration' | 'land' | 'legal'
 *   free         client offers this with no service charge (from their poster)
 *   draft        hidden until the client confirms what the service is
 *   visit        'none' | 'maybe' | 'once' | null — office visits for the customer
 *   fee/timeline { en, ta } or null. null renders as "Ask us"; never guess these.
 *   content.en / content.ta: title, short (card line), lead, steps[], docs[], faqs[{ q, a }]
 *
 * Process facts reflect Tamil Nadu procedure as of October 2026. Tamil copy is a
 * first draft for native review. TODO(client): confirm steps, fees and timelines.
 */
export const services = [
  {
    slug: 'online-registration',
    group: 'registration',
    free: false,
    visit: 'maybe',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Online registration, 24×7',
        short: 'Register without standing in the Sub-Registrar office queue.',
        lead: 'Tamil Nadu now registers many documents online. We prepare everything, file it on the Registration Department portal and guide you through Aadhaar verification.',
        steps: [
          'Send us your documents on WhatsApp — we check if your deed qualifies for online registration.',
          'We draft the deed and calculate stamp duty and registration fee.',
          'We file it online and pay the fees through the portal.',
          'Parties verify identity with Aadhaar (fingerprint or iris). The Sub-Registrar approves and signs digitally.',
          'The registered document reaches you online — no office visit for eligible deeds.',
        ],
        docs: [
          'Aadhaar of buyer, seller and witnesses (with linked mobile number)',
          'PAN card of buyer and seller',
          'Previous title deeds (parent documents)',
          'Layout / building approval details',
          'Bank sanction letter (for loan mortgages)',
        ],
        faqs: [
          {
            q: 'Which documents can be registered online now?',
            a: 'First sale of plots and flats in approved layouts, TNHB sale documents and bank/NBFC loan mortgages. Settlement, release, partition and revocation deeds are paperless but may still need one visit for biometrics.',
          },
          {
            q: 'Is online registration as valid as office registration?',
            a: 'Yes. The Sub-Registrar approves and digitally signs the document — it is a registered document like any other.',
          },
          {
            q: 'My deed is not eligible yet. Can you still help?',
            a: 'Yes. We handle regular registration too, and prepare everything so your office visit is short.',
          },
        ],
      },
      ta: {
        title: 'ஆன்லைன் பதிவு, 24×7',
        short: 'சார்பதிவாளர் அலுவலக வரிசையில் நிற்காமல் பதிவு செய்யுங்கள்.',
        lead: 'தமிழ்நாட்டில் இப்போது பல ஆவணங்களை ஆன்லைனில் பதிவு செய்யலாம். அனைத்தையும் தயாரித்து, பதிவுத்துறை தளத்தில் சமர்ப்பித்து, ஆதார் சரிபார்ப்பில் வழிகாட்டுகிறோம்.',
        steps: [
          'உங்கள் ஆவணங்களை வாட்ஸ்அப்பில் அனுப்புங்கள் — ஆன்லைன் பதிவுக்கு தகுதியானதா என்று சரிபார்க்கிறோம்.',
          'பத்திரத்தை வரைவு செய்து, முத்திரைத் தீர்வை மற்றும் பதிவுக் கட்டணத்தைக் கணக்கிடுகிறோம்.',
          'ஆன்லைனில் சமர்ப்பித்து, கட்டணங்களை இணையதளம் வழியாகச் செலுத்துகிறோம்.',
          'தரப்பினர் ஆதார் (கைரேகை அல்லது கருவிழி) மூலம் சரிபார்க்கின்றனர். சார்பதிவாளர் ஒப்புதல் அளித்து டிஜிட்டல் கையொப்பமிடுகிறார்.',
          'பதிவு செய்த ஆவணம் ஆன்லைனில் உங்களுக்குக் கிடைக்கும் — தகுதியான பத்திரங்களுக்கு அலுவலகம் செல்லத் தேவையில்லை.',
        ],
        docs: [
          'வாங்குபவர், விற்பவர், சாட்சிகளின் ஆதார் (இணைக்கப்பட்ட கைபேசி எண்ணுடன்)',
          'வாங்குபவர், விற்பவரின் PAN அட்டை',
          'முந்தைய மூலப் பத்திரங்கள்',
          'மனைப்பிரிவு / கட்டட அனுமதி விவரங்கள்',
          'வங்கி கடன் அனுமதி கடிதம் (அடமானத்திற்கு)',
        ],
        faqs: [
          {
            q: 'இப்போது எந்த ஆவணங்களை ஆன்லைனில் பதிவு செய்யலாம்?',
            a: 'அங்கீகரிக்கப்பட்ட மனைப்பிரிவுகளில் மனை, அடுக்ககங்களின் முதல் விற்பனை, TNHB விற்பனை ஆவணங்கள், வங்கி/NBFC கடன் அடமானங்கள். செட்டில்மென்ட், விடுதலை, பாகப்பிரிவினை, ரத்து பத்திரங்கள் காகிதமில்லா முறையில், ஆனால் கைரேகைக்கு ஒருமுறை செல்ல வேண்டியிருக்கலாம்.',
          },
          {
            q: 'ஆன்லைன் பதிவு அலுவலகப் பதிவுக்கு சமமானதா?',
            a: 'ஆம். சார்பதிவாளர் ஒப்புதல் அளித்து டிஜிட்டல் கையொப்பமிடுகிறார் — இது முறையாகப் பதிவு செய்யப்பட்ட ஆவணமே.',
          },
          {
            q: 'என் பத்திரம் இன்னும் தகுதி பெறவில்லை. உதவ முடியுமா?',
            a: 'ஆம். வழக்கமான பதிவையும் செய்கிறோம்; அலுவலக வருகை குறுகியதாக இருக்க அனைத்தையும் தயார் செய்கிறோம்.',
          },
        ],
      },
    },
  },
  {
    slug: 'document-registration',
    group: 'registration',
    free: false,
    visit: 'once',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'All document registration',
        short: 'Sale, settlement, gift, partition, POA, rent — drafted and registered.',
        lead: 'From drafting to the final registered copy, we handle every type of property document and make sure there are no costly mistakes.',
        steps: [
          'Tell us the transaction — buying, gifting, partitioning or giving power of attorney.',
          'We collect and verify your parent documents, Patta and EC.',
          'We draft the deed and calculate stamp duty from the guideline value.',
          'We pay fees online and book the registration slot.',
          'Registration at the Sub-Registrar office — we are with you. You get the registered deed.',
        ],
        docs: [
          'Parent documents (previous sale deeds)',
          'Patta / Chitta',
          'Encumbrance certificate (EC)',
          'Aadhaar & PAN of all parties',
          'ID proof of two witnesses',
          'Latest property tax and EB receipts',
        ],
        faqs: [
          {
            q: 'How is the cost calculated?',
            a: 'Stamp duty and registration fee are set by the government on the guideline value and paid directly to the government. Our service charge is separate and told upfront.',
          },
          {
            q: 'Do all parties have to come to the office?',
            a: 'For most deeds, the executants and witnesses appear once at the Sub-Registrar office. Some deeds can now be registered online — ask us.',
          },
          {
            q: 'Which deeds do you handle?',
            a: 'Sale, settlement, gift, partition, release, power of attorney, mortgage, rental/lease agreements and more.',
          },
        ],
      },
      ta: {
        title: 'அனைத்து வகை பத்திரப் பதிவு',
        short: 'கிரயம், செட்டில்மென்ட், தானம், பாகப்பிரிவினை, அதிகாரப் பத்திரம், வாடகை — வரைவு முதல் பதிவு வரை.',
        lead: 'வரைவு முதல் பதிவு செய்த நகல் வரை, அனைத்து வகை சொத்து ஆவணங்களையும் தவறில்லாமல் கவனிக்கிறோம்.',
        steps: [
          'பரிவர்த்தனையைச் சொல்லுங்கள் — வாங்குதல், தானம், பாகப்பிரிவினை அல்லது அதிகாரப் பத்திரம்.',
          'மூலப் பத்திரங்கள், பட்டா, வில்லங்கச் சான்றைச் சேகரித்துச் சரிபார்க்கிறோம்.',
          'பத்திரத்தை வரைவு செய்து, வழிகாட்டி மதிப்பின்படி முத்திரைத் தீர்வையைக் கணக்கிடுகிறோம்.',
          'கட்டணங்களை ஆன்லைனில் செலுத்தி பதிவு நேரத்தை முன்பதிவு செய்கிறோம்.',
          'சார்பதிவாளர் அலுவலகத்தில் பதிவு — நாங்கள் உடன் இருப்போம். பதிவு செய்த பத்திரம் உங்களிடம்.',
        ],
        docs: [
          'மூலப் பத்திரங்கள் (முந்தைய கிரயப் பத்திரங்கள்)',
          'பட்டா / சிட்டா',
          'வில்லங்கச் சான்று (EC)',
          'அனைத்து தரப்பினரின் ஆதார் & PAN',
          'இரண்டு சாட்சிகளின் அடையாளச் சான்று',
          'சமீபத்திய சொத்து வரி, மின் கட்டண ரசீதுகள்',
        ],
        faqs: [
          {
            q: 'செலவு எப்படிக் கணக்கிடப்படுகிறது?',
            a: 'முத்திரைத் தீர்வையும் பதிவுக் கட்டணமும் வழிகாட்டி மதிப்பின்படி அரசால் நிர்ணயிக்கப்பட்டு அரசுக்கே நேரடியாகச் செலுத்தப்படுகின்றன. எங்கள் சேவைக் கட்டணம் தனி, முன்கூட்டியே சொல்லப்படும்.',
          },
          {
            q: 'அனைவரும் அலுவலகம் வர வேண்டுமா?',
            a: 'பெரும்பாலான பத்திரங்களுக்கு, எழுதிக்கொடுப்பவர்களும் சாட்சிகளும் ஒருமுறை சார்பதிவாளர் அலுவலகம் வர வேண்டும். சில பத்திரங்களை இப்போது ஆன்லைனில் பதிவு செய்யலாம் — கேளுங்கள்.',
          },
          {
            q: 'எந்தெந்த பத்திரங்களைச் செய்கிறீர்கள்?',
            a: 'கிரயம், செட்டில்மென்ட், தானம், பாகப்பிரிவினை, விடுதலை, அதிகாரப் பத்திரம், அடமானம், வாடகை/குத்தகை ஒப்பந்தங்கள் மற்றும் பல.',
          },
        ],
      },
    },
  },
  {
    slug: 'encumbrance-certificate',
    group: 'registration',
    free: true,
    visit: 'none',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Encumbrance certificate (EC)',
        short: 'See every registered transaction on a property. Free from us.',
        lead: 'An EC shows the registered history of a property — sales, mortgages, gifts. Check it before you buy or apply for a loan. We get it for you at no service charge.',
        steps: [
          'Send us the survey number and village, or the document number.',
          'Tell us the period you need (we suggest at least 30 years before buying).',
          'We apply on the Registration Department portal.',
          'You receive the EC on WhatsApp or email — and we explain what it shows.',
        ],
        docs: ['Survey number & village (or document number)', 'Period required', 'Your name and mobile number'],
        faqs: [
          {
            q: 'Why do I need an EC?',
            a: 'Banks ask for it for home loans, and it is the first check before buying — it shows whether the property is mortgaged or has been sold before.',
          },
          {
            q: 'Is it really free?',
            a: 'Yes — we do not charge a service fee for getting your EC.',
          },
          {
            q: 'Will you explain what the EC means?',
            a: 'Yes. EC entries can be confusing; we walk you through every entry and flag anything that needs attention.',
          },
        ],
      },
      ta: {
        title: 'வில்லங்கச் சான்று (EC)',
        short: 'சொத்தின் அனைத்து பதிவு பரிவர்த்தனைகளையும் பாருங்கள். எங்களிடம் இலவசம்.',
        lead: 'வில்லங்கச் சான்று ஒரு சொத்தின் பதிவு வரலாற்றைக் காட்டுகிறது — கிரயம், அடமானம், தானம். வாங்கும் முன் அல்லது கடன் விண்ணப்பிக்கும் முன் சரிபார்க்கவும். சேவைக் கட்டணமின்றி பெற்றுத் தருகிறோம்.',
        steps: [
          'சர்வே எண், கிராமம் அல்லது ஆவண எண்ணை அனுப்புங்கள்.',
          'தேவையான காலத்தைச் சொல்லுங்கள் (வாங்கும் முன் குறைந்தது 30 ஆண்டுகள் பரிந்துரைக்கிறோம்).',
          'பதிவுத்துறை தளத்தில் விண்ணப்பிக்கிறோம்.',
          'வாட்ஸ்அப் அல்லது மின்னஞ்சலில் EC கிடைக்கும் — அதன் பொருளையும் விளக்குகிறோம்.',
        ],
        docs: ['சர்வே எண் & கிராமம் (அல்லது ஆவண எண்)', 'தேவையான காலம்', 'உங்கள் பெயர், கைபேசி எண்'],
        faqs: [
          {
            q: 'வில்லங்கச் சான்று ஏன் தேவை?',
            a: 'வீட்டுக் கடனுக்கு வங்கிகள் கேட்கின்றன; வாங்கும் முன் முதல் சரிபார்ப்பும் இதுவே — சொத்து அடமானத்தில் உள்ளதா, ஏற்கனவே விற்கப்பட்டதா என்று காட்டும்.',
          },
          { q: 'உண்மையிலேயே இலவசமா?', a: 'ஆம் — வில்லங்கச் சான்று பெற்றுத் தர நாங்கள் சேவைக் கட்டணம் வசூலிப்பதில்லை.' },
          {
            q: 'EC-யின் பொருளை விளக்குவீர்களா?',
            a: 'ஆம். EC பதிவுகள் குழப்பமாக இருக்கலாம்; ஒவ்வொன்றையும் விளக்கி, கவனிக்க வேண்டியவற்றைச் சுட்டிக்காட்டுகிறோம்.',
          },
        ],
      },
    },
  },
  {
    slug: 'certified-copy',
    group: 'registration',
    free: true,
    visit: 'none',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Certified copy of documents',
        short: 'Lost a deed or need a copy for the bank? Free from us.',
        lead: 'A certified copy is an official copy of a registered document from the Sub-Registrar records — accepted by banks and courts. We get it for you at no service charge.',
        steps: [
          'Send us the document number and year, or the property details.',
          'We locate the record and apply online.',
          'We track the request with the Sub-Registrar office.',
          'You receive the certified copy.',
        ],
        docs: ['Document number & year (if known)', 'Property survey number & village', 'Your ID proof'],
        faqs: [
          {
            q: 'I don’t know the document number. Can you still find it?',
            a: 'Usually, yes — we can trace it from the property details through the EC.',
          },
          { q: 'Is it accepted by banks?', a: 'Yes. Certified copies are official copies of registered documents.' },
          { q: 'Is it really free?', a: 'Yes — we do not charge a service fee for certified copies.' },
        ],
      },
      ta: {
        title: 'ஆவணங்களின் சான்றிட்ட நகல்',
        short: 'பத்திரம் தொலைந்ததா, வங்கிக்கு நகல் தேவையா? எங்களிடம் இலவசம்.',
        lead: 'சான்றிட்ட நகல் என்பது சார்பதிவாளர் பதிவேட்டில் உள்ள பதிவு ஆவணத்தின் அதிகாரப்பூர்வ நகல் — வங்கிகளும் நீதிமன்றங்களும் ஏற்கின்றன. சேவைக் கட்டணமின்றி பெற்றுத் தருகிறோம்.',
        steps: [
          'ஆவண எண், ஆண்டு அல்லது சொத்து விவரங்களை அனுப்புங்கள்.',
          'பதிவைக் கண்டறிந்து ஆன்லைனில் விண்ணப்பிக்கிறோம்.',
          'சார்பதிவாளர் அலுவலகத்தில் தொடர்ந்து கவனிக்கிறோம்.',
          'சான்றிட்ட நகல் உங்களுக்குக் கிடைக்கும்.',
        ],
        docs: ['ஆவண எண் & ஆண்டு (தெரிந்தால்)', 'சொத்தின் சர்வே எண் & கிராமம்', 'உங்கள் அடையாளச் சான்று'],
        faqs: [
          {
            q: 'ஆவண எண் தெரியாது. கண்டுபிடிக்க முடியுமா?',
            a: 'பெரும்பாலும் முடியும் — சொத்து விவரங்களிலிருந்து EC மூலம் கண்டறியலாம்.',
          },
          { q: 'வங்கிகள் ஏற்குமா?', a: 'ஆம். சான்றிட்ட நகல்கள் பதிவு ஆவணங்களின் அதிகாரப்பூர்வ நகல்கள்.' },
          { q: 'உண்மையிலேயே இலவசமா?', a: 'ஆம் — சான்றிட்ட நகலுக்கு நாங்கள் சேவைக் கட்டணம் வசூலிப்பதில்லை.' },
        ],
      },
    },
  },
  {
    slug: 'mortgage-deed',
    group: 'registration',
    free: true,
    visit: 'none',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Bank mortgage loan deed',
        short: 'Home-loan mortgage deed registered for your bank. Free from us.',
        lead: 'When your bank needs the mortgage registered, we prepare and register it. Since September 2026, bank and NBFC loan mortgages can be registered online without an office visit.',
        steps: [
          'Share the bank’s sanction letter and property documents.',
          'We prepare the mortgage deed as per the bank’s format.',
          'We file it online and pay the government fees.',
          'The registered mortgage reaches you and your bank.',
        ],
        docs: [
          'Bank loan sanction letter',
          'Title deed and parent documents',
          'Patta and EC',
          'Aadhaar & PAN of borrowers',
        ],
        faqs: [
          {
            q: 'Do I need to visit the registration office?',
            a: 'Usually not — bank and NBFC loan mortgages can now be registered online with Aadhaar verification.',
          },
          { q: 'Is it really free?', a: 'Yes — we do not charge a service fee. Government fees, if any, are paid at actuals.' },
          { q: 'Which banks do you work with?', a: 'Any bank or NBFC — we follow the format your lender gives.' },
        ],
      },
      ta: {
        title: 'வங்கி அடமானக் கடன் பத்திரம்',
        short: 'வீட்டுக் கடன் அடமானப் பத்திரம் உங்கள் வங்கிக்காகப் பதிவு. எங்களிடம் இலவசம்.',
        lead: 'வங்கி அடமானப் பதிவு கேட்கும்போது, நாங்கள் தயாரித்துப் பதிவு செய்கிறோம். செப்டம்பர் 2026 முதல் வங்கி/NBFC கடன் அடமானங்களை அலுவலகம் செல்லாமல் ஆன்லைனில் பதிவு செய்யலாம்.',
        steps: [
          'வங்கியின் கடன் அனுமதி கடிதம், சொத்து ஆவணங்களைப் பகிருங்கள்.',
          'வங்கியின் வடிவில் அடமானப் பத்திரம் தயாரிக்கிறோம்.',
          'ஆன்லைனில் சமர்ப்பித்து அரசுக் கட்டணம் செலுத்துகிறோம்.',
          'பதிவு செய்த அடமானம் உங்களுக்கும் வங்கிக்கும் சென்றடையும்.',
        ],
        docs: ['வங்கி கடன் அனுமதி கடிதம்', 'உரிமைப் பத்திரம், மூலப் பத்திரங்கள்', 'பட்டா, வில்லங்கச் சான்று', 'கடன் பெறுவோரின் ஆதார் & PAN'],
        faqs: [
          {
            q: 'பதிவு அலுவலகம் செல்ல வேண்டுமா?',
            a: 'பொதுவாக தேவையில்லை — வங்கி/NBFC கடன் அடமானங்களை இப்போது ஆதார் சரிபார்ப்புடன் ஆன்லைனில் பதிவு செய்யலாம்.',
          },
          { q: 'உண்மையிலேயே இலவசமா?', a: 'ஆம் — சேவைக் கட்டணம் இல்லை. அரசுக் கட்டணம் இருந்தால் உண்மைச் செலவில் செலுத்தப்படும்.' },
          { q: 'எந்த வங்கிகளுடன் வேலை செய்கிறீர்கள்?', a: 'எந்த வங்கி அல்லது NBFC ஆனாலும் — உங்கள் கடன் வழங்குநரின் வடிவைப் பின்பற்றுகிறோம்.' },
        ],
      },
    },
  },
  {
    slug: 'patta-transfer',
    group: 'land',
    free: false,
    visit: 'none',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Patta transfer',
        short: 'Bought land or inherited it? Get the Patta in your name.',
        lead: 'After you buy or inherit land, the Patta must be changed to your name in revenue records. We apply, follow up with the Taluk office and get it done.',
        steps: [
          'Send your registered deed and the current Patta.',
          'We check the records for mismatches before applying.',
          'We apply online and follow up with the VAO and Taluk office.',
          'The new Patta in your name — downloadable online.',
        ],
        docs: [
          'Registered sale / settlement / partition deed',
          'Previous owner’s Patta',
          'Encumbrance certificate',
          'Aadhaar of the applicant',
          'Legal heir certificate (for inherited land)',
        ],
        faqs: [
          {
            q: 'Isn’t my sale deed enough?',
            a: 'No. The deed proves you bought the land; the Patta records you as the owner in the revenue department. Banks and approvals need both.',
          },
          {
            q: 'Do I need to go to the Taluk office?',
            a: 'Usually not — we file online and do the follow-ups for you.',
          },
          {
            q: 'My application was rejected. Can you help?',
            a: 'Yes. We find the reason, fix the documents and re-apply.',
          },
        ],
      },
      ta: {
        title: 'பட்டா மாறுதல்',
        short: 'நிலம் வாங்கினீர்களா, வாரிசாகப் பெற்றீர்களா? பட்டாவை உங்கள் பெயருக்கு மாற்றுங்கள்.',
        lead: 'நிலம் வாங்கிய பின் அல்லது வாரிசாகப் பெற்ற பின், வருவாய்ப் பதிவேட்டில் பட்டா உங்கள் பெயருக்கு மாற்றப்பட வேண்டும். விண்ணப்பித்து, வட்டாட்சியர் அலுவலகத்தில் தொடர்ந்து கவனித்து முடித்துத் தருகிறோம்.',
        steps: [
          'பதிவு செய்த பத்திரம், தற்போதைய பட்டாவை அனுப்புங்கள்.',
          'விண்ணப்பிக்கும் முன் பதிவுகளில் முரண்பாடுகளைச் சரிபார்க்கிறோம்.',
          'ஆன்லைனில் விண்ணப்பித்து, VAO மற்றும் வட்டாட்சியர் அலுவலகத்தில் தொடர்ந்து கவனிக்கிறோம்.',
          'உங்கள் பெயரில் புதிய பட்டா — ஆன்லைனில் பதிவிறக்கலாம்.',
        ],
        docs: [
          'பதிவு செய்த கிரயம் / செட்டில்மென்ட் / பாகப்பிரிவினை பத்திரம்',
          'முந்தைய உரிமையாளரின் பட்டா',
          'வில்லங்கச் சான்று',
          'விண்ணப்பதாரரின் ஆதார்',
          'வாரிசுச் சான்று (வாரிசு நிலத்திற்கு)',
        ],
        faqs: [
          {
            q: 'கிரயப் பத்திரம் போதாதா?',
            a: 'இல்லை. பத்திரம் நீங்கள் வாங்கியதைக் காட்டுகிறது; பட்டா வருவாய்த் துறையில் உங்களை உரிமையாளராகப் பதிவு செய்கிறது. வங்கிகளுக்கும் அனுமதிகளுக்கும் இரண்டும் தேவை.',
          },
          { q: 'வட்டாட்சியர் அலுவலகம் செல்ல வேண்டுமா?', a: 'பொதுவாக தேவையில்லை — ஆன்லைனில் சமர்ப்பித்து நாங்களே தொடர்ந்து கவனிக்கிறோம்.' },
          {
            q: 'என் விண்ணப்பம் நிராகரிக்கப்பட்டது. உதவ முடியுமா?',
            a: 'ஆம். காரணத்தைக் கண்டறிந்து, ஆவணங்களைச் சரிசெய்து மீண்டும் விண்ணப்பிக்கிறோம்.',
          },
        ],
      },
    },
  },
  {
    slug: 'patta-subdivision',
    group: 'land',
    free: false,
    visit: 'maybe',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Patta subdivision',
        short: 'Bought part of a survey number? Get your own separate Patta.',
        lead: 'When you buy only part of a larger survey number, it must be measured and subdivided so you get an individual Patta instead of a joint one. We coordinate the survey and the paperwork.',
        steps: [
          'Send your deed, the existing Patta and the FMB sketch if you have it.',
          'We apply for subdivision online.',
          'The government surveyor measures the land — we coordinate the visit.',
          'A new subdivision number and an individual Patta in your name.',
        ],
        docs: ['Registered deed', 'Existing (joint) Patta', 'FMB sketch (if available)', 'Encumbrance certificate', 'Aadhaar of the applicant'],
        faqs: [
          {
            q: 'What’s the difference between joint and individual Patta?',
            a: 'A joint Patta lists several owners on one survey number. An individual Patta, after subdivision, records only your portion with its own number.',
          },
          {
            q: 'Do I need to be at the land during the survey?',
            a: 'It helps to have you or a representative present when the surveyor measures. We tell you the date in advance.',
          },
          {
            q: 'Why does subdivision take longer than a transfer?',
            a: 'It needs a field survey by the government surveyor, which depends on their schedule. We keep following up and update you.',
          },
        ],
      },
      ta: {
        title: 'பட்டா உட்பிரிவு',
        short: 'சர்வே எண்ணின் ஒரு பகுதியை வாங்கினீர்களா? தனி பட்டா பெறுங்கள்.',
        lead: 'பெரிய சர்வே எண்ணின் ஒரு பகுதியை மட்டும் வாங்கினால், அளந்து உட்பிரிவு செய்து கூட்டுப் பட்டாவுக்குப் பதில் தனிப் பட்டா பெற வேண்டும். அளவீட்டையும் ஆவணப் பணிகளையும் ஒருங்கிணைக்கிறோம்.',
        steps: [
          'பத்திரம், தற்போதைய பட்டா, FMB வரைபடம் (இருந்தால்) அனுப்புங்கள்.',
          'உட்பிரிவுக்கு ஆன்லைனில் விண்ணப்பிக்கிறோம்.',
          'அரசு நில அளவையர் நிலத்தை அளக்கிறார் — வருகையை ஒருங்கிணைக்கிறோம்.',
          'புதிய உட்பிரிவு எண்ணும் உங்கள் பெயரில் தனிப் பட்டாவும்.',
        ],
        docs: ['பதிவு செய்த பத்திரம்', 'தற்போதைய (கூட்டு) பட்டா', 'FMB வரைபடம் (இருந்தால்)', 'வில்லங்கச் சான்று', 'விண்ணப்பதாரரின் ஆதார்'],
        faqs: [
          {
            q: 'கூட்டுப் பட்டாவுக்கும் தனிப் பட்டாவுக்கும் என்ன வேறுபாடு?',
            a: 'கூட்டுப் பட்டாவில் ஒரே சர்வே எண்ணில் பல உரிமையாளர்கள் இருப்பர். உட்பிரிவுக்குப் பின் தனிப் பட்டா உங்கள் பகுதியை மட்டும் தனி எண்ணுடன் பதிவு செய்கிறது.',
          },
          {
            q: 'அளவீட்டின்போது நிலத்தில் இருக்க வேண்டுமா?',
            a: 'அளவையர் அளக்கும்போது நீங்கள் அல்லது உங்கள் பிரதிநிதி இருப்பது நல்லது. தேதியை முன்கூட்டியே சொல்கிறோம்.',
          },
          {
            q: 'மாறுதலை விட உட்பிரிவுக்கு ஏன் அதிக காலம்?',
            a: 'அரசு அளவையரின் கள அளவீடு தேவை, அது அவர்களின் அட்டவணையைப் பொறுத்தது. தொடர்ந்து கவனித்து தகவல் தருகிறோம்.',
          },
        ],
      },
    },
  },
  {
    slug: 'tslr',
    group: 'land',
    free: false,
    visit: 'none',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'TSLR (town survey) Patta',
        short: 'Urban land in Coimbatore city? Update the Town Survey Land Register.',
        lead: 'In corporation and town limits, land is recorded in the Town Survey Land Register (TSLR), not the village records. We handle name transfers and corrections in TSLR.',
        steps: [
          'Send your deed and the current TSLR extract (if you have one).',
          'We check the ward, block and town survey number details.',
          'We apply and follow up with the revenue office.',
          'Updated TSLR record in your name.',
        ],
        docs: ['Registered deed', 'Current TSLR extract', 'Property tax receipt', 'Aadhaar of the applicant'],
        faqs: [
          {
            q: 'How is TSLR different from a normal Patta?',
            a: 'Both are revenue records. TSLR covers urban areas (town survey numbers by ward and block); Patta/Chitta covers village land.',
          },
          {
            q: 'How do I know if my land is under TSLR?',
            a: 'If it is inside corporation or town limits it is usually under TSLR. Send us your deed and we’ll check.',
          },
          {
            q: 'Can wrong details in TSLR be corrected?',
            a: 'Yes — name, extent or survey details can be corrected with the right supporting documents.',
          },
        ],
      },
      ta: {
        title: 'TSLR (நகர நில அளவை) பட்டா',
        short: 'கோவை நகரில் நிலமா? நகர நில அளவைப் பதிவேட்டைப் புதுப்பியுங்கள்.',
        lead: 'மாநகராட்சி, நகர எல்லைகளில் நிலம் கிராமப் பதிவேட்டில் அல்ல, நகர நில அளவைப் பதிவேட்டில் (TSLR) பதிவாகிறது. TSLR-ல் பெயர் மாற்றம், திருத்தங்களைச் செய்து தருகிறோம்.',
        steps: [
          'பத்திரம், தற்போதைய TSLR நகல் (இருந்தால்) அனுப்புங்கள்.',
          'வார்டு, பிளாக், நகர சர்வே எண் விவரங்களைச் சரிபார்க்கிறோம்.',
          'விண்ணப்பித்து வருவாய் அலுவலகத்தில் தொடர்ந்து கவனிக்கிறோம்.',
          'உங்கள் பெயரில் புதுப்பிக்கப்பட்ட TSLR பதிவு.',
        ],
        docs: ['பதிவு செய்த பத்திரம்', 'தற்போதைய TSLR நகல்', 'சொத்து வரி ரசீது', 'விண்ணப்பதாரரின் ஆதார்'],
        faqs: [
          {
            q: 'TSLR சாதாரண பட்டாவிலிருந்து எப்படி வேறுபடுகிறது?',
            a: 'இரண்டும் வருவாய்ப் பதிவுகளே. TSLR நகரப் பகுதிகளுக்கு (வார்டு, பிளாக் வாரியான நகர சர்வே எண்கள்); பட்டா/சிட்டா கிராம நிலத்திற்கு.',
          },
          {
            q: 'என் நிலம் TSLR-ன் கீழ் உள்ளதா என்று எப்படித் தெரியும்?',
            a: 'மாநகராட்சி அல்லது நகர எல்லைக்குள் இருந்தால் பொதுவாக TSLR-ன் கீழ் வரும். பத்திரத்தை அனுப்புங்கள், சரிபார்க்கிறோம்.',
          },
          { q: 'TSLR-ல் தவறான விவரங்களைத் திருத்த முடியுமா?', a: 'ஆம் — சரியான ஆதார ஆவணங்களுடன் பெயர், பரப்பு, சர்வே விவரங்களைத் திருத்தலாம்.' },
        ],
      },
    },
  },
  {
    slug: 'legal-opinion',
    group: 'legal',
    free: false,
    visit: 'none',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Legal opinion',
        short: 'Check the title before you pay an advance. Buy with confidence.',
        lead: 'Before you buy, we trace the ownership chain, EC and revenue records to make sure the seller has clear title — and tell you in plain language what we found.',
        steps: [
          'Send copies of the seller’s documents.',
          'We trace the ownership chain and EC for 30+ years.',
          'We cross-check Patta, approvals and tax records.',
          'You get a clear written opinion — safe to proceed, or what to fix first.',
        ],
        docs: ['Seller’s title deed and parent documents', 'Patta / Chitta', 'Encumbrance certificate', 'Layout / building approval', 'Property tax receipts'],
        faqs: [
          {
            q: 'When should I get a legal opinion?',
            a: 'Before paying an advance or signing a sale agreement. It is much cheaper than fixing a title problem later.',
          },
          {
            q: 'Do banks accept your opinion?',
            a: 'Banks usually use their own panel lawyers. Our opinion is for your own safety before you commit.',
          },
          {
            q: 'What problems do you look for?',
            a: 'Breaks in the ownership chain, undisclosed mortgages, unapproved layouts, Patta mismatches and pending disputes.',
          },
        ],
      },
      ta: {
        title: 'சட்ட ஆலோசனை',
        short: 'முன்பணம் கொடுக்கும் முன் உரிமையைச் சரிபாருங்கள். நம்பிக்கையுடன் வாங்குங்கள்.',
        lead: 'வாங்கும் முன், உரிமைச் சங்கிலி, வில்லங்கச் சான்று, வருவாய்ப் பதிவுகளைச் சரிபார்த்து, விற்பவருக்குத் தெளிவான உரிமை உள்ளதா என்பதை எளிய மொழியில் சொல்கிறோம்.',
        steps: [
          'விற்பவரின் ஆவண நகல்களை அனுப்புங்கள்.',
          '30+ ஆண்டுகளுக்கு உரிமைச் சங்கிலியையும் EC-யையும் சரிபார்க்கிறோம்.',
          'பட்டா, அனுமதிகள், வரிப் பதிவுகளை ஒப்பிட்டுப் பார்க்கிறோம்.',
          'தெளிவான எழுத்துப்பூர்வ கருத்து — தொடரலாம், அல்லது முதலில் சரிசெய்ய வேண்டியவை.',
        ],
        docs: ['விற்பவரின் உரிமைப் பத்திரம், மூலப் பத்திரங்கள்', 'பட்டா / சிட்டா', 'வில்லங்கச் சான்று', 'மனைப்பிரிவு / கட்டட அனுமதி', 'சொத்து வரி ரசீதுகள்'],
        faqs: [
          {
            q: 'சட்ட ஆலோசனை எப்போது பெற வேண்டும்?',
            a: 'முன்பணம் கொடுக்கும் முன் அல்லது விற்பனை ஒப்பந்தம் கையெழுத்திடும் முன். பின்னர் உரிமைப் பிரச்சினையைச் சரிசெய்வதை விட மிகவும் குறைந்த செலவு.',
          },
          {
            q: 'வங்கிகள் உங்கள் கருத்தை ஏற்குமா?',
            a: 'வங்கிகள் பொதுவாக தங்கள் வழக்கறிஞர்களைப் பயன்படுத்துகின்றன. எங்கள் கருத்து நீங்கள் உறுதி செய்வதற்கு முன் உங்கள் பாதுகாப்புக்காக.',
          },
          {
            q: 'என்ன பிரச்சினைகளைப் பார்க்கிறீர்கள்?',
            a: 'உரிமைச் சங்கிலியில் இடைவெளி, மறைக்கப்பட்ட அடமானங்கள், அங்கீகாரமில்லாத மனைப்பிரிவுகள், பட்டா முரண்பாடுகள், நிலுவையில் உள்ள வழக்குகள்.',
          },
        ],
      },
    },
  },
  {
    slug: 'dtcp-approval',
    group: 'legal',
    free: false,
    visit: 'none',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'DTCP approval',
        short: 'Layout or building approval for landowners and promoters.',
        lead: 'For new layouts and buildings outside corporation limits, DTCP approval is mandatory. We prepare the file, submit it and follow up until approval.',
        steps: [
          'Share land documents and your layout or building plan.',
          'We check land-use and document readiness, and list what’s missing.',
          'We prepare and submit the application.',
          'We follow up and respond to queries until approval.',
        ],
        docs: ['Title deeds and parent documents', 'Patta, Chitta and FMB sketch', 'Encumbrance certificate', 'Layout / building plan from your architect or engineer', 'Land-use details'],
        faqs: [
          {
            q: 'Who needs DTCP approval?',
            a: 'Landowners and promoters creating plotted layouts, and owners constructing buildings in areas under DTCP jurisdiction.',
          },
          {
            q: 'Why does it matter for buyers?',
            a: 'Banks generally lend only on approved plots, and approved layouts can now be registered online for first sale.',
          },
          { q: 'Do you prepare the drawings?', a: 'Your architect or engineer prepares the plan; we handle the documents, submission and follow-up.' },
        ],
      },
      ta: {
        title: 'DTCP அனுமதி',
        short: 'நில உரிமையாளர்கள், மேம்பாட்டாளர்களுக்கு மனைப்பிரிவு / கட்டட அனுமதி.',
        lead: 'மாநகராட்சி எல்லைக்கு வெளியே புதிய மனைப்பிரிவுகள், கட்டடங்களுக்கு DTCP அனுமதி கட்டாயம். கோப்பைத் தயாரித்து, சமர்ப்பித்து, அனுமதி கிடைக்கும் வரை கவனிக்கிறோம்.',
        steps: [
          'நில ஆவணங்கள், மனைப்பிரிவு அல்லது கட்டட வரைபடத்தைப் பகிருங்கள்.',
          'நிலப் பயன்பாடு, ஆவணத் தயார்நிலையைச் சரிபார்த்து, குறைகளைப் பட்டியலிடுகிறோம்.',
          'விண்ணப்பத்தைத் தயாரித்துச் சமர்ப்பிக்கிறோம்.',
          'அனுமதி கிடைக்கும் வரை தொடர்ந்து கவனித்து கேள்விகளுக்குப் பதிலளிக்கிறோம்.',
        ],
        docs: ['உரிமைப் பத்திரங்கள், மூலப் பத்திரங்கள்', 'பட்டா, சிட்டா, FMB வரைபடம்', 'வில்லங்கச் சான்று', 'கட்டடக் கலைஞர் / பொறியாளரின் வரைபடம்', 'நிலப் பயன்பாட்டு விவரங்கள்'],
        faqs: [
          {
            q: 'யாருக்கு DTCP அனுமதி தேவை?',
            a: 'மனைப்பிரிவு உருவாக்கும் நில உரிமையாளர்கள், மேம்பாட்டாளர்கள், DTCP எல்லையில் கட்டடம் கட்டுபவர்கள்.',
          },
          {
            q: 'வாங்குபவர்களுக்கு இது ஏன் முக்கியம்?',
            a: 'வங்கிகள் பொதுவாக அங்கீகரிக்கப்பட்ட மனைகளுக்கே கடன் வழங்குகின்றன; அங்கீகரிக்கப்பட்ட மனைப்பிரிவுகளின் முதல் விற்பனையை இப்போது ஆன்லைனில் பதிவு செய்யலாம்.',
          },
          { q: 'வரைபடங்களை நீங்கள் தயாரிப்பீர்களா?', a: 'வரைபடத்தை உங்கள் கட்டடக் கலைஞர் தயாரிப்பார்; ஆவணங்கள், சமர்ப்பிப்பு, தொடர் கவனிப்பை நாங்கள் செய்கிறோம்.' },
        ],
      },
    },
  },
  {
    slug: 'e-payment',
    group: 'registration',
    free: false,
    visit: 'none',
    fee: { en: '½% of amount', ta: 'தொகையில் ½%' },
    timeline: { en: 'Same day', ta: 'அதே நாள்' },
    content: {
      en: {
        title: 'E-payment of fees',
        short: 'Stamp duty and registration fees paid online — just ½% service charge.',
        lead: 'Government fees for registration have to be paid online. We make the payment correctly the first time and hand you the receipt — for a flat ½% service charge.',
        steps: [
          'Tell us the document and the amount to be paid.',
          'We verify the fee heads and amount.',
          'We pay online through the official portal.',
          'You get the e-receipt the same day.',
        ],
        docs: ['Document details / draft deed', 'Fee amount (we can calculate it)', 'Payer’s name and mobile number'],
        faqs: [
          { q: 'What does ½% cover?', a: 'Our service of making the payment correctly. Government fees are paid exactly as charged.' },
          {
            q: 'Why not pay it myself?',
            a: 'You can — but a wrong fee head or amount can delay registration. We get it right the first time.',
          },
          { q: 'Will I get a receipt?', a: 'Yes, the official e-receipt from the portal.' },
        ],
      },
      ta: {
        title: 'கட்டண இ-பேமெண்ட்',
        short: 'முத்திரைத் தீர்வை, பதிவுக் கட்டணம் ஆன்லைனில் — வெறும் ½% சேவைக் கட்டணம்.',
        lead: 'பதிவுக்கான அரசுக் கட்டணங்களை ஆன்லைனில் செலுத்த வேண்டும். முதல் முறையிலேயே சரியாகச் செலுத்தி ரசீதைத் தருகிறோம் — ½% சேவைக் கட்டணத்தில்.',
        steps: [
          'ஆவணம், செலுத்த வேண்டிய தொகையைச் சொல்லுங்கள்.',
          'கட்டணத் தலைப்புகள், தொகையைச் சரிபார்க்கிறோம்.',
          'அதிகாரப்பூர்வ தளம் வழியாக ஆன்லைனில் செலுத்துகிறோம்.',
          'அதே நாளில் இ-ரசீது உங்களிடம்.',
        ],
        docs: ['ஆவண விவரம் / வரைவுப் பத்திரம்', 'கட்டணத் தொகை (நாங்களே கணக்கிடலாம்)', 'செலுத்துபவரின் பெயர், கைபேசி எண்'],
        faqs: [
          { q: '½% எதற்கு?', a: 'சரியாகச் செலுத்தும் எங்கள் சேவைக்கு. அரசுக் கட்டணங்கள் விதிக்கப்பட்டபடியே செலுத்தப்படும்.' },
          {
            q: 'நானே செலுத்தலாமா?',
            a: 'செலுத்தலாம் — ஆனால் தவறான கட்டணத் தலைப்பு அல்லது தொகை பதிவைத் தாமதப்படுத்தலாம். நாங்கள் முதல் முறையிலேயே சரியாகச் செய்கிறோம்.',
          },
          { q: 'ரசீது கிடைக்குமா?', a: 'ஆம், தளத்திலிருந்து அதிகாரப்பூர்வ இ-ரசீது.' },
        ],
      },
    },
  },
  {
    slug: 'marriage-registration',
    group: 'registration',
    free: false,
    visit: 'once',
    fee: null,
    timeline: null,
    content: {
      en: {
        title: 'Marriage registration',
        short: 'Get your marriage certificate without the confusion.',
        lead: 'Marriage registration is needed for passports, visas and bank records. We prepare the application and documents so your visit to the Sub-Registrar office is quick.',
        steps: [
          'Send us your wedding details and documents.',
          'We prepare the application and check every document.',
          'We book the slot online.',
          'You, your spouse and witnesses visit once — certificate issued.',
        ],
        docs: [
          'Wedding invitation and a wedding photo',
          'Age proof of bride and groom',
          'Address proof of bride and groom',
          'Passport-size photos',
          'ID proof of witnesses',
        ],
        faqs: [
          { q: 'Why register a marriage?', a: 'The certificate is needed for passports, spouse visas, insurance and bank nominations.' },
          {
            q: 'We married years ago. Can we still register?',
            a: 'Yes — older marriages can be registered too. Send us your details and we’ll tell you what’s needed.',
          },
          { q: 'Do we both need to be present?', a: 'Yes, the couple and witnesses appear once at the Sub-Registrar office.' },
        ],
      },
      ta: {
        title: 'திருமணப் பதிவு',
        short: 'குழப்பமின்றி திருமணச் சான்றிதழ் பெறுங்கள்.',
        lead: 'பாஸ்போர்ட், விசா, வங்கிப் பதிவுகளுக்கு திருமணப் பதிவு தேவை. விண்ணப்பம், ஆவணங்களைத் தயாரித்து சார்பதிவாளர் அலுவலக வருகையை விரைவாக்குகிறோம்.',
        steps: [
          'திருமண விவரங்கள், ஆவணங்களை அனுப்புங்கள்.',
          'விண்ணப்பத்தைத் தயாரித்து ஒவ்வொரு ஆவணத்தையும் சரிபார்க்கிறோம்.',
          'ஆன்லைனில் நேரம் முன்பதிவு செய்கிறோம்.',
          'நீங்கள், உங்கள் துணை, சாட்சிகள் ஒருமுறை வருகை — சான்றிதழ் வழங்கப்படும்.',
        ],
        docs: ['திருமண அழைப்பிதழ், திருமணப் புகைப்படம்', 'மணமக்களின் வயதுச் சான்று', 'மணமக்களின் முகவரிச் சான்று', 'பாஸ்போர்ட் அளவு புகைப்படங்கள்', 'சாட்சிகளின் அடையாளச் சான்று'],
        faqs: [
          { q: 'திருமணத்தை ஏன் பதிவு செய்ய வேண்டும்?', a: 'பாஸ்போர்ட், துணை விசா, காப்பீடு, வங்கி நியமனங்களுக்குச் சான்றிதழ் தேவை.' },
          {
            q: 'பல ஆண்டுகளுக்கு முன் திருமணம் ஆனது. இப்போது பதிவு செய்யலாமா?',
            a: 'ஆம் — பழைய திருமணங்களையும் பதிவு செய்யலாம். விவரங்களை அனுப்புங்கள், என்ன தேவை என்று சொல்கிறோம்.',
          },
          { q: 'இருவரும் வர வேண்டுமா?', a: 'ஆம், தம்பதியரும் சாட்சிகளும் ஒருமுறை சார்பதிவாளர் அலுவலகம் வர வேண்டும்.' },
        ],
      },
    },
  },
  // TODO(client): poster item 13 wording unclear — confirm scope before publishing.
  {
    slug: 'bank-loan',
    group: 'legal',
    free: false,
    draft: true,
    visit: null,
    fee: null,
    timeline: null,
    content: {
      en: { title: 'Bank loan documentation', short: 'Property documents ready for your loan.', lead: '', steps: [], docs: [], faqs: [] },
      ta: { title: 'வங்கிக் கடன் ஆவணங்கள்', short: 'கடனுக்கான சொத்து ஆவணங்கள் தயார்.', lead: '', steps: [], docs: [], faqs: [] },
    },
  },
  // TODO(client): poster item 6 is partly illegible ("___ / Loss certificate") — confirm.
  {
    slug: 'loss-certificate',
    group: 'registration',
    free: false,
    draft: true,
    visit: null,
    fee: null,
    timeline: null,
    content: {
      en: { title: 'Loss certificate', short: 'Lost your original documents?', lead: '', steps: [], docs: [], faqs: [] },
      ta: { title: 'ஆவண இழப்புச் சான்று', short: 'அசல் ஆவணங்கள் தொலைந்துவிட்டதா?', lead: '', steps: [], docs: [], faqs: [] },
    },
  },
];

export const publishedServices = services.filter((s) => !s.draft);

export const groups = ['registration', 'land', 'legal'];

/** Locale copy for a service, falling back to English. */
export function serviceText(service, locale) {
  return service.content[locale] ?? service.content.en;
}
