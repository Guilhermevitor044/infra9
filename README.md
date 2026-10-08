# Infra9 — Microsite técnico

Microsite estático em HTML, CSS e JavaScript para complementar a apresentação da Jornada Acadêmica ODS 9.

## Arquivos
- `index.html` — conteúdo e estrutura
- `styles.css` — identidade visual responsiva
- `script.js` — simulação interativa e navegação

## Como visualizar localmente
Basta abrir `index.html` no navegador. Para evitar qualquer limitação de navegador com arquivos locais, também é possível executar um servidor simples na pasta:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Publicação recomendada
O site não possui backend nem banco de dados. Pode ser publicado gratuitamente em:
- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel

Para o QR Code da apresentação, use somente a URL pública definitiva depois da publicação.

## Observação
O ICR é apresentado como um indicador conceitual do projeto. Em uma implantação real, pesos, fontes, limiares e governança do índice precisariam ser definidos e validados.
