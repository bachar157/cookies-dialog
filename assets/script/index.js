'use strict';

const mainText = document.querySelector('.text');
const mainDialog = document.querySelector('.dialog1');
const acceptBtn = mainDialog.querySelector('.accept');
const settingsBtn = mainDialog.querySelector('.settings');
const settingsDialog = document.querySelector('.dialog2');
const saveBtn = settingsDialog.querySelector('.save');
const browserCheckbox = settingsDialog.querySelector('.browser input');
const osCheckbox = settingsDialog.querySelector('.os input');
const widthCheckbox = settingsDialog.querySelector('.width input');
const heightCheckbox = settingsDialog.querySelector('.height input');
const overlay = document.querySelector('.overlay');

// Show main dialog and overlay after a delay
setTimeout(() => {
  mainDialog.showModal();
  mainText.classList.add('opacity');
  overlay.style.display = 'block';
}, 900);

function getWidth() {
  return `${window.innerWidth}px`;
}

function getHeight() {
  return `${window.innerHeight}px`;
}

function getBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();
  const browserTypes = {
    chrome: /chrome|chromium|crios/,
    firefox: /firefox|fxios/,
    safari: /safari/,
    opera: /opr/,
    edge: /edg/
  };
  for (const [name, regex] of Object.entries(browserTypes)) {
    if (regex.test(userAgent)) {
      return name;
    }
  }
  return "unknown";
}

function getOS() {
  const platform = navigator.platform;
  if (/mac/i.test(platform)) return 'Mac OS';
  if (/win/i.test(platform)) return 'Windows';
  if (/linux/i.test(platform)) return 'Linux';
  if (/iphone|ipad|ipod/i.test(platform)) return 'iOS';
  if (/android/i.test(platform)) return 'Android';
  return "unknown";
}

function setCookie(name, value, options = {}) {
  options = { path: '/', SameSite: 'Lax', ...options };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (const [key, val] of Object.entries(options)) {
    cookieString += `; ${key}=${val}`;
  }
  document.cookie = cookieString;
}

acceptBtn.addEventListener('click', () => {
  mainDialog.close();
  mainText.classList.remove('opacity');
  overlay.style.display = 'none';
  setCookie('Browser', getBrowser(), { 'max-age': 15 });
  setCookie('Operating system', getOS(), { 'max-age': 15 });
  setCookie('Width', getWidth(), { 'max-age': 15 });
  setCookie('Height', getHeight(), { 'max-age': 15 });
});

settingsBtn.addEventListener('click', () => {
  mainDialog.close();
  settingsDialog.showModal();
});

saveBtn.addEventListener('click', () => {
    settingsDialog.close();
    mainText.classList.remove('opacity');
    overlay.style.display = 'none';
    setCookie('Browser', browserCheckbox.checked ? getBrowser() : 'rejected', { 'max-age': 15 });
    setCookie('Operating system', osCheckbox.checked ? getOS() : 'rejected', { 'max-age': 15 });
    setCookie('Width', widthCheckbox.checked ? getWidth() : 'rejected', { 'max-age': 15 });
    setCookie('Height', heightCheckbox.checked ? getHeight() : 'rejected', { 'max-age': 15 });
  });
  
