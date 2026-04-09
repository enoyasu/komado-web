export const ANALYTICS_EVENTS = {
  viewHome: "view_home",
  viewWork: "view_work",
  openChapter: "open_chapter",
  completeChapter: "complete_chapter",
  followWork: "follow_work",
  bookmarkWork: "bookmark_work",
  shareWork: "share_work",
  signupComplete: "signup_complete",
  creatorCreateWork: "creator_create_work",
  creatorPublishChapter: "creator_publish_chapter",
  topReaderCtaClick: "top_reader_cta_click",
  topCreatorCtaClick: "top_creator_cta_click",
  readersSignupClick: "readers_signup_click",
  creatorsSignupClick: "creators_signup_click",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function trackEvent(name: AnalyticsEventName, payload?: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== "production") {
    const detail = payload ? JSON.stringify(payload) : "";
    console.info(`[analytics] ${name}${detail ? ` ${detail}` : ""}`);
  }
}
