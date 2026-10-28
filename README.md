# LinguagemNoid

Aprenda chinês mandarim pelo celular: Hanzi, Pinyin, caligrafia em grade Tianzige/Mizige, áudio zh-CN, modo de associação e quiz, em tema AMOLED (preto puro). Leve, offline e sem anúncios.

**Acesse:** `https://SEU-USUARIO.github.io/linguagemnoid/`

## Recursos

- **Estudar**: Hanzi grande em grade 田字格/米字格, traçado com o dedo ou caneta (sensível à pressão), pinyin, tradução, exemplo do dia a dia, radical e dica.
- **Associar**: ouça o som, veja o ideograma e toque na imagem certa.
- **Quiz**: áudio → Hanzi e Hanzi → português, com revisão só das palavras erradas.
- Voz normal (1.0x) e lenta (0.65x), com o contorno visual do tom.
- Favoritos, palavras aprendidas, sequência e recorde salvos no próprio aparelho.
- Funciona offline depois do primeiro acesso.

## Leve no celular

- Tema preto puro: em telas AMOLED, pixels pretos ficam apagados.
- Modos e lista de palavras só são carregados quando você abre.
- Voz e sons param quando o app sai da tela.
- Sem efeitos de desfoque nem animações contínuas; respeita "Remover animações" do Android.
- Arquivos e fontes ficam em cache: depois da primeira visita quase não usa internet.
- Sem servidor, sem conta, sem rastreamento: tudo fica salvo no aparelho.

## Publicar no GitHub Pages

1. Crie um repositório chamado `linguagemnoid` no GitHub.
2. Envie estes arquivos para a branch `main`:
   ```bash
   git init
   git add .
   git commit -m "LinguagemNoid v1.0.0"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/linguagemnoid.git
   git push -u origin main
   ```
   Pelo navegador também dá: **Add file → Upload files**, arrastando todo o conteúdo da pasta (inclusive `.github`).
3. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.
4. Na aba **Actions**, aguarde o workflow ficar verde.
5. Pronto: `https://SEU-USUARIO.github.io/linguagemnoid/`.

## Instalar no celular

Abra o link no **Chrome** do Android → menu ⋮ → **Instalar app**. O LinguagemNoid ganha ícone na tela inicial, abre em tela cheia e funciona offline.

> A voz vem do mecanismo de texto para voz do aparelho. Se ficar mudo, instale a voz chinesa: *Configurações → Gerenciamento geral → Saída de texto em voz → Mecanismo do Google → Instalar dados de voz → Chinês (China)*.

## Gerar um .apk (opcional)

Com o site no ar, cole a URL no [PWABuilder](https://www.pwabuilder.com/) → *Package for stores* → **Android**. Ele gera .apk e .aab usando Trusted Web Activity (roda via Chrome), então o áudio continua funcionando.

## Rodar localmente

Requer Node.js 22+.

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # testes da lógica do quiz
npm run build    # gera dist/
```

## Estrutura

```
├── .github/workflows/deploy.yml   # build + publicação automática
├── public/                        # manifest.json, sw.js, ícones
├── src/
│   ├── App.tsx                    # navegação, categorias, estado
│   ├── main.tsx                   # entrada + service worker
│   ├── index.css                  # Tailwind v4, fontes, utilitários
│   ├── types.ts
│   ├── components/                # StudyMode, AssociationMode, QuizMode, ...
│   ├── data/vocabulary.ts         # banco de palavras
│   └── utils/                     # audio.ts, quizLogic.ts (+ testes)
├── index.html
└── vite.config.ts
```

## Adicionar palavras

Edite `src/data/vocabulary.ts` seguindo o formato dos itens existentes: `id` único, `categoria`, `hanzi`, `pinyin`, `tom` (0 a 4), `traducao`, `icone` e, opcionalmente, `exemplo_curto`, `radical` e `dica`.
