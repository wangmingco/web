import { onRequest as __requestData___type_____year___js_onRequest } from "D:\\coding\\github\\web\\web\\functions\\requestData\\[[type]]\\[[year]].js"
import { onRequest as __bitcoin_js_onRequest } from "D:\\coding\\github\\web\\web\\functions\\bitcoin.js"
import { onRequest as __bond_js_onRequest } from "D:\\coding\\github\\web\\web\\functions\\bond.js"
import { onRequest as __forex_js_onRequest } from "D:\\coding\\github\\web\\web\\functions\\forex.js"
import { onRequest as __gold_js_onRequest } from "D:\\coding\\github\\web\\web\\functions\\gold.js"
import { onRequest as __stock_js_onRequest } from "D:\\coding\\github\\web\\web\\functions\\stock.js"

export const routes = [
    {
      routePath: "/requestData/:type*/:year*",
      mountPath: "/requestData/:type*",
      method: "",
      middlewares: [],
      modules: [__requestData___type_____year___js_onRequest],
    },
  {
      routePath: "/bitcoin",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__bitcoin_js_onRequest],
    },
  {
      routePath: "/bond",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__bond_js_onRequest],
    },
  {
      routePath: "/forex",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__forex_js_onRequest],
    },
  {
      routePath: "/gold",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__gold_js_onRequest],
    },
  {
      routePath: "/stock",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__stock_js_onRequest],
    },
  ]