import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { myCustomLightTheme } from '@/styles/theme.ts';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
});
