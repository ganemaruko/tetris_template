/*
scroll lock scripts
 */


export const disableKeyScroll = () => {
    window.addEventListener('keydown', disableKeys, true)
}

const disableKeys = (event: KeyboardEvent) => {
  const code = event.keyCode;
  switch (code) {
    case 37: // ←
    case 38: // ↑
    case 39: // →
    case 40: // ↓
      event.preventDefault();
  }
};