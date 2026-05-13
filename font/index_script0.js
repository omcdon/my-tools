
    let lang = 'zh';

    const pairings = [
      {
        id: 'playfair-lato',
        label: 'Elegant Editorial',
        heading: 'Playfair Display',
        body: 'Lato',
        zhLabel: '优雅编辑风',
        headingText: 'Playfair Display',
        bodyText: 'Lato / 优雅的衬线标题配无衬线正文'
      },
      {
        id: 'roboto-mono',
        label: 'Modern Developer',
        heading: 'Roboto',
        body: 'Roboto Mono',
        zhLabel: '现代开发者',
        headingText: 'Roboto Slab',
        bodyText: 'Roboto Mono / 等宽与标题的现代组合'
      },
      {
        id: 'merriweather',
        label: 'Classic Serif',
        heading: 'Merriweather',
        body: 'Source Sans 3',
        zhLabel: '经典衬线',
        headingText: 'Merriweather',
        bodyText: 'Source Sans 3 / 传统报纸排版风格'
      },
      {
        id: 'poppins-quicksand',
        label: 'Friendly Startup',
        heading: 'Poppins',
        body: 'Quicksand',
        zhLabel: '友好创业风',
        headingText: 'Poppins',
        bodyText: 'Quicksand / 轻盈现代的互联网产品风格'
      },
      {
        id: 'oswald',
        label: 'Bold Impact',
        heading: 'Oswald',
        body: 'Open Sans',
        zhLabel: '大胆冲击力',
        headingText: 'Oswald',
        bodyText: 'Open Sans / 粗标题配柔和正文的经典组合'
      },
      {
        id: 'noto',
        label: 'Bilingual Global',
        heading: 'Noto Serif SC',
        body: 'Noto Sans SC',
        zhLabel: '中英双语通用',
        headingText: 'Noto Serif SC',
        bodyText: 'Noto Sans SC / 思源宋体+黑体，完美的中英文排版'
      }
    ];

    let current = pairings[0];

    function setLang(l) {
      lang = l;
      document.body.lang = l;
      document.querySelectorAll('.lang-toggle .lang-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.lang-toggle .lang-btn[onclick="setLang(\\'' + l + '\\')"]').classList.add('active');
      renderPairings();
      update();
    }

    function renderPairings() {
      const grid = document.getElementById('pairingGrid');
      grid.innerHTML = '';
      pairings.forEach(p => {
        const card = document.createElement('div');
        card.className = 'pairing-card' + (p.id === current.id ? ' active' : '');
        card.onclick = () => selectPairing(p);
        const isZh = lang === 'zh';
        card.innerHTML =
          '<div class="pairing-label">' + (isZh ? p.zhLabel : p.label) + '</div>' +
          '<div class="pairing-fonts">' + p.heading + ' + ' + p.body + '</div>' +
          '<div class="pairing-style">' + (isZh ? p.zhLabel : p.label) + '</div>';
        grid.appendChild(card);
      });
    }

    function selectPairing(p) {
      current = p;
      renderPairings();
      update();
    }

    function update() {
      const isZh = lang === 'zh';
      const headingEl = document.getElementById('previewHeading');
      const bodyEl = document.getElementById('previewBody');
      const customText = document.getElementById('customText').value.trim();

      headingEl.style.fontFamily = "'" + current.heading + "', serif";
      bodyEl.style.fontFamily = "'" + current.body + "', sans-serif";

      if (customText) {
        const lines = customText.split('\n');
        headingEl.textContent = lines[0] || '';
        bodyEl.textContent = lines.slice(1).join('\n') || (isZh ? current.bodyText : current.zhLabel);
      } else {
        headingEl.textContent = isZh ? current.headingText : current.label;
        bodyEl.textContent = isZh ? current.bodyText : current.zhLabel;
      }

      const css = "@import url('https://fonts.googleapis.com/css2?family=" +
        current.heading.replace(/ /g, '+') + ":wght@700&family=" +
        current.body.replace(/ /g, '+') + ":wght@400;wght@400;display=swap');\n\n" +
        ".heading { font-family: '" + current.heading + "', serif; }\n" +
        ".body { font-family: '" + current.body + "', sans-serif; }";

      document.getElementById('cssCode').textContent = css;
      document.getElementById('copyBtn').textContent = isZh ? '复制' : 'Copy';
    }

    function copyCSS(btn) {
      navigator.clipboard.writeText(document.getElementById('cssCode').textContent).then(() => {
        const isZh = lang === 'zh';
        btn.textContent = isZh ? '✓ 已复制' : '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = isZh ? '复制' : 'Copy';
          btn.classList.remove('copied');
        }, 1500);
      });
    }

    document.getElementById('sizeSlider').addEventListener('input', function() {
      document.getElementById('previewHeading').style.fontSize = this.value + 'px';
      document.getElementById('sizeValue').textContent = this.value + 'px';
    });

    document.getElementById('customText').addEventListener('input', update);

    renderPairings();
    update();
  