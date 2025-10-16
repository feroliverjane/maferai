import { ArrowRight, Target, Search, CheckCircle2, Calendar, TrendingUp, Users, DollarSign, Sparkles, Zap, Shield, Clock, TrendingDown, ChevronRight, BarChart3, Database, Building2, Rocket, Star, Cpu, UsersRound, Zap as Energy, ShoppingBag, Truck, HeartPulse, Factory, FlaskConical, Banknote, Radio } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    workEmail: '',
    sector: '',
    revenueTarget: '',
    message: '',
    botField: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [stats, setStats] = useState({ meetings: 0, conversion: 0, savings: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsStarted) {
          setStatsStarted(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsStarted]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const meetingsTarget = 500;
    const conversionTarget = 25;
    const savingsTarget = 200;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setStats({
        meetings: Math.floor(meetingsTarget * easeOut),
        conversion: Math.floor(conversionTarget * easeOut),
        savings: Math.floor(savingsTarget * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if we're in development mode (no Netlify functions available)
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // Development mode: simulate form submission
        console.log('Form submission data:', formData);
        
        // Basic validation
        if (!formData.name || !formData.workEmail || !formData.message) {
          setSubmitStatus('error');
          return;
        }
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate successful submission
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          title: '',
          workEmail: '',
          sector: '',
          revenueTarget: '',
          message: '',
          botField: ''
        });
      } else {
        // Production mode: use Netlify function
        const response = await fetch('/.netlify/functions/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSubmitStatus('success');
          setFormData({
            name: '',
            company: '',
            title: '',
            workEmail: '',
            sector: '',
            revenueTarget: '',
            message: '',
            botField: ''
          });
        } else {
          setSubmitStatus('error');
        }
      }
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/95 border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/mafer-capital-logo.svg" alt="MAFER CAPITAL" className="h-16 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Inicio</a>
            <a href="#como-funciona" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cómo funciona</a>
            <a href="#sectores" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Sectores</a>
            <a href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Beneficios</a>
            <a href="#precios" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Precios</a>
            <a href="#contacto" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contacto</a>
          </nav>
          <button
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 bg-black rounded-full font-medium text-sm text-white hover:bg-gray-800 transition-all"
          >
            Reservar demo
          </button>
        </div>
      </header>

      <section id="inicio" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#5B7FFF] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7B9FFF] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(91, 127, 255, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center h-full">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-[#5B7FFF]/30 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-[#5B7FFF]" />
              <span className="text-sm text-[#5B7FFF] font-semibold">Validado en 1,500+ compañías</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Reduce los costes de M&A encontrando{' '}
              <span className="bg-gradient-to-r from-[#5B7FFF] via-[#7B9FFF] to-[#5B7FFF] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                mejores targets
              </span>
              , más rápido.
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              Nuestros agentes de IA agendan reuniones semanales con compañías que encajan en tu tesis.{' '}
              <span className="text-white font-semibold">Sin retainers, sin analistas</span> y con precisión comprobada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-7 py-4 bg-[#5B7FFF] rounded-2xl font-semibold shadow-[0_0_40px_rgba(91,127,255,0.3)] hover:shadow-[0_0_60px_rgba(91,127,255,0.5)] transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Solicitar reuniones</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-4 bg-white/5 backdrop-blur-sm rounded-2xl font-semibold border border-white/10 hover:bg-white/10 hover:border-[#5B7FFF]/50 transition-all"
              >
                Ver cómo funciona
              </button>
            </div>

          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#5B7FFF]/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#5B7FFF]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Pipeline activo</div>
                        <div className="text-base font-bold">127 targets</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                      +12 esta semana
                    </div>
                  </div>

                  {[
                    { name: 'TechCorp SL', sector: 'SaaS', revenue: '5M€', match: 95 },
                    { name: 'DataFlow Ltd', sector: 'Analytics', revenue: '3.2M€', match: 89 },
                    { name: 'CloudSys Inc', sector: 'Cloud', revenue: '8M€', match: 92 }
                  ].map((company, idx) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#5B7FFF] transition-colors">{company.name}</div>
                          <div className="text-xs text-gray-400">{company.sector} • {company.revenue}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xl font-bold text-[#5B7FFF]">{company.match}%</div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] rounded-full transition-all duration-1000"
                          style={{ width: `${company.match}%`, transitionDelay: `${idx * 200}ms` }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  <button className="w-full py-3 bg-[#5B7FFF]/20 hover:bg-[#5B7FFF]/30 border border-[#5B7FFF]/30 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 group">
                    Ver todos los targets
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-2 bg-[#5B7FFF]/10 backdrop-blur-sm border border-[#5B7FFF]/20 rounded-full text-sm text-[#5B7FFF] mb-8 font-semibold">
              PROCESO
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold mb-6">
              Tu nuevo motor de <span className="bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] bg-clip-text text-transparent">dealflow</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-32 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-[#5B7FFF]/30 to-transparent"></div>

            {[
              { icon: Target, title: 'Definimos tu tesis', desc: 'Sector, facturación, EBITDA, país y criterios específicos de inversión.', num: '01' },
              { icon: Search, title: 'Detectamos los targets', desc: 'Scraping de fuentes públicas y bases sectoriales especializadas.', num: '02' },
              { icon: CheckCircle2, title: 'Validamos la información', desc: 'Datos financieros, plantilla y contacto directo verificados.', num: '03' },
              { icon: Calendar, title: 'Agendamos las reuniones', desc: 'Emails y llamadas hasta conseguir respuesta confirmada.', num: '04' }
            ].map((step, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -top-4 -left-4 text-8xl font-bold text-white/5 z-0">{step.num}</div>
                <div className="relative z-10 p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-[#5B7FFF]/30 transition-all duration-500 hover:translate-y-[-8px] h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(91,127,255,0.3)]">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sectores" className="relative pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#5B7FFF]/10 backdrop-blur-sm border border-[#5B7FFF]/20 rounded-full text-sm text-[#5B7FFF] mb-8 font-semibold">
              SECTORES
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              La <span className="text-[#5B7FFF]">IA que entiende tu sector</span> como si llevara años en él
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Tecnología', icon: Cpu },
              { name: 'Servicios', icon: UsersRound },
              { name: 'Energía', icon: Zap },
              { name: 'Consumo', icon: ShoppingBag },
              { name: 'Logística', icon: Truck },
              { name: 'Sanitario', icon: HeartPulse },
              { name: 'Industrial', icon: Factory },
              { name: 'Química', icon: FlaskConical },
              { name: 'F&F', icon: Banknote },
              { name: 'Telecomunicaciones', icon: Radio }
            ].map((sector, idx) => (
              <div
                key={idx}
                className="group relative p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#5B7FFF]/50 transition-all cursor-pointer hover:scale-105"
              >
                <sector.icon className="w-6 h-6 text-[#5B7FFF] mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-white group-hover:text-[#5B7FFF] transition-colors">{sector.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="relative pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-2 bg-[#5B7FFF]/10 backdrop-blur-sm border border-[#5B7FFF]/20 rounded-full text-sm text-[#5B7FFF] mb-8 font-semibold">
              BENEFICIOS
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold">
              Desbloquea tu <span className="bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] bg-clip-text text-transparent">crecimiento inorgánico</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Ahorra horas de análisis interno.', desc: 'Elimina el trabajo manual de búsqueda y cualificación de targets.', stat: '80%' },
              { icon: Target, title: 'Multiplica tu tasa de reuniones con targets cualificados.', desc: 'Accede a compañías verificadas que encajan en tu tesis de inversión.', stat: '3x' },
              { icon: TrendingDown, title: 'Reduce fees externos hasta 5x.', desc: 'Sin retainers ni comisiones de boutiques tradicionales.', stat: '5x' }
            ].map((benefit, idx) => (
              <div key={idx} className="group relative p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-[#5B7FFF]/30 transition-all hover:translate-y-[-8px]">
                <div className="absolute top-6 right-6 text-5xl font-bold text-[#5B7FFF]/20 group-hover:text-[#5B7FFF]/40 transition-colors">
                  {benefit.stat}
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-[#5B7FFF]/20 to-[#7B9FFF]/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-10 h-10 text-[#5B7FFF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-tight">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B7FFF]/20 to-[#7B9FFF]/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Validado en procesos reales de M&A mid-market.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="text-center p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <div className="text-6xl lg:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-6">
                +{stats.meetings}
              </div>
              <div className="text-gray-400 text-lg px-2">Reuniones agendadas</div>
            </div>

            <div className="text-center p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <div className="text-6xl lg:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-6">
                {stats.conversion}%
              </div>
              <div className="text-gray-400 text-lg px-2">Conversión a reunión</div>
            </div>

            <div className="text-center p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <div className="text-6xl lg:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-6 whitespace-nowrap">
                {stats.savings}k €
              </div>
              <div className="text-gray-400 text-lg px-2">Ahorro medio por deal</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-xl max-w-4xl mx-auto">
              Desarrollado tras dos años de validación con compradores reales.
            </p>
          </div>
        </div>
      </section>

      <section id="precios" className="relative pt-32 pb-40">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-2 bg-[#5B7FFF]/10 backdrop-blur-sm border border-[#5B7FFF]/20 rounded-full text-sm text-[#5B7FFF] mb-8 font-semibold">
              PRECIOS
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold mb-6">
              Solo pagas por <span className="bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] bg-clip-text text-transparent">resultados</span>
            </h2>
            <p className="text-xl text-gray-400">Sin costes ocultos. Sin retainers. Sin sorpresas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-[#5B7FFF]/30 hover:translate-y-[-8px] transition-all">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Pago por reunión</h3>
                <p className="text-gray-400">Flexibilidad máxima</p>
              </div>
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2">200€</div>
                <div className="text-gray-400 text-lg">por target cualificado</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5B7FFF] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Sin compromisos mensuales</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5B7FFF] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Paga solo por reuniones confirmadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5B7FFF] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">400€ por reunión con targets internacionales</span>
                </li>
              </ul>
              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#5B7FFF]/50 rounded-xl font-semibold transition-all"
              >
                Solicitar
              </button>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] rounded-3xl blur-xl opacity-50"></div>
              <div className="relative p-10 bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] rounded-3xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white rounded-full shadow-xl">
                  <span className="text-[#5B7FFF] font-bold text-sm">POPULAR</span>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Plan mensual</h3>
                  <p className="text-blue-100">Para dealflow continuo</p>
                </div>
                <div className="mb-8">
                  <div className="text-6xl font-bold mb-2">1.500€</div>
                  <div className="text-blue-100 text-lg">2 reuniones por semana</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span className="text-blue-50">8 reuniones garantizadas/mes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span className="text-blue-50">Soporte prioritario</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span className="text-blue-50">Pipeline personalizado</span>
                  </li>
                </ul>
                <button
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 px-6 bg-white text-[#5B7FFF] rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Solicitar
                </button>
              </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-[#5B7FFF]/30 hover:translate-y-[-8px] transition-all">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Exit fee</h3>
                <p className="text-gray-400">Alineados con tu éxito</p>
              </div>
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2">1%</div>
                <div className="text-gray-400 text-lg">si se cierra la transacción</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5B7FFF] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Frente al 5% del sector</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5B7FFF] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Sin riesgo, solo resultados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5B7FFF] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Te referenciamos a los intermediarios</span>
                </li>
              </ul>
              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#5B7FFF]/50 rounded-xl font-semibold transition-all"
              >
                Consultar
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B7FFF]/10 to-[#7B9FFF]/10"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] rounded-3xl flex items-center justify-center mb-10 mx-auto shadow-[0_0_50px_rgba(91,127,255,0.5)]">
            <Users className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-8">¿Eres asesor o boutique de M&A?</h2>

          <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-3xl mx-auto">
            Colaboramos con boutiques y asesores especializados. Si detectamos un match entre comprador y vendedor, te referimos la operación.
          </p>

          <button
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-[#5B7FFF]/50 rounded-2xl font-semibold transition-all text-lg"
          >
            Colaborar como asesor
          </button>
        </div>
      </section>

      <section id="contacto" className="relative pt-32 pb-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B7FFF]/10 backdrop-blur-sm border border-[#5B7FFF]/20 rounded-full mb-8">
                <Calendar className="w-4 h-4 text-[#5B7FFF]" />
                <span className="text-sm text-[#5B7FFF] font-bold">EMPEZAR AHORA</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Empieza a recibir <span className="bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] bg-clip-text text-transparent">reuniones</span> con targets cualificados.
              </h2>
              <p className="text-xl text-gray-400 mb-12">Respuesta en menos de 24 horas</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-[#5B7FFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#5B7FFF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Respuesta garantizada en 24h</div>
                    <div className="text-gray-400 text-sm">Te contactamos para definir tu estrategia</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-[#5B7FFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#5B7FFF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Datos 100% protegidos</div>
                    <div className="text-gray-400 text-sm">Confidencialidad total de tu información</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-[#5B7FFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-[#5B7FFF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Primeras reuniones en 2 semanas</div>
                    <div className="text-gray-400 text-sm">Proceso rápido desde el día 1</div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-3">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition-all text-white placeholder-gray-500"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold mb-3">Empresa</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition-all text-white placeholder-gray-500"
                      placeholder="Nombre de la empresa"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold mb-3">Cargo</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition-all text-white placeholder-gray-500"
                      placeholder="Tu posición"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="workEmail" className="block text-sm font-semibold mb-3">Email corporativo</label>
                    <input
                      type="email"
                      id="workEmail"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition-all text-white placeholder-gray-500"
                      placeholder="email@empresa.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="sector" className="block text-sm font-semibold mb-3">Sector</label>
                    <input
                      type="text"
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition-all text-white placeholder-gray-500"
                      placeholder="ej. FinTech, SaaS, Healthcare"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="revenueTarget" className="block text-sm font-semibold mb-3">Facturación objetivo</label>
                    <input
                      type="text"
                      id="revenueTarget"
                      name="revenueTarget"
                      value={formData.revenueTarget}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition-all text-white placeholder-gray-500"
                      placeholder="ej. 1M - 10M€"
                      required
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-semibold mb-3">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition-all resize-none text-white placeholder-gray-500"
                    placeholder="Cuéntanos sobre tu tesis de inversión..."
                    required
                  ></textarea>
                </div>
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center">
                    Mensaje enviado. Gracias.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center">
                    Error al enviar el mensaje. Por favor, inténtalo de nuevo.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-5 bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(91,127,255,0.5)] transition-all hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar reuniones'}
                  {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-black/50 backdrop-blur-xl border-t border-white/5 py-16 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block text-3xl font-bold bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] bg-clip-text text-transparent mb-6">
              MAFER AI
            </div>
            <p className="text-gray-400 text-lg mb-8">Desarrollado por MAFER AI. Validado en más de 1.500 compañías analizadas.</p>
            <div className="pt-8 border-t border-white/10">
              <p className="text-gray-600 text-sm">© 2025 MAFER AI, SL. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
