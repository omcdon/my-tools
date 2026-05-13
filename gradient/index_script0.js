
    let lang = 'zh';
    let gradType = 'linear';
    let angle = 135;
    let stops = [
      { color: '#6c5ce7', pos: 0 },
      { color: '#a29bfe', pos: 100 },
    ];

    function setLang(l) {
      lang = l;
      document.body.lang = l;
      document.querySelectorAll('.lang-toggle .lang-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.lang-toggle .lang-btn[onclick="setLang(\\'' + l + '\\')"]').classList.add('active');
      update();
    }

    function setType(t) {
      gradType = t;
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('btn-' + t).classList.add('active');
      document.getElementById('angleRow').style.display = t === 'radial' ? 'none' : 'flex';
      update();
    }

    function buildStops() {
      const list = document.getElementById('stopList');
      list.innerHTML = '';
      stops.forEach((s, i) => {
        const row = document.createElement('div');
        row.className = 'stop-row';
        row.innerHTML =
          '<div class="color-swatch"><input type="color" value="' + s.color + '" onchange="updateStop(' + i + ', this.value, null)"></div>' +
          '<input type="range" class="pos-slider" min="0" max="100" value="' + s.pos + '" oninput="updateStop(' + i + ', null, this.value)">' +
          '<span class="pos-label">' + s.pos + '%</span>' +
          (stops.length > 2 ? '<button class="remove-stop" onclick="removeStop(' + i + ')">×</button>' : '');
        list.appendChild(row);
      });
    }

    function addStop() {
      // Pick a color between last two or random
      const last = stops[stops.length - 1];
      const penult = stops.length > 1 ? stops[stops.length - 2] : { color: '#ffffff', pos: 0 };
      const newPos = Math.round((last.pos + (penult.pos || 0)) / 2);
      stops.splice(stops.length - 1, 0, { color: shiftColor(last.color, 60), pos: newPos });
      buildStops();
      update();
    }

    function removeStop(i) {
      if (stops.length <= 2) return;
      stops.splice(i, 1);
      buildStops();
      update();
    }

    function updateStop(i, color, pos) {
      if (color !== null) stops[i].color = color;
      if (pos !== null) {
        stops[i].pos = parseInt(pos);
        stops[i].$label && (stops[i].$label.textContent = stops[i].pos + '%');
      }
      // Update pos label if exists
      const labels = document.querySelectorAll('.pos-label');
      if (labels[i]) labels[i].textContent = stops[i].pos + '%';
      update();
    }

    function shiftColor(hex, amount) {
      let r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      r = Math.min(255, Math.max(0, r + amount));
      g = Math.min(255, Math.max(0, g + amount));
      b = Math.min(255, Math.max(0, b - amount));
      return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
    }

    function buildGradient() {
      const sorted = [...stops].sort((a, b) => a.pos - b.pos);
      const stopStr = sorted.map(s => s.color + ' ' + s.pos + '%').join(', ');
      if (gradType === 'linear') {
        return 'linear-gradient(' + angle + 'deg, ' + stopStr + ')';
      } else if (gradType === 'radial') {
        return 'radial-gradient(circle, ' + stopStr + ')';
      } else {
        return 'conic-gradient(from ' + angle + 'deg, ' + stopStr + ')';
      }
    }

    function update() {
      const grad = buildGradient();
      document.getElementById('preview').style.background = grad;
      const isZh = lang === 'zh';
      document.getElementById('cssCode').textContent =
        'background: ' + grad + ';' + '\n' +
        '/* ' + (isZh ? '在 background-image 中使用' : 'Use in background-image') + ' */' + '\n' +
        'background-image: ' + grad + ';';
      document.getElementById('copyBtn').textContent = isZh ? '复制' : 'Copy';
    }

    function copyCSS(btn) {
      const text = document.getElementById('cssCode').textContent;
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

    document.getElementById('angleSlider').addEventListener('input', function() {
      angle = parseInt(this.value);
      document.getElementById('angleValue').textContent = angle + '°';
      update();
    });

    buildStops();
    update();
  