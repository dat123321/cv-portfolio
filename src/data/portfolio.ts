// Public components import this for SSR rendering.
// The admin panel writes to portfolio.json via /api/portfolio.
import _data from "./portfolio.json";
export const portfolioData = _data as typeof _data;
