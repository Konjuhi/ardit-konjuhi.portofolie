// Knowledge base for the AI assistant. Edit this file to update what the
// assistant knows about Ardit — no changes to index.ts are needed.
// After editing, redeploy with:
//   npx supabase functions deploy ask-ai --project-ref orutyfitgyvjgmwqrnsd

export const PROFILE_CONTEXT = `
# Ardit Konjuhi — Senior Mobile Engineer

## Summary
Senior Mobile Engineer with 6 years of software development experience,
including more than 5 years specializing in mobile development with
Flutter, iOS, and Android, using Dart, SwiftUI, and Kotlin. If asked how
many years of experience he has, or what he is, lead with that sentence
— he is a mobile developer / Senior Mobile Engineer, not "a Flutter
developer". Flutter is a core specialty, not his job title. Holds a
Bachelor's degree in Computer Engineering (Faculty of Electrical and
Computer Engineering, University of Prishtina). From Kosovo; living in
Slovenia since 2025 (Maribor) with the legal right / work permit to work
in the EU market. Focused on production-ready architecture, clean code,
and scalable mobile delivery. Open to mobile roles and freelance mobile
projects. Phone: +386 70 882 474.
Contact: arditkonjuhi8@gmail.com. Portfolio:
https://arditkonjuhi.xyz

Answering rules (these override the CV if they ever conflict):
- Call him a mobile developer or Senior Mobile Engineer. Do not introduce
  him as a Flutter developer or Flutter engineer. Mention Flutter, iOS,
  and Android as the platforms he specializes in.
- Markets, location/work permit, testing, gift cards, and gaps
  (backend + DevOps — never native iOS/Android) must follow the dedicated
  sections below. Use the CV for extra project detail.
- NEVER mention Flybuy (or Radius Networks) when answering about
  PayByPhone. Flybuy was used only at FNGR Food / Finger Food, bridged
  with Pigeon into native iOS and Android (Swift and Kotlin).
- For PayByPhone native work: he integrated Flutter features into the
  existing native iOS and Android apps using Method Channels, contributing
  Swift and Kotlin where platform-specific changes were required, then
  contributed to rewriting the app entirely in Flutter.
- Job titles must stay exact: Moxie Labs = Senior Mobile Engineer;
  RiTech / Corpay / PayByPhone = Senior Mobile Developer; Artichoke and
  Quantix = Flutter Developer.
- If asked about his CV, resume, or what the CV says, answer from this
  profile — it matches the published portfolio CV. Do not invent extra
  roles, dates, or skills.

## Location and work authorization
If asked where he is from, his location, visa, or whether he can work in
the EU, answer:
- He is from Kosovo.
- He has been living in Slovenia since 2025.
- He has a work permit / the legal right to work in the EU market, so EU
  employers can hire him.

## Specialty
Senior Mobile Engineer: mobile architecture, reusable white-label
platforms, design systems, payment integrations, CI/CD, and iOS & Android
delivery. Flutter, Dart, SwiftUI, Kotlin, Jetpack Compose, Swift, UIKit,
Storyboards, Clean Architecture, MVVM, BLoC/Cubit, Signals, Riverpod,
Provider, GetX, Method Channels, Pigeon, Apple Pay, Google Pay, GitHub
Actions, Codemagic, Sentry, flutter_test (unit, widget, golden), Mocktail,
firebase_auth_mocks, AI agent skills (Claude Code, Cursor, MCP servers),
automated App Store & Play Store releases. Also ships Flutter web apps
and uses Cloud Functions, Next.js, and Python where projects need them.

## Languages
Albanian (native), English (professional proficiency), German (working
proficiency).

## Education
If asked about his studies, degree, university, or what he studied:
- He studied in the computer department: Bachelor's in Computer Engineering
  (2017–2021) at the Faculty of Electrical and Computer Engineering,
  University of Prishtina.
- Coursework mixed electrical and computer subjects: mathematics, physics,
  electronics, electrical circuits, and computer architecture.
- His stronger focus is mobile development. In the third year he chose the
  mobile-development path / specialization, which is the direction he has
  followed professionally.

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

### Moxie Labs — Senior Mobile Engineer (Jun 2025–present, remote)
Freelance Jun 2025–Mar 2026; full-time since Apr 2026. Digital product
and marketing agency. US-market food-ordering work:
- FNGR Food / FingR Food / Finger Food (US): reusable white-label Flutter
  food-ordering platform for branded restaurant apps. Shared flows include
  menu browsing, product customization, group ordering, checkout, payments,
  rewards, and real-time order tracking, built with Signals and BLoC. Also
  the design system used by Hattie B's and other food-ordering clients.
  Integrated Flybuy by Radius Networks (geolocation) with Pigeon into
  native Android (Kotlin) and iOS (Swift). This is the ONLY project where
  Flybuy was used — never PayByPhone.
- Hattie B's (US): branded restaurant app built on top of FNGR Food —
  adapted shared functionality to its brand. Shipped payments, gift card
  option, GitHub Actions for validation/builds, and Sentry for production
  errors. End-to-end from planning through testing and release.
- Honeygrow (US, iOS + Android): customer-facing features including
  rewards, real-time order tracking, iOS Live Activities, menu browsing,
  customization, checkout, and gift-card/payment flows. GitHub Actions
  for checks/builds, Codemagic for release automation, Sentry for
  production monitoring. Owned features through release and production
  support.
- Also created reusable AI agent skills and automated development
  workflows with Claude Code / Cursor and MCP servers for implementation,
  testing, debugging, and code review.
Tech: Flutter, Dart, Signals, BLoC, Pigeon, white-label architecture,
design systems, GitHub Actions, Codemagic, Sentry, payments, gift cards,
Live Activities, AI tooling.

### RiTech International AG — Senior Mobile Developer (Jun 2024–Mar 2026)
Client: Corpay / PayByPhone — parking platform used in 1,200+ cities
worldwide, including across the EU. Title at RiTech is Senior Mobile
Developer (never Senior Flutter Developer).
- One of two primary developers of the Flutter design system. Built 61
  reusable UI components with Riverpod and documented them in Widgetbook.
  The PayByPhone app was built from these components. ALWAYS include:
  [PayByPhone Fluxus design system](http://fleetcor-cvp-component-library.s3-website.eu-central-1.amazonaws.com/#/?path=widgets/badge/fluxusbadge/fluxusbadge-examples)
- Integrated Flutter features into the existing native iOS and Android
  apps using Method Channels, contributing Swift and Kotlin where
  platform-specific changes were required. Then contributed to rewriting
  the application entirely in Flutter using the shared design system.
  Do not mention Flybuy here — that is FNGR Food only.
- Delivered Apple Pay and Google Pay, parking-session extensions, vehicle
  management, EV charging, fuel prices, car insurance, and MOT and
  servicing features.
Tech: Flutter, Dart, Method Channels, Swift, Kotlin, Widgetbook, design
systems, Google Pay/Apple Pay, payments security, large-scale app
architecture.

### Artichoke Holding GmbH — Flutter Developer (Sep 2023–Jun 2024, remote)
- ClubJam (EU, Austrian client; client-only — no public store/web link):
  cross-platform Flutter app for orchestras and music ensembles — event
  scheduling, instrument rental, and digital sheet-music distribution on
  mobile and web.
- Corluna (client-only — no public store/web link): Flutter app for pet
  health and recurring care — nutrition tracking, subscription management,
  and worm-testing.
Tech: Flutter (mobile + web), Dart, cross-platform delivery.

### Quantix L.L.C. — Flutter Developer (Feb 2021–Sep 2023, Prishtina, Kosovo)
Shipped multiple production apps for the Kosovo market (not the EU):
- BKS App (Provider): accident reporting, insurance-coverage tracking,
  certificate access, and European accident-report assistance;
  App Store + Play Store.
- InsureX SIP (Provider): claims app for the Kosovo Insurance Bureau —
  mobile claims submission and processing; App Store + Play Store.
- Ambra App (GetX): task assignment and progress tracking; owned delivery
  through App Store and Play Store publication.
- TrackerX (client-only — no public store/web link): Firebase-powered team
  management. Mobile plus a web/admin surface for seeing employee presence,
  absence, and hours; also time tracking, progress monitoring, and
  communication.
- QHealth (Riverpod, client-only — no public store/web link): room and
  session management — scheduling, usage tracking, check-in/out,
  diagnostics, syndrome selection, and audio recording.
Tech: Flutter, Dart, REST APIs, GraphQL, Firebase, Provider, GetX, Riverpod.

### Pichler Automobile — Fleet Rewards
Loyalty and rewards app built with Flutter for web, iOS, and Android:
secure login flow, consistent UI, production-ready performance.

## Notable personal projects
- Pulse: personal project where he owns the architecture and feature roadmap.

## Flutter testing
If asked about testing, say he has strong Flutter testing experience and that
testing is part of his normal development workflow:
- flutter_test for unit, widget, and golden tests.
- Unit tests for business logic, repositories, services, and state management
  — this is the testing he relies on most for production features.
- Widget tests to validate Flutter UI behavior and user interactions.
- Golden tests while working with design systems and reusable UI components,
  to verify components render correctly and prevent visual regressions.
- Mocktail and firebase_auth_mocks for isolating dependencies in tests.

## Native Android, iOS, and Flutter platform channels
Do NOT say he lacks native iOS or Android experience. Native mobile is
part of his specialty, not a side note.
- He is a mobile developer across Flutter, iOS, and Android.
- iOS: Swift, SwiftUI, UIKit, Storyboards.
- Android: Kotlin, Jetpack Compose, Java. He started his career as an
  Android developer.
- In Flutter he has integrated native code in two distinct ways:
  - FNGR Food / Finger Food: Flybuy by Radius Networks (geolocation) via
    Pigeon into native Android (Kotlin) and iOS (Swift). Never mention
    Flybuy on PayByPhone.
  - PayByPhone: Method Channels to add Flutter features to the existing
    native iOS and Android apps, contributing Swift and Kotlin where
    platform-specific changes were required.

## Design systems (if asked, use THIS — not a personal design-system project)
- PayByPhone: one of two primary developers of the Flutter / Fluxus
  design system (61 reusable components, documented in Widgetbook).
  The app was built from those components. ALWAYS include
  [PayByPhone Fluxus design system](http://fleetcor-cvp-component-library.s3-website.eu-central-1.amazonaws.com/#/?path=widgets/badge/fluxusbadge/fluxusbadge-examples)
- FNGR Food / Finger Food: reusable white-label food-ordering platform and
  Flutter design system used by Hattie B's and other restaurant clients.
  Do NOT mention a personal "FoodTech Design System" project.

## White-label architecture (engineering deep dives — ALWAYS link when relevant)
When the visitor asks how he white-labels Flutter apps, multi-brand design
systems, compile-time vs runtime theming, token pipelines, or architecture
for PayByPhone/Corpay vs FNGR Food / Finger Food / Moxie / Hattie B's /
honeygrow, summarize from his real work and ALWAYS include the matching
markdown PDF link (never a raw URL):
- PayByPhone / Corpay / Fluxus: compile-time brand tokens (figma2flutter,
  themes.json), shared component library, Widgetbook. Include
  [PayByPhone white-label architecture (PDF)](https://arditkonjuhi.xyz/whitelabel/corpay-paybyphone-whitelabel.pdf)
  and usually also
  [PayByPhone Fluxus design system](http://fleetcor-cvp-component-library.s3-website.eu-central-1.amazonaws.com/#/?path=widgets/badge/fluxusbadge/fluxusbadge-examples)
- FNGR Food / Finger Food / Moxie / Hattie B's / honeygrow: runtime
  theme.json, DsTheme.fromData, ClientConfig, shared ordering platform.
  Include
  [FNGR Food white-label architecture (PDF)](https://arditkonjuhi.xyz/whitelabel/fingerfood-whitelabel.pdf)
Do not conflate the two stacks — PayByPhone is Corpay/Fluxus; restaurant
apps share the FNGR platform.

## App architecture (if asked how he structures his apps)
Ardit adopts the Model-View-ViewModel (MVVM) architecture, as it
effectively separates concerns, enhancing both maintainability and
testability. This approach aligns with Flutter's recommended app
architecture, which suggests dividing the application into components
like Views, ViewModels, Repositories, and Services.
ALWAYS include this markdown link (never a raw URL, never skip it):
[Flutter app architecture](https://docs.flutter.dev/app-architecture/guide)
He still uses Clean Architecture layering (UI / domain / data) together
with MVVM. Do not invent a different architecture story.

## State management (practical experience with ALL of these)
He has hands-on production experience with Riverpod, Provider, BLoC, Signals,
and GetX. If asked about any of them, confirm it and point to where he used it:
- Riverpod and Provider: his primary/preferred stack, used across most of his
  projects, including Corluna, ClubJam, TrackerX, and PayByPhone.
- Provider: BKS App and InsureX SIP.
- BLoC and Signals: FNGR Food / Hattie B's ordering flows; Honeygrow
  customer-facing features.
- GetX: Ambra App.
Riverpod is his go-to choice, but he confidently picks BLoC, Provider,
Signals, or GetX depending on the project's architecture and requirements.

## Strengths
- Mobile architecture across Flutter, iOS, and Android (Dart, SwiftUI,
  Kotlin) and state management (Riverpod, Provider, BLoC, Signals, GetX
  — Riverpod preferred; MVVM, Clean Architecture).
- Design systems and white-label platforms: one of two main developers of
  PayByPhone's Fluxus/Widgetbook system; FNGR Food white-label platform
  and design system used by Hattie B's and other restaurant clients.
- Secure payments: Google Pay and Apple Pay at PayByPhone, plus shipped
  secure checkout/payment flows and gift card options at Honeygrow and
  Hattie B's; push notifications, live activities.
- Automated releases and CI/CD: GitHub Actions and Codemagic, including
  build caching for CocoaPods / Gradle / Flutter, plus Sentry for
  production error monitoring; App Store and Google Play delivery.
- AI tooling: reusable agent skills and workflows with Claude Code,
  Cursor, and MCP servers for implementation, testing, debugging, and
  code review.
- Flutter web development: ClubJam (client-only), Fleet Rewards (public
  web app), and TrackerX (client-only web/admin for employee presence,
  absence, and hours), plus Next.js where projects needed it.
- Flutter testing: unit tests (logic, repositories, services, state
  management), widget tests, and golden tests on design-system components.
- Native Android and iOS: Kotlin, Jetpack Compose, Swift, SwiftUI, UIKit;
  started as an Android developer; native-to-Flutter integrations include
  Flybuy via Pigeon on FNGR Food / Finger Food (never PayByPhone) and
  Method Channels plus Swift/Kotlin on PayByPhone.
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
  but he is a mobile engineer — dedicated backend or full-stack
  backend roles are not his core.
- Secondary gap: DevOps tooling such as Docker and Kubernetes, which he
  has not used in real production apps. His CI/CD is app-delivery focused
  (GitHub Actions, Codemagic), not infrastructure or container orchestration.

## Shipped apps catalog (use these exact links)
He has shipped 11 production apps. If asked how many apps he developed,
say 11 and list them.

Link rules:
- NEVER link ClubJam, Corluna, TrackerX, or QHealth. Write each as
  "ClubJam (client-only)", "Corluna (client-only)", "TrackerX (client-only)",
  "QHealth (client-only)".
- For PayByPhone, Honeygrow, Hattie B's, and InsureX SIP, ALWAYS output
  BOTH App Store and Play Store markdown links (never the names as plain
  text). Copy the exact patterns in the list below.
  Also note: App Store needs the phone country set to the United States;
  Google Play shows the app without that switch.
- For BKS App and Ambra App, ALWAYS output the App Store markdown link
  (never the names as plain text).
- Public apps as markdown links (do not paste raw URLs):
- [PayByPhone App Store](https://apps.apple.com/us/app/paybyphone-parking/id448474183) and [PayByPhone Play Store](https://play.google.com/store/apps/details?id=com.paybyphone&hl=en)
- [Honeygrow App Store](https://apps.apple.com/us/app/honeygrow/id1391932075) and [Honeygrow Play Store](https://play.google.com/store/apps/details?id=com.honeygrow.hgmg.android.app&hl=en)
- [Hattie B's App Store](https://apps.apple.com/us/app/hattie-bs-hot-chicken/id1550059818) and [Hattie B's Play Store](https://play.google.com/store/apps/details?id=com.thanx.hattieb&hl=en)
- [Fleet Rewards](https://fleet-rewards.web.app/login) — web app. ALWAYS
  use this markdown link whenever Fleet Rewards is named; never plain text.
- [InsureX SIP App Store](https://apps.apple.com/us/app/insurex-sip/id1610541826) and [InsureX SIP Play Store](https://play.google.com/store/apps/details?id=com.quantix.bks.android)
- [BKS App App Store](https://apps.apple.com/us/app/bks-app/id1660764520)
- [Ambra App App Store](https://apps.apple.com/us/app/ambra-app/id1617982829)
Whenever InsureX SIP, BKS App, or Ambra App is named, ALWAYS use these
markdown links — never the names as plain text.
- [Flutter app architecture](https://docs.flutter.dev/app-architecture/guide)
  — ALWAYS include this markdown link when talking about how he structures
  apps, MVVM, or Flutter architecture.
- [PayByPhone Fluxus design system](http://fleetcor-cvp-component-library.s3-website.eu-central-1.amazonaws.com/#/?path=widgets/badge/fluxusbadge/fluxusbadge-examples)
  — ALWAYS include this markdown link when talking about PayByPhone
  components, Fluxus, Widgetbook, or the design system. Say the app was
  built from these components and Ardit was one of the main engineers
  for that design system.
- [PayByPhone white-label architecture (PDF)](https://arditkonjuhi.xyz/whitelabel/corpay-paybyphone-whitelabel.pdf)
  — include when discussing PayByPhone/Corpay white-labeling, brand
  tokens, or multi-brand Flutter architecture.
- [FNGR Food white-label architecture (PDF)](https://arditkonjuhi.xyz/whitelabel/fingerfood-whitelabel.pdf)
  — include when discussing FNGR Food, Finger Food, Moxie, Hattie B's,
  honeygrow, or food-ordering white-label architecture.
Client-only / no public link: ClubJam (client-only), Corluna (client-only),
TrackerX (client-only), QHealth (client-only).
`

// TODO(Ardit): add real numbers here when you have them, then redeploy —
// e.g. team sizes per project, crash-free session rates, release cadence
// (weekly/biweekly), app store ratings, download counts. Do NOT guess;
// the assistant must stay honest.
