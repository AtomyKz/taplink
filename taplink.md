import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Send, 
  ShoppingBag,
  Briefcase,
  Info,
  Sparkles,
  ShieldCheck,
  Award,
  Calculator,
  TrendingUp,
  Droplet,
  Leaf
} from 'lucide-react';

// Логотип Atomy (Воссозданный оригинал)
const AtomyLogo = () => (
  <div className="flex flex-col items-center justify-center select-none cursor-default group">
    <div className="flex items-baseline text-[#00ADEF] leading-none transition-transform group-hover:scale-105 duration-300">
      <span className="text-[34px] font-black tracking-[-0.06em]" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        atom
      </span>
      <span className="text-[28px] ml-0.5 font-normal" style={{ fontFamily: 'system-ui, "Microsoft YaHei", "PingFang SC", sans-serif' }}>
        美
      </span>
    </div>
    <div className="text-[#00ADEF] text-[10px] font-bold tracking-[0.45em] ml-2 mt-[3px] leading-none">
      ATOMY
    </div>
  </div>
);

// Конфигурация валют
const CURRENCIES = {
  KZT: { id: 'KZT', symbol: '₸', min: 10000, max: 100000, step: 1000, defaultOrder: 32000 },
  RUB: { id: 'RUB', symbol: '₽', min: 2000, max: 20000, step: 500, defaultOrder: 5000 },
  USD: { id: 'USD', symbol: '$', min: 20, max: 200, step: 5, defaultOrder: 50 }
};

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    purpose: ''
  });

  // Состояния для калькулятора
  const [currency, setCurrency] = useState('KZT');
  const [partners, setPartners] = useState(30);
  const [averageOrder, setAverageOrder] = useState(CURRENCIES['KZT'].defaultOrder);

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    setAverageOrder(CURRENCIES[curr].defaultOrder);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/5 text-center border border-white relative z-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#00ADEF] to-cyan-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30">
            <CheckCircle2 className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Добро пожаловать!</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Ваша заявка успешно отправлена. Мы свяжемся с Вами в течение дня для завершения регистрации.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans pb-20 relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Декоративный фоновый паттерн (Blobs) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00ADEF]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Тематические бьюти-элементы на фоне (капли, листья) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Leaf className="absolute top-[15%] left-[5%] text-[#00ADEF]/10 w-32 h-32 -rotate-12 blur-[2px]" />
        <Droplet className="absolute top-[45%] right-[2%] text-cyan-400/10 w-40 h-40 rotate-12 blur-[3px]" />
        <Sparkles className="absolute bottom-[20%] left-[8%] text-[#00ADEF]/10 w-24 h-24 blur-[1px]" />
        <Leaf className="absolute bottom-[5%] right-[15%] text-green-400/10 w-20 h-20 -rotate-45 blur-[2px]" />
        {/* Мелкие пузырьки/частицы */}
        <div className="absolute top-[25%] right-[15%] w-6 h-6 bg-cyan-300/20 rounded-full blur-[1px]" />
        <div className="absolute bottom-[35%] left-[25%] w-8 h-8 bg-blue-300/20 rounded-full blur-[2px]" />
      </div>

      {/* Навигационная панель */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/50 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <AtomyLogo />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <ShieldCheck size={16} className="text-green-500" />
            <span className="hidden sm:inline">Официальная регистрация</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 mt-12 relative z-10">
        
        {/* Приветственный блок с персональным брендом */}
        <div className="mb-14 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles size={14} /> Открыт набор в команду
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Начни свой путь <br/>с <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ADEF] to-cyan-400">Atomy</span> уже сегодня
          </h1>

          {/* Приветственное сообщение от спонсора */}
          <div className="max-w-2xl mx-auto mt-8 bg-white/80 backdrop-blur-md border border-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Leaf size={120} className="rotate-45" />
            </div>
            
            <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-5 relative z-10">
              <div className="relative shrink-0">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-100 to-cyan-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                  <Award className="text-[#00ADEF] w-8 h-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle2 className="text-white w-3 h-3" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-lg text-slate-800">Елена Коханова</p>
                <p className="text-xs text-[#00ADEF] font-bold uppercase tracking-wider">Auto-sales Master</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base relative z-10">
              <p className="font-bold text-lg text-slate-900">
                Друзья, добро пожаловать в команду! 👋
              </p>
              <p>
                Спасибо за доверие и интерес к Atomy. Если Вы желаете зарегистрироваться в интернет-магазин и стать покупателем или бизнес-партнёром — просто заполните регистрационную форму ниже.
              </p>
              
              <div className="bg-blue-50/60 rounded-2xl p-4 sm:p-5 mt-5 border border-blue-100/50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-white rounded-full p-1 shadow-sm shrink-0">
                    <CheckCircle2 className="text-green-500 w-4 h-4" />
                  </div>
                  <p><b>Регистрация абсолютно бесплатная!</b> Мы зарегистрируем Вас и с радостью ответим на все вопросы.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-white rounded-full p-1 shadow-sm shrink-0">
                    <Send className="text-[#00ADEF] w-4 h-4 pl-0.5" />
                  </div>
                  <p>После регистрации, мы свяжемся с Вами в течение дня!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Форма регистрации */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.05)] relative overflow-hidden">
            
            {/* Важное уведомление внутри формы */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 mb-10 flex gap-4">
              <Info className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Внимание!</b> Если Вы уже зарегистрированы в Atomy и у Вас есть активный аккаунт, эту анкету заполнять не нужно.
              </p>
            </div>

            <div className="space-y-12">
              
              {/* Раздел 1: Личные данные */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">1. Личные данные</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">ФИО полностью *</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00ADEF] transition-colors" size={20} />
                      <input 
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:bg-white focus:border-[#00ADEF] focus:ring-4 focus:ring-[#00ADEF]/10 outline-none transition-all placeholder:text-slate-300"
                        placeholder="Иванов Иван Иванович"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Дата рождения *</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00ADEF] transition-colors" size={20} />
                      <input 
                        required
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:bg-white focus:border-[#00ADEF] focus:ring-4 focus:ring-[#00ADEF]/10 outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Раздел 2: Контакты */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">2. Контактная информация</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Электронная почта *</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00ADEF] transition-colors" size={20} />
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:bg-white focus:border-[#00ADEF] focus:ring-4 focus:ring-[#00ADEF]/10 outline-none transition-all placeholder:text-slate-300"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Номер телефона *</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00ADEF] transition-colors" size={20} />
                      <input 
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:bg-white focus:border-[#00ADEF] focus:ring-4 focus:ring-[#00ADEF]/10 outline-none transition-all placeholder:text-slate-300"
                        placeholder="+7 (___) ___ __ __"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Индекс и Адрес проживания *</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-5 text-slate-400 group-focus-within:text-[#00ADEF] transition-colors" size={20} />
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:bg-white focus:border-[#00ADEF] focus:ring-4 focus:ring-[#00ADEF]/10 outline-none transition-all resize-none placeholder:text-slate-300"
                      placeholder="123456, Страна, город, улица, дом, кв..."
                    />
                  </div>
                </div>
              </div>

              {/* Раздел 3: Цель */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">3. Ваша цель в Atomy *</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex flex-col gap-4 overflow-hidden group ${formData.purpose === 'business' ? 'border-[#00ADEF] bg-blue-50/50 shadow-md shadow-blue-500/10 -translate-y-1' : 'border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-white'}`}>
                    <input 
                      required
                      type="radio" 
                      name="purpose" 
                      value="business" 
                      className="hidden" 
                      onChange={handleInputChange} 
                    />
                    <div className={`p-3 rounded-2xl w-fit ${formData.purpose === 'business' ? 'bg-[#00ADEF] text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <p className={`font-bold text-lg mb-1 ${formData.purpose === 'business' ? 'text-slate-900' : 'text-slate-700'}`}>Бизнес-партнер</p>
                      <p className="text-sm text-slate-500">Хочу строить структуру и получать стабильный доход</p>
                    </div>
                    {formData.purpose === 'business' && <div className="absolute top-5 right-5 w-6 h-6 bg-[#00ADEF] rounded-full flex items-center justify-center text-white shadow-sm"><CheckCircle2 size={16} /></div>}
                  </label>

                  <label className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex flex-col gap-4 overflow-hidden group ${formData.purpose === 'buying' ? 'border-[#00ADEF] bg-blue-50/50 shadow-md shadow-blue-500/10 -translate-y-1' : 'border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-white'}`}>
                    <input 
                      required
                      type="radio" 
                      name="purpose" 
                      value="buying" 
                      className="hidden" 
                      onChange={handleInputChange} 
                    />
                    <div className={`p-3 rounded-2xl w-fit ${formData.purpose === 'buying' ? 'bg-[#00ADEF] text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <p className={`font-bold text-lg mb-1 ${formData.purpose === 'buying' ? 'text-slate-900' : 'text-slate-700'}`}>Покупатель</p>
                      <p className="text-sm text-slate-500">Покупка премиум-товаров со скидкой для себя и семьи</p>
                    </div>
                    {formData.purpose === 'buying' && <div className="absolute top-5 right-5 w-6 h-6 bg-[#00ADEF] rounded-full flex items-center justify-center text-white shadow-sm"><CheckCircle2 size={16} /></div>}
                  </label>
                </div>
              </div>

              {/* Кнопка отправки */}
              <div className="pt-8 mt-8 border-t border-slate-100">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full bg-gradient-to-r from-[#00ADEF] to-cyan-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#00ADEF]/30 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none relative overflow-hidden"
                >
                  {/* Эффект блика на кнопке */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Оставить заявку <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-6 tracking-wide leading-relaxed px-4 sm:px-10">
                  Заполняя данную Анкету, Вы даёте согласие на обработку данных, исключительно в целях Atomy.
                </p>
              </div>

            </div>
          </div>
        </form>

        {/* Интерактивный калькулятор */}
        <div className="mt-8 bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00ADEF] shadow-sm">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Калькулятор дохода</h3>
                  <p className="text-sm text-slate-500">Примерный расчет вашего потенциала</p>
                </div>
              </div>
              
              {/* Переключатель валют */}
              <div className="flex bg-white/60 p-1 rounded-xl border border-slate-200/50 shadow-sm w-fit">
                {Object.keys(CURRENCIES).map(curr => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => handleCurrencyChange(curr)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                      currency === curr 
                        ? 'bg-[#00ADEF] text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {/* Ползунок 1: Партнеры */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-slate-700">Активных партнеров в сети</label>
                  <span className="text-xl font-black text-[#00ADEF]">{partners} чел.</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="10" 
                  value={partners} 
                  onChange={(e) => setPartners(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00ADEF]"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>10</span>
                  <span>1000+</span>
                </div>
              </div>

              {/* Ползунок 2: Средний заказ */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-slate-700">Средний заказ партнера в месяц</label>
                  <span className="text-xl font-black text-[#00ADEF]">
                    {averageOrder.toLocaleString('ru-RU')} {CURRENCIES[currency].symbol}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={CURRENCIES[currency].min} 
                  max={CURRENCIES[currency].max} 
                  step={CURRENCIES[currency].step} 
                  value={averageOrder} 
                  onChange={(e) => setAverageOrder(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00ADEF]"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>{CURRENCIES[currency].min.toLocaleString('ru-RU')} {CURRENCIES[currency].symbol}</span>
                  <span>{CURRENCIES[currency].max.toLocaleString('ru-RU')} {CURRENCIES[currency].symbol}</span>
                </div>
              </div>

              {/* Результат */}
              <div className="mt-8 bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative overflow-hidden flex flex-col">
                {/* Легкий декоративный градиент под результатом */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 relative z-10 border-b border-slate-100 pb-6 mb-5">
                  {/* Дневной доход */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                        <TrendingUp className="text-green-500" size={18} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                        Доход в день
                      </span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight whitespace-nowrap">
                      {Math.floor(partners * averageOrder * 0.015).toLocaleString('ru-RU')} {CURRENCIES[currency].symbol}
                    </div>
                  </div>
                  
                  {/* Разделитель */}
                  <div className="hidden lg:block w-px bg-slate-200 self-stretch my-2"></div>
                  
                  {/* Доход в месяц */}
                  <div className="flex-1 lg:pl-2 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                        В месяц (~26 дней)
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-slate-400 tracking-tight whitespace-nowrap">
                      ≈ {(Math.floor(partners * averageOrder * 0.015) * 26).toLocaleString('ru-RU')} {CURRENCIES[currency].symbol}
                    </div>
                  </div>
                </div>

                {/* Сноска */}
                <div className="text-[11px] text-slate-400 leading-relaxed relative z-10">
                  * Расчет ориентировочный. Учитывает примерную частоту закрытия бинарных шагов в Atomy при регулярной активности структуры.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Подвал страницы */}
        <footer className="mt-16 text-center space-y-4 relative z-10">
          <div className="flex justify-center items-center gap-2 text-slate-300">
            <div className="h-px bg-slate-200 w-12" />
            <Award size={16} />
            <div className="h-px bg-slate-200 w-12" />
          </div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
            © {new Date().getFullYear()} Team Atomy • Elena Kokhanova
          </p>
        </footer>
      </main>

      {/* Анимация для блика кнопки (Tailwind config hack) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default App;