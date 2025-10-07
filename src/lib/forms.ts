// Centralize Google Form config for reuse (build-with-us)
export const BUILD_WITH_US_FORM = {
  action:
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLScts2rgJyRzJptOQN_PQeogmHLrgs5iTGcNVGl68VGenUYHWg/formResponse",
  // Map your field names -> Google entry IDs
  fields: {
    name: "entry.595933781",
    email: "entry.1396460280",
    github: "entry.397125207",
    linkedin: "entry.675040617",
    portfolio1: "entry.266589870",
    portfolio2: "entry.1007924641",
    timezone: "entry.358168445",
    note: "entry.971138085",
  } as const,
} as const;
