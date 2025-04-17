function loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    document.body.appendChild(script);
  }
  
  if (window.innerWidth >= 1024) {
    loadScript('compiled/backgroundsphere.js');  
  }
  