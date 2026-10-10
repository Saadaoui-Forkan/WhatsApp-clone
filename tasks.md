# Tasks — Vers un MVP solide

Suivi de l'avancement du projet. ✅ = terminé, ⬜ = à faire.

**Décisions validées :**
- Messages : chargement incrémental par **curseur** (infinite scroll), pas de pagination numérotée.
- Auth : JWT en **cookie `httpOnly`** uniquement (front sans token persisté).
- UI : palette **émeraude / teal**.
- Upload : **1 image ≤ 5 Mo**, `image/*`, légende optionnelle.
- PWA : **installable uniquement** (pas d'offline complet).

---

## Phase 0 — Fondations backend ✅

- [x] `config/env.ts` — validation zod des variables d'env (fail-fast)
- [x] `lib/prisma.ts` — singleton `PrismaClient` (remplace les 5 instances)
- [x] `utils/AppError.ts` + `middlewares/errorHandler.ts` — erreurs centralisées
- [x] `index.ts` — `trust proxy`, `express.json({limit:"1mb"})`, `cors()`, `GET /health`
- [x] `.env.example` complet
- [x] `generateToken.ts` — `expiresIn` chaîne (fix `Number("7d")`), cookie sécurisé
- [x] `common.ts`, `constantes.ts`, `types/user.types.ts` — alignés sur `UserPayload`
- [x] `cookie-parser` ajouté
- [x] `profile.ts` — gardes `req.user` (typage strict)
- [x] `tsc --noEmit` OK

---

## Phase 1 — Sécurité ✅ (2 restes mineurs)

### Fuites & tokens
- [x] `verifyAccount` — ne renvoie plus l'objet user complet (fuite hash corrigée)
- [x] `verifyAccount` — exige toujours un token valide
- [x] `verifyAccount` — `io.to(userId).emit(...)` au lieu de `io.emit(...)`
- [x] `VerificationToken` — `tokenHash` (SHA-256), `expiresAt`, `type`, usage unique
- [x] `resetPassword` — `isAccountVerified` persisté en base
- [x] Anti-énumération sur reset password
- [x] `utils/hashToken.ts`

### Durcissement
- [x] `helmet` + headers sécurité (vérifié)
- [x] `express-rate-limit` — global / auth / reset (vérifié)
- [x] `bcrypt.compare` async, coût 12
- [x] Mot de passe min 8 caractères
- [x] `multer` — 5 Mo, 1 fichier, `fileFilter` `image/*`
- [x] `isAuth` — accepte `Bearer` ou token brut
- [x] `isSocketAuth` — token via `query` ou `auth`
- [x] Route `/:userId/verify/:token` après `/friends`
- [x] `utils/validation.ts` (middleware zod), `routes/rateLimiters.ts`

### Reste (mineur)
- [ ] Erreur `fileFilter` multer → `AppError` 400 (au lieu de 500)
- [ ] Nettoyage auto des tokens expirés (cron) — optionnel

---

## Phase 2 — Robustesse des entrées ✅

- [x] Appliquer le middleware `validate` (zod) sur les routes existantes
- [x] Schémas manquants : profil (`name`, `bio`), params (`userId`, `token`)
- [x] Socket.IO : `try/catch` sur tous les handlers async (anti-crash)
- [x] Socket.IO : validation `content` (≤ 4000 car.) + `receiverId` valide
- [x] Convertir les erreurs multer en `AppError`

---

## Phase 3 — Messages par curseur + conversations ✅

- [x] Index Prisma : `@@index([senderId])`, `@@index([receiverId])`, `@@index([createdAt])`
- [x] `GET /api/messages/:userId?cursor=&limit=30` (curseur `createdAt`)
- [x] Supprimer `GET /api/messages` « tout charger »
- [x] `GET /api/conversations` — dernier message + non-lus par contact (côté serveur)
- [x] Front : `useInfiniteQuery` + scroll vers le haut
- [x] Front : store messages **indexé par conversation**
- [x] Fix `seen` : cibler le bon utilisateur + listener front + coches

---

## Phase 4 — Upload d'image dans les messages ✅

- [x] Schéma : `Message.content` → `String?`, ajouter `attachment Json?`
- [x] `POST /api/messages/attachment` (multipart → Cloudinary, `folder:"chat-attachments"`)
- [x] Socket `send_message` étendu `{ receiverId, content?, attachment? }` + validation
- [x] Front : bouton image dans `ChatFooter`, aperçu, upload
- [x] Front : rendu image dans `ChatMessage` + lightbox

---

## Phase 5 — UI / couleurs émeraude-teal ✅

- [x] `tailwind.config.js` + `index.css` : palette + typo Inter + ombres + rayons
- [x] Restyler : `AuthHeader`, pages auth, `Sidebar`/`UserPanel`/`Search`/`MessageItem`
- [x] Restyler : `ChatHeader`, `ChatMessage`, `ChatFooter`, `Spinner`, `Footer`, `Theme`, `NotFound`
- [x] Bulles + horodatage + coches « vu » + indicateur « en train d'écrire » lié au contact
- [x] Axios unique + intercepteur `401` → déconnexion + redirect
- [x] Erreurs → toast (fin des `catch { console.log }`)

---

## Phase 6 — PWA installable ✅

- [x] `manifest.json` : icônes 192 + 512 en `purpose:"any"` **et** `"maskable"`
- [x] `public/sw.js` minimal (handler `fetch` pass-through) + enregistrement dans `index.tsx`
- [x] Bouton « Installer l'app » (`beforeinstallprompt`) + instructions iOS
- [x] Métas iOS dans `index.html`
- [x] Corriger `readme.md` (« offline » → « installable uniquement »)

---

## Phase 7 — Auth cookie `httpOnly` ✅

- [x] `isAuth` lit `req.cookies.jwt` (via `cookie-parser`)
- [x] `isSocketAuth` lit le cookie dans `socket.handshake.headers.cookie`
- [x] Cookie : `secure`+`sameSite:"none"` (prod) / `lax`+`secure:false` (dev)
- [x] `GET /api/users/me` renvoie le user DB (select sûr)
- [x] Front : supprimer `token` du store, `withCredentials` partout, socket `withCredentials`
- [x] Garde de routes basée sur une query `me`

---

## Phase 8 — Tests / logs / déploiement ⬜

- [ ] Backend : Vitest + supertest + `mongodb-memory-server`
- [ ] Tests : register/login, **régression fuite de hash**, reset expiré/usage unique, curseur, upload
- [ ] Frontend : RTL sur `ChatFooter`, rendu messages, flux auth
- [ ] Logs structurés (`pino`), ESLint/Prettier, scripts npm
- [ ] Dockerfile / docker-compose (optionnel)

---

## Résumé

| Phase | Statut |
|---|---|
| 0 — Fondations | ✅ Terminé |
| 1 — Sécurité | ✅ Terminé |
| 2 — Robustesse entrées | ✅ Terminé |
| 3 — Messages curseur | ✅ Terminé |
| 4 — Upload image | ✅ Terminé |
| 5 — UI couleurs | ✅ Terminé |
| 6 — PWA installable | ✅ Terminé |
| 7 — Auth cookie | ✅ Terminé |
| 8 — Tests / déploiement | ⬜ À faire |
