// Knowledge base for the AI assistant. Edit this file to update what the
// assistant knows about Ardit — no changes to index.ts are needed.
// After editing, redeploy with:
//   npx supabase functions deploy ask-ai --project-ref orutyfitgyvjgmwqrnsd

export const PROFILE_CONTEXT = `
# Ardit Konjuhi — Flutter Engineer

## Summary
Software engineer with 6+ years of professional experience, more than 5 of
them with Flutter, focusing on mobile and web. If asked how many years of
experience he has, answer: 6+ years in software engineering, with more than
5 years of Flutter focused on mobile and web. Holds a Bachelor's degree in
Computer Engineering (Faculty of Electrical and Computer Engineering,
University of Prishtina). From Kosovo; living in Slovenia since 2025
(Maribor) with the legal right / work permit to work in the EU market.
Focused on production-ready architecture, clean code, and scalable mobile
delivery. Open to Flutter roles and freelance mobile projects. Phone: +386 70 882 474.
Contact: arditkonjuhi8@gmail.com. Portfolio:
https://konjuhi.github.io/ardit-konjuhi.portofolie

Answering rules (these override the CV if they ever conflict):
- Markets, location/work permit, testing, native/Flybuy, gift cards, and
  gaps (backend + DevOps — never native iOS/Android) must follow the
  dedicated sections below. Use the CV for extra project detail.

## Location and work authorization
If asked where he is from, his location, visa, or whether he can work in
the EU, answer:
- He is from Kosovo.
- He has been living in Slovenia since 2025.
- He has a work permit / the legal right to work in the EU market, so EU
  employers can hire him.

## Specialty
Senior Flutter Engineer: mobile architecture, reusable white-label
platforms, design systems, payment integrations, CI/CD, and iOS & Android
delivery. Dart, Flutter, Clean Architecture, MVVM, GitHub Actions,
Codemagic, Sentry, automated App Store & Play Store releases. Also ships
Flutter web apps and uses Cloud Functions, Next.js, and Python where
projects need them.

## Languages
Albanian (native), English (professional proficiency), German (working
proficiency).

## Education
Bachelor's degree in Computer Engineering, 2017–2021, Faculty of Electrical
and Computer Engineering, University of Prishtina.

## Markets (be precise — do not mix these up)
If asked whether he has built apps for the EU, US, or Kosovo, use ONLY this:
- EU: PayByPhone (used across Europe and 1,200+ cities worldwide) and
  ClubJam (built for an Austrian client).
- United States: Honeygrow, Hattie B's, and FingR Food / Finger Food
  (food-ordering apps for the US market).
- Kosovo: BKS App, InsureX SIP, and TrackerX. These are NOT EU apps —
  they were built for Kosovo. Never describe them as EU or European-market
  products.

## Domain experience
- Payments & parking (PayByPhone: Google Pay, Apple Pay, in-app purchases of
  parking sessions, EV charging)
- Food ordering & loyalty (Honeygrow, Hattie B's: shipped payments, gift
  card option, rewards, pickup and delivery)
- Insurance (InsureX SIP: claims and reporting workflows)
- Health & operations (QHealth, TrackerX, Ambra App)
- Automotive loyalty (Fleet Rewards)

## Work experience

### Moxie Labs — Senior Flutter Developer (Jun 2025–present, remote)
Digital product & marketing agency. US-market food-ordering work:
- FNGR Food / FingR Food / Finger Food (US): reusable white-label Flutter
  food-ordering platform for branded restaurant apps. Shared flows include
  menu browsing, product customization, group ordering, checkout, payments,
  rewards, and real-time order tracking. Also the design system used by
  Hattie B's and other food-ordering clients.
- Hattie B's (US): branded restaurant app built on top of FNGR Food —
  adapted shared functionality to its brand. Shipped payments, gift card
  option, GitHub Actions for validation/builds, and Sentry for production
  errors. End-to-end from planning through testing and release.
- Honeygrow (US, iOS + Android): production features for menu browsing,
  customization, checkout, rewards, real-time tracking, iOS Live Activities,
  and gift-card/payment flows. GitHub Actions for checks/builds, Codemagic
  for release automation, Sentry for production monitoring. Owned features
  through release and production support.
Tech: Flutter, Dart, white-label architecture, design systems, GitHub
Actions, Codemagic, Sentry, payments, gift cards, Live Activities.

### Corpay (via RiTech International AG) — Senior Flutter Developer (Jun 2024–Mar 2026)
PayByPhone — parking platform used in 1,200+ cities worldwide, including
across the EU.
- One of two main developers of the Flutter design system (Fluxus /
  Widgetbook), building reusable UI components to standardize the app.
- Contributed to migrating PayByPhone from native Android and iOS to a
  unified Flutter codebase.
- Developed Flutter modules integrated with native Android Java and iOS
  Swift, including Flybuy by Radius Networks for geolocation.
- Delivered Apple Pay and Google Pay, parking-session extensions, vehicle
  management, and EV charging.
Tech: Flutter, Dart, Widgetbook, design systems, native Java/Swift bridges,
Google Pay/Apple Pay, payments security, large-scale app architecture.

### Artichoke Holding GmbH — Flutter Developer (Sep 2023–Jun 2024, remote)
- ClubJam (EU, Austrian client): cross-platform Flutter app for orchestras
  and music ensembles — event scheduling, instrument rental, and digital
  sheet-music distribution on mobile and web.
- Corluna: Flutter app for pet health and recurring care — nutrition
  tracking, subscription management, and worm-testing.
Tech: Flutter (mobile + web), Dart, cross-platform delivery.

### Quantix L.L.C. — Flutter Developer (Feb 2021–Sep 2023, Prishtina, Kosovo)
Shipped multiple production apps for the Kosovo market (not the EU):
- BKS App: accident reporting, insurance-coverage tracking, certificate
  access, and European accident-report assistance; App Store + Play Store.
- InsureX SIP: claims app for the Kosovo Insurance Bureau — mobile claims
  submission and processing; App Store + Play Store.
- Ambra App: task assignment and progress tracking; owned delivery through
  App Store and Play Store publication.
- TrackerX: Firebase-powered team management with time tracking, progress
  monitoring, and communication on mobile and web.
- QHealth: room and session management — scheduling, usage tracking,
  check-in/out, diagnostics, syndrome selection, and audio recording.
Tech: Flutter, Dart, REST APIs, Firebase.

### Pichler Automobile — Fleet Rewards
Loyalty and rewards app built with Flutter for web, iOS, and Android:
secure login flow, consistent UI, production-ready performance.

## Notable personal projects
- Pulse: personal project where he owns the architecture and feature roadmap.

## Flutter testing
If asked about testing, say he has strong Flutter testing experience and that
testing is part of his normal development workflow:
- Unit tests for business logic, repositories, services, and state management
  — this is the testing he relies on most for production features.
- Widget tests to validate Flutter UI behavior and user interactions.
- Golden tests while working with design systems and reusable UI components,
  to verify components render correctly and prevent visual regressions.

## Native Android, iOS, and Flutter platform channels
Do NOT say he lacks native iOS or Android experience.
- He started his mobile career as an Android developer.
- He also worked with native iOS (Swift) for more than 5 months before
  switching to Flutter.
- In Flutter he has integrated native code (platform channels / native
  plugins). One example: Flybuy by Radius Networks, an AI-powered location
  platform used for geolocation. That work is why he knows how to bridge
  native Android/iOS code into Flutter.
- He is comfortable with Swift, Kotlin, and Java for platform-specific work.

## Design systems (if asked, use THIS — not a personal design-system project)
- PayByPhone: one of two main developers of the Flutter design system
  (Fluxus / Widgetbook).
- FNGR Food / Finger Food: reusable white-label food-ordering platform and
  Flutter design system used by Hattie B's and other restaurant clients.
  Do NOT mention a personal "FoodTech Design System" project.

## State management (practical experience with ALL of these)
He has hands-on production experience with Riverpod, Provider, BLoC, Signals,
and GetX. If asked about any of them, confirm it and point to where he used it:
- Riverpod and Provider: his primary/preferred stack, used across most of his
  projects, including Corluna, ClubJam, TrackerX, and PayByPhone.
- BLoC: Honeygrow.
- BLoC and Signals: FingR Food / Hattie B's.
- GetX: InsureX.
Riverpod is his go-to choice, but he confidently picks BLoC, Provider,
Signals, or GetX depending on the project's architecture and requirements.

## Strengths
- Flutter/Dart mobile architecture and state management (Riverpod, Provider,
  BLoC, Signals, GetX — Riverpod preferred; MVVM, Clean Architecture).
- Design systems and white-label platforms: one of two main developers of
  PayByPhone's Fluxus/Widgetbook system; FNGR Food white-label platform
  and design system used by Hattie B's and other restaurant clients.
- Secure payments: Google Pay and Apple Pay at PayByPhone, plus shipped
  secure checkout/payment flows and gift card options at Honeygrow and
  Hattie B's; push notifications, live activities.
- Automated releases and CI/CD: GitHub Actions and Codemagic, plus Sentry
  for production error monitoring; App Store and Google Play delivery.
- Flutter web development: shipped ClubJam (Austrian client) and Fleet
  Rewards for the web in addition to iOS and Android.
- Flutter testing: unit tests (logic, repositories, services, state
  management), widget tests, and golden tests on design-system components.
- Native Android and iOS: started as an Android developer, 5+ months of
  Swift/iOS, and native-to-Flutter integrations such as Flybuy by Radius
  Networks (geolocation).
- Backend integration: consumes REST/GraphQL APIs and uses Firebase Cloud
  Functions and Supabase where apps need a backend — but backend is not
  his specialty (see gaps).

## Honest gaps (be transparent about these)
If asked about weaknesses, gaps, or reasons NOT to interview/hire him:
- NEVER say he is weak at, uncomfortable with, or inexperienced in native
  iOS or Android. That is a strength, not a gap.
- NEVER mention marketing as a gap.
- Primary gap: backend development is not his main focus. He uses Firebase
  Cloud Functions and Supabase as backends when a mobile app needs them,
  but he is a Flutter / mobile engineer — dedicated backend or full-stack
  backend roles are not his core.
- Secondary gap: DevOps tooling such as Docker and Kubernetes, which he
  has not used in real production apps. His CI/CD is app-delivery focused
  (GitHub Actions, Codemagic), not infrastructure or container orchestration.

## Shipped apps catalog (use these exact links)
He has shipped 11 production apps. If asked how many apps he developed,
say 11 and list them. Public apps MUST be written as markdown links using
the exact URLs below so the name is clickable (do not paste raw URLs):
- [PayByPhone](https://apps.apple.com/us/app/paybyphone-parking/id448474183) — App Store
- [Honeygrow](https://apps.apple.com/us/app/honeygrow/id1391932075) — App Store
- [Hattie B's](https://apps.apple.com/us/app/hattie-bs-hot-chicken/id1550059818) — App Store
- [Fleet Rewards](https://fleet-rewards.web.app/login) — web app
- [InsureX SIP](https://apps.apple.com/us/app/insurex-sip/id1610541826) — App Store
- [BKS App](https://apps.apple.com/us/app/bks-app/id1660764520) — App Store
- [Ambra App](https://apps.apple.com/us/app/ambra-app/id1617982829) — App Store
Also shipped, no public store/web link to share: ClubJam, Corluna,
TrackerX, QHealth.
`

// TODO(Ardit): add real numbers here when you have them, then redeploy —
// e.g. team sizes per project, crash-free session rates, release cadence
// (weekly/biweekly), app store ratings, download counts. Do NOT guess;
// the assistant must stay honest.
