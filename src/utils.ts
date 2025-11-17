export function generateDeviceId(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const part1 = Array.from({ length: 8 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  const part3 = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  const part4 = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  const part5 = Array.from({ length: 12 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

export function getUserAgent(): string {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}
