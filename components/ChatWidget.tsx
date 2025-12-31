'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getProvider } from '@/lib/data';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface ChatOption {
  label: string;
  value: string;
}

type ConversationStep =
  | 'welcome'
  | 'provider-selection'
  | 'city-selection'
  | 'people-count'
  | 'usage-type'
  | 'additional-services'
  | 'recommendation'
  | 'contact-method'
  | 'phone-input'
  | 'summary'
  | 'browsing';

interface ConversationData {
  provider?: string;
  city?: string;
  peopleCount?: string;
  usage?: string;
  additionalServices?: string;
  contactMethod?: string;
  phone?: string;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome');
  const [conversationData, setConversationData] = useState<ConversationData>({});
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detectar proveedor desde la URL
  const getCurrentProvider = (): string | undefined => {
    if (pathname === '/claro') return 'claro';
    if (pathname === '/movistar') return 'movistar';
    if (pathname === '/etb') return 'etb';
    return undefined;
  };

  // Obtener color del proveedor actual
  const getProviderColor = (): string => {
    const currentProvider = getCurrentProvider();
    if (!currentProvider) return '#2563eb'; // Azul por defecto para home

    try {
      const provider = getProvider(currentProvider as 'claro' | 'movistar' | 'etb');
      return provider.brand.primaryColor;
    } catch {
      return '#2563eb';
    }
  };

  const primaryColor = getProviderColor();

  // Cargar estado desde localStorage al iniciar
  useEffect(() => {
    const savedState = localStorage.getItem('chatWidget');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setMessages(parsed.messages || []);
        setCurrentStep(parsed.currentStep || 'welcome');
        setConversationData(parsed.conversationData || {});
        setIsOpen(parsed.isOpen || false);
        setIsMinimized(parsed.isMinimized !== undefined ? parsed.isMinimized : true);
        // Mostrar opciones si hay mensajes y no está en estados sin opciones
        if (parsed.messages && parsed.messages.length > 0 &&
            parsed.currentStep !== 'summary' &&
            parsed.currentStep !== 'browsing' &&
            parsed.currentStep !== 'phone-input') {
          setShowOptions(true);
        }
      } catch (e) {
        console.error('Error loading chat state:', e);
      }
    } else {
      // Auto-abrir después de 3 segundos solo si es primera vez
      const timer = setTimeout(() => {
        setIsOpen(true);
        addBotMessage('¡Hola! 👋 Soy Laura, asesora virtual. ¿Te ayudo a encontrar el plan de internet perfecto para ti?');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    if (messages.length > 0) {
      const state = {
        messages,
        currentStep,
        conversationData,
        isOpen,
        isMinimized,
      };
      localStorage.setItem('chatWidget', JSON.stringify(state));
    }
  }, [messages, currentStep, conversationData, isOpen, isMinimized]);

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Scroll automático cuando aparecen las opciones
  useEffect(() => {
    if (showOptions) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [showOptions]);

  const addMessage = (text: string, type: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, delay = 1000, showOptionsAfter = true) => {
    setShowOptions(false);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, 'bot');
      // Solo mostrar opciones si showOptionsAfter es true
      if (showOptionsAfter) {
        setTimeout(() => {
          setShowOptions(true);
        }, 100);
      }
    }, delay);
  };

  const handleUserResponse = (value: string, label: string) => {
    addMessage(label, 'user');
    setShowOptions(false);
    processUserResponse(value);
  };

  const processUserResponse = (value: string) => {
    const newData = { ...conversationData };

    switch (currentStep) {
      case 'welcome':
        if (value === 'yes') {
          // Detectar si estamos en una página de proveedor
          const currentProvider = getCurrentProvider();

          if (currentProvider) {
            // Si estamos en página de proveedor, saltar selección
            newData.provider = currentProvider;
            setConversationData(newData);
            setCurrentStep('people-count');

            const providerMessages: Record<string, string> = {
              claro: '¡Excelente elección! Claro tiene la mejor cobertura nacional y velocidades hasta 900 Mbps 🚀',
              movistar: '¡Genial! Movistar ofrece descuentos exclusivos online y streaming incluido 📺',
              etb: '¡Muy bien! ETB es líder en Bogotá con promociones especiales y fibra simétrica 🎁',
            };
            addBotMessage(providerMessages[currentProvider], 1000, false); // No mostrar opciones aún
            setTimeout(() => {
              addBotMessage('¿Para cuántas personas es el internet?', 1000, true); // Mostrar opciones después de este
            }, 2500);
          } else {
            // Si estamos en home, preguntar proveedor
            setCurrentStep('provider-selection');
            addBotMessage('¡Perfecto! Para mostrarte las mejores opciones, ¿qué proveedor te interesa?');
          }
        } else {
          setCurrentStep('browsing');
          addBotMessage('¡Entendido! Estoy aquí si necesitas ayuda. Solo haz clic en el chat cuando quieras hablar 😊', 800);
          setTimeout(() => setIsMinimized(true), 2000);
        }
        break;

      case 'provider-selection':
        newData.provider = value;
        setConversationData(newData);

        if (value === 'unsure') {
          setCurrentStep('city-selection');
          addBotMessage('No te preocupes, te ayudo a decidir 😊 ¿En qué ciudad vives?');
        } else {
          setCurrentStep('people-count');
          const providerMessages: Record<string, string> = {
            claro: '¡Excelente elección! Claro tiene la mejor cobertura nacional y velocidades hasta 900 Mbps 🚀',
            movistar: '¡Genial! Movistar ofrece descuentos exclusivos online y streaming incluido 📺',
            etb: '¡Muy bien! ETB es líder en Bogotá con promociones especiales y fibra simétrica 🎁',
          };
          addBotMessage(providerMessages[value], 1000, false); // No mostrar opciones aún
          setTimeout(() => {
            addBotMessage('¿Para cuántas personas es el internet?', 1000, true); // Mostrar opciones después de este
          }, 2500);
        }
        break;

      case 'city-selection':
        newData.city = value;
        setConversationData(newData);
        setCurrentStep('provider-selection');

        const cityMessages: Record<string, string> = {
          bogota: 'En Bogotá tienes todas las opciones: Claro, Movistar y ETB. ETB es local y tiene promociones especiales 🎁',
          medellin: 'En Medellín, Claro y Movistar tienen excelente cobertura',
          cali: 'En Cali, Claro y Movistar tienen excelente cobertura',
          other: 'Claro y Movistar tienen excelente cobertura en tu ciudad',
        };
        addBotMessage(cityMessages[value] || cityMessages.other, 1000, false); // No mostrar opciones aún
        setTimeout(() => {
          addBotMessage('¿Qué proveedor te interesa más?', 1000, true); // Mostrar opciones después de este
        }, 2500);
        break;

      case 'people-count':
        newData.peopleCount = value;
        setConversationData(newData);
        setCurrentStep('usage-type');
        addBotMessage('Perfecto. ¿Qué uso le darán principalmente?');
        break;

      case 'usage-type':
        newData.usage = value;
        setConversationData(newData);
        setCurrentStep('additional-services');

        const usageMessages: Record<string, string> = {
          work: 'Para trabajo remoto te recomiendo mínimo 300 Mbps, mejor si es simétrica para videollamadas sin cortes 💼',
          gaming: 'Para gaming necesitas velocidad alta (500-900 Mbps) y baja latencia. Fibra óptica es lo mejor 🎮',
          social: 'Para redes sociales y navegación, con 200-300 Mbps es suficiente 📱',
          all: 'Para uso completo te recomiendo 500 Mbps o más, especialmente si son varias personas 🚀',
        };

        addBotMessage(usageMessages[value], 1000, false); // No mostrar opciones aún
        setTimeout(() => {
          addBotMessage('¿Te interesa también TV o telefonía?', 1000, true); // Mostrar opciones después de este
        }, 2500);
        break;

      case 'additional-services':
        newData.additionalServices = value;
        setConversationData(newData);
        setCurrentStep('recommendation');

        const speed = newData.peopleCount === '5+' ? '900' : newData.peopleCount === '3-4' ? '500' : '300';
        const providerName = newData.provider === 'claro' ? 'Claro' : newData.provider === 'movistar' ? 'Movistar' : 'ETB';

        if (value === 'tv' || value === 'complete') {
          addBotMessage('¡Perfecto! Los paquetes Dúo y Trío tienen descuentos especiales. Con un solo recibo pagas todo 📺💰', 1000, false);
          setTimeout(() => {
            addBotMessage(`Basándome en lo que me dijiste, ${providerName} con ${speed} Mbps sería ideal para ti.`, 1000, false);
            setTimeout(() => {
              addBotMessage('¿Quieres que un asesor te contacte para confirmar disponibilidad en tu zona y darte los precios exactos?', 1000, true);
            }, 2500);
          }, 2500);
        } else {
          addBotMessage(`Basándome en lo que me dijiste, ${providerName} con ${speed} Mbps sería ideal para ti.`, 1000, false);
          setTimeout(() => {
            addBotMessage('¿Quieres que un asesor te contacte para confirmar disponibilidad en tu zona y darte los precios exactos?', 1000, true);
          }, 2500);
        }
        break;

      case 'recommendation':
        newData.contactMethod = value;
        setConversationData(newData);

        if (value === 'call') {
          setCurrentStep('phone-input');
          addBotMessage('¡Genial! Solo necesito tu número de celular y te llamamos en los próximos minutos 📞');
        } else if (value === 'whatsapp') {
          setCurrentStep('summary');
          const whatsappNumber = '573154645370';
          const providerName = newData.provider === 'claro' ? 'Claro' : newData.provider === 'movistar' ? 'Movistar' : 'ETB';
          const message = `Hola, vengo de la web. Me interesa un plan de internet ${providerName} para ${newData.peopleCount} personas, uso principal: ${newData.usage}`;
          addBotMessage('¡Perfecto! Te redirijo al WhatsApp. Menciona que vienes de la web para ofertas exclusivas 🎁', 1000, false);
          setTimeout(() => {
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
          }, 1000);
        } else {
          setCurrentStep('summary');
          const speed = newData.peopleCount === '5+' ? '900' : newData.peopleCount === '3-4' ? '500' : '300';
          const providerName = newData.provider === 'claro' ? 'Claro' : newData.provider === 'movistar' ? 'Movistar' : 'ETB';
          const packageType = newData.additionalServices === 'complete' ? 'Trío (Internet + TV + Telefonía)' :
                             newData.additionalServices === 'tv' ? 'Dúo (Internet + TV)' : 'Internet';

          addBotMessage(`¡Sin problema! Aquí está tu resumen:\n\n✅ Proveedor recomendado: ${providerName}\n✅ Velocidad sugerida: ${speed} Mbps\n✅ Ideal para: ${newData.usage}\n✅ Paquete: ${packageType}\n\nSi cambias de opinión, aquí abajo están los botones de contacto 😊`, 1000, false);
        }
        break;

      case 'phone-input':
        if (inputValue.match(/^\d{10}$/)) {
          newData.phone = inputValue;
          setConversationData(newData);
          setCurrentStep('summary');
          const providerName = newData.provider === 'claro' ? 'Claro' : newData.provider === 'movistar' ? 'Movistar' : 'ETB';
          addBotMessage(`¡Listo! ✅ Un asesor de ${providerName} te contactará muy pronto. Mientras tanto, aquí tienes más información.`, 1000, false);
          setInputValue('');

          // Aquí podrías enviar los datos a tu backend
          console.log('Datos capturados:', newData);
        } else {
          addBotMessage('Por favor ingresa un número de celular válido de 10 dígitos', 800, true);
        }
        break;
    }
  };

  const handlePhoneSubmit = () => {
    if (inputValue.trim()) {
      handleUserResponse(inputValue, inputValue);
    }
  };

  const getOptions = (): ChatOption[] => {
    switch (currentStep) {
      case 'welcome':
        return [
          { label: 'Sí, quiero información', value: 'yes' },
          { label: 'Solo estoy mirando', value: 'no' },
        ];

      case 'provider-selection':
        return [
          { label: 'Claro', value: 'claro' },
          { label: 'Movistar', value: 'movistar' },
          { label: 'ETB', value: 'etb' },
          { label: 'No estoy seguro/a', value: 'unsure' },
        ];

      case 'city-selection':
        return [
          { label: 'Bogotá', value: 'bogota' },
          { label: 'Medellín', value: 'medellin' },
          { label: 'Cali', value: 'cali' },
          { label: 'Otra ciudad', value: 'other' },
        ];

      case 'people-count':
        return [
          { label: '1-2 personas', value: '1-2' },
          { label: '3-4 personas', value: '3-4' },
          { label: '5 o más personas', value: '5+' },
        ];

      case 'usage-type':
        return [
          { label: 'Trabajo remoto', value: 'work' },
          { label: 'Gaming y streaming', value: 'gaming' },
          { label: 'Redes sociales y navegación', value: 'social' },
          { label: 'Todo lo anterior', value: 'all' },
        ];

      case 'additional-services':
        return [
          { label: 'Sí, TV también', value: 'tv' },
          { label: 'Sí, un paquete completo (Internet + TV + Telefonía)', value: 'complete' },
          { label: 'Solo internet', value: 'internet-only' },
        ];

      case 'recommendation':
        return [
          { label: 'Sí, que me llamen', value: 'call' },
          { label: 'Prefiero WhatsApp', value: 'whatsapp' },
          { label: 'Déjame pensarlo', value: 'think' },
        ];

      default:
        return [];
    }
  };

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized && currentStep === 'browsing') {
      setCurrentStep('welcome');
      addBotMessage('¡Hola de nuevo! ¿Te ayudo a encontrar el plan perfecto? 😊');
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {isOpen && isMinimized && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 animate-bounce border-4 border-white"
          style={{
            background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)`
          }}
          aria-label="Abrir chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && !isMinimized && (
        <div className="fixed inset-0 md:bottom-6 md:right-6 md:top-auto md:left-auto md:w-[380px] md:h-[600px] w-full h-full bg-white md:rounded-2xl shadow-2xl flex flex-col z-50 border-0 md:border md:border-gray-200">
          {/* Header */}
          <div className="text-white p-4 md:rounded-t-2xl flex items-center justify-between" style={{
            background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)`
          }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle size={20} style={{ color: primaryColor }} />
              </div>
              <div>
                <p className="font-bold">Laura</p>
                <p className="text-xs opacity-90">Asesora Virtual</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Minimizar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                  }`}
                  style={message.type === 'user' ? { backgroundColor: primaryColor } : {}}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Opciones o Input */}
          <div className="p-4 bg-white border-t border-gray-200 md:rounded-b-2xl">
            {currentStep === 'phone-input' ? (
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="3001234567"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': primaryColor
                  } as React.CSSProperties}
                  onKeyDown={(e) => e.key === 'Enter' && handlePhoneSubmit()}
                />
                <button
                  onClick={handlePhoneSubmit}
                  className="text-white p-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                  aria-label="Enviar número"
                >
                  <Send size={20} />
                </button>
              </div>
            ) : currentStep !== 'summary' && currentStep !== 'browsing' && showOptions ? (
              <div className="flex flex-col gap-2">
                {getOptions().map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleUserResponse(option.value, option.label)}
                    className="w-full px-4 py-2 bg-white border-2 rounded-lg font-semibold hover:text-white transition-all duration-200 text-sm"
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = primaryColor;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = primaryColor;
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-gray-500">
                {currentStep === 'summary' && conversationData.provider && (
                  <a
                    href={`/${conversationData.provider}`}
                    className="block w-full px-4 py-2 text-white rounded-lg font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Ver servicios de {conversationData.provider === 'claro' ? 'Claro' : conversationData.provider === 'movistar' ? 'Movistar' : 'ETB'}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
