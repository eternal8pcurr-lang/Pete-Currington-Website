import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import * as React from 'react';

// Read Plasmic token from environment (recommended) and fall back to the
// existing token for local development. Remove the fallback before sharing
// the repo publicly if you want to fully secure the token.
const PLASMIC_API_TOKEN = process.env.PLASMIC_API_TOKEN || "h79jfcl649ScXuq7wUwJXuP38G4qWo7a3MBuepAuOofk7cINbXixuAC4m3oYzDe9hzzsyRH981TKeXEwGA";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "kMaN8wNPwMETEFUeJ9B9N5",
      token: PLASMIC_API_TOKEN,
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: false,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
// @ts-ignore - local code component
import HeroSplitBanner from "./components/HeroSplitBanner";

PLASMIC.registerComponent(HeroSplitBanner, {
  name: "HeroSplitBanner",
  importPath: "./components/HeroSplitBanner",
  props: {
    profileImage: { type: "string" },
    profileImageAlt: { type: "string" },
    name: { type: "string" },
    tagline: { type: "string" },
    bioText: { type: "string" },
    socialLinks: {
      type: "array",
      // Plasmic expects array items to be typed via `itemType: 'object'` and
      // `fields` describing the object's subfields.
      itemType: "object",
      fields: {
        platform: { type: "string" },
        url: { type: "string" },
        icon: { type: "string" },
      },
    },
    backgroundColor: { type: "string" },
    textColor: { type: "string" },
    accentColor: { type: "string" },
    overlayOpacity: { type: "number" },
    photoPosition: { type: "choice", options: ["left", "right"] },
    showBio: { type: "boolean" },
  },
});

// Register a small generic error/fallback component for Plasmic Editor
// Plasmic sometimes expects custom error components to be present in the host.
// If your Plasmic project references other specific component names, add them here
// or tell me the exact missing names from the browser console and I'll register them.
const PlasmicErrorFallback: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return React.createElement(
    'div',
    { style: { padding: 20, background: '#fff2f0', color: '#7a0b0b', border: '1px solid #f4c2c2' } },
    React.createElement('strong', null, 'Plasmic host error component'),
    React.createElement('div', null, children)
  );
};

// @ts-ignore
PLASMIC.registerComponent(PlasmicErrorFallback, {
  name: 'PlasmicErrorFallback',
  importPath: './plasmic-init',
  props: {
    children: { type: 'slot' },
  },
});

// Register a few commonly-used names so Plasmic can find a fallback.
const commonNames = ['PlasmicError', 'PreviewError', 'PlasmicPreviewError', 'ErrorBoundary'];
for (const nm of commonNames) {
  // @ts-ignore
  PLASMIC.registerComponent(PlasmicErrorFallback, {
    name: nm,
    importPath: './plasmic-init',
    props: { children: { type: 'slot' } },
  });
}
