import { defineConfig } from 'orval';

export default defineConfig({
    api: {
        input: 'CompleteSchema.yaml', // path in your repo
        output: {
            target: 'src/api/gen/client.ts',
            client: 'react-query',
            httpClient: 'axios',
            override: {
                query: { useSuspenseQuery: false },
                mutator: {
                    path: 'src/lib/axios.ts',
                    name: 'axiosInstance',
                },
            },
            prettier: true,
        },
    },
});
