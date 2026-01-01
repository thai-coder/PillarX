export const detectActor = (userAgentString: string = navigator.userAgent) => {
  const botPatterns = [
    /bot/i, /spider/i, /crawl/i, /slurp/i, /googlebot/i, 
    /bingbot/i, /headless/i, /selenium/i, /puppeteer/i,
    /postman/i, /curl/i, /wget/i
  ];

  const isBot = botPatterns.some(pattern => pattern.test(userAgentString));
  
  return {
    isBot,
    actorType: (isBot ? 'BOT' : 'HUMAN') as 'BOT' | 'HUMAN'
  };
};