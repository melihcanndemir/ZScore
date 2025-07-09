import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    app: {
      title: t({ en: "ZScore", tr: "ZScore" }),
      description: t({ en: "Analyze text complexity and information content", tr: "Metin karmaşıklığını ve bilgi içeriğini analiz edin" }),
      subtitle: t({ en: "Shannon Entropy Calculator", tr: "Shannon Entropi Hesaplayıcı" }),
    },
    navbar: {
      title: t({ en: "ZScore", tr: "ZScore" }),
      darkMode: t({ en: "Dark Mode", tr: "Karanlık Mod" }),
      lightMode: t({ en: "Light Mode", tr: "Aydınlık Mod" }),
      language: t({ en: "Language", tr: "Dil" }),
      home: t({ en: "Home", tr: "Ana Sayfa" }),
      about: t({ en: "About ZScore", tr: "ZScore Hakkında" }),
      calculator: t({ en: "Calculator", tr: "Hesaplayıcı" }),
      history: t({ en: "History", tr: "Geçmiş" }),
      github: t({ en: "GitHub", tr: "GitHub" }),
    },
    header: {
      title: t({ en: "Shannon Entropy Calculator", tr: "Shannon Entropi Hesaplayıcı" }),
      subtitle: t({
        en: "Analyze text to calculate Shannon entropy, lexical diversity, word frequency, and other linguistic metrics. Enter your text below to get started.",
        tr: "Shannon entropi, sözcük çeşitliliği, kelime sıklığı ve diğer dilbilimsel metrikleri hesaplamak için metin analizi yapın. Başlamak için aşağıya metninizi girin."
      }),
    },
    textInput: {
      title: t({ en: "Text Analysis Input", tr: "Metin Analizi Girişi" }),
      label: t({ en: "Enter Text for Analysis", tr: "Analiz için metin girin" }),
      placeholder: t({ en: "Enter text here to analyze Shannon Entropy and other linguistic metrics...", tr: "Shannon Entropi ve diğer dilsel ölçümleri analiz etmek için buraya metin girin..." }),
      analyzeButton: t({ en: "Analyze Text", tr: "Metni Analiz Et" }),
      clearButton: t({ en: "Clear", tr: "Temizle" }),
      examples: t({ en: "Try these sample texts", tr: "Aşağıdaki örnek metinleri deneyin" }),
      loadText: t({ en: "Load", tr: "Yükle" }),
      removeText: t({ en: "Remove", tr: "Kaldır" }),
    },
    results: {
      title: t({ en: "Analysis Results", tr: "Analiz Sonuçları" }),
      wordCount: t({ en: "Word Count", tr: "Kelime Sayısı" }),
      uniqueWords: t({ en: "Unique Words", tr: "Benzersiz Kelimeler" }),
      lexicalDiversity: t({ en: "Lexical Diversity", tr: "Sözcük Çeşitliliği" }),
      shannonEntropy: t({ en: "Shannon Entropy", tr: "Shannon Entropi" }),
      interpretation: {
        title: t({ en: "Interpretation", tr: "Yorum" }),
        high: t({ en: "High entropy indicates complex, unpredictable text with diverse vocabulary.", tr: "Yüksek entropi, çeşitli kelime dağarcığı olan karmaşık ve tahmin edilemeyen metni gösterir." }),
        medium: t({ en: "Medium entropy suggests balanced, natural language with moderate complexity.", tr: "Orta entropi, orta düzeyde karmaşıklığa sahip dengeli, doğal dil kullanımını gösterir." }),
        low: t({ en: "Low entropy indicates repetitive, predictable text with limited vocabulary.", tr: "Düşük entropi, sınırlı kelime dağarcığı olan tekrarlayan, tahmin edilebilir metni gösterir." }),
      },
      noResults: t({ en: "No analysis results yet. Enter some text and click Analyze.", tr: "Henüz analiz sonucu yok. Bir metin girin ve Analiz Et'e tıklayın." }),
      ratioExplanation: t({ en: "Ratio of unique words to total words", tr: "Toplam kelimelere göre benzersiz kelimelerin oranı" }),
      entropyExplanation: t({ en: "Measure of information content or unpredictability", tr: "Bilgi içeriği veya tahmin edilemezlik ölçüsü" }),
      topWords: t({ en: "Top 10 Word Frequencies", tr: "En Sık Kullanılan 10 Kelime" }),
    },
    history: {
      title: t({ en: "Analysis History", tr: "Analiz Geçmişi" }),
      empty: t({ en: "No analysis history yet", tr: "Henüz analiz geçmişi yok" }),
      clearButton: t({ en: "Clear History", tr: "Geçmişi Temizle" }),
      timestamp: t({ en: "Analyzed on", tr: "Analiz tarihi" }),
      loadTooltip: t({ en: "Load this text", tr: "Bu metni yükle" }),
      removeTooltip: t({ en: "Remove from history", tr: "Geçmişten kaldır" }),
    },
    footer: {
      title: t({ en: "Shannon Entropy Calculator", tr: "Shannon Entropi Hesaplayıcı" }),
      description: t({ en: "A tool for calculating information entropy and lexical diversity metrics", tr: "Bilgi entropisi ve sözcük çeşitliliği metriklerini hesaplamak için bir araç" }),
      credit: t({ en: "Created with information theory principles", tr: "Bilgi teorisi prensipleriyle oluşturulmuştur" }),
      source: t({ en: "Source Code", tr: "Kaynak Kodu" }),
      manifesto: t({ en: "Read the Manifesto", tr: "Manifestoyu Oku" }),
      about: t({ en: "About Shannon Entropy", tr: "Shannon Entropi Hakkında" }),
      aboutText: t({ en: "Shannon entropy quantifies the amount of information or uncertainty in a variable's possible outcomes. It was introduced by Claude Shannon in his 1948 paper \"A Mathematical Theory of Communication.\"", tr: "Shannon entropi, bir değişkenin olası sonuçlarındaki bilgi miktarını veya belirsizliği ölçer. Claude Shannon tarafından 1948 yılında \"İletişimin Matematiksel Teorisi\" adlı makalesinde tanıtılmıştır." }),
      formula: t({ en: "Formula", tr: "Formül" }),
      copyright: t({ en: "Crafted with entropy, purpose, and a whisper of meaning. All rights reserved.", tr: "Entropi, amaç ve anlam fısıltısıyla hazırlanmıştır. Tüm hakları saklıdır." }),
    },
  },
} satisfies Dictionary;

export default appContent; 