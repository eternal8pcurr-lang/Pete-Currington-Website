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
};

function renderIcon(social: SocialLink) {
  const key = social.platform?.toLowerCase?.() ?? "";
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
            {socialLinks?.map((s, i) => (
              <a
                key={i}
                href={s.url}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: accentColor }}
                role="listitem"
                aria-label={s.platform}
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
