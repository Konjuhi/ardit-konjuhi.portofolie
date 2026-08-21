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
delivery. Open to Flutter roles and freelance mobile projects. Contact:
arditkonjuhi8@gmail.com.

## Location and work authorization
If asked where he is from, his location, visa, or whether he can work in
the EU, answer:
- He is from Kosovo.
- He has been living in Slovenia since 2025.
- He has a work permit / the legal right to work in the EU market, so EU
  employers can hire him.

## Specialty
Mobile & software engineering: Dart, Flutter, Riverpod, Clean Architecture,
MVVM, CI/CD with GitHub Actions and Codemagic, automated App Store & Play
Store releases. Also ships Flutter web apps and works across the stack with
Cloud Functions, Next.js, and Python where projects need it.

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
- Honeygrow (US, food ordering, App Store + Google Play): shipped payment
  features in production — secure checkout and payment flows plus a gift
  card option — alongside menu browsing, meal customization, rewards, push
  notifications, and iOS Live Activities for real-time order status.
- Hattie B's (US, restaurant app): worked end-to-end from start to finish —
  shipped secure checkout and payment flows including a gift card option,
  plus mobile features aligned with brand consistency and high performance.
- FingR Food / Finger Food (US): built a Flutter design system used by
  Hattie B's and other food-ordering clients so those apps share consistent
  UI, components, and ordering flows.
Tech: Flutter, Dart, REST APIs, push notifications, iOS Live Activities,
design systems, secure checkout/payments, gift cards, and loyalty/rewards
integrations.

### Corpay (via RiTech International AG) — Senior Flutter Developer (Jun 2024–Mar 2026)
PayByPhone — parking platform used in 1,200+ cities worldwide, including
across the EU.
- Rewrote the app in Flutter using the Fluxus design system; one of the main
  developers maintaining the shared component library through Widgetbook.
- Built secure payment features: Google Pay, Apple Pay, remote parking
  session extensions, and EV charging flows.
- Supported the migration from the native iOS/Android stack toward Flutter
  for a globally used product.
Tech: Flutter, Dart, Widgetbook, design systems, Google Pay/Apple Pay,
payments security, large-scale app architecture.

### Artichoke Holding GmbH — Flutter Developer (Sep 2023–Jun 2024, remote)
- ClubJam (EU): built for an Austrian client, including Flutter web
  development alongside mobile — pet-health and subscription-focused
  features delivered cross-platform.
- Corluna: cross-platform workflows for orchestras and music ensembles.
Tech: Flutter (mobile + web), Dart, cross-platform delivery.

### Quantix L.L.C. — Flutter Developer (Feb 2021–Sep 2023, Prishtina, Kosovo)
Shipped multiple production apps for the Kosovo market (not the EU):
- BKS App, InsureX SIP (insurance claims and reporting), Ambra App,
  TrackerX (task/operations tracking), QHealth (room/session management).
- Released production builds on both the App Store and Play Store while
  maintaining high quality standards.
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
- PayByPhone: one of the main developers maintaining the shared Fluxus
  component library through Widgetbook.
- FingR Food / Finger Food: built a Flutter design system used by Hattie B's
  and other food-ordering clients. Do NOT mention a personal "FoodTech
  Design System" project.

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
- Design systems and component libraries: Fluxus/Widgetbook at PayByPhone,
  and the FingR Food / Finger Food design system used by Hattie B's and
  other food-ordering clients.
- Secure payments: Google Pay and Apple Pay at PayByPhone, plus shipped
  secure checkout/payment flows and gift card options at Honeygrow and
  Hattie B's; push notifications, live activities.
- Automated releases and CI/CD: proficient in deploying applications with
  GitHub Actions and Codemagic; reliable, production-ready delivery on both
  the App Store and Google Play.
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
