
    let lang = 'zh';

    const ratios = [
      { name: '16:9', w: 16, h: 9, label: 'HD / WXGA', labelZh: '高清 / 宽屏' },
      { name: '4:3', w: 4, h: 3, label: 'SXGA / 经典', labelZh: '经典 4:3' },
      { name: '1:1', w: 1, h: 1, label: 'Square', labelZh: '正方形' },
      { name: '21:9', w: 21, h: 9, label: 'Ultrawide', labelZh: '超宽屏' },
      { name: '9:16', w: 9, h: 16, label: 'Portrait / TikTok', labelZh: '竖屏 / 抖音' },
      { name: '3:2', w: 3, h: 2, label: 'DSLR / Photo', labelZh: '单反 / 照片' },
      { name: '2:1', w: 2, h: 1, label: 'Cinematic', labelZh: '电影宽高比' },
      { name: '3:4', w: 3, h: 4, label: 'Portrait Photo', labelZh: '竖屏照片' },
    ];

    const commonRes = {
      '16:9': [
        { label: '720p HD', w: 1280, h: 720 },
        { label: '1080p FHD', w: 1920, h: 1080 },
        { label: '1440p QHD', w: 2560, h: 1440 },
        { label: '4K UHD', w: 3840, h: 2160 },
        { label: '8K UHD', w: 7680, h: 4320 },
        { label: 'WVGA', w: 854, h: 480 },
      ],
      '4:3': [
        { label: 'XGA', w: 1024, h: 768 },
        { label: 'SXGA', w: 1280, h: 1024 },
        { label: 'UXGA', w: 1600, h: 1200 },
        { label: 'VGA', w: 640, h: 480 },
        { label: 'iPad', w: 1024, h: 768 },
        { label: 'iPad Pro', w: 2048, h: 1536 },
      ],
      '1:1': [
        { label: 'Instagram', w: 1080, h: 1080 },
        { label: 'Twitter/X', w: 1200, h: 1200 },
        { label: 'Pinterest', w: 1000, h: 1000 },
        { label: 'Facebook', w: 1200, h: 1200 },
        { label: 'Icon 512', w: 512, h: 512 },
        { label: 'Avatar', w: 256, h: 256 },
      ],
      '21:9': [
        { label: 'UW-HD', w: 2560, h: 1080 },
        { label: 'UW-QHD', w: 3440, h: 1440 },
        { label: 'UW-4K', w: 5120, h: 2160 },
        { label: 'Cinema', w: 2560, h: 1080 },
        { label: ' ultrawide', w: 3840, h: 1600 },
        { label: ' monitor', w: 2560, h: 1080 },
      ],
      '9:16': [
        { label: 'Story 1080p', w: 1080, h: 1920 },
        { label: 'TikTok/抖音', w: 1080, h: 1920 },
        { label: 'Shorts', w: 1080, h: 1920 },
        { label: 'Reels', w: 1080, h: 1920 },
        { label: '1080×1920', w: 1080, h: 1920 },
        { label: 'Portrait 9:16', w: 720, h: 1280 },
      ],
      '3:2': [
        { label: 'DSLR 3:2', w: 1920, h: 1280 },
        { label: 'APS-C', w: 4000, h: 2667 },
        { label: 'Full Frame', w: 6000, h: 4000 },
        { label: 'iPhone', w: 2340, h: 1560 },
        { label: 'Photo L', w: 1920, h: 1280 },
        { label: 'Photo M', w: 1440, h: 960 },
      ],
      '2:1': [
        { label: 'Anamorphic', w: 2560, h: 1280 },
        { label: '21:9 crop', w: 2520, h: 1260 },
        { label: '2.39:1', w: 2388, h: 1194 },
        { label: 'Superwide', w: 2000, h: 1000 },
        { label: ' ultrawide', w: 2560, h: 1280 },
        { label: ' video', w: 1920, h: 960 },
      ],
      '3:4': [
        { label: 'Portrait A4', w: 1050, h: 1400 },
        { label: 'Portrait 4R', w: 1050, h: 1500 },
        { label: 'Magazine', w: 1260, h: 1680 },
        { label: 'Poster', w: 900, h: 1200 },
        { label: 'A4 portrait', w: 794, h: 1123 },
        { label: 'Photo P', w: 1050, h: 1400 },
      ],
    };

    let currentRatio = ratios[0];
    let baseValue = 1920; // default base width

    function setLang(l) {
      lang = l;
      document.body.lang = l;
      document.querySelectorAll('.lang-toggle .lang-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.lang-toggle .lang-btn[onclick="setLang(\\'' + l + '\\')"]').classList.add('active');
      renderRatios();
      renderResolutions();
      updateResult();
    }

    function renderRatios() {
      const grid = document.getElementById('ratioGrid');
      grid.innerHTML = '';
      const isZh = lang === 'zh';
      ratios.forEach(r => {
        const btn = document.createElement('div');
        btn.className = 'ratio-btn' + (r.name === currentRatio.name ? ' active' : '');
        btn.onclick = () => selectRatio(r);
        btn.innerHTML =
          '<div class="ratio-name">' + r.name + '</div>' +
          '<div class="ratio-label">' + (isZh ? r.labelZh : r.label) + '</div>';
        grid.appendChild(btn);
      });
    }

    function selectRatio(r) {
      currentRatio = r;
      renderRatios();
      renderResolutions();
      updateResult();
    }

    function renderResolutions() {
      const grid = document.getElementById('resGrid');
      grid.innerHTML = '';
      const res = commonRes[currentRatio.name] || [];
      const isZh = lang === 'zh';
      res.forEach(r => {
        const card = document.createElement('div');
        card.className = 'res-card';
        card.onclick = () => setResolution(r);
        card.innerHTML =
          '<div class="res-label">' + r.label + '</div>' +
          '<div class="res-val">' + r.w + '×' + r.h + '</div>';
        grid.appendChild(card);
      });
    }

    function setResolution(r) {
      document.getElementById('inputWidth').value = r.w;
      document.getElementById('inputHeight').value = r.h;
      updateResult();
    }

    function calcFrom(dir) {
      const wIn = document.getElementById('inputWidth').value;
      const hIn = document.getElementById('inputHeight').value;
      if (dir === 'w' && wIn > 0) {
        const h = Math.round(wIn / currentRatio.w * currentRatio.h);
        document.getElementById('inputHeight').value = h;
      } else if (dir === 'h' && hIn > 0) {
        const w = Math.round(hIn / currentRatio.h * currentRatio.w);
        document.getElementById('inputWidth').value = w;
      }
      updateResult();
    }

    function swap() {
      const w = document.getElementById('inputWidth').value;
      const h = document.getElementById('inputHeight').value;
      document.getElementById('inputWidth').value = h;
      document.getElementById('inputHeight').value = w;
      updateResult();
    }

    function updateResult() {
      const w = parseInt(document.getElementById('inputWidth').value) || 0;
      const h = parseInt(document.getElementById('inputHeight').value) || 0;
      const isZh = lang === 'zh';
      const r = currentRatio;

      // Preview bar width: 100% at 3840px
      const maxW = 3840;
      const barW = Math.min(100, Math.round((w / maxW) * 100));
      document.getElementById('previewBar').style.width = barW + '%';
      document.getElementById('previewLabel').textContent = w > 0 && h > 0 ? w + '×' + h : '';

      if (w > 0 && h > 0) {
        const mpx = ((w * h) / 1000000).toFixed(1);
        document.getElementById('resultSize').textContent = w + ' × ' + h + ' px';
        document.getElementById('resultMpx').textContent = mpx + ' MP';
        document.getElementById('resultMpxZh').textContent = mpx + ' 百万像素';
        document.getElementById('resultRatioLabel').textContent = r.name;
        document.getElementById('resultRatioLabelZh').textContent = r.name;
      } else {
        document.getElementById('resultSize').textContent = '— × — px';
        document.getElementById('resultMpx').textContent = '— MP';
        document.getElementById('resultMpxZh').textContent = '— 百万像素';
      }
      document.getElementById('copyBtn').textContent = isZh ? '复制' : 'Copy';
    }

    function copySize(btn) {
      const w = document.getElementById('inputWidth').value;
      const h = document.getElementById('inputHeight').value;
      if (!w || !h) return;
      const text = w + '×' + h;
      navigator.clipboard.writeText(text).then(() => {
        const isZh = lang === 'zh';
        btn.textContent = isZh ? '✓ 已复制' : '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = isZh ? '复制' : 'Copy';
          btn.classList.remove('copied');
        }, 1500);
      });
    }

    renderRatios();
    renderResolutions();
    // Init with 1920x1080
    document.getElementById('inputWidth').value = 1920;
    document.getElementById('inputHeight').value = 1080;
    updateResult();
  