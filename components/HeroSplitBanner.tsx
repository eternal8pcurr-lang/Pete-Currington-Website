import React from "react";
import Image from "next/image";
import styles from "./HeroSplitBanner.module.css";

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface HeroSplitBannerProps {
  profileImage: string;
  profileImageAlt: string;
  name: string;
  tagline: string;
  bioText?: string;
  socialLinks: SocialLink[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  overlayOpacity?: number;
  photoPosition?: "left" | "right";
  showBio?: boolean;
}

const defaultIcons: Record<string, JSX.Element> = {
  github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.58 0-.29-.01-1.04-.016-2.04-3.338.73-4.042-1.61-4.042-1.61-.546-1.39-1.334-1.76-1.334-1.76-1.09-.75.082-.74.082-.74 1.205.084 1.84 1.236 1.84 1.236 1.07 1.83 2.8 1.3 3.485.996.108-.776.42-1.3.763-1.6-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.526.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.65.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.62-5.48 5.92.431.372.815 1.1.815 2.22 0 1.6-.014 2.88-.014 3.27 0 .32.216.695.825.577C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.67-1.27 2.3-2.6 4.73-2.6C23.3 7.6 24 11 24 15.6V24h-5v-7c0-1.67-.03-3.82-2.32-3.82-2.32 0-2.68 1.82-2.68 3.7V24H8V8z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M24 4.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337 3a9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.574 4.897 4.897 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.919 4.919 0 004.588 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.58 2 2.52 5.93 2 10.99h4.02c.46-3.02 3.02-5.33 5.88-5.33 3.36 0 5.98 2.67 5.98 6v1.41h-3.9v3.21h3.9V22h-4.98v-6.79H12v-2.15h3.02V9.6c0-2.31.94-3.87 3.74-3.87 1.03 0 1.9.08 2.15.11v2.5h-1.5c-1.18 0-1.41.56-1.41 1.38v1.82H22z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm5 5.5A4.5 4.5 0 1112 16a4.5 4.5 0 010-9zm6.5-.5a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M16 3h2.5v1.7A5.3 5.3 0 0122 9.9V12h-2v-2.1a3.3 3.3 0 01-3.4-3.4V7H13v6a3 3 0 11-3-3v-2a5 5 0 107 4.58V3z"/>
    </svg>
  ),
};

function renderIcon(social: SocialLink) {
  const key = social.platform?.toLowerCase?.() ?? "";
  const iconKey = (social.icon || social.platform || "").toLowerCase();
  if (defaultIcons[iconKey]) return defaultIcons[iconKey];
  if (defaultIcons[key]) return defaultIcons[key];

  if (social.icon && social.icon.trim().startsWith("<svg")) {
    return (
      <span
        className={styles.rawSvg}
        aria-hidden
        dangerouslySetInnerHTML={{ __html: social.icon }}
      />
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="10" textAnchor="middle" fill="#fff">{(social.platform || "?").charAt(0)}</text>
    </svg>
  );
}

export default function HeroSplitBanner(props: HeroSplitBannerProps) {
  const {
    profileImage,
    profileImageAlt,
    name,
    tagline,
    bioText,
    socialLinks,
    backgroundColor = "#ffffff",
    textColor = "#333333",
    accentColor = "#4A90E2",
    overlayOpacity = 0.3,
    photoPosition = "left",
    showBio = false,
  } = props;

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
  };

  const accentStyle: React.CSSProperties = {
    color: accentColor,
  };

  // Normalize socialLinks robustly so we always work with an array. Plasmic
  // can pass arrays, objects keyed by index, JSON strings, or objects with
  // an `items` array. Handle all common shapes defensively.
  function normalizeSocialLinks(input: any): SocialLink[] {
    if (!input) return [];
    // If already an array, return shallow-copied array of objects.
    if (Array.isArray(input)) {
      return input
        .map((it) => (typeof it === "string" ? tryParseJson(it) : it))
        .filter(isObject) as SocialLink[];
    }
    // If it's a string, try to parse JSON (Plasmic sometimes serializes props).
    if (typeof input === "string") {
      const parsed = tryParseJson(input);
      return normalizeSocialLinks(parsed);
    }
    // If it's an object and has an `items` array (common shape), use that.
    if (input && typeof input === "object") {
      if (Array.isArray(input.items)) return normalizeSocialLinks(input.items);

      // If object is array-like (numeric keys), gather numeric-key values.
      const keys = Object.keys(input);
      const isNumericKeys = keys.length > 0 && keys.every((k) => /^\d+$/.test(k));
      const vals = isNumericKeys ? keys.map((k) => input[k]) : Object.values(input);
      return vals.map((it) => (typeof it === "string" ? tryParseJson(it) : it)).filter(isObject) as SocialLink[];
    }
    return [];
  }

  function tryParseJson(s: any) {
    if (typeof s !== "string") return s;
    try {
      return JSON.parse(s);
    } catch (e) {
      return s;
    }
  }

  function isObject(v: any): v is Record<string, any> {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  const links: SocialLink[] = normalizeSocialLinks(socialLinks);

  return (
    <section
      className={styles.container}
      style={containerStyle}
      aria-label="Hero"
    >
      <div
        className={
          photoPosition === "right" ? `${styles.right} ${styles.imageColumn}` : `${styles.left} ${styles.imageColumn}`
        }
      >
        <div className={styles.imageWrapper}>
          <Image
            src={profileImage}
            alt={profileImageAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 40vw"
            className={styles.profileImage}
            style={{ objectFit: "cover" }}
          />
          <div
            className={styles.overlay}
            style={{ background: `linear-gradient(180deg, rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity}))` }}
            aria-hidden
          />
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.content}>
          <h1 className={styles.name} style={accentStyle}>{name}</h1>
          <p className={styles.tagline}>{tagline}</p>

          <div className={styles.socials} role="list" aria-label="Social links">
            {links.map((s, i) => (
              <a
                key={i}
                href={s?.url || '#'}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: accentColor }}
                role="listitem"
                aria-label={s?.platform || `social-${i}`}
              >
                <span className={styles.iconWrapper} style={{ color: accentColor }}>
                  {renderIcon(s)}
                </span>
              </a>
            ))}
          </div>

          <div className={styles.divider} aria-hidden />

          {showBio && (
            <p className={styles.bio}>{bioText}</p>
          )}
        </div>
      </div>
    </section>
  );
}
