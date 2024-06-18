import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const styles: ThemeOverride["styles"] = {
  global: (props) => ({
    body: {
      bgGradient: props.colorMode === 'dark'
        ? 'linear(to-br, gray.800, black)'
        : 'linear(to-br, white, gray.200)',
      height: '100%'
    },
    ".element": {
      bgColor: props.colorMode === 'dark'
        ? 'gray.900'
        : 'gray.200',
    }
  }),
};

const customTheme = extendTheme({
  styles
});

export default customTheme;
