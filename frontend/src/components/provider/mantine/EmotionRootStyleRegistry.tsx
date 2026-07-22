
import { useState } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export function RootStyleRegistry({ children }: { children: React.ReactNode }) {
   const [cache] = useState(() => {
      const cache = createCache({ key: "my" });
      cache.compat = true;
      return cache;
   });

   return <CacheProvider value={cache}>{children}</CacheProvider>;
}
