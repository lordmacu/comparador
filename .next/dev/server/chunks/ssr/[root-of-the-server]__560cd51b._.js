module.exports = [
"[next]/internal/font/google/inter_5b7c257d.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_5b7c257d-module__HFa7oG__className",
});
}),
"[next]/internal/font/google/inter_5b7c257d.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5b7c257d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5b7c257d.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5b7c257d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5b7c257d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5b7c257d$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/lib/schemas/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateAggregateOfferSchema",
    ()=>generateAggregateOfferSchema,
    "generateBreadcrumbSchema",
    ()=>generateBreadcrumbSchema,
    "generateFAQSchema",
    ()=>generateFAQSchema,
    "generateHowToContactSchema",
    ()=>generateHowToContactSchema,
    "generateOrganizationSchema",
    ()=>generateOrganizationSchema,
    "generateServiceListSchema",
    ()=>generateServiceListSchema,
    "generateServiceSchema",
    ()=>generateServiceSchema,
    "generateWebSiteSchema",
    ()=>generateWebSiteSchema,
    "renderJsonLd",
    ()=>renderJsonLd
]);
function generateOrganizationSchema(provider) {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": provider.name,
        "url": provider.brand.website,
        "logo": provider.brand.logo,
        "slogan": provider.tagline,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": provider.whatsapp.number,
            "contactType": "Sales",
            "availableLanguage": "es",
            "areaServed": "CO"
        },
        "areaServed": provider.coverage.national ? {
            "@type": "Country",
            "name": "Colombia"
        } : {
            "@type": "AdministrativeArea",
            "name": provider.coverage.cities.join(', ')
        }
    };
}
function generateServiceSchema(service, provider) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": provider.name
        },
        "serviceType": "Internet Service",
        "areaServed": {
            "@type": "Country",
            "name": "Colombia"
        },
        "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": provider.brand.website,
            "servicePhone": provider.whatsapp.number
        },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "COP",
            "lowPrice": "45000",
            "highPrice": "150000",
            "offerCount": service.speeds?.length || service.options?.length || 3,
            "availability": "https://schema.org/InStock",
            "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
            "seller": {
                "@type": "Organization",
                "name": provider.name
            }
        }
    };
}
function generateAggregateOfferSchema(providers) {
    return {
        "@context": "https://schema.org",
        "@type": "AggregateOffer",
        "name": "Planes de Internet en Colombia",
        "description": "Comparación de precios de internet para hogar en Colombia",
        "priceCurrency": "COP",
        "lowPrice": "45000",
        "highPrice": "180000",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
        "offerCount": providers.reduce((acc, p)=>acc + (p.services?.length || 0), 0),
        "offers": providers.map((provider)=>({
                "@type": "Offer",
                "name": `Internet ${provider.name}`,
                "seller": {
                    "@type": "Organization",
                    "name": provider.name,
                    "url": provider.brand.website
                },
                "priceCurrency": "COP",
                "availability": "https://schema.org/InStock",
                "url": `https://comparadorinternet.co/${provider.slug}`
            }))
    };
}
function generateFAQSchema(provider) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": provider.faqs.map((faq)=>({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
    };
}
function generateBreadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index)=>({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
    };
}
function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Comparador de Internet Colombia",
        "description": "Descubre y compara los servicios de internet en Colombia: Claro, Movistar y ETB. Información sobre beneficios, tecnologías y cobertura.",
        "url": "https://comparadorinternet.co",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://comparadorinternet.co/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };
}
function generateServiceListSchema(providers) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Proveedores de Internet en Colombia",
        "description": "Comparación de servicios de internet en Colombia",
        "itemListElement": providers.map((provider, index)=>({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Organization",
                    "name": provider.name,
                    "description": provider.tagline,
                    "url": `https://comparadorinternet.co/${provider.slug}`
                }
            }))
    };
}
function generateHowToContactSchema(provider) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `Cómo contratar internet ${provider.name}`,
        "description": `Guía paso a paso para contratar servicio de internet con ${provider.name}`,
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Contacta por WhatsApp o Formulario",
                "text": `Comunícate con ${provider.name} por WhatsApp al ${provider.whatsapp.number} o llena el formulario de contacto.`
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Consulta planes disponibles",
                "text": "Un asesor te mostrará los planes disponibles para tu zona y necesidades."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Agenda instalación",
                "text": "Coordina la fecha y hora de instalación según tu disponibilidad."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Instalación profesional",
                "text": "Técnicos certificados realizan la instalación en tu hogar."
            }
        ]
    };
}
function renderJsonLd(data) {
    return {
        __html: JSON.stringify(data, null, 0)
    };
}
}),
"[project]/components/ChatWidget.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/ChatWidget.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ChatWidget.tsx <module evaluation>", "default");
}),
"[project]/components/ChatWidget.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/ChatWidget.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ChatWidget.tsx", "default");
}),
"[project]/components/ChatWidget.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWidget$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/ChatWidget.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWidget$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/ChatWidget.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWidget$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/Header.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/Header.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/Header.tsx <module evaluation>", "default");
}),
"[project]/components/Header.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/Header.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/Header.tsx", "default");
}),
"[project]/components/Header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5b7c257d$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5b7c257d.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schemas$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/schemas/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWidget$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChatWidget.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const metadata = {
    metadataBase: new URL('https://comparadorinternet.co'),
    title: {
        default: "Comparador de Internet en Colombia 2025 | Claro, Movistar, ETB",
        template: "%s | Comparador Internet Colombia"
    },
    description: "Descubre los servicios de internet en Colombia. Compara beneficios de Claro, Movistar y ETB. Consulta planes, promociones y cobertura disponible en tu zona.",
    keywords: [
        "internet Colombia",
        "planes de internet",
        "internet Claro",
        "internet Movistar",
        "internet ETB",
        "fibra óptica Colombia",
        "internet hogar",
        "comparador internet",
        "internet Bogotá",
        "mejor internet Colombia 2025"
    ],
    authors: [
        {
            name: "Comparador Internet Colombia"
        }
    ],
    creator: "Comparador Internet Colombia",
    publisher: "Comparador Internet Colombia",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    openGraph: {
        type: 'website',
        locale: 'es_CO',
        url: 'https://comparadorinternet.co',
        siteName: 'Comparador Internet Colombia',
        title: 'Comparador de Internet en Colombia 2025 | Claro, Movistar, ETB',
        description: 'Descubre servicios de internet en Colombia. Compara beneficios y consulta planes disponibles.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Comparador de Internet Colombia - Claro, Movistar, ETB'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Comparador de Internet en Colombia 2025',
        description: 'Compara servicios de internet: beneficios, cobertura y tecnologías disponibles',
        images: [
            '/og-image.jpg'
        ]
    },
    verification: {
        google: 'cMUfMPNRJ7JXK67SNgIAbIFRdpPkt5G5_Nawzdczp-k'
    },
    icons: {
        icon: [
            {
                url: '/favicon.ico',
                sizes: '32x32',
                type: 'image/x-icon'
            },
            {
                url: '/icon.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
        apple: [
            {
                url: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png'
            }
        ],
        shortcut: '/favicon.ico'
    },
    alternates: {
        canonical: 'https://comparadorinternet.co'
    }
};
function RootLayout({ children }) {
    const websiteSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schemas$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateWebSiteSchema"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "es-CO",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schemas$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["renderJsonLd"])(websiteSchema)
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "dns-prefetch",
                        href: "https://wa.me"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "llms-txt",
                        href: "/llms.txt",
                        type: "text/plain"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "alternate",
                        type: "application/rss+xml",
                        title: "Blog de Internet Colombia",
                        href: "/blog/feed.xml"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5b7c257d$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "min-h-screen",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWidget$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "bg-gray-900 text-gray-300 py-12 mt-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container mx-auto px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-white font-bold text-lg mb-4",
                                                    children: "Comparador Internet Colombia"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/layout.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: "Encuentra y compara los mejores planes de internet en Colombia. Información actualizada de Claro, Movistar y ETB."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/layout.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/layout.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-white font-semibold mb-4",
                                                    children: "Proveedores"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/layout.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "/claro",
                                                                className: "hover:text-white transition-colors",
                                                                children: "Internet Claro"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/layout.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/layout.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "/movistar",
                                                                className: "hover:text-white transition-colors",
                                                                children: "Internet Movistar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/layout.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/layout.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "/etb",
                                                                className: "hover:text-white transition-colors",
                                                                children: "Internet ETB"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/layout.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/layout.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/layout.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/layout.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-white font-semibold mb-4",
                                                    children: "Información"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/layout.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: [
                                                        "Última actualización: Diciembre 2025",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/app/layout.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Precios sujetos a disponibilidad y zona de cobertura."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/layout.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/layout.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/layout.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-gray-800 mt-8 pt-8 text-center text-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "© ",
                                            new Date().getFullYear(),
                                            " Comparador Internet Colombia. Todos los derechos reservados."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/layout.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/layout.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/layout.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__560cd51b._.js.map