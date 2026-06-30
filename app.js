// Application State
const MY_SECRET_API_KEY = ""; // کلیلەکەت لێرە دابنێ لە نێوان جووتە کۆتەکان بۆ ئەوەی خەڵکی تریش بتوانن وێبسایتەکە بەکاربهێنن

const state = {
    currentLang: localStorage.getItem('school_lang') || 'ku',
    apiKey: MY_SECRET_API_KEY || localStorage.getItem('school_gemini_key') || '',
    files: {
        summarize: null,
        exam: null,
        pdf: null,
        math: null,
        flashcards: null,
        grammar: null,
        mindmap: null,
        quiz: null
    },
    chatHistory: [],
    currentMode: null
};

// Translations Dictionary
const translations = {
    ku: {
        'app-title': 'کۆمەککاری خوێندکار',
        'app-subtitle': 'ژیریی دەستکرد بۆ خوێندکاران',
        'nav-summarize': 'کورتکردنەوەی بابەت',
        'nav-exam': 'وەڵامدانەوەی پرسیارەکان',
        'nav-pdf': 'ڕوونکردنەوەی PDF',
        'nav-info': 'ڕێنمایی و دەربارە',
        'settings-title': 'ڕێکخستنی کلیل',
        'status-no-key': 'کلیلی Gemini دیاری نەکراوە',
        'status-has-key': 'کلیلی Gemini چالاکە',
        'sum-title': 'کورتکردنەوەی بابەتی خوێندن',
        'sum-desc': 'وێنەی لاپەڕەی کتێب، دەفتەر یان نووسینێک بنێرە بۆ ئەوەی خێرا کورت بکرێتەوە و گرنگترین خاڵەکانی لێ دەربهێنرێت.',
        'upload-prompt': 'وێنەی بابەتەکە لێرە دابنێ یان کلیك بکە',
        'upload-hint': 'پشتگیری لە وێنە دەکات (PNG, JPG, WEBP)',
        'addon-label': 'تێبینی زیاتر یان پرسیاری تایبەت (ئارەزوومەندانە):',
        'btn-summarize': 'کورت بکەرەوە',
        'exam-title': 'وەڵامدانەوەی پرسیارەکانی تاقیکردنەوە',
        'exam-desc': 'وێنەی وەرەقەی تاقیکردنەوە، پرسیارەکان یان کویزەکان بنێرە بۆ ئەوەی وەڵامی دروست لەگەڵ ڕوونکردنەوەی تەواو بەدەست بهێنیت.',
        'upload-prompt-exam': 'وێنەی وەرەقەی پرسیارەکان لێرە دابنێ',
        'exam-addon-label': 'ڕێنمایی زیاتر (ئارەزوومەندانە):',
        'btn-solve': 'پرسیارەکان وەڵام بدەرەوە',
        'pdf-title': 'کورتکردنەوە و شیتاڵکردنی فایلی PDF',
        'pdf-desc': 'فایلی PDFی وانەکە بنێرە تا بتوانێت بۆت کورت بکاتەوە، خاڵە گرنگەکان دەربهێنێت یان پرسیارت لە لاپەڕەکانی هەبێت وەڵامت بداتەوە.',
        'upload-prompt-pdf': 'فایلی PDF لێرە دابنێ یان کلیك بکە',
        'upload-hint-pdf': 'پشتگیری لە فایلی PDF دەکات (تاوەکو ١٥ مێگابایت)',
        'pdf-addon-label': 'چی لە فایلەکە بکەم؟ (ئارەزوومەندانە):',
        'btn-explain-pdf': 'فایلەکە شیکار بکە',
        'info-title': 'ڕێنمایی بەکارهێنانی سیستەمەکە',
        'info-desc': 'چۆن باشترین ئەنجام بەدەست بهێنم؟',
        'info-card1-title': 'کلیلی Gemini API',
        'info-card1-desc': 'سیستەمەکە پێویستی بە کلیلێکی فەرمی Gemini هەیە کە بە خۆڕایی بەدەست دێت. کلیلی خۆت لە بەشی ڕێکخستنەکان بنووسە. کلیلی تۆ لای ئێمە خەزن ناکرێت و تەنها لە مۆبایلەکەت یان کۆمپیوتەرەکەتدا دەمێنێتەوە.',
        'info-card2-title': 'وێنەی ڕوون بنێرە',
        'info-card2-desc': 'کاتێک وێنەی لاپەڕەیەکی کتێب یان پرسیارەکانی تاقیکردنەوە دەگریت، دڵنیابە کە ڕووناکییەکەی باشە و نووسینەکان بە ئاسانی دەخوێندرێنەوە بۆ ئەوەی ژیری دەستکرد باشترین شیکاری پێشکەش بکات.',
        'info-card3-title': 'پشتگیری فرەزمان',
        'info-card3-desc': 'دەتوانیت بە زمانی کوردی، عەرەبی یان ئینگلیزی پرسیار بکەیت. ژیری دەستکرد بە هەمان ئەو زمانە وەڵامت دەداتەوە کە تۆ دەتەوێت.',
        'info-card4-title': 'خۆڕایی و سەلامەت',
        'info-card4-desc': 'ئەم ماڵپەڕە بە تەواوی سەلامەتە و دڵنیایی دەدات کە هیچ زانیارییەکت بۆ هیچ لایەنێکی تر نانێردرێت جگە لە خودی کۆمپانیای گووگڵ.',
        'result-heading': 'ئەنجامی شیکردنەوە',
        'loader-msg': 'ژیری دەستکرد خەریکی بیرکردنەوە و شیکارکردنی فایلەکەیە...',
        'modal-title': 'ڕێکخستنی کلیلی Gemini API',
        'modal-desc': 'بۆ بەکارهێنانی ئەم بەرنامەیە پێویستە کلیلێکی خۆڕایی Gemini API بەدەستبهێنیت و لێرەدا پەیستی بکەیت:',
        'modal-help-title': 'چۆن کلیلەکە بەدەست بهێنم؟',
        'modal-help-step1': 'سەردانی ماڵپەڕی',
        'modal-help-step1-2': 'بکە.',
        'modal-help-step2': 'بە هەژماری Google (Gmail) خۆت بچۆ ژوورەوە.',
        'modal-help-step3': 'کلیك بکە لەسەر دوگمەی "Get API Key" و پاشان یەکێک دروست بکە.',
        'modal-help-step4': 'کۆپی بکە و لێرە پەیستی بکە.',
        'modal-cancel': 'پاشگەزبوونەوە',
        'modal-save': 'خەزنکردن',
        
        // New Features
        'nav-math': 'شیکاری بیرکاری',
        'nav-flashcards': 'فلاشکارد (کارتی زیرەک)',
        'math-title': 'شیکارکاری بیرکاری و فیزیا',
        'math-desc': 'وێنەی پرسیارێکی بیرکاری یان فیزیا بنێرە بۆ ئەوەی بە هەنگاو بە هەنگاو شیکارییەکەی ببینیت.',
        'upload-prompt-math': 'وێنەی پرسیارەکە لێرە دابنێ',
        'math-addon-label': 'تێبینی زیاتر (ئارەزوومەندانە):',
        'btn-solve-math': 'شیکار بکە',
        'flashcards-title': 'دروستکەری فلاشکارد',
        'flashcards-desc': 'وێنەیەک یان فایلێک بنێرە بۆ ئەوەی پرسیار و وەڵامی گرنگی لێ دەربهێنێت و بە شێوەی کارتی زیرەک پیشانی بدات.',
        'upload-prompt-flashcards': 'فایل یان وێنەکە لێرە دابنێ',
        'upload-hint-flashcards': 'پشتگیری لە وێنە و PDF دەکات (تا ١٥ مێگابایت)',
        'flashcards-addon-label': 'ژمارەی کارتەکان یان بابەتەکە (ئارەزوومەندانە):',
        'btn-generate-cards': 'کارتەکان دروست بکە',
        'chat-placeholder': 'پرسیاری زیاتر بکە...',

        // Mega Features
        'nav-grammar': 'پشکنەری ڕێنووس',
        'grammar-title': 'پشکنەری ڕێنووس و داڕشتن',
        'grammar-desc': 'وێنەیەکی دەستنووس یان دەقێک بنێرە بۆ ئەوەی هەڵە ڕێزمانییەکانیت بۆ ڕاست بکاتەوە و نمرەت پێ بدات.',
        'upload-prompt-grammar': 'وێنەی نووسینەکەت لێرە دابنێ',
        'grammar-addon-label': 'یان لێرە بینوسە (دەتوانیت مایک بەکاربهێنیت):',
        'btn-grammar': 'پێداچوونەوە بکە',
        
        'nav-mindmap': 'نەخشەی مێشک',
        'mindmap-title': 'دروستکەری نەخشەی مێشک (Mind Map)',
        'mindmap-desc': 'بابەتێک یان وێنەیەک بنێرە بۆ ئەوەی بە شێوەی هێڵکاری و نەخشە بۆت ڕوون بکاتەوە.',
        'upload-prompt-mindmap': 'وێنە یان فایلی بابەتەکە دابنێ',
        'mindmap-addon-label': 'بابەتەکە لێرە بنووسە ئەگەر فایلت نییە:',
        'btn-mindmap': 'نەخشەکە دروست بکە',
        
        'nav-planner': 'خشتەی خوێندن',
        'planner-title': 'دروستکەری خشتەی خوێندن',
        'planner-desc': 'کاتە بەتاڵەکانت و بابەتەکانت پێ بڵێ، خشتەیەکی ڕێکخراوت بۆ دروست دەکات.',
        'planner-addon-label': 'زانیارییەکانت بنووسە یان بە دەنگ بیڵێ:',
        'btn-planner': 'خشتەکە دروست بکە',
        
        'nav-tutor': 'ڕاهێنەری زمان',
        'tutor-title': 'ڕاهێنەری زمان',
        'tutor-desc': 'بە ئینگلیزی یان زمانی تر قسەی لەگەڵ بکە، هەڵەکانت بۆ ڕاست دەکاتەوە و فێرت دەکات.',
        'tutor-addon-label': 'چی دەتەوێت فێر ببیت؟ (ئینگلیزی، عەرەبی...)',
        'btn-tutor': 'دەستپێکردنی گفتوگۆ',
        
        'nav-translate': 'وەرگێڕان',
        'translate-title': 'وەرگێڕی زیرەک',
        'translate-desc': 'هەر دەقێک یان زمانێک بنووسە، ڕاستەوخۆ وەریگێڕە بۆ کوردی، ئینگلیزی یان هەر زمانێکی تر.',
        'translate-addon-label': 'دەقەکە بنووسە یان بە دەنگ بیڵێ:',
        'btn-translate': 'وەرگێڕان',

        'nav-focus': 'کاتی سەنجدان',
        'focus-title': 'کاتی سەنجدان (Focus Mode)',
        'focus-desc': 'کاتی خوێندنەکەت ڕێکبخە و بە تەواوی سەنج بخەرە سەر بابەتەکانت.',
        'btn-start': 'دەستپێکردن',
        'btn-pause': 'وەستان',
        'btn-reset': 'سەرلەنوێ',

        'nav-quiz': 'یاری و کویز',
        'quiz-title': 'یاری و کویز (Interactive Quizzes)',
        'quiz-desc': 'وانەکانت بکە بە یارییەکی خۆش و ڕاستەوخۆ تاقیکردنەوە بکە.',
        'upload-prompt-quiz': 'وێنە یان فایلی بابەتەکە دابنێ',
        'quiz-addon-label': 'تێبینی زیاتر بۆ یارییەکە:',
        'btn-quiz': 'دروستکردنی یاری',

        'nav-career': 'ڕێنماییکاری زانکۆ',
        'career-title': 'ڕێنماییکاری زانکۆ و پیشە',
        'career-desc': 'نمرەکانت و ئارەزووەکانت بنووسە بۆ ئەوەی باشترین کۆلێژت پێشنیار بکات.',
        'career-addon-label': 'زانیارییەکانت بنووسە یان بە دەنگ بیڵێ:',
        'btn-career': 'وەرگرتنی ڕێنمایی',

        'nav-code': 'یاریدەدەری کۆد',
        'code-title': 'یاریدەدەری کۆد (Programming Helper)',
        'code-desc': 'کۆدەکانت لێرە دابنێ بۆ ئەوەی هەڵەکانی بۆت چاک بکات یان بۆت ڕوون بکاتەوە.',
        'code-addon-label': 'کۆدەکەت یان پرسیارەکەت بنووسە:',
        'btn-code': 'شیکارکردنی کۆد',
        
        // Textarea Placeholders
        'placeholder-sum': 'بۆ نموونە: تەنها بە کوردییەکی زۆر سادە کورت بکەرەوە...',
        'placeholder-exam': 'بۆ نموونە: تەنها وەڵامەکانم بۆ بنووسە بەبێ درێژکردنەوە...',
        'placeholder-pdf': 'بۆ نموونە: سەرجەم خاڵە سەرەکییەکان و وادەکانی مێژوو دەربهێنە بە شێوەی خشتە...',
        'placeholder-math': 'بۆ نموونە: تەنها یاساکانم بۆ ڕوون بکەرەوە...',
        'placeholder-flashcards': 'بۆ نموونە: ١٠ پرسیاری قورسم بۆ دروست بکە لەم بابەتە...',

        // Messages
        'key-saved': 'کلیلەکە بە سەرکەوتوویی خەزنکرا!',
        'key-invalid': 'کلیلەکە کار ناکات. تکایە دڵنیابەرەوە لە ڕاستی کلیلەکە.',
        'key-required': 'تکایە سەرەتا کلیلی Gemini API لە ڕێکخستنەکان دابنێ.',
        'file-required': 'تکایە فایلی پێویست دیاری بکە پێش ناردن.',
        'api-error': 'هەڵەیەک ڕوویدا لە کاتی پەیوەندیکردن بە Gemini. تکایە دووبارە تاقیبکەرەوە.',
        'copy-success': 'کۆپی کرا بۆ حافظە!',
        'copy-fail': 'کۆپی نەکرا.',
        'processing': 'خەریکی پڕۆسێسکردنە...'
    },
    en: {
        'app-title': 'Student AI Assistant',
        'app-subtitle': 'AI Powered Learning Tools',
        'nav-summarize': 'Summarize Lesson',
        'nav-exam': 'Solve Exam Paper',
        'nav-pdf': 'PDF Explainer',
        'nav-info': 'Guide & About',
        'settings-title': 'API Key Settings',
        'status-no-key': 'Gemini API Key is not set',
        'status-has-key': 'Gemini API Key is Active',
        'sum-title': 'Summarize Study Materials',
        'sum-desc': 'Upload an image of a book page, notebook, or text to get an instant summary and key terms extracted.',
        'upload-prompt': 'Drag & drop lesson image here or click to browse',
        'upload-hint': 'Supports images (PNG, JPG, WEBP)',
        'addon-label': 'Additional notes or specific questions (Optional):',
        'btn-summarize': 'Summarize Now',
        'exam-title': 'Solve Exam Questions',
        'exam-desc': 'Upload an image of your exam paper or quiz to get answers and step-by-step explanations.',
        'upload-prompt-exam': 'Drag & drop exam paper image here',
        'exam-addon-label': 'Additional instructions (Optional):',
        'btn-solve': 'Solve Questions',
        'pdf-title': 'PDF Summarizer & Explainer',
        'pdf-desc': 'Upload a PDF of your lesson to get summaries, extract key points, or ask specific questions.',
        'upload-prompt-pdf': 'Drag & drop PDF file here or click to browse',
        'upload-hint-pdf': 'Supports PDF documents (up to 15MB)',
        'pdf-addon-label': 'What should I do with this file? (Optional):',
        'btn-explain-pdf': 'Analyze PDF',
        'info-title': 'How to Use the System',
        'info-desc': 'How do I get the best results?',
        'info-card1-title': 'Gemini API Key',
        'info-card1-desc': 'The system requires an official Gemini API key, which is free. Enter your key in Settings. Your key is stored only on your device and is never sent to our servers.',
        'info-card2-title': 'Send Clear Images',
        'info-card2-desc': 'When photographing book pages or exam sheets, ensure lighting is good and text is legible for optimal AI performance.',
        'info-card3-title': 'Multilingual Support',
        'info-card3-desc': 'You can write in Kurdish, Arabic, or English. The AI will respond in the language you request.',
        'info-card4-title': 'Free & Secure',
        'info-card4-desc': 'This website is secure and sends your data directly to Google\'s API, keeping your keys private.',
        'result-heading': 'Analysis Result',
        'loader-msg': 'AI is thinking and analyzing your file...',
        'modal-title': 'Gemini API Key Settings',
        'modal-desc': 'To use this app, you need to get a free Gemini API key and paste it below:',
        'modal-help-title': 'How to get the API Key?',
        'modal-help-step1': 'Visit',
        'modal-help-step1-2': '.',
        'modal-help-step2': 'Log in with your Google account (Gmail).',
        'modal-help-step3': 'Click on "Get API Key" and create a new key.',
        'modal-help-step4': 'Copy it and paste it here.',
        'modal-cancel': 'Cancel',
        'modal-save': 'Save Settings',
        
        // New Features
        'nav-math': 'Math Solver',
        'nav-flashcards': 'Flashcards',
        'math-title': 'Math & Physics Solver',
        'math-desc': 'Upload an image of a math or physics problem to get step-by-step solutions.',
        'upload-prompt-math': 'Drag & drop problem image here',
        'math-addon-label': 'Additional notes (Optional):',
        'btn-solve-math': 'Solve Problem',
        'flashcards-title': 'Flashcard Generator',
        'flashcards-desc': 'Upload an image or PDF to extract key questions and answers as interactive flashcards.',
        'upload-prompt-flashcards': 'Drag & drop image or PDF here',
        'upload-hint-flashcards': 'Supports images and PDFs (up to 15MB)',
        'flashcards-addon-label': 'Number of cards or specific topic (Optional):',
        'btn-generate-cards': 'Generate Cards',
        'chat-placeholder': 'Ask a follow-up question...',

        // Mega Features
        'nav-grammar': 'Grammar Checker',
        'grammar-title': 'Grammar & Essay Grader',
        'grammar-desc': 'Upload a handwritten essay or paste text to fix grammar mistakes and get a score.',
        'upload-prompt-grammar': 'Drag & drop essay image here',
        'grammar-addon-label': 'Or paste text here (Voice Input supported):',
        'btn-grammar': 'Check Grammar',
        
        'nav-mindmap': 'Mind Map',
        'mindmap-title': 'Mind Map Generator',
        'mindmap-desc': 'Upload a topic or image to visually map it out.',
        'upload-prompt-mindmap': 'Drag & drop topic file here',
        'mindmap-addon-label': 'Or describe the topic here:',
        'btn-mindmap': 'Generate Map',
        
        'nav-planner': 'Study Planner',
        'planner-title': 'Study Timetable Generator',
        'planner-desc': 'Tell us your subjects and available hours, and get an organized schedule.',
        'planner-addon-label': 'Write or dictate your information:',
        'btn-planner': 'Create Plan',
        
        'nav-tutor': 'Language Tutor',
        'tutor-title': 'Language Practice Tutor',
        'tutor-desc': 'Chat in English or any other language to practice and fix your mistakes.',
        'tutor-addon-label': 'What do you want to learn? (English, Arabic...)',
        'btn-tutor': 'Start Chat',
        
        'nav-translate': 'Smart Translator',
        'translate-title': 'Smart Translator',
        'translate-desc': 'Type or speak any text and translate it to Kurdish, English, or any other language instantly.',
        'translate-addon-label': 'Type or dictate your text:',
        'btn-translate': 'Translate',

        'nav-focus': 'Focus Mode',
        'focus-title': 'Focus Mode',
        'focus-desc': 'Manage your study time and focus entirely on your subjects.',
        'btn-start': 'Start',
        'btn-pause': 'Pause',
        'btn-reset': 'Reset',

        'nav-quiz': 'Interactive Quiz',
        'quiz-title': 'Interactive Quizzes',
        'quiz-desc': 'Turn your lessons into a fun game and test your knowledge directly.',
        'upload-prompt-quiz': 'Drag & drop topic file here',
        'quiz-addon-label': 'Additional notes for the quiz:',
        'btn-quiz': 'Generate Quiz',

        'nav-career': 'Career Guide',
        'career-title': 'University & Career Counselor',
        'career-desc': 'Enter your grades and interests to get the best college recommendations.',
        'career-addon-label': 'Write or dictate your information:',
        'btn-career': 'Get Advice',

        'nav-code': 'Code Helper',
        'code-title': 'Programming Helper',
        'code-desc': 'Paste your code here to fix errors or get explanations.',
        'code-addon-label': 'Write your code or question:',
        'btn-code': 'Analyze Code',
        
        // Textarea Placeholders
        'placeholder-sum': 'E.g., Summarize this in simple English for a 5th grader...',
        'placeholder-exam': 'E.g., Highlight the formulas used and explain question 3 in depth...',
        'placeholder-pdf': 'E.g., Create a 10-question quiz based on this chapter with answers...',
        'placeholder-math': 'E.g., Only explain the formulas used...',
        'placeholder-flashcards': 'E.g., Generate 10 hard questions from this chapter...',

        // Messages
        'key-saved': 'API key saved successfully!',
        'key-invalid': 'Invalid API Key. Please double check.',
        'key-required': 'Please set your Gemini API key in the settings first.',
        'file-required': 'Please select a file before submitting.',
        'api-error': 'Error connecting to Gemini. Please try again.',
        'copy-success': 'Copied to clipboard!',
        'copy-fail': 'Failed to copy.',
        'processing': 'Processing...'
    }
};

// DOM Elements
const elements = {
    html: document.documentElement,
    langSwitch: document.getElementById('lang-switch'),
    themeSwitch: document.getElementById('theme-switch'),
    themeIcon: document.getElementById('theme-icon'),
    statusDot: document.getElementById('status-dot'),
    statusText: document.getElementById('status-text'),
    
    // Navigation
    navItems: document.querySelectorAll('.nav-item'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    hamburger: document.getElementById('hamburger'),
    sidebar: document.querySelector('.sidebar'),
    
    // Modals
    settingsTrigger: document.getElementById('btn-settings-trigger'),
    settingsModal: document.getElementById('settings-modal'),
    closeModal: document.getElementById('btn-close-modal'),
    cancelSettings: document.getElementById('btn-cancel-settings'),
    saveSettings: document.getElementById('btn-save-settings'),
    apiKeyInput: document.getElementById('gemini-api-key'),
    toggleKeyVisibility: document.getElementById('btn-toggle-key-visibility'),
    
    // File inputs & Zones
    uploadZoneSum: document.getElementById('upload-zone-summarize'),
    fileInputSum: document.getElementById('file-summarize'),
    uploadZoneExam: document.getElementById('upload-zone-exam'),
    fileInputExam: document.getElementById('file-exam'),
    uploadZonePdf: document.getElementById('upload-zone-pdf'),
    fileInputPdf: document.getElementById('file-pdf'),
    pdfNameText: document.getElementById('pdf-name'),
    
    uploadZoneMath: document.getElementById('upload-zone-math'),
    fileInputMath: document.getElementById('file-math'),
    uploadZoneFlashcards: document.getElementById('upload-zone-flashcards'),
    fileInputFlashcards: document.getElementById('file-flashcards'),
    flashcardsPdfNameText: document.getElementById('flashcards-pdf-name'),
    
    uploadZoneGrammar: document.getElementById('upload-zone-grammar'),
    fileInputGrammar: document.getElementById('file-grammar'),
    uploadZoneMindmap: document.getElementById('upload-zone-mindmap'),
    fileInputMindmap: document.getElementById('file-mindmap'),
    mindmapPdfNameText: document.getElementById('mindmap-pdf-name'),
    uploadZoneQuiz: document.getElementById('upload-zone-quiz'),
    fileInputQuiz: document.getElementById('file-quiz'),
    quizPdfNameText: document.getElementById('quiz-pdf-name'),

    // Addons & Action Buttons
    textSumAddon: document.getElementById('text-summarize-addon'),
    textExamAddon: document.getElementById('text-exam-addon'),
    textPdfAddon: document.getElementById('text-pdf-addon'),
    textMathAddon: document.getElementById('text-math-addon'),
    textFlashcardsAddon: document.getElementById('text-flashcards-addon'),
    textGrammarAddon: document.getElementById('text-grammar-addon'),
    textMindmapAddon: document.getElementById('text-mindmap-addon'),
    textPlannerAddon: document.getElementById('text-planner-addon'),
    textTutorAddon: document.getElementById('text-tutor-addon'),
    textTranslateAddon: document.getElementById('text-translate-addon'),
    textQuizAddon: document.getElementById('text-quiz-addon'),
    textCareerAddon: document.getElementById('text-career-addon'),
    textCodeAddon: document.getElementById('text-code-addon'),
    
    btnGenSum: document.getElementById('btn-generate-summarize'),
    btnGenExam: document.getElementById('btn-generate-exam'),
    btnGenPdf: document.getElementById('btn-generate-pdf'),
    btnGenMath: document.getElementById('btn-generate-math'),
    btnGenFlashcards: document.getElementById('btn-generate-flashcards'),
    btnGenGrammar: document.getElementById('btn-generate-grammar'),
    btnGenMindmap: document.getElementById('btn-generate-mindmap'),
    btnGenPlanner: document.getElementById('btn-generate-planner'),
    btnGenTutor: document.getElementById('btn-generate-tutor'),
    btnGenTranslate: document.getElementById('btn-generate-translate'),
    btnGenQuiz: document.getElementById('btn-generate-quiz'),
    btnGenCareer: document.getElementById('btn-generate-career'),
    btnGenCode: document.getElementById('btn-generate-code'),
    
    // Results
    resultsWrapper: document.getElementById('results-wrapper'),
    resultLoader: document.getElementById('result-loader'),
    resultBody: document.getElementById('result-body'),
    btnCopy: document.getElementById('btn-copy-result'),
    btnPrint: document.getElementById('btn-print-result'),
    btnClear: document.getElementById('btn-clear-result'),
    btnSpeak: document.getElementById('btn-speak-result'),
    btnDownload: document.getElementById('btn-download-result'),
    
    chatInputContainer: document.getElementById('chat-input-container'),
    chatInputMsg: document.getElementById('chat-input-msg'),
    btnSendChat: document.getElementById('btn-send-chat'),
    
    // Toast
    toast: document.getElementById('toast')
};

// Initialize Application
function init() {
    setupTheme();
    setupTranslations();
    updateKeyStatus();
    setupEventListeners();
    setupVoiceInput();
    setupFocusTimer();
}

// Theme setup
function setupTheme() {
    const savedTheme = localStorage.getItem('school_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        elements.themeIcon.className = 'ti ti-moon';
    } else {
        document.body.classList.replace('light-theme', 'dark-theme');
        elements.themeIcon.className = 'ti ti-sun';
    }
    
    elements.themeSwitch.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.replace('dark-theme', 'light-theme');
            elements.themeIcon.className = 'ti ti-moon';
            localStorage.setItem('school_theme', 'light');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            elements.themeIcon.className = 'ti ti-sun';
            localStorage.setItem('school_theme', 'dark');
        }
    });
}

// Update API Key Connection Indicator
function updateKeyStatus() {
    if (state.apiKey) {
        elements.statusDot.className = 'status-dot green';
        elements.statusText.setAttribute('data-key', 'status-has-key');
        elements.apiKeyInput.value = state.apiKey;
    } else {
        elements.statusDot.className = 'status-dot red';
        elements.statusText.setAttribute('data-key', 'status-no-key');
        elements.apiKeyInput.value = '';
    }
    translateUI();
}

// Translations and Language Handler
function setupTranslations() {
    elements.langSwitch.addEventListener('click', () => {
        state.currentLang = state.currentLang === 'ku' ? 'en' : 'ku';
        localStorage.setItem('school_lang', state.currentLang);
        translateUI();
    });
}

function translateUI() {
    const lang = state.currentLang;
    elements.html.lang = lang;
    elements.html.dir = lang === 'ku' ? 'rtl' : 'ltr';
    
    // Translate all components with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Translate Placeholders
    elements.textSumAddon.placeholder = translations[lang]['placeholder-sum'];
    elements.textExamAddon.placeholder = translations[lang]['placeholder-exam'];
    elements.textPdfAddon.placeholder = translations[lang]['placeholder-pdf'];

    // Update Language Switcher text
    const langSpan = elements.langSwitch.querySelector('span');
    langSpan.textContent = lang === 'ku' ? 'English' : 'کوردی';
}

// Toast notification helper
function showToast(messageKey, isError = false) {
    const lang = state.currentLang;
    const msg = translations[lang][messageKey] || messageKey;
    elements.toast.textContent = msg;
    elements.toast.className = `toast show ${isError ? 'error' : 'success'}`;
    
    setTimeout(() => {
        elements.toast.className = 'toast hidden';
    }, 3500);
}

// Setup Event Handlers
function setupEventListeners() {
    // 1. Sidebar tab switching
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            elements.navItems.forEach(n => n.classList.remove('active'));
            elements.tabPanes.forEach(p => p.classList.remove('active'));
            
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.add('active');
            
            // Close mobile sidebar if open
            elements.sidebar.classList.remove('open');
            
            // Hide results on tab switch if empty
            if (!elements.resultLoader.classList.contains('hidden') || elements.resultBody.innerHTML !== '') {
                elements.resultsWrapper.classList.remove('hidden');
            } else {
                elements.resultsWrapper.classList.add('hidden');
            }
        });
    });

    // Mobile Hamburger
    elements.hamburger.addEventListener('click', () => {
        elements.sidebar.classList.toggle('open');
    });

    // Close sidebar clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!elements.sidebar.contains(e.target) && !elements.hamburger.contains(e.target) && elements.sidebar.classList.contains('open')) {
                elements.sidebar.classList.remove('open');
            }
        }
    });

    // 2. Settings Modal handling
    elements.settingsTrigger.addEventListener('click', () => {
        elements.settingsModal.classList.add('active');
        elements.apiKeyInput.focus();
    });

    const closeModal = () => elements.settingsModal.classList.remove('active');
    elements.closeModal.addEventListener('click', closeModal);
    elements.cancelSettings.addEventListener('click', closeModal);

    // Toggle API Key visibility
    elements.toggleKeyVisibility.addEventListener('click', () => {
        const input = elements.apiKeyInput;
        const icon = elements.toggleKeyVisibility.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'ti ti-eye-off';
        } else {
            input.type = 'password';
            icon.className = 'ti ti-eye';
        }
    });

    // Save Settings and check Key
    elements.saveSettings.addEventListener('click', async () => {
        const enteredKey = elements.apiKeyInput.value.trim();
        if (!enteredKey) {
            state.apiKey = '';
            localStorage.removeItem('school_gemini_key');
            updateKeyStatus();
            closeModal();
            return;
        }

        elements.saveSettings.textContent = translations[state.currentLang]['processing'];
        elements.saveSettings.disabled = true;

        // Verify Key validity via quick request
        const isValid = await verifyApiKey(enteredKey);
        elements.saveSettings.textContent = translations[state.currentLang]['modal-save'];
        elements.saveSettings.disabled = false;

        if (isValid) {
            state.apiKey = enteredKey;
            localStorage.setItem('school_gemini_key', enteredKey);
            updateKeyStatus();
            showToast('key-saved');
            closeModal();
        } else {
            showToast('key-invalid', true);
        }
    });

    // 3. File Input & Upload Zones
    setupUploadZone(elements.uploadZoneSum, elements.fileInputSum, 'summarize');
    setupUploadZone(elements.uploadZoneExam, elements.fileInputExam, 'exam');
    setupUploadZone(elements.uploadZonePdf, elements.fileInputPdf, 'pdf');
    setupUploadZone(elements.uploadZoneMath, elements.fileInputMath, 'math');
    setupUploadZone(elements.uploadZoneFlashcards, elements.fileInputFlashcards, 'flashcards');
    setupUploadZone(elements.uploadZoneGrammar, elements.fileInputGrammar, 'grammar');
    setupUploadZone(elements.uploadZoneMindmap, elements.fileInputMindmap, 'mindmap');
    setupUploadZone(elements.uploadZoneQuiz, elements.fileInputQuiz, 'quiz');

    // 4. Action Buttons (Submit queries)
    elements.btnGenSum.addEventListener('click', () => handleAISubmission('summarize'));
    elements.btnGenExam.addEventListener('click', () => handleAISubmission('exam'));
    elements.btnGenPdf.addEventListener('click', () => handleAISubmission('pdf'));
    elements.btnGenMath.addEventListener('click', () => handleAISubmission('math'));
    elements.btnGenFlashcards.addEventListener('click', () => handleAISubmission('flashcards'));
    elements.btnGenGrammar.addEventListener('click', () => handleAISubmission('grammar'));
    elements.btnGenMindmap.addEventListener('click', () => handleAISubmission('mindmap'));
    elements.btnGenPlanner.addEventListener('click', () => handleAISubmission('planner'));
    elements.btnGenTutor.addEventListener('click', () => handleAISubmission('tutor'));
    elements.btnGenTranslate.addEventListener('click', () => handleAISubmission('translate'));
    elements.btnGenQuiz.addEventListener('click', () => handleAISubmission('quiz'));
    elements.btnGenCareer.addEventListener('click', () => handleAISubmission('career'));
    elements.btnGenCode.addEventListener('click', () => handleAISubmission('code'));

    // 5. Result Utilities
    elements.btnClear.addEventListener('click', () => {
        elements.resultBody.innerHTML = '';
        elements.resultsWrapper.classList.add('hidden');
        elements.chatInputContainer.classList.add('hidden');
        state.chatHistory = [];
    });

    elements.btnCopy.addEventListener('click', async () => {
        const textToCopy = elements.resultBody.innerText;
        try {
            await navigator.clipboard.writeText(textToCopy);
            showToast('copy-success');
        } catch (err) {
            showToast('copy-fail', true);
        }
    });

    elements.btnPrint.addEventListener('click', () => {
        const printContent = elements.resultBody.innerHTML;
        const win = window.open('', '_blank');
        win.document.write(`
            <html>
                <head>
                    <title>${translations[state.currentLang]['result-heading']}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Vazirmatn:wght@400;600;700&display=swap" rel="stylesheet">
                    <style>
                        body { 
                            font-family: ${state.currentLang === 'ku' ? 'Vazirmatn' : 'Plus Jakarta Sans'}, sans-serif; 
                            direction: ${state.currentLang === 'ku' ? 'rtl' : 'ltr'};
                            padding: 40px; 
                            color: #333; 
                            line-height: 1.6;
                        }
                        h1, h2, h3 { color: #111; margin-top: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        th, td { border: 1px solid #ccc; padding: 10px; text-align: start; }
                        th { background: #f0f0f0; }
                        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
                        blockquote { border-inline-start: 4px solid #7c3aed; padding-inline-start: 15px; margin: 15px 0; color: #555; }
                        @media print {
                            body { padding: 0; }
                        }
                    </style>
                </head>
                <body>
                    <h2>${translations[state.currentLang]['result-heading']}</h2>
                    <hr/>
                    ${printContent}
                </body>
            </html>
        `);
        win.document.close();
        setTimeout(() => {
            win.print();
        }, 200);
    });

    elements.btnSpeak.addEventListener('click', handleTextToSpeech);
    elements.btnDownload.addEventListener('click', handleDownload);
    elements.btnSendChat.addEventListener('click', handleChatSubmission);
}

// Verify API Key
async function verifyApiKey(key) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'ping' }] }]
            })
        });
        return response.ok;
    } catch (e) {
        return false;
    }
}

// Setup Upload Zones
function setupUploadZone(zone, input, type) {
    // Click triggers file selector
    zone.addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove-file') || e.target.closest('.preview-zone')) return;
        input.click();
    });

    // Drag-over styling
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileSelection(e.dataTransfer.files[0], zone, type);
        }
    });

    input.addEventListener('change', () => {
        if (input.files.length > 0) {
            handleFileSelection(input.files[0], zone, type);
        }
    });

    // Delete Button trigger
    const removeBtn = zone.querySelector('.btn-remove-file');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearFileSelection(zone, input, type);
    });
}

// Handle selected file
function handleFileSelection(file, zone, type) {
    // Validation
    if (type === 'pdf') {
        if (file.type !== 'application/pdf') {
            showToast('Unsupported format. Please select a PDF file.', true);
            return;
        }
        if (file.size > 15 * 1024 * 1024) { // 15MB limit
            showToast('File is too large. Max 15MB allowed.', true);
            return;
        }
    } else if (type === 'flashcards') {
        if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
            showToast('Unsupported format. Please select an image or PDF.', true);
            return;
        }
        if (file.size > 15 * 1024 * 1024) { 
            showToast('File is too large. Max 15MB allowed.', true);
            return;
        }
    } else {
        if (!file.type.startsWith('image/')) {
            showToast('Unsupported format. Please select an image file.', true);
            return;
        }
    }

    state.files[type] = file;

    // Show Preview
    const previewZone = zone.querySelector('.preview-zone');
    const uploadContent = zone.querySelector('.upload-content');
    
    uploadContent.classList.add('hidden');
    previewZone.classList.remove('hidden');

    if (type === 'pdf') {
        elements.pdfNameText.textContent = file.name;
    } else if (type === 'flashcards') {
        const previewImg = document.getElementById('flashcards-image-preview');
        const previewPdf = document.getElementById('flashcards-pdf-preview');
        if (file.type === 'application/pdf') {
            previewImg.style.display = 'none';
            previewPdf.style.display = 'flex';
            elements.flashcardsPdfNameText.textContent = file.name;
        } else {
            previewPdf.style.display = 'none';
            previewImg.style.display = 'block';
            const reader = new FileReader();
            reader.onload = (e) => { previewImg.src = e.target.result; };
            reader.readAsDataURL(file);
        }
    } else {
        const previewImg = previewZone.querySelector('.image-preview');
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Clear selected file
function clearFileSelection(zone, input, type) {
    state.files[type] = null;
    input.value = '';
    
    const previewZone = zone.querySelector('.preview-zone');
    const uploadContent = zone.querySelector('.upload-content');
    
    previewZone.classList.add('hidden');
    uploadContent.classList.remove('hidden');
    
    if (type !== 'pdf') {
        previewZone.querySelector('.image-preview').src = '';
    }
}

// File Reader Promise Helper (With Image Compression)
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve({
                    mimeType: file.type,
                    data: reader.result.split(',')[1]
                });
            };
            reader.onerror = error => reject(error);
            return;
        }
        
        // Compress images to make the website super fast
        const img = new Image();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1600;
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
            
            resolve({
                mimeType: 'image/jpeg',
                data: dataUrl.split(',')[1]
            });
        };
        
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Main AI Generation Handler
async function handleAISubmission(type) {
    if (!state.apiKey) {
        showToast('key-required', true);
        elements.settingsModal.classList.add('active');
        return;
    }

    const file = state.files[type];
    const requiresFile = ['summarize', 'exam', 'pdf', 'math', 'flashcards'].includes(type);
    
    // Check if user has no file but typed something for grammar/mindmap
    let addonVal = "";
    if (type === 'grammar') addonVal = elements.textGrammarAddon.value.trim();
    if (type === 'mindmap') addonVal = elements.textMindmapAddon.value.trim();
    if (type === 'planner') addonVal = elements.textPlannerAddon.value.trim();
    if (type === 'tutor') addonVal = elements.textTutorAddon.value.trim();
    if (type === 'translate') addonVal = elements.textTranslateAddon.value.trim();
    if (type === 'quiz') addonVal = elements.textQuizAddon.value.trim();
    if (type === 'career') addonVal = elements.textCareerAddon.value.trim();
    if (type === 'code') addonVal = elements.textCodeAddon.value.trim();

    if (requiresFile && !file) {
        showToast('file-required', true);
        return;
    }
    
    if (!file && !addonVal && !requiresFile && type !== 'grammar' && type !== 'mindmap') {
        showToast('تکایە سەرەتا زانیاری بنووسە.', true);
        return;
    }
    
    if ((type === 'grammar' || type === 'mindmap') && !file && !addonVal) {
        showToast('تکایە فایلێک دابنێ یان نووسینێک بنووسە.', true);
        return;
    }

    state.currentMode = type;
    state.chatHistory = []; // Reset history for new submission

    // Scroll to results and show loader
    elements.resultsWrapper.classList.remove('hidden');
    elements.chatInputContainer.classList.add('hidden');
    elements.resultLoader.classList.remove('hidden');
    elements.resultBody.innerHTML = '';
    
    // Smooth scroll to results
    elements.resultsWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
        let fileData = null;
        if (file) {
            fileData = await fileToBase64(file);
        }
        
        let systemPrompt = "";
        let addon = "";

        if (type === 'summarize') {
            addon = elements.textSumAddon.value.trim();
            systemPrompt = `پۆلێنکردن و کورتکردنەوەی بابەتی خوێندنی هاوپێچکراو بە زمانی کوردی. تکایە کورتکردنەوەیەکی زۆر ڕوون، ڕێکخراو و پوخت پێشکەش بکە کە بە شێوەی مارکداون (Markdown) بێت و پێکهاتبێت لە: 
1. کورتەی گشتی (بە چەند دێڕێک).
2. گرنگترین خاڵەکانی بابەتەکە بە شێوەی خاڵبەندی.
3. زاراوە، پێناسە و یاسا سەرەکییەکان بە شێوەی خشتە یان بەهێزکراو (bold).
ئەگەر بەکارهێنەر تێبینییەکی زیاتری ناردبوو، بە تەواوی ڕەچاوی بکە: "${addon}"`;
        } else if (type === 'exam') {
            addon = elements.textExamAddon.value.trim();
            systemPrompt = `تۆ مامۆستایەکی ژیر و یارمەتیدەری. سەیری ئەم وەرەقەی تاقیکردنەوەیە بکە. تکایە سەرجەم پرسیارەکان دەربهێنە و وەڵامی ڕاست و دروستی یەک بە یەکیان بنووسە بە شێوەی مارکداون بە زمانی کوردی:
1. دەقی پرسیارەکە بنووسە.
2. وەڵامە دروستەکە بە ڕوونی بنووسە.
3. هۆکاری هەڵبژاردن یان ڕوونکردنەوەی وەڵامەکە شی بکەرەوە.
ئەگەر بەکارهێنەر ڕێنمایی تایبەتی ناردبوو، ڕەچاوی بکە: "${addon}"`;
        } else if (type === 'pdf') {
            addon = elements.textPdfAddon.value.trim();
            systemPrompt = `تۆ سەرچاوەیەکی زانیاری گرنگی بۆ فێرخوازان. فایلی PDFی هاوپێچکراو شیتاڵ و کورت بکەرەوە بە شێوەی مارکداون بە زمانی کوردی. سەرجەم تەوەرە سەرەکییەکان و پوختەی لاپەڕەکان شی بکەرەوە.
ئەگەر بەکارهێنەر داواکاری یان پرسیاری تایبەتی هەبوو لەسەر فایلەکە، پێش هەموو شتێک ئەو وەڵام بدەرەوە: "${addon}"`;
        } else if (type === 'math') {
            addon = elements.textMathAddon.value.trim();
            systemPrompt = `تۆ شارەزایەکی بیرکاری و فیزیای. وێنەی هاوپێچکراو پرسیارێکی بیرکاری یان فیزیایە. پرسیارەکە بە وردی شی بکەرەوە و بە هەنگاو بە هەنگاو (step-by-step) شیکاری بۆ بکە تا گەیشتن بە ئەنجامی کۆتایی. ئەگەر یاسایەک بەکارهاتووە، پێشتر بینووسە و ڕوونی بکەرەوە بۆچی بەکارهاتووە. وەڵامەکە بە زمانی کوردی بنووسە.
ئەگەر بەکارهێنەر داواکاری یان پرسیاری تایبەتی هەبوو لەسەر پرسیارەکە، ڕەچاوی بکە: "${addon}"`;
        } else if (type === 'flashcards') {
            addon = elements.textFlashcardsAddon.value.trim();
            systemPrompt = `تۆ مامۆستایەکی زیرەکی. پێویستە ئەم وانەیە یان فایلە هاوپێچکراوە بکەیتە کۆمەڵێک فلاشکارد (کارتەکانی پرسیار و وەڵام بۆ پێداچوونەوە).
تکایە تەنها ئەنجامەکە بە شێوازی ئەم فۆرماتەی خوارەوە بنووسە بێ هیچ قسەیەکی تر و پێشەکییەکی تر:
Q: [پرسیارەکە لێرە بنووسە]
A: [وەڵامەکە لێرە بنووسە]

Q: [پرسیاری دووەم]
A: [وەڵامی دووەم]

گرنگە هەر پرسیارێک بە "Q: " دەست پێبکات و وەڵامەکەشی ڕاستەوخۆ لە دوای ئەو بێت بە "A: ". کەمتر لە ٥ کارت مەنووسە. بە زمانی کوردی بێت.
ئەگەر داواکاری تری هەبوو ڕەچاوی بکە: "${addon}"`;
        } else if (type === 'grammar') {
            addon = addonVal;
            systemPrompt = `تۆ مامۆستایەکی زمانەوانی و ڕێنووسیت. سەیری ئەم دەقە یان ئەم وێنەیەی خوارەوە بکە: "${addon}". هەڵە ڕێزمانی و ڕێنووسییەکانی ڕاست بکەرەوە، وشەی بەهێزتر پێشنیار بکە، نمرەیەک لەسەر ١٠ بۆ داڕشتنەکە دابنێ، و ڕوونی بکەرەوە بۆچی ئەو هەڵانەت ڕاست کردووەتەوە. وەڵامەکە بە زمانی کوردی بێت.`;
        } else if (type === 'mindmap') {
            addon = addonVal;
            systemPrompt = `تۆ شارەزایەکی دروستکردنی نەخشەی مێشکی (Mind Map). کورتە بابەت یان وێنەی هاوپێچکراو: "${addon}". بەکارهێنەر دەیەوێت ئەم بابەتە ببێتە نەخشەیەکی مێشک.
تکایە تەنها یەک کۆدی Mermaid.js بنووسە بۆ نەخشەکە، لە نێوان سێ باکتیک و وشەی mermaid. نموونە:
\`\`\`mermaid
graph TD;
A-->B;
\`\`\`
پێش کۆدەکە و دوای کۆدەکە دەتوانیت بە کورتی ڕوونکردنەوە بدەیت.`;
        } else if (type === 'planner') {
            addon = addonVal;
            systemPrompt = `تۆ ڕێکخەرێکی کاتی زیرەکی. خوێندکارەکە ئەم زانیارییانەی پێداویت: "${addon}".
تکایە خشتەیەکی ڕێکخراوی خوێندنی بۆ دروست بکە بە شێوەی خشتەی مارکداون (Markdown Table). بۆ هەر ڕۆژێک و کاتێک کە گونجاوە بابەتی تێدا دابنێ بە گوێرەی زانیارییەکانی خوێندکارەکە. وەڵامەکە بە زمانی کوردی بێت.`;
        } else if (type === 'tutor') {
            addon = addonVal;
            systemPrompt = `تۆ مامۆستایەکی زمان و ڕاهێنەری زمانی (Language Tutor). خوێندکارەکە دەیەوێت قسەت لەگەڵ بکات لەسەر ئەم بابەتە یان ئەم زمانە: "${addon}".
یەکسەر دەست بکە بە قسەکردن لەگەڵیدا بەو زمانەی کە داوای کردووە (وەک ئینگلیزی، یان عەرەبی). پرسیاری لێ بکە بۆ ئەوەی وەڵام بداتەوە. ئەگەر هەڵەی کرد، بە نەرمی و بە کوردی پێی بڵێ کە هەڵەی کردووە و ڕاستەکەی چییە، پاشان بەردەوام بە لە گفتوگۆکە.`;
        } else if (type === 'translate') {
            addon = addonVal;
            systemPrompt = `تۆ وەرگێڕێکی زمانەوانی زۆر شارەزایت. ئەگەر دەقەکە کوردی بوو وەریگێڕە بۆ ئینگلیزییەکی ڕەوان، وە ئەگەر دەقەکە ئینگلیزی بوو وەریگێڕە بۆ کوردییەکی ڕەوان. ئەگەر زمانێکی تر بوو، وەریگێڕە بۆ کوردی.
تەنها وەرگێڕانەکە بنووسە بەبێ هیچ قسەیەکی زیادە.
دەقەکە ئەمەیە: "${addon}"`;
        } else if (type === 'quiz') {
            addon = addonVal;
            systemPrompt = `تۆ مامۆستایەکی زیرەکیت کە یاری و کویز (Multiple Choice Quiz) دروست دەکەیت.
پێویستە وەڵامەکەت تەنها بە فۆرماتی دروستی JSON بێت، بۆ ئەوەی بەرنامەکەمان ڕاستەوخۆ بیکاتە یاری. تەنها Array یەک بگەڕێنەوە کە ناوەکەی Object بن کە پرسیار و هەڵبژاردنەکانی تێدایە.
هیچ شتێکی تر مەنووسە جگە لە JSON.
نموونەی داواکراو:
[
  {
    "q": "پرسیارەکە لێرە دەبێت؟",
    "options": ["هەڵبژاردنی ١", "هەڵبژاردنی ٢", "هەڵبژاردنی ٣", "هەڵبژاردنی ٤"],
    "answer": 0,
    "explanation": "ڕوونکردنەوە بۆچی ئەمە ڕاستە."
  }
]
تێبینی: 'answer' پێویستە ئیندێکسی وەڵامە ڕاستەکە بێت (واتە 0, 1, 2, یان 3).
ئەمە سەرچاوەکەیە بۆ پرسیارەکان:
${addon}`;
        } else if (type === 'career') {
            addon = addonVal;
            systemPrompt = `تۆ ڕێنماییکارێکی زانکۆ و پیشەیت. خوێندکارێک ئەم زانیاریانەی خوارەوەی پێت داوە دەربارەی نمرەکانی و حەزەکانی.
پێشنیاری باشترین کۆلێژەکان و بەشەکانی زانکۆی بۆ بکە کە گونجاوە لەگەڵ دۆخەکەیدا. هەروەها هەنگاوەکانی چۆنیەتی گەیشتن بەو ئامانجەی پێ بڵێ و هانی بدە.
زانیارییەکانی خوێندکارەکە:
"${addon}"`;
        } else if (type === 'code') {
            addon = addonVal;
            systemPrompt = `تۆ یاریدەدەرێکی پرۆگرامسازی زۆر زیرەکیت (Programming Helper). خوێندکارێک ئەم کۆدە یان ئەم پرسیارەی بۆت ناردووە.
کۆدەکە بخوێنەوە، ئەگەر هەڵەی تێدایە چاکی بکە، وە بە کورتی بە زمانی کوردی ڕوونی بکەرەوە کە چیت کردووە یان چۆن کار دەکات.
دڵنیابە لەوەی کۆدەکان لەناو (Markdown Code Blocks) دابنێیت بۆ ئەوەی بە جوانی دەربکەون.
داواکارییەکە:
"${addon}"`;
        }

        // Setup first user message
        const initialUserMessage = {
            role: "user",
            parts: [
                { text: systemPrompt }
            ]
        };
        
        if (fileData) {
            initialUserMessage.parts.push({
                inlineData: {
                    mimeType: fileData.mimeType,
                    data: fileData.data
                }
            });
        }
        
        state.chatHistory.push(initialUserMessage);
        
        await fetchAndRenderGeminiResponse();

    } catch (error) {
        showErrorInResult(error.message);
    }
}

async function fetchAndRenderGeminiResponse() {
    try {
        elements.resultLoader.classList.remove('hidden');
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${state.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: state.chatHistory
            })
        });

        if (!response.ok) {
            let errorMsg = `HTTP ${response.status} ${response.statusText}`;
            try {
                const errData = await response.json();
                if (errData && errData.error && errData.error.message) {
                    errorMsg = errData.error.message;
                }
            } catch (e) {}
            throw new Error(errorMsg);
        }

        const data = await response.json();
        let geminiText = "";
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            geminiText = data.candidates[0].content.parts[0].text;
            
            // Save model response to history
            state.chatHistory.push({
                role: "model",
                parts: [{ text: geminiText }]
            });
            
        } else {
            throw new Error("No response from AI (might be a safety block).");
        }
        
        elements.resultLoader.classList.add('hidden');
        
        if (state.currentMode === 'flashcards' && state.chatHistory.length <= 2) {
            elements.resultBody.innerHTML = parseFlashcards(geminiText);
            setupFlashcardEvents();
            elements.chatInputContainer.classList.remove('hidden');
        } else if (state.currentMode === 'quiz' && state.chatHistory.length <= 2) {
            elements.resultBody.innerHTML = renderInteractiveQuiz(geminiText);
            setupQuizEvents();
            elements.chatInputContainer.classList.remove('hidden');
        } else {
            if (state.chatHistory.length > 2) {
                appendChatMessage(geminiText, 'ai');
                if (state.currentMode === 'tutor') {
                    // Auto text to speech for tutor
                    autoSpeakTutor(geminiText);
                }
            } else {
                elements.resultBody.innerHTML = parseMarkdown(geminiText);
                elements.chatInputContainer.classList.remove('hidden');
                
                // Initialize Mermaid if any diagram exists
                if (window.mermaid && elements.resultBody.querySelector('.mermaid')) {
                    mermaid.init(undefined, elements.resultBody.querySelectorAll('.mermaid'));
                }
            }
        }
    } catch (error) {
        showErrorInResult(error.message);
    }
}

function showErrorInResult(msg) {
    elements.resultLoader.classList.add('hidden');
    elements.resultBody.innerHTML = `<div style="color:var(--danger-color); text-align:center; padding: 20px;">
        <i class="ti ti-alert-triangle" style="font-size: 40px; margin-bottom: 10px; display:block;"></i>
        <span style="font-weight:700; display:block; margin-bottom:8px;">${translations[state.currentLang]['api-error']}</span>
        <span style="font-size:12px; color:var(--text-muted); direction:ltr; display:block;">Error Details: ${msg}</span>
    </div>`;
}

// Chat Handlers
async function handleChatSubmission() {
    const msg = elements.chatInputMsg.value.trim();
    if (!msg) return;
    
    elements.chatInputMsg.value = '';
    appendChatMessage(msg, 'user');
    
    state.chatHistory.push({
        role: "user",
        parts: [{ text: msg }]
    });
    
    elements.chatInputContainer.scrollIntoView({ behavior: 'smooth' });
    
    await fetchAndRenderGeminiResponse();
}

function appendChatMessage(text, role) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${role}`;
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'chat-header';
    
    if (role === 'user') {
        headerDiv.innerHTML = `<i class="ti ti-user"></i> <span>${state.currentLang === 'ku' ? 'خوێندکار' : 'Student'}</span>`;
        msgDiv.appendChild(headerDiv);
        const textDiv = document.createElement('div');
        textDiv.textContent = text;
        msgDiv.appendChild(textDiv);
    } else {
        headerDiv.innerHTML = `<i class="ti ti-brain"></i> <span>${state.currentLang === 'ku' ? 'ژیری دەستکرد' : 'AI Assistant'}</span>`;
        msgDiv.appendChild(headerDiv);
        const textDiv = document.createElement('div');
        textDiv.innerHTML = parseMarkdown(text);
        msgDiv.appendChild(textDiv);
    }
    
    elements.resultBody.appendChild(msgDiv);
    
    // Initialize Mermaid if any diagram exists in this message
    if (role === 'ai' && window.mermaid && msgDiv.querySelector('.mermaid')) {
        mermaid.init(undefined, msgDiv.querySelectorAll('.mermaid'));
    }
}

// TTS
function handleTextToSpeech() {
    const text = elements.resultBody.innerText;
    if (!text || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (state.currentLang === 'ku') {
        utterance.lang = 'ckb-IQ';
        if (!speechSynthesis.getVoices().some(v => v.lang.startsWith('ckb'))) {
            utterance.lang = 'ar-SA';
        }
    } else {
        utterance.lang = 'en-US';
    }
    
    window.speechSynthesis.speak(utterance);
}

function autoSpeakTutor(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Clean text from markdown for speaking
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Guess language based on text (if it has arabic characters, assume arabic/kurdish)
    if (/[\u0600-\u06FF]/.test(cleanText)) {
        utterance.lang = 'ar-SA';
    } else {
        utterance.lang = 'en-US';
    }
    
    window.speechSynthesis.speak(utterance);
}

// Phase 2: Interactive Quiz Logic
function renderInteractiveQuiz(geminiText) {
    try {
        // Try to extract JSON from the text
        const jsonMatch = geminiText.match(/\[\s*\{.*\}\s*\]/s);
        let quizData = [];
        if (jsonMatch) {
            quizData = JSON.parse(jsonMatch[0]);
        } else {
            quizData = JSON.parse(geminiText);
        }
        
        window.currentQuizData = quizData; // Store globally for event handlers
        window.currentQuizScore = 0;
        
        let html = `<div class="quiz-container">
            <div class="quiz-score-board" id="quiz-score">Score: 0 / ${quizData.length}</div>`;
            
        quizData.forEach((q, index) => {
            html += `
            <div class="quiz-question-box" id="question-${index}">
                <div class="quiz-question-text">${index + 1}. ${q.q}</div>
                <div class="quiz-options">`;
                
            q.options.forEach((opt, optIndex) => {
                html += `<button class="quiz-option" data-qindex="${index}" data-optindex="${optIndex}">${opt}</button>`;
            });
            
            html += `</div>
                <div class="quiz-feedback hidden" id="feedback-${index}">
                    <p class="feedback-text"></p>
                    <p class="feedback-explanation" style="font-size:13px; color:var(--text-muted); margin-top:5px;">${q.explanation || ''}</p>
                </div>
            </div>`;
        });
        
        html += `</div>`;
        return html;
        
    } catch (e) {
        console.error("Failed to parse quiz JSON", e);
        return `<div style="color:var(--danger-color)">Error generating quiz. AI did not return a valid format.</div><pre>${geminiText}</pre>`;
    }
}

function setupQuizEvents() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.addEventListener('click', function() {
            if (this.disabled) return;
            
            const qIndex = parseInt(this.getAttribute('data-qindex'));
            const optIndex = parseInt(this.getAttribute('data-optindex'));
            const questionData = window.currentQuizData[qIndex];
            
            const isCorrect = (optIndex === questionData.answer);
            
            // Disable all options for this question
            const siblings = document.querySelectorAll(`.quiz-option[data-qindex="${qIndex}"]`);
            siblings.forEach(s => {
                s.disabled = true;
                s.style.cursor = 'default';
                if (parseInt(s.getAttribute('data-optindex')) === questionData.answer) {
                    s.classList.add('correct');
                }
            });
            
            const feedbackDiv = document.getElementById(`feedback-${qIndex}`);
            const feedbackText = feedbackDiv.querySelector('.feedback-text');
            feedbackDiv.classList.remove('hidden');
            
            if (isCorrect) {
                this.classList.add('correct');
                feedbackText.textContent = state.currentLang === 'ku' ? '✅ وەڵامێکی ڕاستە!' : '✅ Correct!';
                feedbackText.className = 'feedback-text correct-text';
                window.currentQuizScore++;
                document.getElementById('quiz-score').textContent = `Score: ${window.currentQuizScore} / ${window.currentQuizData.length}`;
            } else {
                this.classList.add('wrong');
                feedbackText.textContent = state.currentLang === 'ku' ? '❌ وەڵامێکی هەڵەیە.' : '❌ Incorrect.';
                feedbackText.className = 'feedback-text wrong-text';
            }
        });
    });
}

// Phase 2: Focus Timer Logic
function setupFocusTimer() {
    let focusTimerInterval = null;
    let timeLeft = 25 * 60;
    
    const display = document.getElementById('focus-timer-display');
    const btnStart = document.getElementById('btn-timer-start');
    const btnPause = document.getElementById('btn-timer-pause');
    const btnReset = document.getElementById('btn-timer-reset');
    
    const modeBtns = {
        'pomodoro': { el: document.getElementById('btn-mode-pomodoro'), time: 25 * 60 },
        'shortbreak': { el: document.getElementById('btn-mode-shortbreak'), time: 5 * 60 },
        'longbreak': { el: document.getElementById('btn-mode-longbreak'), time: 15 * 60 }
    };
    
    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function setMode(mode) {
        clearInterval(focusTimerInterval);
        btnStart.style.display = 'inline-flex';
        btnPause.style.display = 'none';
        
        Object.values(modeBtns).forEach(b => b.el.classList.remove('active'));
        modeBtns[mode].el.classList.add('active');
        
        timeLeft = modeBtns[mode].time;
        updateDisplay();
    }
    
    btnStart.addEventListener('click', () => {
        btnStart.style.display = 'none';
        btnPause.style.display = 'inline-flex';
        
        focusTimerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(focusTimerInterval);
                btnStart.style.display = 'inline-flex';
                btnPause.style.display = 'none';
                
                // Play a simple beep
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, ctx.currentTime);
                osc.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 1);
            }
        }, 1000);
    });
    
    btnPause.addEventListener('click', () => {
        clearInterval(focusTimerInterval);
        btnStart.style.display = 'inline-flex';
        btnPause.style.display = 'none';
    });
    
    btnReset.addEventListener('click', () => {
        const activeMode = Object.keys(modeBtns).find(k => modeBtns[k].el.classList.contains('active'));
        setMode(activeMode || 'pomodoro');
    });
    
    modeBtns['pomodoro'].el.addEventListener('click', () => setMode('pomodoro'));
    modeBtns['shortbreak'].el.addEventListener('click', () => setMode('shortbreak'));
    modeBtns['longbreak'].el.addEventListener('click', () => setMode('longbreak'));
    
    updateDisplay();
}

// Download Export
function handleDownload() {
    const text = elements.resultBody.innerText;
    if (!text) return;
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assistant_result_${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Parse Flashcards
function parseFlashcards(text) {
    const lines = text.split('\n');
    let cards = [];
    let currentQ = "";
    let currentA = "";
    
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('Q:')) {
            if (currentQ) cards.push({q: currentQ, a: currentA});
            currentQ = line.substring(2).trim();
            currentA = "";
        } else if (line.startsWith('A:')) {
            currentA = line.substring(2).trim();
        } else if (line !== "" && currentQ && !currentA) {
            currentQ += " " + line;
        } else if (line !== "" && currentA) {
            currentA += " " + line;
        }
    }
    if (currentQ) cards.push({q: currentQ, a: currentA});
    
    if (cards.length === 0) {
        return parseMarkdown(text);
    }
    
    let html = '<div class="flashcards-grid">';
    cards.forEach((card, index) => {
        html += `
        <div class="flashcard">
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <div>
                        <div style="color:var(--accent-primary); font-size:12px; margin-bottom:10px;">${state.currentLang === 'ku' ? 'پرسیاری' : 'Question'} ${index+1}</div>
                        ${card.q}
                    </div>
                </div>
                <div class="flashcard-back">
                    <div>
                        <div style="font-size:12px; margin-bottom:10px; opacity:0.8;">${state.currentLang === 'ku' ? 'وەڵام' : 'Answer'}</div>
                        ${card.a}
                    </div>
                </div>
            </div>
        </div>`;
    });
    html += '</div>';
    return html;
}

function setupFlashcardEvents() {
    const cards = document.querySelectorAll('.flashcard');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// Custom Markdown Parser Function
function parseMarkdown(md) {
    if (!md) return "";
    
    let html = md;
    
    // Escape standard tags for security
    html = html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Code Blocks
    html = html.replace(/```(mermaid)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<div class="mermaid">${code.trim()}</div>`;
    });
    
    html = html.replace(/```([\w-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const encodedCode = encodeURIComponent(code);
        return `<div class="code-block-wrapper">
            <button class="btn-copy-code" onclick="copyCodeBlock(this, '${encodedCode}')">
                <i class="ti ti-copy"></i> Copy
            </button>
            <pre><code class="language-${lang}">${escapedCode}</code></pre>
        </div>`;
    });

    // Inline Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold text
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic text
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Headings (H1 to H4)
    html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Blockquotes
    html = html.replace(/^&gt; (.*?)$/gm, '<blockquote>$1</blockquote>');

    // Horizontal Rule
    html = html.replace(/^---$/gm, '<hr>');

    // Tables parsing
    const lines = html.split('\n');
    let inTable = false;
    let tableHTML = '';
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.startsWith('|') && line.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                tableHTML = '<table>';
            }
            
            if (line.includes('---')) {
                continue; // Skip separator line
            }
            
            const cells = line.split('|').slice(1, -1).map(c => c.trim());
            const tag = tableHTML.includes('<thead>') ? 'td' : 'th';
            
            let rowHTML = '<tr>';
            if (tag === 'th') {
                tableHTML += '<thead>';
                cells.forEach(c => rowHTML += `<th>${c}</th>`);
                rowHTML += '</tr>';
                tableHTML += rowHTML + '</thead><tbody>';
            } else {
                cells.forEach(c => rowHTML += `<td>${c}</td>`);
                rowHTML += '</tr>';
                tableHTML += rowHTML;
            }
            lines[i] = ''; // Remove raw line
        } else {
            if (inTable) {
                inTable = false;
                tableHTML += '</tbody></table>';
                lines[i - 1] += '\n' + tableHTML;
                tableHTML = '';
            }
        }
    }
    
    html = lines.filter(l => l !== '').join('\n');

    // Bullet Lists
    html = html.replace(/^\s*[-*]\s+(.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

    // Ordered Lists
    html = html.replace(/^\s*\d+\.\s+(.*?)$/gm, '<li>$1</li>');
    // Ensure nested lists render cleanly without broken wraps
    html = html.replace(/(<li>.*?<\/li>)+/g, (match) => {
        if (match.startsWith('<ul>') || match.startsWith('<ol>')) return match;
        // Check if there was bullet points, if not wrap as ordered list
        return `<ol>${match}</ol>`;
    });
    
    // De-duplicate wrapping nested uls
    html = html.replace(/<ol><ul>/g, '<ul>').replace(/<\/ul><\/ol>/g, '</ul>');
    html = html.replace(/<ul><ol>/g, '<ol>').replace(/<\/ol><\/ul>/g, '</ol>');

    // Double Newlines to Paragraphs
    const paragraphs = html.split(/\n{2,}/);
    html = paragraphs.map(p => {
        p = p.trim();
        if (!p) return "";
        if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<blockquote') || p.startsWith('<table') || p.startsWith('<hr')) {
            return p;
        }
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    return html;
}

// Voice Input Setup
function setupVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        document.querySelectorAll('.btn-mic').forEach(btn => btn.style.display = 'none');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    document.querySelectorAll('.input-with-mic').forEach(container => {
        const micBtn = container.querySelector('.btn-mic');
        const inputField = container.querySelector('textarea, input');
        
        if (!micBtn || !inputField) return;

        micBtn.addEventListener('click', () => {
            if (micBtn.classList.contains('recording')) {
                recognition.stop();
                return;
            }

            // Set language dynamically
            recognition.lang = state.currentLang === 'ku' ? 'ckb-IQ' : 'en-US';
            
            // Add a fallback for arabic if kurdish fails to recognize properly on some devices
            if (state.currentMode === 'tutor') {
                 // Tutor mode might require recognizing english if the user wants to practice english
                 recognition.lang = 'en-US'; 
            }

            recognition.start();

            recognition.onstart = () => {
                micBtn.classList.add('recording');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                inputField.value += (inputField.value ? ' ' : '') + transcript;
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                micBtn.classList.remove('recording');
            };

            recognition.onend = () => {
                micBtn.classList.remove('recording');
            };
        });
    });
}

// Run App
window.addEventListener('DOMContentLoaded', () => {
    init();
    
    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('ServiceWorker registered'))
                .catch(err => console.log('ServiceWorker failed', err));
        });
    }
});

// Global copy function for Code Blocks
window.copyCodeBlock = function(btn, encodedCode) {
    try {
        const decodedCode = decodeURIComponent(encodedCode);
        navigator.clipboard.writeText(decodedCode);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="ti ti-check"></i> Copied!`;
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    } catch (e) {
        console.error("Failed to copy code", e);
    }
};
