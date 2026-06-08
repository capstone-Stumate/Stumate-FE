import { defineConfig } from 'orval';

export default defineConfig({
  stumate: {
    input: {
      target:
        'https://stumate-gmf9edeabxc3ahhf.koreacentral-01.azurewebsites.net/api-docs',
    },
    output: {
      target: 'src/shared/api/generated',
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: 'src/shared/api/instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
