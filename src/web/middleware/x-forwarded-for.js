import proxyaddr from "proxy-addr";

export function initialize(app, webConfig) {
  const trustFn = proxyaddr.compile(webConfig.getTrustedProxies());

  app.use(readProxyHeaders.bind(null, trustFn));
}

function getForwardedProto(req) {
  const xForwardedProto = req.header("x-forwarded-proto");
  if (xForwardedProto && xForwardedProto.match(/^https?$/)) {
    return xForwardedProto;
  } else {
    return req.protocol;
  }
}

function readProxyHeaders(trustFn, req, res, next) {
  const cfForwardIp = req.header("cf-connecting-ip");
  const forwardedIP = cfForwardIp ?? proxyaddr(req, trustFn);
  if (forwardedIP !== req.ip) {
    req.realIP = forwardedIP;
    req.realProtocol = getForwardedProto(req);
  } else {
    req.realIP = req.ip;
    req.realProtocol = req.protocol;
  }

  next();
}
