import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'wsMobile',
  webDir: '../dist/ws-mobile',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
