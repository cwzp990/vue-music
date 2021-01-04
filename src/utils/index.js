//播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};

export function convertCount(count) {
  if (count >= 100000000) {
    return (count / 100000000).toFixed(2) + "亿";
  } else if (count >= 10000) {
    return (count / 10000).toFixed(2) + "万";
  } else {
    return count;
  }
}

export function formatPlayTime(interval) {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
}

export function today() {
  return new Date().getDate();
}

export function getMonth() {
  let month = new Date().getMonth() + 1;
  return String(month).padStart(2, "0");
}

export function debounce(func, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
}

export function more(txt, len) {
  if (txt.length >= len) {
    return txt.slice(0, len) + "...";
  } else {
    return txt;
  }
}

export function formatDate(time) {
  return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, " ");
}

export function findIndex(list, music) {
  return list.findIndex(item => {
    return item.id === music.id;
  });
}

export function getSinger(ar) {
  if (!ar.length) return "";
  if (ar.length === 1) return ar[0].name;
  if (ar.length === 2) return `${ar[0].name} / ${ar[1].name}`;
}

export function addHistory (music) {
  let history = JSON.parse(localStorage.getItem("history")) || []
  let hasMusic = history.find(i => i.id === music.id)
  if (!hasMusic) {
    history.push(music)
    localStorage.setItem("history", JSON.stringify(history))
  }
}

const tagRegMap = {
  title: "ti",
  artist: "ar",
  album: "al",
  offset: "offset",
  by: "by"
};

const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

export function lyricParser(data) {
  const lyric = data.lrc.lyric // 中文、英文歌词
  const tlyric = data.tlyric.lyric // 翻译歌词
  const tags = {}; // 保存歌曲的专辑信息

  if (!lyric) return [];

  for (let tag in tagRegMap) {
    const matches = lyric.match(
      new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, "i")
    );
    tags[tag] = (matches && matches[1]) || "";
  }

  let newLyric = [], tlyrics = [];
  let lyrics = lyric.split("\n");

  if (tlyric) {
    tlyrics = tlyric.split("\n");
  }

  lyrics.forEach(line => {
    let time = line.match(timeExp);
    const txt1 = line.replace(timeExp, "").trim(); // 中文、英文歌词
    let txt2 = ''
    tlyrics.forEach(row => {
      if (Array.isArray(time) && row.indexOf(time[0]) > -1) { // 匹配翻译
        txt2 = row
      }
    }); // 翻译歌词
    if (time) {
      time.forEach(t => {
        console.log(666, `${t} ${txt1}`)
        newLyric.push(`${t} ${txt1}`);
        if (txt2) newLyric.push(`${t} ${txt2}`); // 如果有翻译歌词就
      });
    }
  });

  newLyric = newLyric.map(line => {
    let result = timeExp.exec(line);
    const txt = line.replace(timeExp, "").trim();
    return {
      time:
        (result[1] * 60 * 1000 + result[2] * 1000 + Number(result[3])) / 1000,
      txt
    };
  });

  if (tags.offset !== "") {
    newLyric.unshift(
      { time: tags.offset, txt: `歌曲: ${tags.title}` },
      { time: tags.offset, txt: `歌手: ${tags.artist}` },
      { time: tags.offset, txt: `专辑: ${tags.album}` }
    );
  }

  newLyric.sort((a, b) => {
    return a.time - b.time;
  });

  return newLyric;
}
