import 'styled-components';
import { SerializedStyles } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;

      gray25: string;
      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;

      orange10: string;
      orange20: string;
      orange30: string;
      orange40: string;
      orange50: string;
      orange60: string;
      orange70: string;
      orange80: string;
      orange90: string;
      orange95: string;
      orange99: string;

      white50: string;
    };

    fonts: {
      display_large: SerializedStyles;
      display_medium: SerializedStyles;
      title_extralarge: SerializedStyles;
      title_large: SerializedStyles;
      title_medium: SignatureStyles;
      title_small: SerializedStyles;
      body_large: SerializedStyles;
      body_medium: SerializedStyles;
      body_small: SerializedStyles;
      chatting_medium: SerializedStyles;
    };
  }
}
