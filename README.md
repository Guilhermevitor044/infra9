# Infra9 — microsite técnico

Microsite estático em HTML, CSS e JavaScript puro para complementar a apresentação acadêmica do Infra9, proposta vinculada ao ODS 9.

## Proposta

O Infra9 explora continuidade digital em um cenário de crise, combinando três frentes:

- **O sistema aguenta** — resiliência central para absorver picos e proteger serviços essenciais.
- **A população acessa** — continuidade regional com ICR, EdgeBox e sincronização posterior.
- **O comércio continua** — digitalização emergencial de pequenos negócios com catálogo e pedidos leves.

O site apresenta os conceitos como arquitetura proposta. Tecnologias, pesos do ICR, limiares, políticas de retenção e topologia precisariam ser validados em uma implantação real.

## Estrutura

- `index.html` — conteúdo semântico, navegação, simulação, fluxos, estados do EdgeBox, decisões, limites, segurança, referências e FAQ.
- `styles.css` — identidade visual azul-marinho/grafite, laranja ODS 9, estados operacionais e layout mobile-first sem dependências externas.
- `script.js` — simulação narrativa, menu mobile, estados interativos do EdgeBox e animações de entrada com fallback.

## Experiência mobile

O layout é pensado primeiro para telas de 360–430px:

- navegação compacta com menu acessível;
- alvos de toque com pelo menos 44px;
- fluxo de arquitetura vertical e sem arraste horizontal;
- `details/summary` para leitura em camadas;
- respeito a `prefers-reduced-motion`;
- foco visível e texto alternativo nos componentes interativos;
- nenhuma fonte, imagem ou biblioteca externa obrigatória.

## Como visualizar

Basta abrir `index.html` no navegador. Para testar com um servidor local:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Publicação

O projeto não possui backend nem etapa de build e pode continuar no GitHub Pages. Também pode ser publicado em Cloudflare Pages, Netlify ou Vercel.

Para o QR Code da apresentação, use a URL pública definitiva somente depois da publicação.

## Nota técnica

O ICR é um indicador conceitual. Em uma implantação real, fontes, pesos, limiares, governança, privacidade e políticas de sincronização precisariam ser definidos, testados e monitorados.
