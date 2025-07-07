export class ChatService {
    constructor() {
        this.context = {
            awaitingDates: false,
            awaitingRoomSelection: false,
            selectedRoom: null,
            checkInDate: null,
            checkOutDate: null,
            guestCount: null,
            conversationStep: 'initial'
        };

        // Base de conocimiento del hotel
        this.hotelData = {
            rooms: [
                {
                    id: 1,
                    name: "Habitación Estándar",
                    description: "Habitación con vista privilegiada a los volcanes Misti, Chachani y Pichu Pichu, y está rodeada de naturaleza.",
                    amenities: ["Moquegua", "Arequipa", "Lima"],
                    features: ["Vista a volcanes", "Ambiente natural", "Comodidades básicas"]
                },
                {
                    id: 2,
                    name: "Habitación Doble",
                    description: "Habitación frente a la playa Sangrampa en el exclusivo balneario de Ata. Una experiencia que quiere volver a vivir.",
                    amenities: ["Moquegua", "Arequipa", "Lima"],
                    features: ["Vista al mar", "Playa Sangrampa", "Balneario exclusivo"]
                },
                {
                    id: 3,
                    name: "Habitación Triple",
                    description: "Habitación que combina arquitectura tradicional con comodidad moderna en el centro histórico de Moquegua.",
                    amenities: ["Moquegua", "Arequipa", "Lima", "Tacna/Ilo"],
                    features: ["Centro histórico", "Arquitectura tradicional", "Comodidad moderna"]
                },
                {
                    id: 4,
                    name: "Habitación Matrimonial",
                    description: "Habitación que te conecta con el corazón del Imperio Inca, a solo unas cuadras de la Plaza de Armas.",
                    amenities: ["Moquegua", "Arequipa"],
                    features: ["Centro histórico", "Cerca Plaza de Armas", "Ambiente romántico"]
                },
                {
                    id: 5,
                    name: "Habitación Suite",
                    description: "Habitación que te conecta con el corazón del Imperio Inca, a solo unas cuadras de la Plaza de Armas.",
                    amenities: ["Moquegua", "Arequipa"],
                    features: ["Suite de lujo", "Centro histórico", "Máximo confort"]
                }
            ],
            services: {
                included: [
                    "Recepción 24/7",
                    "WiFi Gratis",
                    "Piscina/Spa",
                    "Conserjería turística"
                ],
                additional: [
                    "Restaurante",
                    "Sala de pagos",
                    "Sala de eventos",
                    "Business center",
                    "Entretenimiento privado"
                ],
                spa: {
                    name: "Piscina climatizada y spa",
                    description: "DM Hoteles cuenta con espacios exclusivos para tu bienestar físico y mental. Nuestra piscina climatizada y áreas de sauna seco y húmedo te permitirán relajarte y desconectarte del mundo exterior. Disfruta de un momento de descanso total con instalaciones pensadas para reconectar contigo mismo o compartir con quienes te acompañan."
                }
            },
            events: [
                {
                    name: "Eventos corporativos",
                    description: "Salones equipados para reuniones, conferencias y presentaciones."
                },
                {
                    name: "Bodas y recepciones",
                    description: "Ceremonias elegantes y personalizadas para tu gran día."
                },
                {
                    name: "Eventos sociales",
                    description: "Fiestas, aniversarios o reuniones especiales con atención exclusiva."
                }
            ],
            promotions: [
                {
                    name: "DM Destino!",
                    description: "Privado: Interbank | Cuenta sueldo - Beneficios exclusivos al afiliarte tu cuenta",
                    discount: "65%"
                },
                {
                    name: "Full Day DM Hoteles!",
                    description: "Relájate y disfruta al máximo"
                },
                {
                    name: "Gana puntos | Viaja más",
                    description: "Acumula y canjea en tu próxima estadía"
                }
            ],
            contact: {
                address: "Av. Gregorio Escobedo 598, Jesús María, Lima",
                phone: "51 614-3900",
                email: "reservas@dmhoteles.pe"
            },
            policies: {
                cancellation: "Cancelación gratuita hasta 24 horas antes del check-in",
                children: "Los niños menores de 12 años se hospedan gratis con sus padres",
                pets: "No se permiten mascotas",
                smoking: "Hotel 100% libre de humo",
                checkin: "Check-in: 3:00 PM | Check-out: 12:00 PM"
            }
        };
    }

    async processMessage(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        try {
            console.log('Processing message:', userMessage);

            // Manejo de contexto de conversación
            if (this.context.awaitingDates) {
                return await this.handleDateInput(userMessage);
            }

            if (this.context.awaitingRoomSelection) {
                return await this.handleRoomSelection(userMessage);
            }

            // Análisis de intención del mensaje
            if (this.containsKeywords(lowerMessage, ['habitacion', 'cuarto', 'room', 'tipo', 'acomodacion'])) {
                return this.handleRoomInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['precio', 'costo', 'tarifa', 'rate', 'cuanto cuesta'])) {
                return this.handlePriceInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['disponibilidad', 'disponible', 'libre', 'available', 'reserva'])) {
                return this.handleAvailabilityInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['evento', 'actividad', 'event', 'celebracion', 'boda', 'corporativo'])) {
                return this.handleEventInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['servicio', 'amenidad', 'incluye', 'facilities', 'que tienen'])) {
                return this.handleServiceInquiry();
            }

            // Servicios específicos
            if (this.containsKeywords(lowerMessage, ['restaurante', 'comida', 'room service', 'servicio habitacion'])) {
                return this.handleRestaurantInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['desayuno', 'breakfast', 'incluido'])) {
                return this.handleBreakfastInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['transporte', 'aeropuerto', 'transfer', 'traslado'])) {
                return this.handleTransportInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['spa', 'gimnasio', 'piscina', 'wellness', 'relajacion'])) {
                return this.handleSpaInquiry();
            }

            // Pagos y facturación
            if (this.containsKeywords(lowerMessage, ['pago', 'payment', 'tarjeta', 'efectivo', 'factura'])) {
                return this.handlePaymentInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['ubicacion', 'direccion', 'location', 'donde', 'como llegar'])) {
                return this.handleLocationInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['estacionamiento', 'parking', 'aparcar', 'garage'])) {
                return this.handleParkingInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['turistico', 'turismo', 'lugares', 'atracciones', 'que visitar'])) {
                return this.handleTourismInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['cancelacion', 'cancelar', 'cancel', 'politica'])) {
                return this.handleCancellationInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['seguridad', 'security', 'camara', 'safe'])) {
                return this.handleSecurityInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['niños', 'children', 'kids', 'familia', 'bebe'])) {
                return this.handleChildrenInquiry();
            }

            if (this.containsKeywords(lowerMessage, ['promocion', 'descuento', 'oferta', 'deal', 'especial'])) {
                return this.handlePromotionInquiry();
            }

            // Respuesta por defecto
            return this.getDefaultResponse();

        } catch (error) {
            console.error('Error processing message:', error);
            return "Disculpa, estoy teniendo problemas técnicos en este momento. ¿Podrías intentar de nuevo en unos minutos?";
        }
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    handleRoomInquiry() {
        let response = "🏨 **Nuestros tipos de habitaciones disponibles:**\n\n";

        this.hotelData.rooms.forEach((room, index) => {
            response += `**${index + 1}. ${room.name}**\n`;
            response += `📝 ${room.description}\n`;
            response += `✨ Características: ${room.features.join(', ')}\n`;
            response += `📍 Destinos: ${room.amenities.join(', ')}\n\n`;
        });

        response += "Cada habitación está diseñada para ofrecerte una experiencia única según tu destino. ¿Te interesa alguna habitación en particular?";

        return response;
    }

    handlePriceInquiry() {
        return "💰 **Información sobre precios:**\n\n" +
            "Nuestros precios varían según:\n" +
            "• 📅 Temporada (alta, media, baja)\n" +
            "• 🏨 Tipo de habitación seleccionada\n" +
            "• 📍 Destino (Moquegua, Arequipa, Lima, Tacna/Ilo)\n" +
            "• 📆 Duración de la estadía\n\n" +
            "**🎉 Promociones actuales:**\n" +
            "• **DM Destino!** - Hasta 65% de descuento para clientes Interbank\n" +
            "• **Full Day DM Hoteles** - Paquetes especiales de relajación\n" +
            "• **Programa de puntos** - Acumula y canjea en futuras estadías\n\n" +
            "Para obtener una cotización exacta, por favor proporciona:\n" +
            "• Fechas de entrada y salida\n" +
            "• Número de huéspedes\n" +
            "• Destino preferido\n\n" +
            "📞 También puedes llamar al **51 614-3900** para precios actualizados.";
    }

    handleAvailabilityInquiry() {
        this.context.awaitingDates = true;
        this.context.conversationStep = 'awaiting_dates';

        return "📅 **Para consultar disponibilidad necesito:**\n\n" +
            "1. **Fecha de entrada** (formato: DD/MM/AAAA)\n" +
            "2. **Fecha de salida** (formato: DD/MM/AAAA)\n" +
            "3. **Número de huéspedes**\n" +
            "4. **Destino preferido** (Moquegua, Arequipa, Lima, Tacna/Ilo)\n\n" +
            "**Ejemplo:** *'Del 15/12/2024 al 20/12/2024 para 2 personas en Arequipa'*\n\n" +
            "También puedes hacer tu reserva directamente:\n" +
            "📞 **Teléfono:** 51 614-3900\n" +
            "📧 **Email:** reservas@dmhoteles.pe\n" +
            "🌐 **Web:** A través de nuestra página oficial\n\n" +
            "¿Cuáles son tus fechas y preferencias?";
    }

    handleEventInquiry() {
        let response = "🎉 **Eventos y celebraciones en DM Hoteles:**\n\n";

        this.hotelData.events.forEach((event, index) => {
            response += `**${index + 1}. ${event.name}**\n`;
            response += `📝 ${event.description}\n\n`;
        });

        response += "**🏢 Espacios disponibles:**\n" +
            "• Salones equipados con tecnología moderna\n" +
            "• Capacidad flexible según el evento\n" +
            "• Servicio de catering personalizado\n" +
            "• Coordinación completa del evento\n\n" +
            "**📋 Servicios incluidos:**\n" +
            "• Montaje y decoración\n" +
            "• Equipo audiovisual\n" +
            "• Personal especializado\n" +
            "• Menús personalizados\n\n" +
            "Para más información sobre eventos, contacta:\n" +
            "📞 **51 614-3900** | 📧 **reservas@dmhoteles.pe**";

        return response;
    }

    handleServiceInquiry() {
        let response = "🛎️ **Servicios incluidos en tu estadía:**\n\n";

        this.hotelData.services.included.forEach(service => {
            response += `✅ ${service}\n`;
        });

        response += "\n🎯 **Área de entretenimiento y servicios adicionales:**\n\n";

        this.hotelData.services.additional.forEach(service => {
            response += `🔹 ${service}\n`;
        });

        response += "\n💆‍♀️ **Relax y Bienestar:**\n";
        response += `🏊‍♂️ **${this.hotelData.services.spa.name}**\n`;
        response += `${this.hotelData.services.spa.description}\n\n`;
        response += "¿Hay algún servicio específico sobre el que te gustaría saber más?";

        return response;
    }

    handleRestaurantInquiry() {
        return "🍽️ **Experiencia Culinaria en DM Hoteles:**\n\n" +
            "**🏨 Restaurantes en cada uno de nuestros hoteles**\n" +
            "Todos los hoteles de la cadena DM cuentan con su propio restaurante, ofreciendo una experiencia culinaria única en cada hotel. Nuestra propuesta gastronómica se adapta al entorno, combinando ingredientes locales con recetas tradicionales y modernas.\n\n" +
            "**🍳 Servicios disponibles:**\n" +
            "• **Restaurante principal** - Desayuno, almuerzo y cena\n" +
            "• **Room Service** - Servicio a la habitación disponible\n" +
            "• **Menús especiales** - Opciones vegetarianas y dietéticas\n" +
            "• **Eventos gastronómicos** - Cenas temáticas y degustaciones\n\n" +
            "**⏰ Horarios:**\n" +
            "• Desayuno: 6:00 AM - 10:00 AM\n" +
            "• Almuerzo: 12:00 PM - 3:00 PM\n" +
            "• Cena: 6:00 PM - 10:00 PM\n" +
            "• Room Service: 24 horas\n\n" +
            "¿Te gustaría información sobre algún menú específico?";
    }

    handleBreakfastInquiry() {
        return "🍳 **Desayuno en DM Hoteles:**\n\n" +
            "**✅ ¡SÍ! El desayuno está incluido** en todas nuestras tarifas.\n\n" +
            "**🥐 Nuestro desayuno buffet incluye:**\n" +
            "• Frutas frescas de temporada\n" +
            "• Panes y pasteles recién horneados\n" +
            "• Cereales y yogurt\n" +
            "• Huevos preparados al momento\n" +
            "• Jugos naturales y café premium\n" +
            "• Opciones locales según el destino\n" +
            "• Alternativas vegetarianas y saludables\n\n" +
            "**⏰ Horario de desayuno:**\n" +
            "📅 **Lunes a Domingo:** 6:00 AM - 10:00 AM\n\n" +
            "**🍽️ Opciones especiales:**\n" +
            "• Desayuno en la habitación (room service)\n" +
            "• Menús para dietas especiales\n" +
            "• Desayuno temprano para viajeros\n\n" +
            "¿Tienes alguna restricción alimentaria que debamos considerar?";
    }

    handleTransportInquiry() {
        return "🚗 **Servicios de Transporte:**\n\n" +
            "**✅ Transporte al aeropuerto disponible**\n\n" +
            "**🚐 Servicios que ofrecemos:**\n" +
            "• **Transfer aeropuerto** - Ida y vuelta\n" +
            "• **Transporte a lugares turísticos**\n" +
            "• **Servicio de taxi coordinado**\n" +
            "• **Tours organizados** según el destino\n\n" +
            "**💰 Tarifas:**\n" +
            "• Consultar precios según destino y distancia\n" +
            "• Descuentos para huéspedes del hotel\n" +
            "• Tarifas especiales para grupos\n\n" +
            "**📋 Para solicitar transporte:**\n" +
            "• Reserva con 24 horas de anticipación\n" +
            "• Contacta recepción: **51 614-3900**\n" +
            "• Disponible 24/7 para emergencias\n\n" +
            "**🗺️ Destinos populares:**\n" +
            "• Aeropuertos locales\n" +
            "• Centros históricos\n" +
            "• Atracciones turísticas principales\n" +
            "• Centros comerciales\n\n" +
            "¿Necesitas transporte para algún destino específico?";
    }

    handleSpaInquiry() {
        return "💆‍♀️ **Spa y Wellness en DM Hoteles:**\n\n" +
            "**🏊‍♂️ Piscina Climatizada y Spa**\n" +
            "DM Hoteles cuenta con espacios exclusivos para tu bienestar físico y mental. Nuestra piscina climatizada y áreas de sauna seco y húmedo te permitirán relajarte y desconectarte del mundo exterior.\n\n" +
            "**✨ Instalaciones disponibles:**\n" +
            "• **Piscina climatizada** - Temperatura perfecta todo el año\n" +
            "• **Sauna seco** - Relajación y desintoxicación\n" +
            "• **Sauna húmedo** - Vapor terapéutico\n" +
            "• **Área de relajación** - Espacios tranquilos\n" +
            "• **Gimnasio equipado** - Máquinas modernas\n\n" +
            "**🕐 Horarios:**\n" +
            "• **Piscina y Spa:** 6:00 AM - 10:00 PM\n" +
            "• **Gimnasio:** 24 horas para huéspedes\n\n" +
            "**🎯 Beneficios:**\n" +
            "• Reconectar contigo mismo\n" +
            "• Compartir momentos especiales\n" +
            "• Descanso total y relajación\n" +
            "• Instalaciones pensadas para el bienestar\n\n" +
            "**💡 Incluido en tu estadía** - Sin costo adicional para huéspedes\n\n" +
            "¿Te gustaría reservar algún horario específico para el spa?";
    }

    handlePaymentInquiry() {
        return "💳 **Métodos de Pago y Facturación:**\n\n" +
            "**✅ Métodos de pago aceptados:**\n" +
            "• **Tarjetas de crédito:** Visa, Mastercard, American Express\n" +
            "• **Tarjetas de débito** nacionales e internacionales\n" +
            "• **Efectivo** en moneda local\n" +
            "• **Transferencias bancarias** (para reservas anticipadas)\n" +
            "• **Pago online** a través de nuestra web\n\n" +
            "**💵 Pago en efectivo:**\n" +
            "• **SÍ, puedes pagar en efectivo al llegar**\n" +
            "• Aceptamos soles peruanos\n" +
            "• También dólares americanos (tipo de cambio del día)\n\n" +
            "**📄 Facturación electrónica:**\n" +
            "• **SÍ, enviamos facturas electrónicas**\n" +
            "• Solicita tu factura al momento del check-in\n" +
            "• Envío inmediato a tu correo electrónico\n" +
            "• Válida para gastos empresariales\n\n" +
            "**🏢 Para empresas:**\n" +
            "• Facturación con RUC\n" +
            "• Crédito corporativo disponible\n" +
            "• Convenios empresariales\n\n" +
            "**📧 Contacto para facturación:** reservas@dmhoteles.pe";
    }

    handleLocationInquiry() {
        return "📍 **Ubicación DM Hoteles:**\n\n" +
            "**🏢 Oficina Principal:**\n" +
            "📍 **Av. Gregorio Escobedo 598, Jesús María, Lima**\n" +
            "📞 **Teléfono:** 51 614-3900\n" +
            "📧 **Email:** reservas@dmhoteles.pe\n\n" +
            "**🗺️ Nuestros destinos:**\n" +
            "• **Lima** - Centro empresarial y turístico\n" +
            "• **Arequipa** - Ciudad blanca, patrimonio cultural\n" +
            "• **Moquegua** - Tranquilidad y naturaleza\n" +
            "• **Tacna/Ilo** - Costa y frontera\n\n" +
            "**🚗 Cómo llegar a nuestros hoteles:**\n" +
            "• **Desde el aeropuerto:** Servicio de transfer disponible\n" +
            "• **Transporte público:** Cerca de estaciones principales\n" +
            "• **En auto:** Estacionamiento gratuito disponible\n" +
            "• **Taxi/Uber:** Ubicaciones céntricas y accesibles\n\n" +
            "**🎯 Ventajas de ubicación:**\n" +
            "• Cerca de centros históricos\n" +
            "• Acceso fácil a atracciones turísticas\n" +
            "• Zonas comerciales y gastronómicas\n" +
            "• Conexiones de transporte eficientes\n\n" +
            "¿Necesitas direcciones específicas para algún destino?";
    }

    handleParkingInquiry() {
        return "🚗 **Estacionamiento en DM Hoteles:**\n\n" +
            "**✅ ¡SÍ! Tenemos estacionamiento disponible**\n\n" +
            "**🅿️ Características del estacionamiento:**\n" +
            "• **Gratuito para huéspedes** del hotel\n" +
            "• **Seguro y vigilado** las 24 horas\n" +
            "• **Espacios techados** en la mayoría de ubicaciones\n" +
            "• **Fácil acceso** desde la calle principal\n\n" +
            "**🔒 Seguridad:**\n" +
            "• Vigilancia permanente\n" +
            "• Cámaras de seguridad\n" +
            "• Control de acceso\n" +
            "• Personal de seguridad 24/7\n\n" +
            "**📋 Información importante:**\n" +
            "• **Reserva recomendada** en temporada alta\n" +
            "• Espacios limitados según la ubicación\n" +
            "• Disponible durante toda tu estadía\n" +
            "• Sin costo adicional\n\n" +
            "**🚙 Vehículos grandes:**\n" +
            "• Consultar disponibilidad para buses/camionetas\n" +
            "• Espacios especiales según disponibilidad\n\n" +
            "¿Necesitas reservar un espacio de estacionamiento?";
    }

    handleTourismInquiry() {
        return "🗺️ **Lugares Turísticos Cerca de DM Hoteles:**\n\n" +
            "**🏛️ En Lima:**\n" +
            "• **Centro Histórico** - Plaza de Armas, Catedral\n" +
            "• **Miraflores** - Malecón, parques, vida nocturna\n" +
            "• **Barranco** - Arte, cultura, bohemia\n" +
            "• **Museos** - Larco, Nacional, Arte\n\n" +
            "**🏔️ En Arequipa:**\n" +
            "• **Centro Histórico** - Patrimonio de la Humanidad\n" +
            "• **Monasterio de Santa Catalina**\n" +
            "• **Volcanes** - Misti, Chachani, Pichu Pichu\n" +
            "• **Cañón del Colca** - Excursiones de día completo\n\n" +
            "**🌿 En Moquegua:**\n" +
            "• **Centro Histórico** - Arquitectura colonial\n" +
            "• **Cerro Baúl** - Sitio arqueológico\n" +
            "• **Viñedos** - Tours de pisco y vino\n" +
            "• **Naturaleza** - Paisajes únicos\n\n" +
            "**🌊 En Tacna/Ilo:**\n" +
            "• **Playas** - Costa peruana\n" +
            "• **Centro de Tacna** - Comercio y cultura\n" +
            "• **Sitios históricos** - Guerra del Pacífico\n\n" +
            "**🎯 Servicios turísticos:**\n" +
            "• **Conserjería turística** incluida\n" +
            "• **Tours organizados** disponibles\n" +
            "• **Transporte coordinado** a atracciones\n" +
            "• **Información actualizada** de eventos locales\n\n" +
            "¿Te interesa algún destino en particular?";
    }

    handleCancellationInquiry() {
        return "📋 **Políticas de Cancelación y Hotel:**\n\n" +
            "**❌ Política de Cancelación:**\n" +
            "• **✅ Cancelación gratuita** hasta 24 horas antes del check-in\n" +
            "• **⚠️ Cancelación tardía** (menos de 24h): Se cobra una noche\n" +
            "• **❌ No show** (no presentarse): Se cobra la estadía completa\n" +
            "• **💳 Reembolsos** procesados en 5-7 días hábiles\n\n" +
            "**🕐 Horarios del Hotel:**\n" +
            "• **Check-in:** 3:00 PM\n" +
            "• **Check-out:** 12:00 PM\n" +
            "• **Recepción:** 24 horas, 7 días a la semana\n\n" +
            "**👶 Política de Niños:**\n" +
            "• **Niños menores de 12 años:** Se hospedan GRATIS con sus padres\n" +
            "• **Cunas disponibles** sin costo adicional\n" +
            "• **Menús infantiles** en el restaurante\n" +
            "• **Áreas familiares** en espacios comunes\n\n" +
            "**📞 Para cancelar una reserva:**\n" +
            "• **Teléfono:** 51 614-3900\n" +
            "• **Email:** reservas@dmhoteles.pe\n" +
            "• **Información necesaria:** Número de confirmación y nombre del titular\n\n" +
            "**⚡ Cambios de reserva:**\n" +
            "• Modificaciones sujetas a disponibilidad\n" +
            "• Sin costo si se realiza con 48h de anticipación\n\n" +
            "¿Necesitas cancelar o modificar una reserva existente?";
    }

    handleSecurityInquiry() {
        return "🔒 **Seguridad en DM Hoteles:**\n\n" +
            "**📹 Sistema de Seguridad:**\n" +
            "• **SÍ, tenemos cámaras de seguridad** en áreas comunes\n" +
            "• **Vigilancia 24/7** en todas nuestras instalaciones\n" +
            "• **Personal de seguridad** capacitado y presente\n" +
            "• **Control de acceso** a las instalaciones\n\n" +
            "**🛡️ Medidas de Seguridad:**\n" +
            "• **Recepción 24 horas** - Personal siempre disponible\n" +
            "• **Tarjetas de acceso** para habitaciones\n" +
            "• **Cajas de seguridad** en cada habitación\n" +
            "• **Iluminación adecuada** en todas las áreas\n" +
            "• **Salidas de emergencia** señalizadas\n\n" +
            "**🚨 Protocolos de Emergencia:**\n" +
            "• **Detectores de humo** en todas las habitaciones\n" +
            "• **Extintores** distribuidos estratégicamente\n" +
            "• **Personal capacitado** en primeros auxilios\n" +
            "• **Planes de evacuación** claramente definidos\n\n" +
            "**🔐 Privacidad:**\n" +
            "• **Cámaras SOLO en áreas comunes** (lobby, pasillos, estacionamiento)\n" +
            "• **NO hay cámaras** en habitaciones ni baños\n" +
            "• **Respeto total** a la privacidad de huéspedes\n\n" +
            "**📞 Emergencias:**\n" +
            "• **Recepción 24h:** Extensión 0 desde tu habitación\n" +
            "• **Seguridad:** Respuesta inmediata\n\n" +
            "Tu seguridad y tranquilidad son nuestra prioridad.";
    }

    handleChildrenInquiry() {
        return "👶 **Política Familiar y Niños:**\n\n" +
            "**✅ ¡Familias bienvenidas en DM Hoteles!**\n\n" +
            "**🆓 Política de Niños:**\n" +
            "• **Niños menores de 12 años se hospedan GRATIS** con sus padres\n" +
            "• **Sin costo adicional** por niños en la misma habitación\n" +
            "• **Cunas disponibles** sin cargo extra\n" +
            "• **Camas supletorias** para niños mayores (consultar disponibilidad)\n\n" +
            "**🍽️ Servicios para Familias:**\n" +
            "• **Menús infantiles** en el restaurante\n" +
            "• **Sillas altas** disponibles en el comedor\n" +
            "• **Desayuno incluido** también para niños\n" +
            "• **Room service** con opciones para niños\n\n" +
            "**🏊‍♂️ Instalaciones Familiares:**\n" +
            "• **Piscina climatizada** - Supervisión de adultos requerida\n" +
            "• **Áreas comunes** espaciosas y seguras\n" +
            "• **Elevadores** para facilitar el acceso con cochecitos\n\n" +
            "**👶 Para Bebés:**\n" +
            "• **Cunas certificadas** y seguras\n" +
            "• **Cambiadores** en baños principales\n" +
            "• **Calentador de biberones** disponible en recepción\n" +
            "• **Servicio de niñera** (bajo solicitud y costo adicional)\n\n" +
            "**📋 Recomendaciones:**\n" +
            "• Informar sobre niños al momento de la reserva\n" +
            "• Supervisión de adultos requerida en todas las áreas\n" +
            "• Horarios de silencio: 10:00 PM - 7:00 AM\n\n" +
            "¿Viajas con niños? ¡Estaremos encantados de recibirlos!";
    }

    handlePromotionInquiry() {
        let response = "🎉 **Promociones Especiales DM Hoteles:**\n\n";

        this.hotelData.promotions.forEach((promo, index) => {
            response += `**${index + 1}. ${promo.name}**\n`;
            response += `📝 ${promo.description}\n`;
            if (promo.discount) {
                response += `💰 Descuento: ${promo.discount}\n`;
            }
            response += "\n";
        });

        response += "**🎯 Ofertas exclusivas que no querrás dejar pasar:**\n\n" +
            "**💳 DM Destino! - Clientes Interbank**\n" +
            "• Hasta 65% de descuento\n" +
            "• Beneficios exclusivos para cuentas sueldo\n" +
            "• Promoción válida todo el año\n\n" +
            "**🌟 Full Day DM Hoteles**\n" +
            "• Paquetes de relajación completos\n" +
            "• Incluye spa, piscina y servicios premium\n" +
            "• Experiencia de día completo\n\n" +
            "**🏆 Programa de Puntos**\n" +
            "• Acumula puntos en cada estadía\n" +
            "• Canjea por noches gratis\n" +
            "• Beneficios para huéspedes frecuentes\n\n" +
            "**📞 Para más información sobre promociones:**\n" +
            "• **Teléfono:** 51 614-3900\n" +
            "• **Email:** reservas@dmhoteles.pe\n\n" +
            "¿Te interesa alguna promoción en particular?";

        return response;
    }

    async handleDateInput(userMessage) {
        try {
            console.log('Handling date input:', userMessage);

            // Extraer fechas del mensaje
            const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
            const dates = userMessage.match(dateRegex);

            if (dates && dates.length >= 2) {
                const checkIn = dates[0];
                const checkOut = dates[1];

                // Extraer número de huéspedes
                const guestRegex = /(\d+)\s*(persona|huésped|guest)/i;
                const guestMatch = userMessage.match(guestRegex);
                const guests = guestMatch ? parseInt(guestMatch[1]) : 1;

                // Extraer destino
                const destinations = ['moquegua', 'arequipa', 'lima', 'tacna', 'ilo'];
                const destination = destinations.find(dest =>
                    userMessage.toLowerCase().includes(dest)
                ) || 'cualquier destino';

                this.context.checkInDate = checkIn;
                this.context.checkOutDate = checkOut;
                this.context.guestCount = guests;
                this.context.awaitingDates = false;

                return this.generateAvailabilityResponse(checkIn, checkOut, guests, destination);
            } else {
                return "Por favor, proporciona las fechas en el formato correcto:\n\n" +
                    "**Ejemplo:** 'Del 15/12/2024 al 20/12/2024 para 2 personas en Arequipa'\n\n" +
                    "Asegúrate de incluir ambas fechas y el número de huéspedes.";
            }
        } catch (error) {
            console.error('Error in handleDateInput:', error);
            this.context.awaitingDates = false;
            return "Hubo un error procesando las fechas. Por favor, intenta nuevamente con el formato: DD/MM/AAAA";
        }
    }

    generateAvailabilityResponse(checkIn, checkOut, guests, destination) {
        return `✅ **Consulta de Disponibilidad Procesada**\n\n` +
            `📅 **Fechas:** ${checkIn} al ${checkOut}\n` +
            `👥 **Huéspedes:** ${guests} persona(s)\n` +
            `📍 **Destino:** ${destination.charAt(0).toUpperCase() + destination.slice(1)}\n\n` +
            `🏨 **Habitaciones recomendadas para tu estadía:**\n\n` +
            `**1. Habitación Estándar**\n` +
            `✨ Perfecta para ${guests} persona(s)\n` +
            `🌄 Vista privilegiada a volcanes (Arequipa)\n` +
            `💰 Tarifa especial por reserva anticipada\n\n` +
            `**2. Habitación Doble**\n` +
            `🏖️ Ideal si buscas experiencia de playa\n` +
            `🌊 Vista al mar en destinos costeros\n` +
            `✨ Comodidad y ubicación privilegiada\n\n` +
            `**📞 Para confirmar tu reserva:**\n` +
            `• **Teléfono:** 51 614-3900\n` +
            `• **Email:** reservas@dmhoteles.pe\n` +
            `• **Web:** Reserva online disponible\n\n` +
            `**🎁 Beneficios de reservar ahora:**\n` +
            `• Desayuno incluido\n` +
            `• WiFi gratuito\n` +
            `• Acceso a spa y piscina\n` +
            `• Cancelación gratuita hasta 24h antes\n\n` +
            `¿Te gustaría que te ayude con algún otro aspecto de tu reserva?`;
    }

    getDefaultResponse() {
        return "¡Hola! 👋 Soy tu asistente virtual de **DM Hoteles**.\n\n" +
            "Puedo ayudarte con información sobre:\n\n" +
            "🏨 **Habitaciones y Reservas:**\n" +
            "• Tipos de habitaciones disponibles\n" +
            "• Consulta de disponibilidad\n" +
            "• Precios y promociones\n\n" +
            "🛎️ **Servicios del Hotel:**\n" +
            "• Restaurante y room service\n" +
            "• Spa, piscina y gimnasio\n" +
            "• Transporte y estacionamiento\n\n" +
            "🎉 **Eventos y Entretenimiento:**\n" +
            "• Bodas y celebraciones\n" +
            "• Eventos corporativos\n" +
            "• Actividades y tours\n\n" +
            "💳 **Información Práctica:**\n" +
            "• Métodos de pago\n" +
            "• Políticas del hotel\n" +
            "• Ubicación y cómo llegar\n\n" +
            "**¿En qué puedo ayudarte hoy?** 😊\n\n" +
            "También puedes contactarnos directamente:\n" +
            "📞 **51 614-3900** | 📧 **reservas@dmhoteles.pe**";
    }

    resetContext() {
        this.context = {
            awaitingDates: false,
            awaitingRoomSelection: false,
            selectedRoom: null,
            checkInDate: null,
            checkOutDate: null,
            guestCount: null,
            conversationStep: 'initial'
        };
    }
}