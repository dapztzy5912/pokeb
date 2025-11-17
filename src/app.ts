import { generateDeviceId, getUserAgent } from './utils';

function logMessage(message: string): void {
  const log = document.getElementById('log') as HTMLDivElement;
  log.innerHTML += message + '<br>';
  log.scrollTop = log.scrollHeight;
}

async function sendNGLMessage(nglUsername: string, message: string): Promise<boolean> {
  const url = 'https://ngl.link/api/submit';
  const deviceId = generateDeviceId();
  const userAgent = getUserAgent();

  const headers = {
    'Host': 'ngl.link',
    'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
    'accept': '*/*',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'x-requested-with': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?0',
    'user-agent': userAgent,
    'sec-ch-ua-platform': '"Windows"',
    'origin': 'https://ngl.link',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': `https://ngl.link/${nglUsername}`,
    'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
  };

  const data = new URLSearchParams();
  data.append('username', nglUsername);
  data.append('question', message);
  data.append('deviceId', deviceId);
  data.append('gameSlug', '');
  data.append('referrer', '');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data,
      mode: 'no-cors'
    });
    logMessage(`Pesan terkirim ke ${nglUsername}`);
    return true;
  } catch (error: any) {
    logMessage(`Gagal mengirim pesan ke ${nglUsername}: ${error}`);
    return false;
  }
}

async function startSpam(): Promise<void> {
  const nglUsername = (document.getElementById('nglUsername') as HTMLInputElement).value;
  const message = (document.getElementById('message') as HTMLInputElement).value;
  const count = parseInt((document.getElementById('count') as HTMLInputElement).value);
  const status = document.getElementById('status') as HTMLDivElement;

  if (!nglUsername || !message || isNaN(count)) {
    status.textContent = 'Masukkan semua informasi dengan benar!';
    return;
  }

  status.textContent = `Memulai spam ke ${nglUsername}, pesan: ${message}, jumlah: ${count}`;
  logMessage(`Memulai spam ke ${nglUsername}, pesan: ${message}, jumlah: ${count}`);

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < count; i++) {
    const success = await sendNGLMessage(nglUsername, message);
    if (success) {
      sent++;
    } else {
      failed++;
    }
    status.textContent = `Terkirim: ${sent}/${count}, Gagal: ${failed}, Progress: ${Math.round((sent / count) * 100)}%`;
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 detik
  }

  status.textContent = `Spam selesai!\nBerhasil: ${sent} pesan\nGagal: ${failed} pesan\nTarget: ${nglUsername}\nPesan: ${message}`;
  logMessage(`Spam selesai!\nBerhasil: ${sent} pesan\nGagal: ${failed} pesan\nTarget: ${nglUsername}\nPesan: ${message}`);
}

(window as any).startSpam = startSpam;
