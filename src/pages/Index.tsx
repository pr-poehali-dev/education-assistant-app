import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Привет! Я твой AI-помощник в обучении. Задавай любые вопросы!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [testTopic, setTestTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'chat', label: 'AI Чат', icon: 'MessageCircle' },
    { id: 'test', label: 'Тесты', icon: 'ClipboardCheck' },
    { id: 'tutor', label: 'Репетитор', icon: 'GraduationCap' },
    { id: 'exam', label: 'Экзамены', icon: 'BookOpen' },
    { id: 'language', label: 'Языки', icon: 'Globe' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  const features = [
    {
      icon: 'Brain',
      title: 'Объяснение тем',
      description: 'AI объясняет сложные концепции простым языком',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: 'FileQuestion',
      title: 'Генерация тестов',
      description: 'Автоматическое создание тестов по любой теме',
      gradient: 'from-blue-500 to-teal-500'
    },
    {
      icon: 'Users',
      title: 'Режим репетитора',
      description: 'Интерактивное обучение с проверкой знаний',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      icon: 'BookMarked',
      title: 'Подготовка к экзаменам',
      description: 'Индивидуальные планы и материалы',
      gradient: 'from-orange-500 to-amber-500'
    },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, { role: 'user', content: inputMessage }]);
    
    setTimeout(() => {
      const aiResponses = [
        'Отличный вопрос! Давайте разберём это подробнее...',
        'Я могу помочь с этим. Вот простое объяснение...',
        'Понимаю вашу задачу. Предлагаю такое решение...',
      ];
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)] 
      }]);
    }, 1000);
    
    setInputMessage('');
  };

  const generateTest = () => {
    if (!testTopic.trim()) return;
    
    const sampleQuestions: Question[] = [
      {
        id: 1,
        question: `Что является основой ${testTopic}?`,
        options: ['Вариант A', 'Вариант B', 'Вариант C', 'Вариант D'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: `Какой принцип важен в ${testTopic}?`,
        options: ['Принцип 1', 'Принцип 2', 'Принцип 3', 'Принцип 4'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: `Как применяется ${testTopic} на практике?`,
        options: ['Метод A', 'Метод B', 'Метод C', 'Метод D'],
        correctAnswer: 0
      },
    ];
    
    setQuestions(sampleQuestions);
  };

  const selectAnswer = (questionId: number, answerIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, userAnswer: answerIndex } : q
    ));
  };

  const handleMenuClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900">EduMate</h1>
            <p className="text-xs text-gray-500">AI Learning Assistant</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-3 md:p-4">
        <nav className="space-y-1 md:space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="font-medium text-sm md:text-base">{item.label}</span>
            </button>
          ))}
        </nav>
      </ScrollArea>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex h-screen">
        <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col">
          <SidebarContent />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                <Icon name="Sparkles" size={16} className="text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">EduMate</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name="Menu" size={24} />
            </Button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
              <div 
                className="bg-white w-64 h-full flex flex-col animate-slide-in-left"
                onClick={(e) => e.stopPropagation()}
              >
                <SidebarContent />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto">
            {activeTab === 'home' && (
              <div className="p-4 md:p-8 animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Добро пожаловать в EduMate! 👋
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Ваш персональный AI-ассистент для эффективного обучения
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  {features.map((feature, index) => (
                    <Card 
                      key={index}
                      className="p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-white"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 md:mb-4`}>
                        <Icon name={feature.icon as any} size={24} className="text-white" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </Card>
                  ))}
                </div>

                <Card className="p-5 md:p-6 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 border-0 text-white">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Начните обучение прямо сейчас</h3>
                      <p className="text-sm text-purple-100">Выберите режим и погрузитесь в мир знаний</p>
                    </div>
                    <Button 
                      onClick={() => setActiveTab('chat')}
                      className="bg-white text-purple-600 hover:bg-gray-100 w-full md:w-auto"
                    >
                      Начать
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="h-full flex flex-col animate-fade-in">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-white">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">AI Чат-помощник</h2>
                  <p className="text-gray-600 text-xs md:text-sm">Задавайте вопросы и получайте подробные объяснения</p>
                </div>
                
                <ScrollArea className="flex-1 p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4 max-w-3xl mx-auto">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 md:gap-3 animate-scale-in ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {msg.role === 'ai' && (
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                            <Icon name="Sparkles" size={14} className="text-white md:w-4 md:h-4" />
                          </div>
                        )}
                        <div
                          className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl max-w-[85%] md:max-w-lg text-sm md:text-base ${
                            msg.role === 'user'
                              ? 'bg-purple-500 text-white'
                              : 'bg-white border border-gray-200 text-gray-900'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-3 md:p-6 border-t border-gray-200 bg-white">
                  <div className="flex gap-2 md:gap-3 max-w-3xl mx-auto">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Введите ваш вопрос..."
                      className="flex-1 text-sm md:text-base"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      size="icon"
                    >
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'test' && (
              <div className="p-4 md:p-8 animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Генератор тестов</h2>
                  <p className="text-sm md:text-base text-gray-600">Создайте персональный тест по любой теме</p>
                </div>

                <Card className="p-4 md:p-6 mb-4 md:mb-6 bg-white">
                  <div className="flex flex-col md:flex-row gap-3">
                    <Input
                      value={testTopic}
                      onChange={(e) => setTestTopic(e.target.value)}
                      placeholder="Введите тему для теста"
                      className="flex-1 text-sm md:text-base"
                    />
                    <Button 
                      onClick={generateTest}
                      className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 w-full md:w-auto"
                    >
                      <Icon name="Wand2" size={18} className="mr-2" />
                      Создать тест
                    </Button>
                  </div>
                </Card>

                {questions.length > 0 && (
                  <div className="space-y-4 md:space-y-6">
                    {questions.map((q, index) => (
                      <Card key={q.id} className="p-4 md:p-6 bg-white animate-scale-in">
                        <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                          <Badge className="bg-purple-500 text-xs md:text-sm">{index + 1}</Badge>
                          <h3 className="text-sm md:text-lg font-semibold text-gray-900 flex-1">
                            {q.question}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                          {q.options.map((option, optIndex) => (
                            <button
                              key={optIndex}
                              onClick={() => selectAnswer(q.id, optIndex)}
                              className={`p-3 md:p-4 rounded-xl border-2 transition-all text-left text-sm md:text-base ${
                                q.userAnswer === optIndex
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </Card>
                    ))}
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600">
                      Проверить результаты
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tutor' && (
              <div className="p-4 md:p-8 animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Режим репетитора</h2>
                  <p className="text-sm md:text-base text-gray-600">Интерактивное обучение с проверкой знаний</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <Card className="p-5 md:p-6 bg-white text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Icon name="Target" size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Математика</h3>
                    <p className="text-xs md:text-sm text-gray-600">Алгебра и геометрия</p>
                  </Card>
                  <Card className="p-5 md:p-6 bg-white text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                      <Icon name="Microscope" size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Физика</h3>
                    <p className="text-xs md:text-sm text-gray-600">Механика и термодинамика</p>
                  </Card>
                  <Card className="p-5 md:p-6 bg-white text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Icon name="Languages" size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Языки</h3>
                    <p className="text-xs md:text-sm text-gray-600">Английский и немецкий</p>
                  </Card>
                </div>

                <Card className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white">
                  <div className="text-center">
                    <Icon name="GraduationCap" size={40} className="mx-auto mb-4 text-purple-500 md:w-12 md:h-12" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      Выберите предмет для начала
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6">
                      AI-репетитор задаст вопросы и проверит ваши знания
                    </p>
                    <Button className="bg-gradient-to-r from-purple-500 to-purple-600 w-full md:w-auto">
                      Начать урок
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'exam' && (
              <div className="p-4 md:p-8 animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Подготовка к экзаменам</h2>
                  <p className="text-sm md:text-base text-gray-600">Индивидуальные планы и материалы для успешной сдачи</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Card className="p-5 md:p-6 bg-white">
                    <Badge className="mb-3 md:mb-4 bg-orange-500 text-xs md:text-sm">ЕГЭ 2025</Badge>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">План подготовки</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                      Персональный план на основе ваших знаний
                    </p>
                    <Button variant="outline" className="w-full">
                      Создать план
                    </Button>
                  </Card>

                  <Card className="p-5 md:p-6 bg-white">
                    <Badge className="mb-3 md:mb-4 bg-blue-500 text-xs md:text-sm">Практика</Badge>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Пробные тесты</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                      Решайте задания в формате экзамена
                    </p>
                    <Button variant="outline" className="w-full">
                      Начать тест
                    </Button>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="p-4 md:p-8 animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Практика языков</h2>
                  <p className="text-sm md:text-base text-gray-600">Общайтесь с AI для улучшения навыков</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {['🇬🇧 English', '🇩🇪 Deutsch', '🇪🇸 Español'].map((lang) => (
                    <Card key={lang} className="p-5 md:p-6 bg-white text-center hover:shadow-xl transition-all cursor-pointer">
                      <div className="text-3xl md:text-4xl mb-3">{lang.split(' ')[0]}</div>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base">{lang.split(' ')[1]}</h3>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="p-4 md:p-8 animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Профиль</h2>
                  <p className="text-sm md:text-base text-gray-600">Ваша статистика и достижения</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <Card className="p-5 md:p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <Icon name="Trophy" size={28} className="mb-3 md:w-8 md:h-8" />
                    <div className="text-2xl md:text-3xl font-bold mb-1">42</div>
                    <div className="text-xs md:text-sm text-purple-100">Завершено уроков</div>
                  </Card>
                  <Card className="p-5 md:p-6 bg-gradient-to-br from-blue-500 to-teal-500 text-white">
                    <Icon name="Zap" size={28} className="mb-3 md:w-8 md:h-8" />
                    <div className="text-2xl md:text-3xl font-bold mb-1">7</div>
                    <div className="text-xs md:text-sm text-blue-100">Дней подряд</div>
                  </Card>
                  <Card className="p-5 md:p-6 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                    <Icon name="Star" size={28} className="mb-3 md:w-8 md:h-8" />
                    <div className="text-2xl md:text-3xl font-bold mb-1">98%</div>
                    <div className="text-xs md:text-sm text-orange-100">Средний балл</div>
                  </Card>
                </div>

                <Card className="p-5 md:p-6 bg-white">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">История обучения</h3>
                  <div className="space-y-3">
                    {['Квантовая физика', 'Алгебра: уравнения', 'English: Present Perfect'].map((topic, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900 text-sm md:text-base">{topic}</span>
                        <Badge className="bg-green-500 text-xs md:text-sm">Завершено</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;