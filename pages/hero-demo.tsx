import React from 'react';
import HeroSplitBanner from '../components/HeroSplitBanner';

export default function HeroDemo() {
  return (
    <div>
      <HeroSplitBanner
        profileImage={'/favicon.ico'}
        profileImageAlt={'Profile image'}
        name={'Pete Currington'}
        tagline={'Building thoughtful web experiences'}
        bioText={'Full-stack developer with a focus on clean interfaces and performance.'}
        socialLinks={[
          { platform: 'GitHub', url: 'https://github.com/your', icon: 'github' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/your', icon: 'linkedin' },
          { platform: 'Twitter', url: 'https://twitter.com/your', icon: 'twitter' },
        ]}
        backgroundColor={'#ffffff'}
        textColor={'#222222'}
        accentColor={'#4A90E2'}
        overlayOpacity={0.25}
        photoPosition={'left'}
        showBio={true}
      />
    </div>
  );
}
