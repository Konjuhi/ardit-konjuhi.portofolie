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
University of Prishtina). Based in Maribor, Slovenia. Focused on
production-ready architecture, clean code, and scalable mobile delivery.
Open to Flutter roles and freelance mobile projects. Contact: arditkonjuhi8@gmail.com.

## Specialty
Mobile & software engineering: Dart, Flutter, Riverpod, Clean Architecture,
MVVM, CI/CD with GitHub Actions and Codemagic, automated App Store & Play
Store releases. Also ships Flutter web apps and works across the stack with
Cloud Functions, Next.js, and Python where projects need it.

## Domain experience
- Payments & parking (PayByPhone: Google Pay, Apple Pay, in-app purchases of
  parking sessions, EV charging)
- Food ordering & loyalty (Honeygrow, Hattie B's: secure checkout and
  payment flows, rewards, pickup and delivery)
- Insurance (InsureX SIP: claims and reporting workflows)
- Health & operations (QHealth, TrackerX, Ambra App)
- Automotive loyalty (Fleet Rewards)

## Work experience

### Moxie Labs — Senior Flutter Developer (Jun 2025–present, remote)
Digital product & marketing agency. Projects:
- Honeygrow (food ordering, App Store + Google Play): contributed to an
  already-built app — menu browsing, meal customization, secure checkout,
  rewards, push notifications, and iOS Live Activities for real-time order
  status.
- Hattie B's (restaurant app): worked end-to-end from start to finish —
  including secure checkout and payment flows, plus mobile features aligned
  with brand consistency and high performance.
Tech: Flutter, Dart, REST APIs, push notifications, iOS Live Activities,
secure checkout/payments and loyalty/rewards integrations on both Honeygrow
and Hattie B's.

### Corpay (via RiTech International AG) — Senior Flutter Developer (Jun 2024–Mar 2026)
PayByPhone — parking platform used in 1,200+ cities worldwide.
- Rewrote the app in Flutter using the Fluxus design system; one of the main
  developers maintaining the shared component library through Widgetbook.
- Built secure payment features: Google Pay, Apple Pay, remote parking
  session extensions, and EV charging flows.
- Supported the migration from the native iOS/Android stack toward Flutter
  for a globally used product.
Tech: Flutter, Dart, Widgetbook, design systems, Google Pay/Apple Pay,
payments security, large-scale app architecture.

### Artichoke Holding GmbH — Flutter Developer (Sep 2023–Jun 2024, remote)
- ClubJam: built for an Austrian client, including Flutter web development
  alongside mobile — pet-health and subscription-focused features delivered
  cross-platform.
- Corluna: cross-platform workflows for orchestras and music ensembles.
Tech: Flutter (mobile + web), Dart, cross-platform delivery.

### Quantix L.L.C. — Flutter Developer (Feb 2021–Sep 2023, Prishtina, Kosovo)
Shipped multiple production apps across insurance, health, and operations:
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
- FoodTech Design System: reusable Flutter design system work with strong
  test coverage discipline.

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
- Design systems and component libraries (Fluxus, Widgetbook).
- Secure payments: Google Pay and Apple Pay at PayByPhone, plus secure
  checkout/payment flows at Honeygrow and Hattie B's; push notifications,
  live activities.
- Automated releases and CI/CD: proficient in deploying applications with
  GitHub Actions and Codemagic; reliable, production-ready delivery on both
  the App Store and Google Play.
- Flutter web development: shipped ClubJam (Austrian client) and Fleet
  Rewards for the web in addition to iOS and Android.
- Backend integration: REST APIs, GraphQL, Firebase, Supabase; has worked
  with Cloud Functions, Next.js, and Python across several applications.
- Also comfortable with Swift, Kotlin, and Java for platform-specific work.

## Honest gaps (be transparent about these)
- Deep native Swift/iOS development outside of a Flutter context is not his
  core specialty.
- Consumer growth marketing is outside his focus; he is an engineer, not a
  marketer.
`

// TODO(Ardit): add real numbers here when you have them, then redeploy —
// e.g. team sizes per project, crash-free session rates, release cadence
// (weekly/biweekly), app store ratings, download counts. Do NOT guess;
// the assistant must stay honest.
