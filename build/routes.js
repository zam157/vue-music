const express = require('express')
const request  = require('./request')
const apiRoutes = express.Router()

const axios = require('axios')

// 批量获取歌曲 url
const getUrls = async (req, res) => {
  const obj = { ...req.query, ...req.body };

  const { id } = obj;
  const idArr = id.split(',');
  let count = 0;
  const idStr = idArr.map((id) => `"${id}"`).join(',');
  let url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey2682247447678878&g_tk=5381&loginUin=956581739&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B"req_0"%3A%7B"module"%3A"vkey.GetVkeyServer"%2C"method"%3A"CgiGetVkey"%2C"param"%3A%7B"guid"%3A"2796982635"%2C"songmid"%3A%5B${idStr}%5D%2C"songtype"%3A%5B0%5D%2C"uin"%3A"956581739"%2C"loginflag"%3A1%2C"platform"%3A"20"%7D%7D%2C"comm"%3A%7B"uin"%3A956581739%2C"format"%3A"json"%2C"ct"%3A24%2C"cv"%3A0%7D%7D`
  let isOk = false;
  let result = null;

  const reqFun = async () => {
    count += 1;
    result = await request(url);
    if (result.req_0.data.testfile2g) {
      isOk = true;
    }
  };

  while (!isOk && count < 10) {
    await reqFun();
  }

  // const domain = result.req_0.data.sip[0];
  const domain = 'http://122.226.161.16/amobile.music.tc.qq.com/';

  const data = {};
  result.req_0.data.midurlinfo.forEach((item) => {
    if (item.purl) {
      data[item.songmid] = `${domain}${item.purl}`;
    }
  });

  res.json({
    data,
    result: 100,
  });
};

apiRoutes.get('/getDiscList', (req, res) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getRecommend', (req, res) => {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://u.y.qq.com/',
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

/**
 * 接口参数为Array类型的songmid
 * 返回歌曲的url对象
 */
apiRoutes.get('/getSongUrls', (req, res) => {
  const url = 'http://localhost:3300/song/urls'
  const id = req.query.id.toString()

  axios.get(url, {
    params: {id:id}
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => {
    console.log(e)
  })
})

apiRoutes.get('/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => {
    console.log(e)
  })
})

apiRoutes.get('/getSongList', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/n',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => res.json(response.data))
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/getTopList', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  axios.get(url, {
    headers: {
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then(response => res.json(response.data))
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/getTopList', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  axios.get(url, {
    headers: {
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then(response => res.json(response.data))
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/search', function (req, res) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com',
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then(response => res.json(response.data))
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/urls', getUrls)

module.exports = apiRoutes