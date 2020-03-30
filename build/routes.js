const express = require('express')
const apiRoutes = express.Router()

const axios = require('axios')

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

module.exports = apiRoutes