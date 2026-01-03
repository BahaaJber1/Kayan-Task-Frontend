import queryClient from "@api/queryClient.js";
import { routeTree } from "@app/routeTree.gen";
import { createRouter } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent", 
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

export default router;
