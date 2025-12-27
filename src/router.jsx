import { routeTree } from "@app/routeTree.gen";
import { createRouter } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
});

export default router;
