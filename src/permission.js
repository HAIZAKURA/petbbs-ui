import router from "@/router";
import store from "@/store";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      await store.dispatch("user/getInfo");
      next();
    }
  } else {
    next();
  }
})

router.afterEach(() => {
  NProgress.done();
})
