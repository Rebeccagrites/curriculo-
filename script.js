const defaultConfig = {
    nome_completo: "Rebecca Grites",
    titulo_profissional: "Estudante de Desenvolvimento de Sistemas",
    email: "rebecca.grites@email.com",
    telefone: "(11) 99999-9999",
    endereco: "São Paulo, SP",
    habilidade_1: "Comunicativa",
    habilidade_2: "Resiliente", 
    habilidade_3: "Trabalha bem em equipe",
    curso_1: "Guarda Mirim",
    curso_2: "Ensino Médio Técnico em Desenvolvimento de Sistemas",
    experiencia_texto: "Buscando oportunidade para iniciar carreira profissional e aplicar conhecimentos adquiridos",
    background_color: "#1e3a8a",
    surface_color: "rgba(255, 255, 255, 0.1)",
    text_color: "#ffffff",
    accent_color: "rgba(255, 255, 255, 0.5)",
    hover_color: "rgba(255, 255, 255, 0.2)"
};

// Funções de navegação de página
function showHomePage() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
}

function showSkillDetail(skill) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('skill-' + skill).classList.add('active');
}

function showCourseDetail(course) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('course-' + course).classList.add('active');
}

// Função de atualização de configuração (SDK)
async function onConfigChange(config) {
    const nomeElement = document.getElementById('nome-completo');
    const tituloElement = document.getElementById('titulo-profissional');
    const emailElement = document.getElementById('email');
    const telefoneElement = document.getElementById('telefone');
    const enderecoElement = document.getElementById('endereco');
    const habilidade1Element = document.getElementById('habilidade-1');
    const habilidade2Element = document.getElementById('habilidade-2');
    const habilidade3Element = document.getElementById('habilidade-3');
    const curso1Element = document.getElementById('curso-1');
    const curso2Element = document.getElementById('curso-2');
    const experienciaElement = document.getElementById('experiencia-texto');

    if (nomeElement) nomeElement.textContent = config.nome_completo || defaultConfig.nome_completo;
    if (tituloElement) tituloElement.textContent = config.titulo_profissional || defaultConfig.titulo_profissional;
    // Novos campos de contato
    if (emailElement) emailElement.textContent = config.email || defaultConfig.email;
    if (telefoneElement) telefoneElement.textContent = config.telefone || defaultConfig.telefone;
    if (enderecoElement) enderecoElement.textContent = config.endereco || defaultConfig.endereco;
    
    if (habilidade1Element) habilidade1Element.textContent = config.habilidade_1 || defaultConfig.habilidade_1;
    if (habilidade2Element) habilidade2Element.textContent = config.habilidade_2 || defaultConfig.habilidade_2;
    if (habilidade3Element) habilidade3Element.textContent = config.habilidade_3 || defaultConfig.habilidade_3;
    if (curso1Element) curso1Element.textContent = config.curso_1 || defaultConfig.curso_1;
    if (curso2Element) curso2Element.textContent = config.curso_2 || defaultConfig.curso_2;
    if (experienciaElement) experienciaElement.textContent = config.experiencia_texto || defaultConfig.experiencia_texto;

    // Aplicar cores personalizadas
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const accentColor = config.accent_color || defaultConfig.accent_color;
    const hoverColor = config.hover_color || defaultConfig.hover_color;

    document.body.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, #1e40af 50%, #3b82f6 100%)`;
    document.body.style.color = textColor;

    const sections = document.querySelectorAll('.section, .skill-item, .course-item, .experience-item, .contact-item, .detail-content');
    sections.forEach(section => {
        section.style.background = surfaceColor;
        section.style.borderColor = accentColor;
    });
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ background_color: value });
                    }
                }
            },
            {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ surface_color: value });
                    }
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ text_color: value });
                    }
                }
            },
            {
                get: () => config.accent_color || defaultConfig.accent_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ accent_color: value });
                    }
                }
            },
            {
                get: () => config.hover_color || defaultConfig.hover_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ hover_color: value });
                    }
                }
            }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["nome_completo", config.nome_completo || defaultConfig.nome_completo],
        ["titulo_profissional", config.titulo_profissional || defaultConfig.titulo_profissional],
        ["email", config.email || defaultConfig.email],
        ["telefone", config.telefone || defaultConfig.telefone],
        ["endereco", config.endereco || defaultConfig.endereco],
        ["habilidade_1", config.habilidade_1 || defaultConfig.habilidade_1],
        ["habilidade_2", config.habilidade_2 || defaultConfig.habilidade_2],
        ["habilidade_3", config.habilidade_3 || defaultConfig.habilidade_3],
        ["curso_1", config.curso_1 || defaultConfig.curso_1],
        ["curso_2", config.curso_2 || defaultConfig.curso_2],
        ["experiencia_texto", config.experiencia_texto || defaultConfig.experiencia_texto]
    ]);
}

// Inicializar o SDK quando disponível
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}