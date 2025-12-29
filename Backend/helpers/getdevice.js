export const getDeviceInfo = (req) => {
  const ua = req.headers["user-agent"];
  if (!ua) return null;

  const device =
    /tablet/i.test(ua) ? "tablet" :
    /mobile/i.test(ua) ? "mobile" :
    "desktop";

  const os =
    /android/i.test(ua) ? "android" :
    /iphone|ipad|ipod/i.test(ua) ? "ios" :
    /windows nt/i.test(ua) ? "windows" :
    /macintosh/i.test(ua) ? "macos" :
    /linux/i.test(ua) ? "linux" :
    "unknown";

  const browser =
    /edg/i.test(ua) ? "edge" :
    /opr|opera/i.test(ua) ? "opera" :
    /firefox/i.test(ua) ? "firefox" :
    /chrome/i.test(ua) ? "chrome" :
    /safari/i.test(ua) ? "safari" :
    "unknown";

  return { device, os, browser };
};
